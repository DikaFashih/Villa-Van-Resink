export default function GlassCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="
      rounded-[32px]
      border
      border-white/20
      bg-white/60
      backdrop-blur-xl
      shadow-xl
      p-8
    ">
      {children}
    </div>
  );
}