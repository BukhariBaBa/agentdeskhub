export function StepShell({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="text-[12px] font-[650] tracking-[0.08em] uppercase text-[var(--indigo-600)] mb-[10px]">
        {eyebrow}
      </div>
      <h1 className="m-0 text-[27px] font-[680] tracking-[-0.03em] text-[var(--text)]">
        {title}
      </h1>
      {sub ? (
        <p className="mt-[9px] mb-[26px] text-[14.5px] text-[var(--text-muted)] leading-[1.55] max-w-[540px]">
          {sub}
        </p>
      ) : (
        <div className="h-[26px]" />
      )}
      {children}
    </div>
  );
}
