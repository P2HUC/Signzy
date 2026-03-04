import { Rocket } from "lucide-react";

type SidebarProgressProps = {
  completionPercentage: number;
  dayStreak: number;
  achievements: number;
  totalAchievements: number;
};

export const SidebarProgress = ({
  completionPercentage,
  dayStreak,
  achievements,
  totalAchievements,
}: SidebarProgressProps) => {
  return (
    <div className="flex w-full max-w-[320px] flex-col items-center rounded-2xl border-2 border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-6 w-full text-left text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
        Progress
      </h3>

      <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="absolute left-0 top-0 -rotate-90 transform"
        >
          {/* Background Circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="transparent"
            stroke="#1e293b" // slate-800
            strokeWidth="12"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth="12"
            strokeDasharray="439.8" /* 2 * PI * r */
            strokeDashoffset={439.8 - (completionPercentage / 100) * 439.8}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>

        <div className="z-10 flex flex-col items-center">
          <Rocket
            className="mb-2 h-12 w-12 animate-float text-orange-500 drop-shadow-lg"
            strokeWidth={1.5}
          />
          <span className="bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-2xl font-bold text-transparent dark:from-slate-100 dark:to-slate-400">
            {completionPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="my-4 h-[2px] w-full bg-slate-200 dark:bg-slate-800" />

      <div className="mt-4 flex w-full">
        <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-slate-200 px-4 dark:border-slate-800">
          <span className="text-3xl font-bold text-slate-700 dark:text-slate-200">
            {dayStreak}
          </span>
          <span className="whitespace-nowrap text-xs font-medium text-slate-500 dark:text-slate-400">
            Day Streak
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <span className="text-3xl font-bold text-slate-700 dark:text-slate-200">
            {achievements}/{totalAchievements}
          </span>
          <span className="whitespace-nowrap text-xs font-medium text-slate-500 dark:text-slate-400">
            Achievements
          </span>
        </div>
      </div>
    </div>
  );
};
