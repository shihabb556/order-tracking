import headphonesImg from '../assets/headphones.svg'
import phoneCaseImg from '../assets/phone-case.svg'
import type { Order, OrderState, TrackingStep } from '../types/order'

const items = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Wireless Headphones',
    variant: 'Matte Black · Over-ear',
    quantity: 1,
    price: 189,
    image: headphonesImg,
    imageAlt: 'Aurora wireless over-ear headphones in matte black',
  },
  {
    id: 'aegis-phone-case',
    name: 'Aegis Drop-Proof Case',
    variant: 'Sage Green · iPhone 15',
    quantity: 1,
    price: 34.5,
    image: phoneCaseImg,
    imageAlt: 'Aegis protective phone case in sage green',
  },
]

const shared = {
  id: 'OS-48219',
  placedOn: 'Sat, 20 Sep 2026 · 9:14 AM',
  lastUpdated: 'Updated 5 min ago',
  carrier: 'Northwind Express',
  trackingNumber: 'NW-7749-2210-88',
  address: '1428 Maple Ridge Ave, Apt 4B, Denver, CO 80211',
  payment: 'Visa ending in 4417',
  items,
  subtotal: 223.5,
  shipping: 0,
  total: 223.5,
}

const baseSteps: TrackingStep[] = [
  {
    id: 'placed',
    title: 'Order placed',
    detail: 'Payment confirmed',
    timestamp: 'Sat, 20 Sep · 9:14 AM',
    status: 'completed',
  },
  {
    id: 'shipped',
    title: 'Packed & shipped',
    detail: 'Northgate fulfilment centre',
    timestamp: 'Sun, 21 Sep · 3:40 PM',
    status: 'completed',
  },
  {
    id: 'transit',
    title: 'In transit',
    detail: 'Regional hub · Denver, CO',
    timestamp: 'Tue, 23 Sep · 7:12 AM',
    status: 'completed',
  },
  {
    id: 'out',
    title: 'Out for delivery',
    detail: 'Rider Alex · 4 stops away',
    timestamp: 'Today · 8:30 AM',
    status: 'current',
  },
  {
    id: 'delivered',
    title: 'Delivered',
    detail: 'Left at your front door',
    timestamp: 'Today · by 9:00 PM',
    status: 'upcoming',
  },
]

type StepPatch = Partial<TrackingStep> & { id: string }

function buildSteps(patches: StepPatch[]): TrackingStep[] {
  return baseSteps.map((step) => ({
    ...step,
    ...patches.find((patch) => patch.id === step.id),
  }))
}

const active: Order = {
  ...shared,
  state: 'active',
  lastUpdated: 'Updated 5 min ago',
  status: {
    headline: 'Out for delivery',
    summary:
      'Your rider Alex has your package and is making their way to you right now.',
    tone: 'progress',
    badge: { label: 'On schedule', icon: 'on-time' },
    progressLabel: 'Almost there',
  },
  delivery: {
    label: 'Estimated delivery',
    value: 'Today, 6:00 PM – 9:00 PM',
    note: 'Rider is currently 4 stops away',
  },
  timelineTitle: 'Delivery progress',
  timelineCaption: 'Live updates from Northwind Express',
  steps: buildSteps([]),
  actions: [
    { id: 'support', label: 'Contact support', variant: 'primary' },
    { id: 'details', label: 'View order details', variant: 'secondary' },
  ],
}

const delayed: Order = {
  ...shared,
  state: 'delayed',
  lastUpdated: 'Updated 12 min ago',
  status: {
    headline: 'Delivery delayed',
    summary:
      'Severe weather along the route has held your package at the regional hub.',
    tone: 'delay',
    badge: { label: 'Running late', icon: 'delay' },
    progressLabel: 'Progress paused',
  },
  delivery: {
    label: 'New estimated delivery',
    value: 'Tomorrow, 26 Sep · by 9:00 PM',
    previousValue: 'Was due today, 6:00 PM – 9:00 PM',
    note: 'Weather hold at Denver regional hub',
    overdue: true,
  },
  notice: {
    tone: 'warning',
    title: 'What happens next?',
    body: 'No action is needed — your package resumes as soon as the weather clears. Want a hand sooner? Our team can prioritise a redelivery or refund the shipping fee.',
  },
  timelineTitle: 'Delivery progress',
  timelineCaption: 'Last scan 47 minutes ago',
  steps: buildSteps([
    {
      id: 'transit',
      detail: 'Held at regional hub · weather delay',
      timestamp: 'Today · 6:05 AM',
      status: 'problem',
    },
    {
      id: 'out',
      detail: 'Rescheduled once the route reopens',
      timestamp: 'New ETA tomorrow',
      status: 'upcoming',
    },
    {
      id: 'delivered',
      detail: 'Left at your front door',
      timestamp: 'Tomorrow · by 9:00 PM',
      status: 'upcoming',
    },
  ]),
  actions: [
    { id: 'support', label: 'Contact support', variant: 'primary' },
    { id: 'issue', label: 'Report a delivery issue', variant: 'secondary' },
  ],
}

const deliveredNotReceived: Order = {
  ...shared,
  state: 'delivered_not_received',
  lastUpdated: 'Updated just now',
  status: {
    headline: 'Marked as delivered',
    summary:
      'The carrier closed this delivery, but we have not heard back from you.',
    tone: 'alert',
    badge: { label: 'Action needed', icon: 'alert' },
    progressLabel: 'Delivery disputed',
  },
  delivery: {
    label: 'Carrier marked delivered',
    value: 'Today, 2:14 PM',
    note: 'Photo proof: package left at front door',
    overdue: true,
  },
  notice: {
    tone: 'danger',
    title: 'Did not receive your order?',
    body: 'Check with neighbours and building concierge first. Still missing? Report it below and we will ship a replacement or refund you in full within 24 hours.',
  },
  timelineTitle: 'Delivery progress',
  timelineCaption: 'Final scan recorded by the carrier',
  steps: buildSteps([
    {
      id: 'out',
      detail: 'Completed by rider Alex',
      timestamp: 'Today · 12:10 PM',
      status: 'completed',
    },
    {
      id: 'delivered',
      detail: 'Marked delivered — reported as not received',
      timestamp: 'Today · 2:14 PM',
      status: 'problem',
    },
  ]),
  actions: [
    { id: 'issue', label: 'Report order missing', variant: 'primary' },
    { id: 'support', label: 'Contact support', variant: 'secondary' },
  ],
}

const trackingUnavailable: Order = {
  ...shared,
  state: 'tracking_unavailable',
  lastUpdated: 'Updated 22 min ago',
  carrier: 'Not yet assigned',
  trackingNumber: null,
  status: {
    headline: 'Preparing your order',
    summary:
      'Your order is confirmed and being packed. Carrier tracking switches on at the first scan.',
    tone: 'pending',
    badge: { label: 'Not shipped yet', icon: 'pending' },
    progressLabel: 'Order confirmed',
  },
  delivery: {
    label: 'Estimated delivery',
    value: 'Sat, 26 Sep – Sun, 27 Sep',
    note: "We'll notify you the moment tracking goes live",
  },
  notice: {
    tone: 'info',
    title: 'Tracking is not available yet',
    body: 'This is normal for the first 24 hours after an order is placed. Everything is on track — tracking appears automatically after the carrier scans your parcel.',
  },
  timelineTitle: 'What to expect',
  timelineCaption: 'Estimated milestones — tracking activates after the first carrier scan',
  steps: buildSteps([
    {
      id: 'shipped',
      detail: 'Packing in progress at Northgate centre',
      timestamp: 'Expected today',
      status: 'current',
    },
    {
      id: 'transit',
      detail: 'Tracking starts here',
      timestamp: null,
      status: 'upcoming',
    },
    { id: 'out', detail: 'Pending', timestamp: null, status: 'upcoming' },
    {
      id: 'delivered',
      detail: 'Signature not required',
      timestamp: null,
      status: 'upcoming',
    },
  ]),
  actions: [
    { id: 'support', label: 'Contact support', variant: 'primary' },
    { id: 'details', label: 'View order details', variant: 'secondary' },
  ],
}

const orders: Record<OrderState, Order> = {
  active,
  delayed,
  delivered_not_received: deliveredNotReceived,
  tracking_unavailable: trackingUnavailable,
}

export const orderStates: { value: OrderState; label: string; short: string }[] =
  [
    { value: 'active', label: 'Active delivery', short: 'Active' },
    { value: 'delayed', label: 'Delayed order', short: 'Delayed' },
    {
      value: 'delivered_not_received',
      label: 'Delivered, not received',
      short: 'Missing',
    },
    {
      value: 'tracking_unavailable',
      label: 'Tracking unavailable',
      short: 'No tracking',
    },
  ]

export function getOrder(state: OrderState): Order {
  return orders[state]
}

export function formatMoney(value: number): string {
  return value === 0 ? 'Free' : `$${value.toFixed(2)}`
}
