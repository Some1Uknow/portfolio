const CHAIN_CONFIG = {
  Solana: {
    src: "https://cdn.simpleicons.org/solana",
  },
  Avalanche: {
    src: "https://build.avax.network/favicon.ico",
  },
  Stellar: {
    src: "https://cdn.simpleicons.org/stellar",
  },
  "0G": {
    src: "https://docs.0g.ai/img/logo.svg",
  },
  Infra: {
    label: "I",
  },
}

function ChainIcon({ chain }) {
  const config = CHAIN_CONFIG[chain] ?? CHAIN_CONFIG.Infra

  return (
    <span
      aria-hidden="true"
      style={{
        width: 22,
        height: 22,
        display: "inline-grid",
        placeItems: "center",
        borderRadius: "50%",
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid var(--color-border-soft)",
      }}
    >
      {config.src ? (
        <img src={config.src} alt="" width="14" height="14" style={{ display: "block", objectFit: "contain" }} />
      ) : (
        <span style={{ fontSize: 10, color: "var(--color-soft)", lineHeight: 1 }}>{config.label}</span>
      )}
    </span>
  )
}

export default function ChainBadge({ chain, compact = false }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 6 : 8,
        padding: compact ? "5px 8px" : "7px 10px",
        borderRadius: 999,
        border: "1px solid var(--color-border-soft)",
        background: "var(--color-surface-elevated)",
        color: "var(--color-text)",
        fontSize: compact ? 10 : 11,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      <ChainIcon chain={chain} />
      <span>{chain}</span>
    </span>
  )
}
