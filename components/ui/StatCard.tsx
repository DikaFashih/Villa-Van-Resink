interface Props {
  number: string;
  title: string;
}

export default function StatCard({
  number,
  title,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-10 text-center">

      <h3 className="font-heading text-5xl text-[#8A6E4A]">
        {number}
      </h3>

      <p className="mt-3 text-neutral-600">
        {title}
      </p>

    </div>
  );
}