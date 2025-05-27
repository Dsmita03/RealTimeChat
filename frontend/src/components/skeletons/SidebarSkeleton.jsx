import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
      flex flex-col bg-gradient-to-b from-base-100 via-base-200 to-base-100
      transition-all duration-300 shadow-inner"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full px-5 py-4 bg-base-100 shadow-sm">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          <span className="font-semibold text-primary text-lg hidden lg:block">
            Contacts
          </span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full px-3 py-4 space-y-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full flex items-center gap-4 p-3 rounded-xl bg-base-100 hover:bg-base-300/20 transition-colors duration-200"
          >
            {/* Avatar skeleton */}
            <div className="relative flex-shrink-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:flex flex-col gap-2 min-w-0 flex-1">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
