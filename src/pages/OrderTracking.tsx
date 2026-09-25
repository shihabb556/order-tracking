import { useEffect, useState } from 'react'
import ContactSupportModal from '../components/ContactSupportModal'
import DemoStateSwitcher from '../components/DemoStateSwitcher'
import IssueReportModal from '../components/IssueReportModal'
import OrderDetailsModal from '../components/OrderDetailsModal'
import OrderHeader from '../components/OrderHeader'
import ProductSummary from '../components/ProductSummary'
import { OrderErrorState, OrderSkeleton } from '../components/ScreenStates'
import StatusCard from '../components/StatusCard'
import SupportCard from '../components/SupportCard'
import TrackingTimeline from '../components/TrackingTimeline'
import { getOrder, orderStates } from '../data/orders'
import type { ActionId, DemoState, OrderState } from '../types/order'

const LOAD_TIME_MS = 650

function resolveOrderState(demo: DemoState): OrderState {
  return demo === 'loading' || demo === 'error' ? 'active' : demo
}

export default function OrderTracking() {
  const [demoState, setDemoState] = useState<DemoState>('active')
  const [loadKey, setLoadKey] = useState(0)
  const [resolved, setResolved] = useState<{ key: number; state: DemoState } | null>(
    null,
  )
  const [activeModal, setActiveModal] = useState<ActionId | null>(null)

  useEffect(() => {
    if (demoState === 'loading') return
    const timer = window.setTimeout(
      () => setResolved({ key: loadKey, state: demoState }),
      LOAD_TIME_MS,
    )
    return () => window.clearTimeout(timer)
  }, [demoState, loadKey])

  const isLoaded = resolved !== null && resolved.key === loadKey && resolved.state === demoState

  const screen: 'loading' | 'ready' | 'error' = isLoaded
    ? demoState === 'error'
      ? 'error'
      : 'ready'
    : 'loading'

  const order = getOrder(resolveOrderState(demoState))
  const activeStateLabel =
    orderStates.find((state) => state.value === resolveOrderState(demoState))
      ?.label ?? 'Order'

  const handleAction = (action: ActionId) => setActiveModal(action)

  const handleDemoChange = (next: DemoState) => {
    setResolved(null)
    setDemoState(next)
    setLoadKey((key) => key + 1)
  }

  return (
    <div className="min-h-svh bg-slate-100">
      <div className="relative mx-auto min-h-svh w-full max-w-[430px] bg-white shadow-[0_0_50px_rgba(15,23,42,0.10)]">
        <OrderHeader
          orderId={order.id}
          onContactSupport={() => setActiveModal('support')}
        />

        <p aria-live="polite" className="sr-only">
          {screen === 'loading'
            ? 'Loading order information'
            : screen === 'error'
              ? 'Order information failed to load'
              : `Showing ${activeStateLabel} state`}
        </p>

        {screen === 'loading' ? <OrderSkeleton /> : null}

        {screen === 'error' ? (
          <OrderErrorState onRetry={() => handleDemoChange('active')} />
        ) : null}

        {screen === 'ready' ? (
          <main className="space-y-4 px-4 pb-28 pt-4">
            <StatusCard order={order} onAction={handleAction} />

            <TrackingTimeline
              title={order.timelineTitle}
              caption={order.timelineCaption}
              steps={order.steps}
            />

            <ProductSummary
              order={order}
              onViewDetails={() => setActiveModal('details')}
            />

            <SupportCard
              orderId={order.id}
              onContactSupport={() => setActiveModal('support')}
              onReportIssue={() => setActiveModal('issue')}
            />

            <p className="pb-2 text-center text-xs leading-relaxed text-slate-500">
              Northwind Store · Prototype demo with mock data
            </p>
          </main>
        ) : null}

        <DemoStateSwitcher value={demoState} onChange={handleDemoChange} />

        {activeModal === 'details' ? (
          <OrderDetailsModal
            order={order}
            open
            onClose={() => setActiveModal(null)}
          />
        ) : null}

        {activeModal === 'support' ? (
          <ContactSupportModal
            orderId={order.id}
            open
            onClose={() => setActiveModal(null)}
          />
        ) : null}

        {activeModal === 'issue' ? (
          <IssueReportModal
            orderId={order.id}
            open
            suggestedReason={
              order.state === 'delivered_not_received'
                ? 'not_received'
                : undefined
            }
            onClose={() => setActiveModal(null)}
          />
        ) : null}
      </div>
    </div>
  )
}
