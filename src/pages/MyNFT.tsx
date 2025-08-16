import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NFTCard, { NFT } from "@/components/NFTCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import MintNFTModal from "@/components/MintNFTModal";
import { BASE_URL } from "@/constants/baseUrl";
import { useAuthStore } from "@/hooks/useAuthStore";
import ProfileSidebar from "@/components/ProfileSidebar";
import { dummyProfileData } from "@/data/dummyProfileData";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { auth } from "@/configs/firebase";
import { useLocation } from "wouter";

export default function MyNFT() {
  const [mintOpen, setMintOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Created');
  const { user } = useAuthStore();
  const [location, navigate] = useLocation();

  const { data: nfts, isLoading } = useQuery({
    queryKey: [`${BASE_URL}/api/nfts?initialOwnerUserId=${user?.id}`],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/nfts?initialOwnerUserId=${user?.id}&includeUser=true`);
      const data = await response.json();
      console.log(data.data, 'data')
      return data.data;
    },
  });


  const handlePostToX = () => {
    const postText = encodeURIComponent("Title:\nDesc:\n@tweetonium_xyz");
    window.open(`https://twitter.com/intent/tweet?text=${postText}`, "_blank");
  };

  // Using dummy profile data - replace with actual user data from your auth/state management
  const mockUser = dummyProfileData;

  const handleFollow = () => {
    console.log("Following user...");
    // Implement follow logic
  };

  const handleUnfollow = () => {
    console.log("Unfollowing user...");
    // Implement unfollow logic
  };

  const handleEditProfile = () => {
    console.log("Editing profile...");
    // Implement edit profile logic or navigation
    // For example, you could navigate to a profile edit page
  };

  useEffect(() => {
    if (!auth.currentUser) navigate('/');
  }, [auth.currentUser]);

  return (

    <div className={cn("pt-4 px-4 lg:px-8", user && "lg:ml-80")}>
      {user && (
        <ProfileSidebar
          user={user}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
          isOwnProfile={true}
          onEditProfile={handleEditProfile}
        />
      )}
      <main className="flex-grow">
        <div className="md:px-8">
          <h2 className="text-3xl mb-8 tiny5-font cursor-pointer" onClick={() => { }}>MY NFTS</h2>
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-800">
            <div className="flex space-x-8">
              <button
                className={cn(
                  "pb-2 text-gray-300 hover:text-white transition-all duration-200",
                  activeTab === "created" &&
                  "text-white border-b-2 border-white font-medium"
                )}
                onClick={() => setActiveTab("created")}
              >
                Created
              </button>
              <button
                className={cn(
                  "pb-2 text-gray-300 hover:text-white transition-all duration-200",
                  activeTab === "owned" &&
                  "text-white border-b-2 border-white font-medium"
                )}
                onClick={() => setActiveTab("owned")}
              >
                Owned
              </button>
              <button
                className={cn(
                  "pb-2 text-gray-300 hover:text-white transition-all duration-200",
                  activeTab === "collection" &&
                  "text-white border-b-2 border-white font-medium"
                )}
                onClick={() => setActiveTab("collection")}
              >
                Collection
              </button>
              <button
                className={cn(
                  "pb-2 text-gray-300 hover:text-white transition-all duration-200",
                  activeTab === "activity" &&
                  "text-white border-b-2 border-white font-medium"
                )}
                onClick={() => setActiveTab("activity")}
              >
                Activity
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="border border-gray-800 rounded-lg overflow-hidden bg-secondary">
                  <Skeleton className="w-full aspect-square" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : nfts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {nfts.map((nft: any) => (
                <NFTCard key={nft.id} nft={nft} isUserNFT={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl mb-4">You haven't minted any NFTs yet</h3>
              <p className="text-gray-400 mb-6">
                Create your first NFT by minting an image from your X posts
              </p>
              <div className="mb-6">
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full px-6 py-6 text-lg font-medium bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handlePostToX}
                >
                  Tag your artwork to @tweetonium_xyz
                </Button>
              </div>
            </div>
          )}
        </div>
        <MintNFTModal open={mintOpen} onOpenChange={setMintOpen} />
      </main>
    </div>
  );
}
