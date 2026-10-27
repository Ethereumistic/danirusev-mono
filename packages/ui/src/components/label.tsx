import { cn } from '@danirusev/ui/lib/utils'
import type { ComponentProps } from 'react'

export function Label({
  className,
  htmlFor,
  children,
  ...props
}: ComponentProps<'label'> & { htmlFor: string }) {
  return (
    <label
      data-slot="label"
      htmlFor={htmlFor}
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
