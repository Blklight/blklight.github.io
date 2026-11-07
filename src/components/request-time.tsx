import { connection } from "next/server";
import { type ReactNode, Suspense } from "react";

async function AtRequestTime({ children }: { children: ReactNode }) {
  await connection();
  return children;
}

/**
 * Renders children only at request time, so Client Components that read
 * unstable values (Date.now(), new Date()) during render are not prerendered.
 */
export function RequestTime({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <AtRequestTime>{children}</AtRequestTime>
    </Suspense>
  );
}
