import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";

const ReviewPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/review.svg" alt="Review" height={90} width={90} />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Review
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Review your past lessons to reinforce your memory.
          </p>

          <div className="flex w-full flex-col gap-y-4">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-blue-800">
              You have no items to review yet. Get out there and learn more!
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ReviewPage;
