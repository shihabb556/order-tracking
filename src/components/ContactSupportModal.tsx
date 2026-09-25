import {
  ArrowLeft,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import { cn, focusRing, primaryButtonClass, secondaryButtonClass } from './ui'

interface ContactSupportModalProps {
  open: boolean
  orderId: string
  onClose: () => void
}

type View = 'options' | 'connecting' | 'connected'

interface Channel {
  id: string
  label: string
  detail: string
  icon: typeof MessageCircle
  href?: string
}

const channels: Channel[] = [
  {
    id: 'chat',
    label: 'Start live chat',
    detail: 'Fastest · average reply 2 min',
    icon: MessageCircle,
  },
  {
    id: 'call',
    label: 'Call +1 (800) 555-0142',
    detail: '24/7 · toll free',
    icon: Phone,
    href: 'tel:+18005550142',
  },
  {
    id: 'email',
    label: 'Email help@northwind.store',
    detail: 'Replies within 4 hours',
    icon: Mail,
    href: 'mailto:help@northwind.store?subject=Order%20support',
  },
]

export default function ContactSupportModal({
  open,
  orderId,
  onClose,
}: ContactSupportModalProps) {
  const [view, setView] = useState<View>('options')

  useEffect(() => {
    if (view !== 'connecting') return
    const timer = window.setTimeout(() => setView('connected'), 1200)
    return () => window.clearTimeout(timer)
  }, [view])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={view === 'options' ? 'Contact support' : 'Live chat'}
      subtitle={`Order #${orderId} · available 24/7`}
    >
      {view === 'options' ? (
        <>
          <ul className="space-y-2">
            {channels.map((channel) => {
              const Icon = channel.icon
              const content = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-sm font-semibold text-slate-900">
                      {channel.label}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {channel.detail}
                    </span>
                  </span>
                </>
              )

              return (
                <li key={channel.id}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className={cn(
                        'flex min-h-14 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 transition hover:border-slate-300 hover:bg-slate-50',
                        focusRing,
                      )}
                    >
                      {content}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setView('connecting')}
                      className={cn(
                        'flex min-h-14 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 transition hover:border-slate-300 hover:bg-slate-50',
                        focusRing,
                      )}
                    >
                      {content}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>

          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
            Prototype demo — no real message is sent. Your order number and
            delivery status are attached automatically.
          </p>

          <button
            type="button"
            onClick={onClose}
            className={cn('mt-4 w-full', secondaryButtonClass)}
          >
            Cancel
          </button>
        </>
      ) : null}

      {view === 'connecting' ? (
        <div className="flex flex-col items-center px-2 py-8 text-center">
          <LoaderCircle
            className="h-8 w-8 animate-spin text-indigo-600"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm font-semibold text-slate-900">
            Connecting you to an agent…
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Typical wait time is under 2 minutes.
          </p>
          <button
            type="button"
            onClick={() => setView('options')}
            className={cn('mt-6 w-full', secondaryButtonClass)}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to contact options
          </button>
        </div>
      ) : null}

      {view === 'connected' ? (
        <div className="flex flex-col items-center px-2 py-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-base font-bold text-white">
            M
          </span>
          <p className="mt-3 text-sm font-semibold text-slate-900">
            Maya from Northwind is joining the chat
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Chat started for order #{orderId}. This is a prototype, so no
            conversation is actually created.
          </p>
          <button
            type="button"
            onClick={onClose}
            className={cn('mt-6 w-full', primaryButtonClass)}
          >
            Got it
          </button>
        </div>
      ) : null}
    </Modal>
  )
}
