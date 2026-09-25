import { Check, ChevronDown, ChevronUp, CircleAlert, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { orderStates } from '../data/orders'
import type { DemoState } from '../types/order'
import { cn, focusRing } from './ui'

interface DemoStateSwitcherProps {
  value: DemoState
  onChange: (state: DemoState) => void
}

const extraOptions: { value: DemoState; label: string }[] = [
  { value: 'loading', label: 'Loading state' },
  { value: 'error', label: 'Error state' },
]

export default function DemoStateSwitcher({
  value,
  onChange,
}: DemoStateSwitcherProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const options: { value: DemoState; label: string }[] = [
    ...orderStates.map((state) => ({ value: state.value, label: state.label })),
    ...extraOptions,
  ]

  return (
    <div className="fixed bottom-4 right-3 z-40 flex flex-col items-end gap-2">
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close demo state menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 h-full w-full cursor-default bg-slate-900/20"
          />
          <div
            role="menu"
            aria-label="Demo order states"
            className="relative w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl"
          >
            <p className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Preview order state
            </p>
            {options.map((option) => {
              const selected = option.value === value
              const isException = option.value === 'error'
              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex min-h-10 w-full items-center gap-2 rounded-xl px-2.5 text-left text-sm transition',
                    selected
                      ? 'bg-slate-900 font-semibold text-white'
                      : 'text-slate-700 hover:bg-slate-100',
                    focusRing,
                  )}
                >
                  {isException ? (
                    <CircleAlert
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  ) : option.value === 'loading' ? (
                    <LoaderCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Check
                      className={cn(
                        'h-4 w-4 shrink-0',
                        selected ? 'opacity-100' : 'opacity-0',
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                </button>
              )
            })}
          </div>
        </>
      ) : null}

      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'flex min-h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-3 py-1.5',
          'text-xs font-semibold text-slate-600 shadow-md backdrop-blur transition hover:bg-white',
          focusRing,
        )}
      >
        Demo states
        {open ? (
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
