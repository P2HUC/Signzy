"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LessonButtonProps = {
  id: number;
  title: string;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  iconSrc?: string | null;
  totalChallengesCount: number;
  completedChallengesCount: number;
};

export const LessonButton = ({
  id,
  title,
  index,
  totalCount,
  locked,
  current,
  iconSrc,
  totalChallengesCount,
  completedChallengesCount,
}: LessonButtonProps) => {
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  // Alternate sides for the journey layout
  const isLeftAligned = index % 2 === 0;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
      className="relative flex w-full items-center justify-center"
    >
      <div className="relative flex h-[160px] w-full max-w-sm items-center justify-center">
        {/* Connection Line */}
        {!isLast && (
          <svg
            width="240"
            height="160"
            viewBox="0 0 240 160"
            className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2"
            style={{ top: "50%" }}
          >
            <path
              d={
                isLeftAligned
                  ? // Start top left -> straight down -> curve right -> straight right -> curve down -> straight down
                    "M 10 0 L 10 60 A 20 20 0 0 0 30 80 L 210 80 A 20 20 0 0 1 230 100 L 230 160"
                  : // Start top right -> straight down -> curve left -> straight left -> curve down -> straight down
                    "M 230 0 L 230 60 A 20 20 0 0 1 210 80 L 30 80 A 20 20 0 0 0 10 100 L 10 160"
              }
              stroke="#334155"
              strokeWidth="4"
              strokeDasharray="10 12"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        )}

        {/* Node & Text Anchor point */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: isLeftAligned ? "calc(50% - 110px)" : "calc(50% + 110px)",
            transform: "translateX(-50%)", // centers the node over the anchor
          }}
        >
          {current && (
            <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 animate-bounce whitespace-nowrap rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 font-bold uppercase tracking-wide text-blue-500 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              Start
              <div
                className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent border-t-slate-200 dark:border-t-slate-800"
                aria-hidden
              />
            </div>
          )}

          <Button
            size="rounded"
            variant={locked ? "locked" : isCompleted ? "primary" : "secondary"}
            className={cn(
              "relative h-[90px] w-[90px] overflow-hidden border-b-8 shadow-sm ring-4 ring-slate-200 ring-offset-2 ring-offset-white dark:ring-slate-800 dark:ring-offset-slate-900",
              isCompleted
                ? "border-amber-500 bg-amber-400 ring-amber-900 hover:bg-amber-500"
                : ""
            )}
          >
            {iconSrc ? (
              <Image
                src={iconSrc}
                alt={title}
                width={46}
                height={46}
                className={cn(locked && "opacity-50 grayscale")}
              />
            ) : isCompleted ? (
              <Check className="h-10 w-10 stroke-[4] text-white" />
            ) : (
              <div className="h-10 w-10 bg-transparent" />
            )}
          </Button>

          {/* Node Text */}
          <div
            className={cn(
              "pointer-events-none absolute top-1/2 flex w-[160px] -translate-y-1/2 flex-col",
              isLeftAligned
                ? "left-full ml-4 text-left"
                : "right-full mr-4 text-right"
            )}
          >
            <span className="text-lg font-bold text-slate-700 dark:text-slate-200">
              {title}
            </span>
            <span className="text-sm font-semibold italic text-slate-500 dark:text-slate-400">
              {completedChallengesCount}/{totalChallengesCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
