import { Check, Copy, MapPin, Truck } from 'lucide-react'
import { useState } from 'react'
import { formatMoney } from '../data/orders'
import type { Order } from '../types/order'
import Modal from './Modal'
import { cn, focusRing, secondaryButtonClass } from './ui'

interface OrderDetailsModalProps {
  order: Order
  open: boolean
  onClose: () => void
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-500 sm:w-36">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-sm text-slate-900">{value}</dd>
    </div>
  )
}

export default function OrderDetailsModal({
  order,
  open,
  onClose,
}: OrderDetailsModalProps) {
  const [copied, setCopied] = useState(false)

  const copyTracking = async () => {
    if (!order.trackingNumber) return
    try {
      await navigator.clipboard.writeText(order.trackingNumber)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Order details"
      subtitle={`#${order.id} · ${order.status.headline}`}
    >
      <ul className="space-y-3">
        {order.items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.imageAlt}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-lg border border-slate-100 bg-slate-50 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {item.name}
              </p>
              <p className="truncate text-xs text-slate-500">
                {item.variant} · Qty {item.quantity}
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
              {formatMoney(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <dl className="mt-4 divide-y divide-slate-100 border-y border-slate-100">
        <DetailRow label="Order number" value={`#${order.id}`} />
        <DetailRow label="Placed on" value={order.placedOn} />
        <DetailRow label="Carrier" value={order.carrier} />
        <DetailRow
          label="Tracking"
          value={order.trackingNumber ?? 'Not assigned yet'}
        />
        <DetailRow label="Payment" value={order.payment} />
      </dl>

      <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
        <MapPin
          className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Delivering to
          </p>
          <p className="mt-0.5 break-words text-sm text-slate-900">
            {order.address}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-1.5 text-sm">
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

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        {order.trackingNumber ? (
          <button
            type="button"
            onClick={copyTracking}
            className={cn('w-full', secondaryButtonClass)}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? 'Copied' : 'Copy tracking number'}
          </button>
        ) : null}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800',
            focusRing,
          )}
        >
          Done
        </button>
      </div>

      {order.trackingNumber ? (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Truck className="h-3.5 w-3.5" aria-hidden="true" />
          Track this number on the carrier website for raw scan events
        </p>
      ) : null}
    </Modal>
  )
}
