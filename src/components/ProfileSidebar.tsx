import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { useEffect } from "react";
import { UserProfile } from "@/data/dummyProfileData";
import { formatNumber } from "@/utils/formatters";
import XLogo from "@/assets/twitter-x-seeklogo-2.svg";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { GoGift } from "react-icons/go";


interface ProfileSidebarProps {
  user: UserProfile;
  onFollow?: () => void;
  onUnfollow?: () => void;
}

export default function ProfileSidebar({ user, onFollow, onUnfollow }: ProfileSidebarProps) {
  const { isOpen, isMobile, closeSidebar } = useSidebar();

  const handleFollowClick = () => {
    if (user.isFollowing) {
      onUnfollow?.();
    } else {
      onFollow?.();
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('profile-sidebar');
      if (isMobile && isOpen && sidebar && !sidebar.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    if (isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile, isOpen, closeSidebar]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        id="profile-sidebar"
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-black border-r border-gray-700/50 p-6 overflow-y-auto z-40 transition-transform duration-300 ease-in-out ${isMobile
          ? (isOpen ? 'translate-x-0' : '-translate-x-full')
          : 'hidden lg:block'
          }`}
      >
        <div className="space-y-2">
          {/* Profile Header */}
          <div className="">
            <p className="text-white text-xl tiny5-font mb-2">Profile</p>
            <Avatar className="w-20 h-20 mb-4 ring-2 ring-purple-500/30 rounded-none">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl font-bold rounded-none">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex items-center justify-start gap-2 flex-wrap">
                {user.isVerified && (
                  <div className=" flex text-xs text-gray-100">
                    <MdOutlineVerifiedUser className="w-3 h-3 mr-1" />
                    Verified Creator
                  </div>
                )}
              </div>
              <p className="text-white text-3xl tiny5-font">@{user.handle}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex max-w-[80%] gap-1">
            <Button
              onClick={handleFollowClick}
              className={`flex-1 ${user.isFollowing
                  ? "bg-gray-700 hover:bg-red-600 text-white"
                  : "bg-[#873ED0] hover:from-purple-700 hover:to-pink-700 text-white"
                } transition-all duration-200 p-0 text-xs h-8 rounded-lg`}
            >
              {user.isFollowing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Unfollow
                </>
              ) : (
                "+ Follow"
              )}
            </Button>

            <Button
              variant="outline"
              className="p-0 text-[0.8rem] px-2 tiny5-font h-8 rounded-lg flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <div className="flex">
                <GoGift className="text-white " size={'lg'}/>
                Goodtonium
              </div>
            </Button>

            <Button
              id="goto-x-profile"
              variant="outline"
              className="aspect-square p-0 h-8 rounded-lg border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <img src={XLogo} alt="X logo" className="h-8 w-8" />
            </Button>
          </div>


        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-4">
          <div className="text-center">
            <div className="text-xl font-bold text-white tiny5-font">{formatNumber(user.followersCount)}+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white tiny5-font">{formatNumber(user.followingCount)}+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Following</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white tiny5-font">{formatNumber(user.nftsCount)}+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">NFTs Minted</div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="">
            <p className="text-gray-300 text-xs leading-relaxed">{user.bio}</p>
          </div>
        )}
      </div>
    </div >
    </>
  );
}
