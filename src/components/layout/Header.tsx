import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center gap-2.5">
        <ShieldCheck className="h-6 w-6 text-accent" strokeWidth={2} />
        <span className="font-display font-semibold text-lg text-foreground">
          ScamShield <span className="text-accent">AI</span>
        </span>
      </div>
    </header>
  );
}