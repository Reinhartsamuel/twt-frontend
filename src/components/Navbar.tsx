import { useLocation, Link } from "wouter";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { shortenAddress } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import XLogo from "@/assets/twitter-x-seeklogo-2.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut, Copy, X, ExternalLink, Menu, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/configs/firebase";
import { OAuthCredential, signInWithPopup, TwitterAuthProvider, UserCredential } from "firebase/auth";
import { provider } from "@/providers/Twitter";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import PhantomLogo from "@/assets/Phantom-Icon_App_60x60.png";
import { BASE_URL } from "@/constants/baseUrl";



export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, user, wallet, logout, login } = useAuthStore();
  const { toggleSidebar } = useSidebar();
  const { toast } = useToast();
  const { connect, connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const handleSignInWithTwitter = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const credential: OAuthCredential | null = TwitterAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const secret = credential?.secret;
      const user = result.user;
      const twitterUsername = user?.reloadUserInfo?.screenName;

      console.log(twitterUsername, ':::twitter username',);
      console.log(user, ':::user')
      // Send the token and secret to your backend for verification
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          "twitterHandle": twitterUsername,
          "name": user.providerData[0]?.displayName || '',
          "firebaseUid": user.uid,
          "avatar": user?.photoURL || ''
        })
      });
      const { user: userDb, wallet } = await res.json();
      login({
        user: userDb,
        wallet
      });

      toast({
        title: "Successfully connected!",
        description: "Your X account has been connected and a Solana wallet has been created for you.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Connection failed",
          description: error.message || "Failed to connect X account. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connection failed",
          description: "An unknown error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    logout();
    setShowLogoutConfirm(false);
  };



  const [sheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => {
    setSheetOpen(false);
  };

  // Debug logging
  console.log('Current location:', location);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 flex justify-between items-center border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="flex items-center">
        {/* Mobile Profile Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-3 text-white hover:bg-gray-800"
          onClick={toggleSidebar}
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Toggle profile sidebar</span>
        </Button>

        <Link href="/" className="flex items-center" aria-label="Tweetonium Home">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="ml-8 space-x-6 hidden md:flex">
          <Link href="/explore" className={`hover:text-gray-300 transition-colors ${location.startsWith("/explore") ? "font-bold text-purple-400 border-b border-purple-400" : "text-gray-300"}`}>
            Explore
          </Link>
          {auth.currentUser ?
            <Link href="/my-nfts" className={`hover:text-gray-300 transition-colors ${location.startsWith("/my-nfts") ? "font-bold text-purple-400 border-b border-purple-400" : "text-gray-300"}`}>
              My NFTs
            </Link> : <></>
          }
          {/*<Link href="/creators" className={`hover:text-gray-300 transition-colors ${location.startsWith("/creators") ? "font-bold text-purple-400 border-b border-purple-400" : "text-gray-300"}`}>
            Creators
          </Link>*/}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild className="md:hidden ml-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-secondary border-r border-gray-800 text-white w-[250px] pt-10">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className={`px-2 py-1 rounded hover:bg-gray-800 transition-colors ${location === "/" ? "bg-gray-900 font-medium" : ""}`}
                onClick={closeSheet}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className={`px-2 py-1 rounded hover:bg-gray-800 transition-colors ${location.startsWith("/explore") ? "bg-purple-900 text-purple-300 font-bold" : ""}`}
                onClick={closeSheet}
              >
                Explore
              </Link>
              {auth.currentUser ?
                <Link
                  href="/my-nfts"
                  className={`px-2 py-1 rounded hover:bg-gray-800 transition-colors ${location.startsWith("/my-nfts") ? "bg-purple-900 text-purple-300 font-bold" : ""}`}
                  onClick={closeSheet}
                >
                  My NFTs
                </Link> : <></>
              }
              {/*<Link
                href="/creators"
                className={`px-2 py-1 rounded hover:bg-gray-800 transition-colors ${location.startsWith("/creators") ? "bg-purple-900 text-purple-300 font-bold" : ""}`}
                onClick={closeSheet}
              >
                Creators
              </Link>*/}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      {/*<p onClick={() => {
        console.log(auth.currentUser, 'user');
      }}>console</p>*/}

      <div>
        {!auth.currentUser && !isAuthenticated ? (
          <>
            <Button
              onClick={handleSignInWithTwitter}
              className="rounded-full bg-black  hover:bg-gray-900 text-white border border-gray-600 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <img src={XLogo} alt="X logo" className="h-10 w-10" />
              <span>{loading ? "Connecting..." : "Connect X"}</span>
            </Button>

          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 border border-gray-800 rounded-full px-3 py-1.5">
              {/* Wallet Address - Opens Wallet Details */}
              {/* <button
                  className="text-sm hover:underline"
                  // onClick={() => setShowWalletDetails(true)}
                  onClick={initWallet}
              >
                {shortenAddress(wallet?.publicKey || "")}wallet
              </button> */}
              {!connected ? (
                // <Button
                //   onClick={handleConnectWallet}
                //   className="rounded-full bg-black hover:bg-gray-900 text-white "
                // >
                //   <img
                //     src={PhantomLogo}
                //     alt="Phantom logo"
                //     className="h-4 w-4 mr-2"
                //   />
                //   Connect Wallet
                // </Button>
                <button
                  className="text-sm hover:underline"
                  onClick={() => setShowWalletDetails(true)}
                >
                  {shortenAddress(wallet?.publicKey || "")}
                </button>
              ) : (
                <Button
                  onClick={() => { }}
                  className="rounded-full bg-black hover:bg-gray-900 text-white "
                >
                  <img
                    src={PhantomLogo}
                    alt="Phantom logo"
                    className="h-4 w-4 mr-2"
                  />
                  Disconnect Wallet {shortenAddress(publicKey?.toString() || "")}
                </Button>
              )}
              <span className="text-gray-400">|</span>

              {/* Twitter Username - Opens Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm hover:underline">
                    {user?.twitterHandle ?? 'Guest'}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-secondary border border-gray-800 text-white">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                    onClick={() => setShowLogoutConfirm(true)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Wallet Details Dialog */}
            <WalletDialogue
              showWalletDetails={showWalletDetails}
              setShowWalletDetails={setShowWalletDetails}
              wallet={wallet}
            />

            {/* Logout Confirmation Dialog */}
            <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
              <AlertDialogContent className="w-[90%] max-w-md mx-auto bg-secondary border border-gray-800 text-white p-4 sm:p-6">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl sm:text-2xl font-medium">Are you sure you want to sign out?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400 text-sm sm:text-base">
                    You will need to connect your X account again to access your NFTs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 pt-4">
                  <AlertDialogCancel className="w-full sm:w-auto bg-transparent border border-gray-700 text-white hover:bg-gray-800 hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </nav>
  );
}



function WalletDialogue({
  showWalletDetails,
  setShowWalletDetails,
  wallet
}: {
  showWalletDetails: boolean;
  setShowWalletDetails: (value: boolean) => void;
  wallet: any;
}) {
  const { toast } = useToast();
  const [balance, setBalance] = useState(0);
  const copyWalletAddress = () => {
    if (wallet?.publicKey) {
      navigator.clipboard.writeText(wallet.publicKey);
      toast({
        title: "Wallet address copied",
        description: "Your wallet address has been copied to clipboard",
      });
    }
  };

  const openInSolanaExplorer = () => {
    if (wallet?.publicKey) {
      window.open(`https://explorer.solana.com/address/${wallet.publicKey}?cluster=devnet`, "_blank");
    }
  };
  async function getBalance() {
    if (wallet?.publicKey) {
      const res = await fetch(`${BASE_URL}/api/wallet/balance/${wallet.publicKey}`);
      const { data } = await res.json();
      const resultBalance = data.balance;
      console.log(data, 'data get ablance')
      setBalance(resultBalance || 0);
      toast({
        title: "Wallet balance fetched",
        description: `Your wallet balance is ${resultBalance} SOL`,
      });
    }
  }

  useEffect(() => {
    if (showWalletDetails) getBalance();
  }, [showWalletDetails])


  return (
    <Dialog open={showWalletDetails} onOpenChange={setShowWalletDetails}>
      <DialogContent className="w-[90%] max-w-md mx-auto bg-secondary border border-gray-800 text-white p-4 sm:p-6">
        <DialogClose className="absolute right-3 top-3 text-gray-400 hover:text-white" />
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-medium mb-2">Wallet Details</DialogTitle>
          <DialogDescription className="text-gray-300 text-sm sm:text-base">
            Your Solana wallet on the Devnet network.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 sm:mb-6">
            <h4 className="text-sm text-gray-400 mb-1">Wallet Address</h4>
            <div className="flex flex-col sm:flex-row sm:items-center bg-black p-2 sm:p-3 rounded-lg border border-gray-800">
              <span className="text-xs sm:text-sm break-all mb-2 sm:mb-0">{wallet?.publicKey}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto text-gray-400 hover:text-white"
                onClick={copyWalletAddress}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <h4 className="text-sm text-gray-400 mb-1">Network</h4>
            <p className="text-xs sm:text-sm bg-black p-2 sm:p-3 rounded-lg border border-gray-800">Solana Devnet</p>
          </div>

          <div className="mb-4">
            <h4 className="text-sm text-gray-400 mb-1">Balance</h4>
            {balance || 0} SOL
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={openInSolanaExplorer}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            <span className="text-sm">View on Solana Explorer</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
