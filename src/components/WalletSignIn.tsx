import { useWallet } from '@solana/wallet-adapter-react';
import type { SolanaSignInInput } from '@solana/wallet-standard-features';
import { verifySignIn } from '@solana/wallet-standard-util';
import bs58 from 'bs58';
import React, { useCallback, type FC } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export const WalletSignIn: FC = () => {
  const { signIn, publicKey } = useWallet();
  const toast = useToast();

  const onClick = useCallback(async () => {
    try {
      if (!signIn) throw new Error('Wallet does not support Sign In With Solana!');

      const input: SolanaSignInInput = {
        domain: window.location.host,
        address: publicKey ? publicKey.toBase58() : undefined,
        statement: 'Please sign in.',
      };
      const output = await signIn(input);

      if (!verifySignIn(input, output)) throw new Error('Sign In verification failed!');
      toast({
        title: "Successfully connected!",
        description: "Your X account has been connected and a Solana wallet has been created for you.",
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Sign In failed: ${error?.message}`,
        variant: 'destructive',
      });
    }
  }, [signIn, publicKey, toast]);

  return (
    <Button onClick={onClick} disabled={!signIn}>
      Connect wallet
    </Button>
  );
};
