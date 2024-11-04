export function getValue<V>(fromGlobalState: V[], fromProps: V[]): V[] {
  if (fromGlobalState?.length) {
    return fromGlobalState
  }
  return fromProps
}
