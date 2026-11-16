"use client";

import Link from "next/link";
import { HouseMark } from "@medivi/ui/components/house-mark";
import "./globals.css";

import { useEffect } from "react";
import { captureException } from "@/lib/monitoring";

// `global-error.tsx` replaces the root layout when it's active, so it must
// render its own <html>/<body> — Next.js requires this file to exist at the
// app root even before Phase 9's real error-page polish, otherwise the
// build fails prerendering its own auto-generated fallback (see
// https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    void captureException(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body>
        <div className="store-error">
          <Link href="/" className="wordmark">
            <HouseMark />
          </Link>
          <h1>Something went wrong</h1>
          <button className="forged" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
