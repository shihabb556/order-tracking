import { Clock3, LifeBuoy, TriangleAlert } from 'lucide-react'
import { cardClass, cn, primaryButtonClass, secondaryButtonClass } from './ui'

interface SupportCardProps {
  orderId: string
  onContactSupport: () => void
  onReportIssue: () => void
}

export default function SupportCard({
  orderId,
  onContactSupport,
  onReportIssue,
}: SupportCardProps) {
  return (
    <section
      aria-labelledby="support-heading"
      className={cn(cardClass, 'p-4 sm:p-5')}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
          <LifeBuoy className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 id="support-heading" className="text-base font-semibold text-slate-900">
            Need help with this order?
          </h2>
          <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
            Our support team replies in about 2 minutes, 24/7.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onContactSupport}
          className={cn('w-full', primaryButtonClass)}
        >
          Contact support
        </button>
        <button
          type="button"
          onClick={onReportIssue}
          className={cn('w-full', secondaryButtonClass)}
        >
          <TriangleAlert className="h-4 w-4" aria-hidden="true" />
          Report an issue
        </button>
      </div>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
        Order #{orderId} will be attached to your request automatically
      </p>
    </section>
  )
}
