import { lessons, units } from "@/db/schema";

import { LessonButton } from "./lesson-button";
import { UnitBanner } from "./unit-banner";

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
    iconSrc?: string | null;
    totalChallengesCount: number;
    completedChallengesCount: number;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
        iconSrc?: string | null;
      })
    | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />

      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, i) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              index={i}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
              iconSrc={lesson.iconSrc}
              totalChallengesCount={lesson.totalChallengesCount}
              completedChallengesCount={lesson.completedChallengesCount}
            />
          );
        })}
      </div>
    </>
  );
};
