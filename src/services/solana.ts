import {
    airdropFactory,
    createSolanaRpc,
    createSolanaRpcSubscriptions,
    generateKeyPairSigner,
    lamports
} from "@solana/kit";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from 'bs58';


export async function reqAirdrop() {
  try {
    const connection = new Connection("http://127.0.0.1:8899");

    // ✅ Use only one Keypair
    const user = Keypair.generate();
    const privateKey = bs58.encode(user.secretKey);

    console.log('👜 Wallet:', user.publicKey.toBase58());
    console.log('🔐 Private Key:', privateKey);

    // ✅ Request native airdrop
    const sig = await connection.requestAirdrop(user.publicKey, 2 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(sig, 'confirmed');

    const balance = await connection.getBalance(user.publicKey);
    console.log(`💰 Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
    console.error(err, 'reqAirdrop');
  }
}

