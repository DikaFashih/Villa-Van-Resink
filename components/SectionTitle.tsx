interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  center,
}: Props) {
  return (
    <div
      className={`max-w-3xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <p className="uppercase tracking-[0.35em] text-sm text-[#8c7b56] mb-4">
          {eyebrow}
        </p>
      )}

      <h2 className="text-5xl leading-tight mb-6">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-neutral-600 leading-8">
          {description}
        </p>
      )}
    </div>
  );
}