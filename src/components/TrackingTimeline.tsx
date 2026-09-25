import { Check, Clock3, Truck, TriangleAlert } from 'lucide-react'
import type { ComponentType } from 'react'
import type { TrackingStep } from '../types/order'
import { cn } from './ui'

const stepIcons: Record<
  TrackingStep['status'],
  { icon: ComponentType<{ className?: string }>; label: string }
> = {
  completed: { icon: Check, label: 'Completed step' },
  current: { icon: Truck, label: 'Current step' },
  upcoming: { icon: Clock3, label: 'Upcoming step' },
  problem: { icon: TriangleAlert, label: 'Problem step' },
}

const markerStyles: Record<TrackingStep['status'], string> = {
  completed: 'bg-indigo-600 text-white ring-indigo-600',
  current: 'bg-white text-indigo-700 ring-2 ring-indigo-600',
  upcoming: 'bg-white text-slate-400 ring-2 ring-slate-300',
  problem: 'bg-white text-rose-700 ring-2 ring-rose-500',
}

interface TrackingTimelineProps {
  title: string
  caption?: string
  steps: TrackingStep[]
}

export default function TrackingTimeline({
  title,
  caption,
  steps,
}: TrackingTimelineProps) {
  return (
    <section
      aria-labelledby="tracking-timeline-heading"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="tracking-timeline-heading"
          className="text-base font-semibold text-slate-900"
        >
          {title}
        </h2>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
          {steps.filter((step) => step.status === 'completed').length}/
          {steps.length}
        </span>
      </div>
      {caption ? (
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{caption}</p>
      ) : null}

      <ol className="mt-4">
        {steps.map((step, index) => {
          const { icon: StepIcon, label } = stepIcons[step.status]
          const isLast = index === steps.length - 1
          const next = steps[index + 1]
          const connectorClass = !next
            ? ''
            : next.status === 'problem'
              ? 'bg-rose-400'
              : next.status === 'completed' || next.status === 'current'
                ? 'bg-indigo-600'
                : 'bg-slate-200'

          return (
            <li key={step.id} className="relative flex gap-3 pb-5 last:pb-0">
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 rounded-full',
                    connectorClass,
                  )}
                />
              ) : null}

              <span
                aria-hidden="true"
                className={cn(
                  'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-offset-2 ring-offset-white',
                  markerStyles[step.status],
                )}
              >
                <StepIcon className="h-4 w-4" />
              </span>

              <div
                className={cn(
                  'min-w-0 flex-1 rounded-lg px-1 py-0.5',
                  step.status === 'current' && 'bg-indigo-50',
                  step.status === 'problem' && 'bg-rose-50',
                )}
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p
                    className={cn(
                      'text-sm text-slate-900',
                      (step.status === 'current' || step.status === 'problem') &&
                        'font-semibold',
                      step.status === 'upcoming' && 'font-medium text-slate-600',
                    )}
                  >
                    {step.title}
                  </p>
                  {step.status === 'current' ? (
                    <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      Now
                    </span>
                  ) : null}
                  {step.status === 'problem' ? (
                    <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      Issue
                    </span>
                  ) : null}
                </div>
                <p
                  className={cn(
                    'mt-0.5 text-[13px] leading-relaxed',
                    step.status === 'problem' ? 'text-rose-800' : 'text-slate-500',
                  )}
                >
                  {step.detail}
                </p>
                {step.timestamp ? (
                  <p className="mt-1 text-xs text-slate-500">{step.timestamp}</p>
                ) : null}
                <span className="sr-only">{label}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
