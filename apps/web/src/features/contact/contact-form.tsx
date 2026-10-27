import { Button } from '@danirusev/ui/components/button'
import { Input } from '@danirusev/ui/components/input'
import { Label } from '@danirusev/ui/components/label'
import { Textarea } from '@danirusev/ui/components/textarea'
import { Send } from 'lucide-react'
import { type FormEvent, useEffect, useState } from 'react'

const fieldNames = ['name', 'email', 'phone', 'message'] as const
type FieldName = (typeof fieldNames)[number]
type FormErrors = Partial<Record<FieldName, string>>
const requiredMessages: Record<FieldName, string> = {
  name: 'Името е задължително.',
  email: 'Имейлът е задължителен.',
  phone: 'Телефонният номер е задължителен.',
  message: 'Съобщението е задължително.',
}
const inputClassName =
  'bg-slate-800/40 border-slate-700/50 text-white placeholder:text-slate-600 focus:border-main focus:ring-main/10 h-11 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed'
const labelClassName =
  'text-slate-300 font-medium text-[10px] uppercase tracking-wider ml-1'

function isFieldName(name: string): name is FieldName {
  return fieldNames.some((field) => field === name)
}

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({})
  const [notSent, setNotSent] = useState(false)
  const [interactive, setInteractive] = useState(false)
  useEffect(() => setInteractive(true), [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotSent(false)
    const form = event.currentTarget
    const nextErrors: FormErrors = {}
    let firstInvalid: HTMLInputElement | HTMLTextAreaElement | undefined
    for (const name of fieldNames) {
      const field = form.elements.namedItem(name)
      if (
        !(
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        )
      )
        continue
      if (!field.value.trim()) nextErrors[name] = requiredMessages[name]
      else if (name === 'email' && field.validity.typeMismatch)
        nextErrors.email = 'Въведеният имейл е невалиден.'
      if (nextErrors[name] && !firstInvalid) firstInvalid = field
    }
    setErrors(nextErrors)
    if (firstInvalid) {
      firstInvalid.focus()
      return
    }
    // UI-only phase: keep the entered values and make no delivery/network claim.
    setNotSent(true)
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    setNotSent(false)
    const field = event.target
    if (
      (field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement) &&
      isFieldName(field.name)
    ) {
      const name = field.name
      if (errors[name])
        setErrors((previous) => ({ ...previous, [name]: undefined }))
    }
  }

  const fieldAccessibility = (name: FieldName) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form
      method="post"
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className={labelClassName}>
            Име
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Вашето име"
            required
            maxLength={150}
            className={inputClassName}
            {...fieldAccessibility('name')}
          />
          <FieldError name="name" message={errors.name} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className={labelClassName}>
            Имейл
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            required
            maxLength={254}
            className={inputClassName}
            {...fieldAccessibility('email')}
          />
          <FieldError name="email" message={errors.email} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone" className={labelClassName}>
          Телефонен Номер
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+359 ..."
          required
          maxLength={40}
          className={inputClassName}
          {...fieldAccessibility('phone')}
        />
        <FieldError name="phone" message={errors.phone} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message" className={labelClassName}>
          Съобщение
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Напишете Вашето съобщение тук..."
          required
          maxLength={5000}
          className="bg-slate-800/40 border-slate-700/50 text-white placeholder:text-slate-600 focus:border-main focus:ring-main/10 rounded-xl resize-none disabled:opacity-70 disabled:cursor-not-allowed min-h-[160px] sm:min-h-[200px]"
          {...fieldAccessibility('message')}
        />
        <FieldError name="message" message={errors.message} />
      </div>
      <div className="pt-1">
        <Button
          type="submit"
          disabled={!interactive}
          className="w-full h-12 text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 bg-main hover:bg-main/90 text-black shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)] hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4" aria-hidden="true" />
            Изпрати съобщението
          </span>
        </Button>
      </div>
      {notSent && (
        <p role="status" className="text-sm text-slate-300 leading-relaxed">
          Съобщението не е изпратено. Изпращането през формата още не е налично.
          Пишете ни на{' '}
          <a
            className="text-main underline underline-offset-4"
            href="mailto:ruseffracing@gmail.com"
          >
            ruseffracing@gmail.com
          </a>{' '}
          или се обадете на{' '}
          <a
            className="text-main underline underline-offset-4"
            href="tel:+359882726020"
          >
            +359 88 272 6020
          </a>
          .
        </p>
      )}
      <p className="text-[10px] text-slate-500 text-center pt-1">
        Изпращайки това съобщение, Вие се съгласявате с нашата политика за
        поверителност.
      </p>
      <noscript>
        <p className="text-sm text-slate-300">
          За връзка използвайте телефона или имейла, посочени на страницата.
        </p>
      </noscript>
    </form>
  )
}

function FieldError({
  name,
  message,
}: {
  name: FieldName
  message: string | undefined
}) {
  return message ? (
    <p
      id={`${name}-error`}
      className="text-[10px] text-red-400 font-medium ml-1"
    >
      {message}
    </p>
  ) : null
}
