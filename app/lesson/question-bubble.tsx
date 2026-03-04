/* eslint-disable import/order */
import Image from "next/image";
import { VideoPlayer } from "@/components/video-player";

type QuestionBubbleProps = {
  question: string;
  videoSrc?: string;
};

export const QuestionBubble = ({ question, videoSrc }: QuestionBubbleProps) => {
  return (
    <div className="mb-6 flex items-center gap-x-4">
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={60}
        width={60}
        className="hidden lg:block"
      />
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={40}
        width={40}
        className="block lg:hidden"
      />

      <div className="relative w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 lg:text-base">
        {videoSrc ? (
          <VideoPlayer src={videoSrc} />
        ) : (
          <p className="text-slate-700 dark:text-slate-200">{question}</p>
        )}

        <div
          className="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent border-t-slate-200 dark:border-t-slate-800"
          aria-hidden
        />
      </div>
    </div>
  );
};
