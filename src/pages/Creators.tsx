import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CreatorCard, { Creator } from "@/components/CreatorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { BASE_URL } from "@/constants/baseUrl";

export default function Creators() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [creatorFilter, setCreatorFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"featured" | "new">("new");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: creators, isLoading } = useQuery({
    queryKey: [`${BASE_URL}/api/users/list?isCreator=true`],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/users/list?isCreator=true`);
      if (!response.ok) throw new Error('Network response was not ok');
      const { data } = await response.json();
      return data;
    },
    enabled: true,
  });

  const handleFollow = (creatorId: number) => {
    // TODO: Implement follow/unfollow logic
    console.log('Follow/unfollow creator:', creatorId);
  };

  // Filter and sort creators
  const filteredCreators = creators?.filter((creator: Creator) => {
    const matchesSearch = creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.twitterHandle?.toLowerCase().includes(searchTerm.toLowerCase());

    if (creatorFilter === "followed") {
      // TODO: Filter by followed creators when authentication is implemented
      return matchesSearch;
    }

    return matchesSearch;
  }).sort((a: Creator, b: Creator) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  return (
    <main className="flex-grow">
      <div className="py-8 px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl tiny5-font">CREATORS</h2>
          <Button
            variant="outline"
            size="default"
            className="text-white border-gray-700 hover:bg-gray-800"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search creators by name, bio, or handle"
                className="w-full px-4 py-2 bg-secondary border border-gray-800 rounded-lg text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="bg-secondary border-gray-800 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-secondary border-gray-800 text-white">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>

              <Select value={creatorFilter} onValueChange={setCreatorFilter}>
                <SelectTrigger className="bg-secondary border-gray-800 text-white">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-secondary border-gray-800 text-white">
                  <SelectItem value="all">All Creators</SelectItem>
                  <SelectItem value="followed">Creators I Follow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-800">
          <div className="flex space-x-8">
            <button
              className={cn(
                "pb-2 hover:text-white transition-colors",
                activeTab === "featured"
                  ? "border-b-2 border-white font-medium"
                  : "border-b-0 text-gray-400"
              )}
              onClick={() => setActiveTab("featured")}
            >
              Featured Creators
            </button>
            <button
              className={cn(
                "pb-2 hover:text-white transition-colors",
                activeTab === "new"
                  ? "border-b-2 border-white font-medium"
                  : "border-b-0 text-gray-400"
              )}
              onClick={() => setActiveTab("new")}
            >
              New Creators
            </button>
          </div>
        </div>

        {/* Creators Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="border border-gray-800 rounded-lg overflow-hidden bg-secondary">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCreators && filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCreators.map((creator: Creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onFollow={handleFollow}
                isFollowing={false} // TODO: Implement actual following status
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl mb-4">No creators found</h3>
            <p className="text-gray-400">
              {searchTerm
                ? "Try a different search term"
                : "There are no creators available in this category"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
