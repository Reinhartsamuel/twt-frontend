import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MyNFT from "@/pages/MyNFT";
import Explore from "@/pages/Explore";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ProfileSidebar from "@/components/ProfileSidebar";
import { SolanaProvider } from "./providers/Solana";
import { useSidebar } from "@/hooks/useSidebar";
import { useEffect } from "react";
import { dummyProfileData, getRandomProfile } from "@/data/dummyProfileData";
import { Buffer } from 'buffer';
import Creators from "./pages/Creators";

   if (typeof window !== 'undefined') {
     window.Buffer = Buffer;
   }
function Router() {
  const { setMobile } = useSidebar();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setMobile]);

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

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <ProfileSidebar
        user={mockUser}
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
      />  
      <div className="lg:ml-80 pt-16 px-4 lg:px-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/my-nfts" component={MyNFT} />
          <Route path="/explore" component={Explore} />
          <Route path="/creators" component={Creators} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <SolanaProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </SolanaProvider>
  );
}

export default App;
