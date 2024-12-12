export const GA_TRACKING_ID = process.env.GA_TRACKING_ID

export interface GAEventProps {
  event_category: string
  event_label?: string
  value?: number
  search_term?: string
}

export const event = (action: string, props: GAEventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, props)
  }
}
