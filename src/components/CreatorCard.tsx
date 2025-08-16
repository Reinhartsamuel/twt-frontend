import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Users, Heart, Eye } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export interface Creator {
  id: number;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  twitterHandle?: string;
  instagramHandle?: string;
  websiteUrl?: string;
  isCreator: boolean;
  isVerified?: boolean;
  followerCount?: number;
  followingCount?: number;
  nftCount?: number;
  totalViews?: number;
  createdAt: string;
  updatedAt: string;
}

interface CreatorCardProps {
  creator: Creator;
  onFollow?: (creatorId: number) => void;
  isFollowing?: boolean;
}

export default function CreatorCard({ creator, onFollow, isFollowing = false }: CreatorCardProps) {
  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFollow) {
      onFollow(creator.id);
    }
  };

  return (
    <Card className="creator-card border-gray-800 bg-secondary overflow-hidden cursor-pointer h-full hover:bg-gray-800/50 transition-colors">
      <CardContent className="p-6">
        {/* Profile Picture and Verification */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <AspectRatio ratio={1} className="w-16 h-16">
                <img
                  src={creator.profilePicture || `https://ui-avatars.com/api/?name=${creator.username}&background=6366f1&color=ffffff`}
                  alt={creator.username}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-700"
                />
              </AspectRatio>
              {creator.isVerified && (
                <Badge className="absolute -top-1 -right-1 bg-blue-600 text-xs p-1 rounded-full">
                  ✓
                </Badge>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">{creator.username}</h3>
              {creator.twitterHandle && (
                <p className="text-sm text-gray-400">@{creator.twitterHandle}</p>
              )}
            </div>
          </div>
          
          <Button
            variant={isFollowing ? "secondary" : "default"}
            size="sm"
            onClick={handleFollowClick}
            className={isFollowing ? "bg-gray-700 hover:bg-gray-600" : "bg-purple-600 hover:bg-purple-700"}
          >
            <Heart className={`h-4 w-4 mr-1 ${isFollowing ? 'fill-current' : ''}`} />
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>

        {/* Bio */}
        {creator.bio && (
          <p className="text-sm text-gray-300 mb-4 line-clamp-2">
            {creator.bio}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-semibold text-white">
                {creator.followerCount || 0}
              </span>
            </div>
            <p className="text-xs text-gray-400">Followers</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-sm font-semibold text-white">
                {creator.nftCount || 0}
              </span>
            </div>
            <p className="text-xs text-gray-400">NFTs</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Eye className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-semibold text-white">
                {creator.totalViews || 0}
              </span>
            </div>
            <p className="text-xs text-gray-400">Views</p>
          </div>
        </div>

        {/* Join Date */}
        <div className="text-center pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Joined {formatDistanceToNow(new Date(creator.createdAt), { addSuffix: true })}
          </p>
        </div>

        {/* Social Links */}
        {(creator.websiteUrl || creator.instagramHandle) && (
          <div className="flex justify-center space-x-2 mt-3">
            {creator.websiteUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-1 h-auto text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(creator.websiteUrl, '_blank');
                }}
              >
                Website
              </Button>
            )}
            {creator.instagramHandle && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-1 h-auto text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://instagram.com/${creator.instagramHandle}`, '_blank');
                }}
              >
                Instagram
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}