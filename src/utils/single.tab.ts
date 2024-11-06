const _broadcastChanel = new globalThis.BroadcastChannel('singleTab')

export const SetUpSingleTab = () => {
  _broadcastChanel.addEventListener('message', (e) => {
    console.log(e)
  })
}

export const DispatchEventSingleTab = () => {
  _broadcastChanel.postMessage('hello babe, please close your others tabs!')
}
