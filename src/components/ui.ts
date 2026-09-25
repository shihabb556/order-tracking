export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

export const cardClass = 'rounded-2xl border border-slate-200 bg-white shadow-sm'

export const sectionTitleClass =
  'text-[11px] font-semibold uppercase tracking-wider text-slate-500'

export const primaryButtonClass = cn(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4',
  'text-sm font-semibold text-white transition hover:bg-slate-800',
  'active:bg-slate-700 disabled:opacity-50',
  focusRing,
)

export const secondaryButtonClass = cn(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4',
  'text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50',
  'active:bg-slate-100 disabled:opacity-50',
  focusRing,
)

export const iconButtonClass = cn(
  'flex h-10 w-10 items-center justify-center rounded-full text-slate-600',
  'transition hover:bg-slate-100 hover:text-slate-900',
  focusRing,
)
