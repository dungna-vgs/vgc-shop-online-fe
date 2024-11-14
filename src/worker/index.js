'use client'
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/worker.js').catch(console.error)
}
