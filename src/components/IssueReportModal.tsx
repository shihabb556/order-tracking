import { CircleCheckBig, Send, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import Modal from './Modal'
import { cn, focusRing, primaryButtonClass, secondaryButtonClass } from './ui'

interface IssueReportModalProps {
  open: boolean
  orderId: string
  suggestedReason?: string
  onClose: () => void
}

const reasons = [
  { id: 'not_received', label: 'I did not receive my order' },
  { id: 'damaged', label: 'Order arrived damaged' },
  { id: 'wrong_items', label: 'Wrong or missing items' },
  { id: 'instructions', label: 'Delivery instructions not followed' },
]

export default function IssueReportModal({
  open,
  orderId,
  suggestedReason,
  onClose,
}: IssueReportModalProps) {
  const [reason, setReason] = useState(suggestedReason ?? '')
  const [details, setDetails] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!reason) {
      setError('Please choose what went wrong so we can route your report.')
      return
    }
    setError(null)
    setReference(`WR-${Math.floor(10000 + Math.random() * 90000)}`)
  }

  if (reference) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        title="Report submitted"
        subtitle={`Order #${orderId}`}
      >
        <div className="flex flex-col items-center px-2 py-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CircleCheckBig className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-4 text-base font-semibold text-slate-900">
            Thanks — we are on it
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            A delivery specialist will review your report and email you within
            2 hours. Your replacement or refund is guaranteed within 24 hours.
          </p>
          <p className="mt-4 rounded-xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900">
            Reference {reference}
          </p>
          <button
            type="button"
            onClick={onClose}
            className={cn('mt-6 w-full', primaryButtonClass)}
          >
            Done
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Report a delivery issue"
      subtitle={`Order #${orderId} · we reply within 2 hours`}
    >
      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="border-0 p-0">
          <legend className="text-sm font-semibold text-slate-900">
            What went wrong?
          </legend>
          <div className="mt-3 space-y-2">
            {reasons.map((option) => {
              const selected = reason === option.id
              return (
                <label
                  key={option.id}
                  className={cn(
                    'flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border p-3 transition',
                    selected
                      ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
                      : 'border-slate-200 bg-white hover:border-slate-300',
                  )}
                >
                  <input
                    type="radio"
                    name="issue-reason"
                    value={option.id}
                    checked={selected}
                    onChange={() => {
                      setReason(option.id)
                      setError(null)
                    }}
                    className={cn(
                      'h-4 w-4 shrink-0 accent-indigo-600',
                      focusRing,
                    )}
                  />
                  <span
                    className={cn(
                      'min-w-0 text-sm',
                      selected
                        ? 'font-semibold text-indigo-900'
                        : 'text-slate-700',
                    )}
                  >
                    {option.label}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-4">
          <label
            htmlFor="issue-details"
            className="text-sm font-semibold text-slate-900"
          >
            Anything else we should know?{' '}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <textarea
            id="issue-details"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={3}
            maxLength={400}
            placeholder="Where did you look? Any photos or notes help."
            className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-1 text-right text-xs tabular-nums text-slate-400">
            {details.length}/400
          </p>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-2 flex items-start gap-1.5 rounded-lg bg-rose-50 p-2.5 text-xs font-medium text-rose-800"
          >
            <TriangleAlert
              className="mt-px h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            className={cn('w-full', primaryButtonClass)}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Submit report
          </button>
          <button
            type="button"
            onClick={onClose}
            className={cn('w-full', secondaryButtonClass)}
          >
            Cancel
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          Prototype demo — no report is actually filed.
        </p>
      </form>
    </Modal>
  )
}
