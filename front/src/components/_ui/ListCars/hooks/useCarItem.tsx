export function useCarItem() {
  function formatTransmissionType(type: string) {
    if (type === 'automatic') return 'Automático'
    return 'Manual'
  }

  return {
    formatTransmissionType,
  }
}
