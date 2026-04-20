import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b border-b-blue-600 bg-blue-500 px-4 dark:border-slate-800 dark:bg-blue-600 lg:hidden">
      <MobileSidebar />
    </nav>
  );
};
