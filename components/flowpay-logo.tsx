import Link from "next/link";

type FlowPayLogoProps = {
  href?: string;
};

export default function FlowPayLogo({
  href = "/dashboard",
}: FlowPayLogoProps) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4b3443] text-sm font-semibold text-white">
        F
      </div>

      <span className="text-xl font-semibold tracking-[-0.03em]">
        flowpay
      </span>
    </Link>
  );
}