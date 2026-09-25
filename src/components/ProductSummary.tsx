import { ChevronRight } from 'lucide-react'
import { formatMoney } from '../data/orders'
import type { Order } from '../types/order'
import { cardClass, cn, secondaryButtonClass, sectionTitleClass } from './ui'

interface ProductSummaryProps {
  order: Order
  onViewDetails: () => void
}

export default function ProductSummary({
  order,
  onViewDetails,
}: ProductSummaryProps) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <section
      aria-labelledby="order-summary-heading"
      className={cn(cardClass, 'p-4 sm:p-5')}
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="order-summary-heading"
          className="text-base font-semibold text-slate-900"
        >
          Your order
        </h2>
        <span className="text-xs text-slate-500">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <ul className="mt-3 space-y-3">
        {order.items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.imageAlt}
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-xl border border-slate-100 bg-slate-50 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-snug text-slate-900">
                {item.name}
              </p>
              <p className="truncate text-xs text-slate-500">{item.variant}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Qty {item.quantity}
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
              {formatMoney(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-1.5 border-t border-dashed border-slate-200 pt-3 text-sm">
        <div className="flex justify-between gap-3 text-slate-600">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">${order.subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between gap-3 text-slate-600">
          <dt>Shipping</dt>
          <dd>{formatMoney(order.shipping)}</dd>
        </div>
        <div className="flex justify-between gap-3 pt-1 text-base font-semibold text-slate-900">
          <dt>Total</dt>
          <dd className="tabular-nums">${order.total.toFixed(2)}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onViewDetails}
        className={cn('mt-4 w-full', secondaryButtonClass)}
      >
        View order details
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>

      <p className={cn('mt-3 text-center', sectionTitleClass)}>
        Placed {order.placedOn}
      </p>
    </section>
  )
}
