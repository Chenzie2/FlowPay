import Link from "next/link";
import FlowPayLogo from "./flowpay-logo";

type PageHeaderProps = {
  backLabel?: string;
  backHref?: string;
};

export default function PageHeader({
  backLabel = "Back to dashboard",
  backHref = "/dashboard",
}: PageHeaderProps) {
  return (
    <header className="border-b border-[#ebe4e1]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <FlowPayLogo />

        <Link
          href={backHref}
          className="text-sm text-[#766d72] transition hover:text-[#4b3443]"
        >
          {backLabel}
        </Link>
      </div>
    </header>
  );
}