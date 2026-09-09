import { Reveal } from "@/components/reveal";

export default function Template({ children }: { children: React.ReactNode }) {
  return <Reveal onMount className="flex flex-1 flex-col">{children}</Reveal>;
}
