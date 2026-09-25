import {
  CircleCheckBig,
  Info,
  Package,
  Timer,
  TriangleAlert,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { ActionId, NoticeTone, Order, StatusTone } from '../types/order'
import { cn, primaryButtonClass, secondaryButtonClass } from './ui'

interface ToneStyles {
  border: string
  iconWrap: string
  badge: string
  bar: string
  notice: string
  noticeText: string
  noticeIcon: string
}

const tones: Record<StatusTone, ToneStyles> = {
  progress: {
    border: 'border-indigo-200',
    iconWrap: 'bg-indigo-600 text-white',
    badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    bar: 'bg-indigo-600',
    notice: 'border-slate-200 bg-slate-50',
    noticeText: 'text-slate-700',
    noticeIcon: 'text-slate-500',
  },
  delay: {
    border: 'border-amber-400',
    iconWrap: 'bg-amber-500 text-white',
    badge: 'bg-amber-100 text-amber-900 ring-amber-300',
    bar: 'bg-amber-500',
    notice: 'border-amber-200 bg-amber-50',
    noticeText: 'text-amber-950',
    noticeIcon: 'text-amber-600',
  },
  alert: {
    border: 'border-rose-400',
    iconWrap: 'bg-rose-600 text-white',
    badge: 'bg-rose-100 text-rose-900 ring-rose-300',
    bar: 'bg-rose-600',
    notice: 'border-rose-200 bg-rose-50',
    noticeText: 'text-rose-950',
    noticeIcon: 'text-rose-600',
  },
  pending: {
    border: 'border-slate-300',
    iconWrap: 'bg-slate-600 text-white',
    badge: 'bg-slate-100 text-slate-700 ring-slate-300',
    bar: 'bg-slate-500',
    notice: 'border-slate-200 bg-slate-50',
    noticeText: 'text-slate-700',
    noticeIcon: 'text-slate-500',
  },
}

const badgeIcons: Record<string, ComponentType<{ className?: string }>> = {
  'on-time': CircleCheckBig,
  delay: Timer,
  alert: TriangleAlert,
  pending: Package,
}

const noticeIcons: Record<NoticeTone, ComponentType<{ className?: string }>> = {
  info: Info,
  warning: Timer,
  danger: TriangleAlert,
}

interface StatusCardProps {
  order: Order
  onAction: (action: ActionId) => void
}

export default function StatusCard({ order, onAction }: StatusCardProps) {
  const { status, delivery, notice, actions, steps, lastUpdated } = order
  const tone = tones[status.tone]
  const BadgeIcon = badgeIcons[status.badge.icon] ?? Package
  const NoticeIcon = notice ? noticeIcons[notice.tone] : Info

  const completed = steps.filter((step) => step.status === 'completed').length
  const percent = Math.round((completed / steps.length) * 100)

  return (
    <section
      aria-labelledby="order-status-heading"
      className={cn('rounded-2xl border bg-white p-4 shadow-sm sm:p-5', tone.border)}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            tone.iconWrap,
          )}
        >
          <BadgeIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
            tone.badge,
          )}
        >
          <BadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {status.badge.label}
        </span>
        <span className="ml-auto text-xs text-slate-500">{lastUpdated}</span>
      </div>

      <div className="mt-3">
        <h1
          id="order-status-heading"
          className="text-[26px] font-bold leading-tight tracking-tight text-slate-900"
        >
          {status.headline}
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
          {status.summary}
        </p>
      </div>

      <div
        className={cn(
          'mt-4 rounded-xl border p-3',
          delivery.overdue ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50',
        )}
      >
        <p className={cn('text-[11px] font-semibold uppercase tracking-wider', delivery.overdue ? 'text-rose-700' : 'text-slate-500')}>
          {delivery.label}
        </p>
        <p
          className={cn(
            'mt-1 flex items-start gap-1.5 text-lg font-semibold leading-snug text-slate-900',
          )}
        >
          {delivery.overdue ? (
            <TriangleAlert
              className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
              aria-hidden="true"
            />
          ) : null}
          <span className="min-w-0 break-words">{delivery.value}</span>
        </p>
        {delivery.previousValue ? (
          <p className="mt-1 text-xs text-slate-500 line-through">
            {delivery.previousValue}
          </p>
        ) : null}
        <p className="mt-1 text-xs leading-relaxed text-slate-600">
          {delivery.note}
        </p>
      </div>

      {notice ? (
        <div
          className={cn('mt-3 rounded-xl border p-3', tone.notice)}
          role={notice.tone === 'info' ? undefined : 'note'}
        >
          <p
            className={cn(
              'flex items-center gap-1.5 text-sm font-semibold',
              tone.noticeText,
            )}
          >
            <NoticeIcon
              className={cn('h-4 w-4 shrink-0', tone.noticeIcon)}
              aria-hidden="true"
            />
            {notice.title}
          </p>
          <p className={cn('mt-1 text-[13px] leading-relaxed', tone.noticeText)}>
            {notice.body}
          </p>
        </div>
      ) : null}

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-xs font-semibold text-slate-700">
            {status.progressLabel}
          </span>
          <span className="text-xs tabular-nums text-slate-500">
            {completed} of {steps.length} steps completed
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Delivery progress"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={steps.length}
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        >
          <div
            className={cn('h-full rounded-full', tone.bar)}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction(action.id)}
            className={cn(
              'w-full',
              action.variant === 'primary' ? primaryButtonClass : secondaryButtonClass,
            )}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  )
}
