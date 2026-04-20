import { redirect } from "next/navigation";

import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

import { Quiz } from "./quiz";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  const initialPercentage = lesson.totalUnitChallenges > 0 
    ? (lesson.completedUnitChallenges / lesson.totalUnitChallenges) * 100
    : 0;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
      totalUnitChallenges={lesson.totalUnitChallenges}
    />
  );
};

export default LessonPage;
