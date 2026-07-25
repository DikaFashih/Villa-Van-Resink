import Image from "next/image";

interface Props {
  src: string;
}

export default function ImageCard({
  src,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-[32px]">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover transition duration-700 hover:scale-110"
      />
    </div>
  );
}