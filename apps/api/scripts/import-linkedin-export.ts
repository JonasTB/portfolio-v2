/**
 * Ferramenta interna, não exposta publicamente (sem controller/rota).
 *
 * Lê o `Positions.csv` de uma exportação de dados do LinkedIn (Configurações
 * > "Get a copy of your data" > "Download larger data archive", já
 * descompactada) e imprime um rascunho normalizado (empresa, cargo, período)
 * no stdout, para comparar manualmente com `src/content/experience.ts`.
 *
 * NÃO escreve em `experience.ts` automaticamente: o CSV do LinkedIn só tem
 * fatos brutos (empresa/cargo/datas), enquanto `experience.ts` guarda
 * narrativa curada à mão (`context`, `impact`, `technologies`) que nenhuma
 * ferramenta deveria inventar ou sobrescrever.
 *
 * Uso:
 *   pnpm --filter @portfolio/api import:linkedin -- /caminho/para/export
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

interface ParsedPosition {
  company: string;
  title: string;
  startedOn: string;
  finishedOn: string;
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);
  return fields;
}

function parsePositionsCsv(raw: string): ParsedPosition[] {
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];

  const header = parseCsvLine(lines[0]!).map((column) => column.trim().toLowerCase());
  const companyIndex = header.indexOf('company name');
  const titleIndex = header.indexOf('title');
  const startIndex = header.indexOf('started on');
  const endIndex = header.indexOf('finished on');

  if (companyIndex === -1 || titleIndex === -1 || startIndex === -1) {
    throw new Error(
      'Positions.csv não tem o formato esperado (colunas "Company Name", "Title", "Started On").',
    );
  }

  return lines.slice(1).map((line) => {
    const fields = parseCsvLine(line);
    return {
      company: fields[companyIndex]?.trim() ?? '',
      title: fields[titleIndex]?.trim() ?? '',
      startedOn: fields[startIndex]?.trim() ?? '',
      finishedOn: (endIndex === -1 ? '' : fields[endIndex]?.trim()) || 'atual',
    };
  });
}

async function main() {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const exportDir = args[0];
  if (!exportDir) {
    console.error('Uso: pnpm --filter @portfolio/api import:linkedin -- /caminho/para/export');
    process.exitCode = 1;
    return;
  }

  const csvPath = join(exportDir, 'Positions.csv');
  const raw = await readFile(csvPath, 'utf-8');
  const positions = parsePositionsCsv(raw);

  console.log(`${positions.length} posição(ões) encontrada(s) em ${csvPath}:\n`);
  for (const position of positions) {
    console.log(
      `- ${position.company} — ${position.title} (${position.startedOn} → ${position.finishedOn})`,
    );
  }
  console.log(
    '\nEsses são só os fatos brutos do LinkedIn. Compare manualmente com src/content/experience.ts ' +
      'e atualize context/impact/technologies à mão — nada aqui foi escrito automaticamente.',
  );
}

void main();
