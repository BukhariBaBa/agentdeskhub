import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import type { DoneScreenProps } from "./DoneScreen.types";
import { DONE_TITLE, DONE_BODY, CONFETTI_COLS } from "./DoneScreen.const";

const CONFETTI_BITS = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 7) * 0.12,
  col: CONFETTI_COLS[i % 4],
  dur: 1.8 + (i % 5) * 0.25,
  rot: (i * 53) % 360,
}));

function Confetti() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {CONFETTI_BITS.map((b, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "-6%",
            left: `${b.left}%`,
            width: 8,
            height: 12,
            background: b.col,
            borderRadius: 2,
            transform: `rotate(${b.rot}deg)`,
            animation: `ad-confetti ${b.dur}s ${b.delay}s cubic-bezier(.3,.6,.5,1) forwards`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

export function DoneScreen({ onFinish }: DoneScreenProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 401,
        background: "var(--bg-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        overflow: "hidden",
      }}
    >
      <Confetti />
      <div
        style={{
          textAlign: "center",
          maxWidth: 460,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 99,
            background: "var(--emerald-50)",
            color: "var(--emerald-600)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <Icon name="check" size={38} strokeWidth={2.6} />
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 680,
            letterSpacing: "-0.03em",
          }}
        >
          {DONE_TITLE}
        </h1>
        <p
          style={{
            margin: "12px 0 28px",
            fontSize: 15,
            color: "var(--text-muted)",
            lineHeight: 1.55,
          }}
        >
          {DONE_BODY}
        </p>
        <div style={{ display: "inline-flex" }}>
          <Button
            variant="primary"
            size="lg"
            iconRight="arrowRight"
            onClick={onFinish}
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
