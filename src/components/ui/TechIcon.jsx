import {
  SiDjango,
  SiDocker,
  SiFastify,
  SiIpfs,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRust,
  SiSolana,
  SiSolidity,
  SiTypescript,
} from "react-icons/si"
import { FaAws } from "react-icons/fa"

const CHAIN_ICON_SIZE = 12

const techIconMap = {
  rust: { Icon: SiRust, color: "var(--color-text)" },
  solana: { Icon: SiSolana, color: "#14f195" },
  "solana rpc": { Icon: SiSolana, color: "#14f195" },
  base: { src: "https://www.base.org/favicon.ico" },
  typescript: { Icon: SiTypescript, color: "#3178c6" },
  postgres: { Icon: SiPostgresql, color: "#336791" },
  postgresql: { Icon: SiPostgresql, color: "#336791" },
  pgvector: { Icon: SiPostgresql, color: "#336791" },
  redis: { Icon: SiRedis, color: "#ff4438" },
  docker: { Icon: SiDocker, color: "#2496ed" },
  fastify: { Icon: SiFastify, color: "var(--color-text)" },
  react: { Icon: SiReact, color: "#61dafb" },
  "next.js": { Icon: SiNextdotjs, color: "var(--color-text)" },
  django: { Icon: SiDjango, color: "#44b78b" },
  aws: { Icon: FaAws, color: "#ff9900" },
  ai: { Icon: SiOpenai, color: "var(--color-text)" },
  "ai agents": { Icon: SiOpenai, color: "var(--color-text)" },
  solidity: { Icon: SiSolidity, color: "var(--color-text)" },
  ipfs: { Icon: SiIpfs, color: "#65c2cb" },
}

function resolveIcon(label) {
  const normalized = String(label).trim().toLowerCase()
  return techIconMap[normalized] || null
}

export default function TechIcon({ label, size = 11 }) {
  const match = resolveIcon(label)
  if (!match) {
    return null
  }

  const { Icon, color } = match

  if (match.src) {
    return (
      <img
        src={match.src}
        alt=""
        width={CHAIN_ICON_SIZE}
        height={CHAIN_ICON_SIZE}
        style={{ flexShrink: 0, display: "block", objectFit: "contain" }}
      />
    )
  }

  return <Icon aria-hidden="true" size={size} color={color} style={{ flexShrink: 0 }} />
}
