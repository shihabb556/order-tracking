import { ArrowLeft, LifeBuoy } from 'lucide-react'
import { focusRing } from './ui'

interface OrderHeaderProps {
  orderId: string
  onContactSupport: () => void
}

export default function OrderHeader({
  orderId,
  onContactSupport,
}: OrderHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[430px] items-center gap-2 px-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          aria-label="Back to orders"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${focusRing}`}
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold leading-tight text-slate-900">
            Track order
          </p>
          <p className="truncate text-xs leading-tight text-slate-500">
            Order #{orderId}
          </p>
        </div>

        <button
          type="button"
          onClick={onContactSupport}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${focusRing}`}
        >
          <LifeBuoy className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Contact support</span>
        </button>
      </div>
    </header>
  )
}
