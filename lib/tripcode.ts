import SHA256 from 'crypto-js/sha256'
import Hex from 'crypto-js/enc-hex'

// 输入：用户的秘密暗号 (比如 "i-love-apple")
// 输出：用户的公开 ID (比如 "User#a1b2")
export function generateTripcode(secret: string): string {
  if (!secret) return 'Anonymous'
  
  // 1. 生成哈希
  const hash = SHA256(secret).toString(Hex)
  
  // 2. 取前 6 位作为 ID (足够随机了)
  const id = hash.substring(0, 6).toUpperCase()
  
  // 3. 生成一个只有用户知道的签名 (用于鉴权，未来用)
  // 这里我们简化，只返回 ID 用于展示
  return `NOMAD-${id}`
}

// 模拟“签名”：实际发帖时，我们把暗号也发给后端，后端验证 hash 是否匹配 ID
// 这样别人就没法冒充这个 ID 发言