"use client";

import { Check, Loader2, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SetupTask {
  label: string;
  run: () => Promise<unknown>;
}

interface Props {
  tasks: SetupTask[];
  onDone: () => void;
  /** Turns a failure into the message shown under the failed row. */
  describeError?: (cause: unknown) => string;
}

type RowState = "pending" | "running" | "done" | "error";

// Each row stays on screen at least this long, so a fast API still reads as steps.
const MIN_ROW_MS = 550;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Runs the real setup calls in order, one row per call, and resumes from the failed row on retry. */
export const SetupProgress = ({ tasks, onDone, describeError }: Props) => {
  const t = useTranslations("onboarding");
  const reduceMotion = useReducedMotion();
  const [rows, setRows] = useState<RowState[]>(() =>
    tasks.map(() => "pending"),
  );
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  // StrictMode mounts effects twice; the POSTs must run once per attempt.
  const started = useRef(-1);
  // Done rows survive a retry without re-running their call.
  const rowsAtStart = useRef<RowState[]>(tasks.map(() => "pending"));
  const tasksRef = useRef(tasks);
  const onDoneRef = useRef(onDone);
  const describeRef = useRef(describeError);
  const fallbackRef = useRef("");
  fallbackRef.current = t("stepError");
  useEffect(() => {
    tasksRef.current = tasks;
    onDoneRef.current = onDone;
    describeRef.current = describeError;
  });

  useEffect(() => {
    if (started.current === attempt) return;
    started.current = attempt;
    const list = tasksRef.current;
    const set = (i: number, state: RowState) =>
      setRows((prev) => prev.map((s, j) => (j === i ? state : s)));

    (async () => {
      for (let i = 0; i < list.length; i++) {
        if (rowsAtStart.current[i] === "done") continue;
        set(i, "running");
        try {
          await Promise.all([list[i].run(), wait(MIN_ROW_MS)]);
          rowsAtStart.current[i] = "done";
          set(i, "done");
        } catch (cause) {
          set(i, "error");
          setError(describeRef.current?.(cause) ?? fallbackRef.current);
          return;
        }
      }
      onDoneRef.current();
    })();
  }, [attempt]);

  const retry = () => {
    setError(null);
    setAttempt((n) => n + 1);
  };

  return (
    <div>
      <ol aria-live="polite" className="flex flex-col gap-3">
        {tasks.map((task, i) => {
          const state = rows[i];
          return (
            <li
              key={task.label}
              className={cn(
                "flex items-center gap-3 font-mono text-sm transition-opacity duration-200",
                state === "pending" && "opacity-40",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-xs border-2 border-foreground",
                  state === "done" && "bg-foreground text-background",
                  state === "error" && "border-destructive text-destructive",
                )}
              >
                {state === "running" &&
                  (reduceMotion ? (
                    <span className="size-1.5 rounded-full bg-foreground" />
                  ) : (
                    <Loader2 className="size-3.5 animate-spin" />
                  ))}
                {state === "done" && (
                  <Check className="size-3.5" strokeWidth={3} />
                )}
                {state === "error" && (
                  <X className="size-3.5" strokeWidth={3} />
                )}
              </span>
              <span>{task.label}</span>
              <span className="sr-only">{t(`taskState.${state}`)}</span>
            </li>
          );
        })}
      </ol>

      {error && (
        <div className="mt-6 flex flex-col items-start gap-3">
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
          <Button
            variant="outline"
            onClick={retry}
            className="font-mono text-xs uppercase tracking-wider rounded-xs"
          >
            {t("tryAgain")}
          </Button>
        </div>
      )}
    </div>
  );
};
