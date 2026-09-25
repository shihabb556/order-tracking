import { CircleAlert, RefreshCw, Truck } from 'lucide-react'
import { cn, primaryButtonClass } from './ui'

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-slate-200/90', className)}
      aria-hidden="true"
    />
  )
}

export function OrderSkeleton() {
  return (
    <div
      className="space-y-4 px-4 pb-28 pt-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <p className="sr-only">Loading your order…</p>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Pulse className="h-10 w-10 rounded-xl" />
          <Pulse className="h-5 w-24 rounded-full" />
          <Pulse className="ml-auto h-4 w-16" />
        </div>
        <Pulse className="mt-4 h-7 w-40" />
        <Pulse className="mt-3 h-4 w-full" />
        <Pulse className="mt-2 h-4 w-3/5" />
        <Pulse className="mt-4 h-20 w-full rounded-xl" />
        <Pulse className="mt-4 h-2 w-full rounded-full" />
        <Pulse className="mt-4 h-11 w-full rounded-xl" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <Pulse className="h-5 w-32" />
        <div className="mt-4 space-y-4">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex gap-3">
              <Pulse className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Pulse className="h-4 w-1/2" />
                <Pulse className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <Pulse className="h-5 w-28" />
        <div className="mt-4 flex gap-3">
          <Pulse className="h-14 w-14 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Pulse className="h-4 w-3/4" />
            <Pulse className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface OrderErrorStateProps {
  onRetry: () => void
}

export function OrderErrorState({ onRetry }: OrderErrorStateProps) {
  return (
    <div className="px-4 pb-28 pt-6">
      <div
        role="alert"
        className="rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700">
          <CircleAlert className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-lg font-semibold text-slate-900">
          We could not load your order
        </h1>
        <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-slate-600">
          Something went wrong on our side. Your order is safe — please try
          again in a moment.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className={cn('mt-5 w-full sm:w-auto', primaryButtonClass)}
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Truck className="h-3.5 w-3.5" aria-hidden="true" />
          Error code: TRK-503
        </p>
      </div>
    </div>
  )
}
