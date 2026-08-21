import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { contactRequestSchema, type ContactRequest } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { apiPost, ApiError } from '../../lib/api';
import { Button, Input, Label, Textarea } from '../ui';

type FormErrorKey = 'validation' | 'rateLimited' | 'unavailable' | 'generic';

function errorKeyFromStatus(status: number): FormErrorKey {
  if (status === 400) return 'validation';
  if (status === 429) return 'rateLimited';
  if (status === 503) return 'unavailable';
  return 'generic';
}

export function ContactForm() {
  const { t } = useLocale();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactRequest>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', honeypot: '' },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactRequest) => apiPost<{ status: 'sent' }>('/contact', data),
    onSuccess: () => reset(),
  });

  const errorKey =
    mutation.error instanceof ApiError ? errorKeyFromStatus(mutation.error.status) : null;

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      noValidate
      className="flex flex-col gap-4"
    >
      <div>
        <Label htmlFor="contact-name">{t('contact.form.name')}</Label>
        <Input id="contact-name" invalid={Boolean(errors.name)} {...register('name')} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{t('contact.form.error.field')}</p>
        )}
      </div>

      <div>
        <Label htmlFor="contact-email">{t('contact.form.email')}</Label>
        <Input
          id="contact-email"
          type="email"
          invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{t('contact.form.error.field')}</p>
        )}
      </div>

      <div>
        <Label htmlFor="contact-subject">{t('contact.form.subject')}</Label>
        <Input id="contact-subject" invalid={Boolean(errors.subject)} {...register('subject')} />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-500">{t('contact.form.error.field')}</p>
        )}
      </div>

      <div>
        <Label htmlFor="contact-message">{t('contact.form.message')}</Label>
        <Textarea id="contact-message" invalid={Boolean(errors.message)} {...register('message')} />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{t('contact.form.error.field')}</p>
        )}
      </div>

      {/* Honeypot anti-spam: escondido visualmente, nunca preenchido por humanos. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      <Button type="submit" disabled={mutation.isPending} className="self-start">
        {mutation.isPending ? t('contact.form.submitting') : t('contact.form.submit')}
      </Button>

      {mutation.isSuccess && <p className="text-sm text-accent">{t('contact.form.success')}</p>}
      {errorKey && <p className="text-sm text-red-500">{t(`contact.form.error.${errorKey}`)}</p>}
    </form>
  );
}
