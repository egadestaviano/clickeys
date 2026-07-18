import { useState } from "react";
import { MaterialIcon } from "@/components/materialIcon";

const SHOUTOUT_TEXT =
  "Just discovered @clickeys — tournament-grade mechanical keyboards with hot-swappable switches and CNC aluminium builds. Best gear I've used for marathon sessions. Highly recommend!";

export function ShoutoutBar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHOUTOUT_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 md:px-12">
      <div className="border border-outline-variant bg-surface-container p-8">
        <div className="flex items-center gap-3">
          <MaterialIcon className="text-3xl text-brand" name="campaign" />
          <h3 className="font-geist text-xl font-bold uppercase tracking-tight text-on-surface">
            Give a shoutout
          </h3>
        </div>
        <p className="mt-3 font-geist text-sm text-on-surface-variant">
          Loved your Clickeys gear? Drop a shoutout to Hannes Köttner on social —
          or copy the text below and share it anywhere.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <textarea
            readOnly
            value={SHOUTOUT_TEXT}
            rows={3}
            className="w-full resize-none border border-outline-variant bg-surface-container-low px-4 py-3 font-geist text-sm text-on-surface outline-none focus-visible:ring-1 focus-visible:ring-brand"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-brand px-6 py-3 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
          >
            <MaterialIcon name={copied ? "check" : "content_copy"} className="text-[18px]" />
            {copied ? "Copied" : "Copy text"}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["instagram", "facebook", "link", "share"] as const).map((social) => (
            <a
              key={social}
              href="#"
              onClick={(event) => event.preventDefault()}
              className="inline-flex items-center gap-1 border border-outline-variant px-3 py-1.5 font-geist text-xs uppercase tracking-wide text-on-surface-variant transition-colors hover:border-brand hover:text-brand"
            >
              <MaterialIcon name={social} className="text-[16px]" />
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShoutoutBar;
