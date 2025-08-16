import { useQuery } from "@tanstack/react-query";
import NFTCard, { NFT } from "@/components/NFTCard";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/constants/baseUrl";
import { useAuthStore } from "@/hooks/useAuthStore";
import ProfileSidebar from "@/components/ProfileSidebar";
import { useLocation, useParams } from "wouter";
import { cn } from "@/lib/utils";


export default function CreatorProfile() {
  const { user } = useAuthStore();
  const { twitterHandle } = useParams();


  const { data, isLoading } = useQuery({
    queryKey: [`${BASE_URL}/api/nfts?twitterHandle=${twitterHandle}`],
    queryFn: async () => {
      const getUser = await fetch(`${BASE_URL}/api/users/list?twitterHandle=${twitterHandle}`);
      const { data: userResponse } = await getUser.json();
      const user = userResponse[0];
      const response = await fetch(`${BASE_URL}/api/nfts?initialOwnerUserId=${user?.id}&includeUser=true`);
      const data = await response.json();
      return {
        user,
        nfts: data?.data || []
      };
    },
  });

  const handlePostToX = () => {
    const postText = encodeURIComponent("Title:\nDesc:\n@tweetonium_xyz");
    window.open(`https://twitter.com/intent/tweet?text=${postText}`, "_blank");
  };


  const handleFollow = () => {
    console.log("Following user...");
    // Implement follow logic
  };

  const handleUnfollow = () => {
    console.log("Unfollowing user...");
    // Implement unfollow logic
  };




  return (
    <div className={cn(data?.user && "lg:ml-80 ", "pt-16 px-4 lg:px-8")}>
      {data?.user &&
        <ProfileSidebar
          user={data?.user}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
        />
      }

      <main className="flex-grow">
        <div className="py-8 px-4 md:px-8">
          <h2 className="text-3xl mb-8 tiny5-font cursor-pointer" onClick={() => { }}>{data?.user?.twitterHandle}</h2>

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
          ) : data?.nfts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data?.nfts?.map((nft: any) => (
                <NFTCard key={nft.id} nft={nft} isUserNFT={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl mb-4">${data?.user?.twitterHandle} has no NFTs yet</h3>
              <p className="text-gray-400 mb-6">
                Create your first NFT by minting an image from your X posts
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
