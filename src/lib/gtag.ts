export const GA_TRACKING_ID = process.env.GA_TRACKING_ID

export const event = ({
  action,
  category,
  label,
  value
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
    console.log('gtag event:::', action, category, label, value)
  }
}
