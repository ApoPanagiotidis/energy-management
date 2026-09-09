import Image from "next/image";

export function Brand() {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/images/apollo-logo.jpg"
        alt=""
        width={44}
        height={44}
        className="size-11 shrink-0 rounded-lg"
      />
      <span>
        <span className="block text-xl leading-6 font-bold tracking-tight text-white">
          Apollo
        </span>
        <span className="block text-xs font-medium tracking-wide text-accent">
          Green Solutions
        </span>
      </span>
    </span>
  );
}
