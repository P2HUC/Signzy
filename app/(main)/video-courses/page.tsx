import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import {
  getUserProgress,
  getUserSubscription,
  getVideoResources,
} from "@/db/queries";

const VideoCoursesPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const videoResourcesData = getVideoResources();

  const [userProgress, userSubscription, videoResources] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    videoResourcesData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  // Pick the feature (highest order)
  const featuredVideo = videoResources.length > 0 ? videoResources[0] : null;
  const gridVideos = videoResources.length > 1 ? videoResources.slice(1) : [];

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
        <div className="flex w-full flex-col gap-8 pb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200">
              Video Courses
            </h1>
            <p className="text-sm text-muted-foreground">
              Discover advanced tutorials, daily tips, and engaging sign language lessons.
            </p>
          </div>

          {featuredVideo && (
            <Link
              href={featuredVideo.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative w-full overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={featuredVideo.thumbnailSrc}
                  alt={featuredVideo.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Cinematic Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                
                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 md:bottom-8 md:left-8 md:right-8">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
                      {featuredVideo.category || "Featured"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {featuredVideo.title}
                  </h2>
                  {featuredVideo.description && (
                    <p className="line-clamp-2 max-w-[80%] text-sm font-medium text-slate-300 sm:text-base">
                      {featuredVideo.description}
                    </p>
                  )}
                </div>

                {/* Glassmorphism Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                    <Play className="ml-1.5 h-8 w-8 fill-white text-white drop-shadow-md" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {gridVideos.map((video) => (
              <Link
                key={video.id}
                href={video.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-4 rounded-2xl transition-all duration-300"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-sm transition-all duration-500 group-hover:shadow-lg dark:border-slate-800">
                  <Image
                    src={video.thumbnailSrc}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-500 group-hover:bg-slate-900/20" />
                  
                  {/* Subtle Play Icon */}
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-4 items-center justify-center rounded-full border border-white/30 bg-white/20 opacity-0 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Play className="ml-1 h-4 w-4 fill-white text-white drop-shadow-sm" />
                  </div>
                </div>

                <div className="flex flex-col px-1">
                  <h3 className="line-clamp-2 text-base font-bold leading-tight text-neutral-800 dark:text-neutral-200">
                    {video.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    {video.category || "General"}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {videoResources.length === 0 && (
            <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-muted-foreground dark:border-slate-800 dark:bg-slate-900/50">
              <Play className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-700" />
              <p className="font-medium">No video courses currently available.</p>
              <p className="text-sm">Check back later for new content!</p>
            </div>
          )}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default VideoCoursesPage;
