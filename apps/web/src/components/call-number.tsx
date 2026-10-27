import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/** The booking line shown wherever online booking or accounts are paused. */
export const PHONE = '+359882726020'
export const PHONE_LABEL = '+359 882726020'

export function CopyNumber({ number }: { number: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(number)
    } catch {
      // Clipboard API unavailable (insecure context): the legacy textarea fallback.
      const area = document.createElement('textarea')
      area.value = number
      area.setAttribute('readonly', '')
      area.style.position = 'absolute'
      area.style.left = '-9999px'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Копирай номера"
      className="flex items-center justify-center w-14 h-full min-h-[60px] rounded-xl bg-slate-800 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all shrink-0"
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-400" />
      ) : (
        <Copy className="w-5 h-5" />
      )}
    </button>
  )
}
