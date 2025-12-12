// Simple deterministic "tripcode" generator for display names.
// This is intentionally lightweight and client-safe — it's not
// cryptographically secure and is meant only to produce a stable
// short identifier from a secret passphrase.

export function generateTripcode(secret: string): string {
  // djb2-like hash
  let h = 5381
  for (let i = 0; i < secret.length; i++) {
    h = (h * 33) ^ secret.charCodeAt(i)
  }
  // make positive and encode
  const code = (h >>> 0).toString(36).slice(-6).toUpperCase()
  return `GUEST-${code}`
}

export default generateTripcode
