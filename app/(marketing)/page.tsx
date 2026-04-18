import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader, Play, Rewind, Video, Gamepad2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-20 lg:py-32">
        {/* Background gradient/glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 opacity-80" />

        <div className="z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-12 lg:flex-row lg:justify-between">
          {/* Left Side: Copy & CTA */}
          <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
            <h1 className="mb-6 max-w-[600px] text-4xl font-extrabold tracking-tight text-white lg:text-6xl lg:leading-[1.1]">
              The way to master Sign Language.
            </h1>
            <p className="mb-8 max-w-[500px] text-lg text-slate-300 lg:text-xl">
              Learn through motion, not text. Watch, tap, and connect with our
              interactive, video-first platform designed for real-world
              communication.
            </p>

            <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3 lg:items-start">
              <ClerkLoading>
                <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
              </ClerkLoading>

              <ClerkLoaded>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button
                      size="lg"
                      className="h-14 w-full rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500"
                    >
                      Start Learning Now
                    </Button>
                  </SignUpButton>

                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="w-full text-blue-400 hover:bg-blue-950/50 hover:text-blue-300"
                    >
                      I already have an account
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Button
                    size="lg"
                    className="h-14 w-full rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500"
                    asChild
                  >
                    <Link href="/learn">Continue Learning</Link>
                  </Button>
                </SignedIn>
              </ClerkLoaded>
            </div>
          </div>

          {/* Right Side: Video/App Preview */}
          <div className="relative flex w-full max-w-md justify-center lg:w-1/2 lg:justify-end">
            <div className="relative aspect-[9/16] w-[280px] overflow-hidden rounded-[2rem] border-[6px] border-slate-800 bg-black shadow-2xl ring-4 ring-white/5 ring-offset-4 ring-offset-slate-950 lg:w-[320px]">
              {/* Fallback to simple video element for marketing if VideoPlayer needs props */}
              <video
                src="/videos/xinchao.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover opacity-90"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-md">
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wider text-blue-400">
                    NEW WORD
                  </p>
                  <p className="font-semibold text-white">Xin chào</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                  <Play className="h-5 w-5 fill-white text-white" />
                </div>
              </div>
            </div>
            {/* Decorative background elements behind the phone mockup */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[100px]" />
          </div>
        </div>
      </section>

      {/* Features Grid below fold */}
      <section className="w-full border-t border-white/5 bg-slate-900/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
              Why Signzy works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              We threw out the textbook and built a platform around how sign
              language is actually learned: through seeing and doing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center rounded-3xl border border-white/5 bg-slate-900 p-6 text-center transition-colors hover:border-blue-500/30">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950/50 text-blue-400">
                <Video className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Video-First Learning
              </h3>
              <p className="text-slate-400">
                No static images or lengthy text. Learn from high-quality,
                continuous video clips.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center rounded-3xl border border-white/5 bg-slate-900 p-6 text-center transition-colors hover:border-blue-500/30">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950/50 text-blue-400">
                <Rewind className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Precision Playback
              </h3>
              <p className="text-slate-400">
                Control the speed. Slow down complex signs to see exactly how
                hands and expressions move.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center rounded-3xl border border-white/5 bg-slate-900 p-6 text-center transition-colors hover:border-blue-500/30">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950/50 text-blue-400">
                <Gamepad2 className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Bite-Sized Lessons
              </h3>
              <p className="text-slate-400">
                Gamified, interactive challenges keep you motivated to learn
                just a few minutes every day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
