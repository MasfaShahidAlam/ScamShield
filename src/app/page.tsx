import MessageInput from "@/components/scanner/MessageInput";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
          Scam Detection
        </p>

        <h1 className="font-display text-4xl font-bold text-foreground">
          Know if it&apos;s a scam
          <br />
          before you click.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-muted">
          Paste a suspicious SMS, email, WhatsApp message, or offer and
          ScamShield AI will explain what makes it risky.
        </p>
      </div>

      <MessageInput />
    </main>
  );
}