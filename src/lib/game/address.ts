export const normalizeAddress = (address: string) => {
  const planetId = address.includes('(')
    ? address.split('(')[1].slice(0, -1)
    : address

  const [system, planet] = planetId.split('-')

  if (!system || !/^[A-Z]{2}$/.test(system)) return
  if (!planet || !/^[0-9]{3}[a-zA-Z]$/.test(planet)) return

  return `${system.toUpperCase()}-${planet.toLowerCase()}`
}
