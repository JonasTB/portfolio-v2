import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe.js';

const schema = z.object({ name: z.string().min(1), age: z.number().int().positive() });

describe('ZodValidationPipe', () => {
  it('returns the parsed value when it matches the schema', () => {
    const pipe = new ZodValidationPipe(schema);

    expect(pipe.transform({ name: 'Jonas', age: 30 })).toEqual({ name: 'Jonas', age: 30 });
  });

  it('throws BadRequestException when the value fails validation', () => {
    const pipe = new ZodValidationPipe(schema);

    expect(() => pipe.transform({ name: '', age: -1 })).toThrow(BadRequestException);
  });
});
