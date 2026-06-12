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
  const dynamicStyles = CONFETTI_BITS.map(
    (b, i) =>
      `.cf${i}{left:${b.left}%;background:${b.col};transform:rotate(${b.rot}deg);animation:ad-confetti ${b.dur}s ${b.delay}s cubic-bezier(.3,.6,.5,1) forwards}`,
  ).join("");

  return (
    <>
      <style>{dynamicStyles}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CONFETTI_BITS.map((_, i) => (
          <span
            key={i}
            className={`cf${i} absolute top-[-6%] w-2 h-3 rounded-[2px] opacity-90`}
          />
        ))}
      </div>
    </>
  );
}

export function DoneScreen({ onFinish }: DoneScreenProps) {
  return (
    <div className="fixed inset-0 z-[401] bg-[var(--bg-subtle)] flex items-center justify-center p-7 overflow-hidden">
      <Confetti />
      <div className="text-center max-w-[460px] mx-auto relative">
        <div className="w-[76px] h-[76px] rounded-full bg-[var(--emerald-50)] text-[var(--emerald-600)] inline-flex items-center justify-center mx-auto mb-6">
          <Icon name="check" size={38} strokeWidth={2.6} />
        </div>
        <h1 className="m-0 text-[28px] font-[680] tracking-[-0.03em]">
          {DONE_TITLE}
        </h1>
        <p className="mt-3 mb-7 text-[15px] text-[var(--text-muted)] leading-[1.55]">
          {DONE_BODY}
        </p>
        <div className="inline-flex">
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
