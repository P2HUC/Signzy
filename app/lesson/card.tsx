import { useCallback } from "react";

import Image from "next/image";
import { useAudio, useKey } from "react-use";

import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";

type CardProps = {
  id: number;
  text: string;
  imageSrc: string | null;
  audioSrc: string | null;
  videoSrc?: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export const Card = ({
  text,
  imageSrc,
  audioSrc,
  videoSrc,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: CardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;

    void controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full cursor-pointer rounded-xl border-2 border-b-4 p-4 active:border-b-2 lg:p-6",
        "border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800",
        selected &&
          "border-sky-500 bg-sky-100 hover:bg-sky-100 dark:bg-sky-900/50 dark:hover:bg-sky-900/50",
        selected &&
          status === "correct" &&
          "border-blue-500 bg-blue-100 hover:bg-blue-100 dark:bg-blue-900/50 dark:hover:bg-blue-900/50",
        selected &&
          status === "wrong" &&
          "border-rose-500 bg-rose-100 hover:bg-rose-100 dark:bg-rose-900/50 dark:hover:bg-rose-900/50",
        disabled &&
          "pointer-events-none hover:bg-white dark:hover:bg-slate-900",
        type === "ASSIST" && "w-full lg:p-3"
      )}
    >
      {audio}
      {imageSrc && !videoSrc && (
        <div className="relative mb-4 aspect-square max-h-[80px] w-full lg:max-h-[150px]">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}

      {videoSrc && (
        <div className="relative mb-4 w-full overflow-hidden rounded-lg border border-slate-700">
          <video
            src={videoSrc}
            className="h-auto max-h-[150px] w-full object-cover"
            autoPlay
            loop
            playsInline
          />
        </div>
      )}

      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div aria-hidden />}
        <p
          className={cn(
            "text-sm text-slate-700 dark:text-slate-300 lg:text-base",
            selected && "text-sky-500 dark:text-sky-400",
            selected &&
              status === "correct" &&
              "text-blue-500 dark:text-blue-400",
            selected && status === "wrong" && "text-rose-500 dark:text-rose-400"
          )}
        >
          {text}
        </p>

        <div
          className={cn(
            "flex h-[20px] w-[20px] items-center justify-center rounded-lg border-2 text-xs font-semibold text-neutral-400 lg:h-[30px] lg:w-[30px] lg:text-[15px]",
            selected && "border-sky-300 text-sky-500",
            selected && status === "correct" && "border-blue-500 text-blue-500",
            selected && status === "wrong" && "border-rose-500 text-rose-500"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};
