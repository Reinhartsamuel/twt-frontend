import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NFTModal from "./NFTModal";
import { formatDistanceToNow } from 'date-fns';

export interface NFT {
  id: number;
  title: string;
  jsonUri: string;
  description?: string;
  views?: number;
  transactions?: string;
  status: string;
  floorPrice?: string;
  tokenId?: string;
  isMinted?: number; // 0 = lazy minted, 1 = on-chain minted
  metadata?: any;
  creatorTwitterHandle: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface NFTCardProps {
  nft: NFT;
  isUserNFT?: boolean;
}

export default function NFTCard({ nft, isUserNFT = false }: NFTCardProps) {
  // Determine if this NFT is lazily minted

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="nft-card border-gray-800 bg-secondary overflow-hidden cursor-pointer h-full">
          <div className="w-full relative">
            <AspectRatio ratio={1 / 1}>
              <img
                src={nft.jsonUri}
                alt={nft.title}
                className="w-full h-full object-cover"
              />
            </AspectRatio>

            {/* Minting Status Badge */}
            {false && (
              <Badge className="absolute top-2 right-2 bg-yellow-600 text-xs">
                Lazy Minted
              </Badge>
            )}
            {nft.status === 'FINALIZED' && (
              <Badge className="absolute top-2 right-2 bg-green-600 text-xs">
                On-Chain
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <h4 className="font-medium mb-1 truncate">{nft.metadata?.name}</h4>
            {isUserNFT ? (
              <p className="text-sm text-gray-400">Minted {formatDistanceToNow(new Date(nft.updatedAt), { addSuffix: true })}</p>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{nft.creatorTwitterHandle}</p>
                {nft.floorPrice && (
                  <p className="text-sm font-semibold text-purple-500">
                    {nft.floorPrice} SOL
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </DialogTrigger>
      <NFTModal nft={nft} />
    </Dialog>
  );
}
