export type OrderState =
  | 'active'
  | 'delayed'
  | 'delivered_not_received'
  | 'tracking_unavailable'

/** Demo-only presentation states beyond the order model itself. */
export type DemoState = OrderState | 'loading' | 'error'

export type StepStatus = 'completed' | 'current' | 'upcoming' | 'problem'

export type StatusTone = 'progress' | 'delay' | 'alert' | 'pending'

export type NoticeTone = 'info' | 'warning' | 'danger'

export type ActionId = 'details' | 'support' | 'issue'

export interface TrackingStep {
  id: string
  title: string
  detail: string
  timestamp: string | null
  status: StepStatus
}

export interface OrderItem {
  id: string
  name: string
  variant: string
  quantity: number
  price: number
  image: string
  imageAlt: string
}

export interface DeliveryWindow {
  label: string
  value: string
  note: string
  /** Previous promise shown struck through when the order is late. */
  previousValue?: string
  overdue?: boolean
}

export interface StatusNotice {
  tone: NoticeTone
  title: string
  body: string
}

export interface OrderAction {
  id: ActionId
  label: string
  variant: 'primary' | 'secondary'
}

export interface OrderStatus {
  headline: string
  summary: string
  tone: StatusTone
  badge: { label: string; icon: 'on-time' | 'delay' | 'alert' | 'pending' }
  /** e.g. "On schedule" / "Progress paused" for the progress bar. */
  progressLabel: string
}

export interface Order {
  id: string
  state: OrderState
  placedOn: string
  lastUpdated: string
  carrier: string
  trackingNumber: string | null
  address: string
  payment: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: OrderStatus
  delivery: DeliveryWindow
  notice?: StatusNotice
  timelineTitle: string
  timelineCaption?: string
  steps: TrackingStep[]
  actions: OrderAction[]
}
