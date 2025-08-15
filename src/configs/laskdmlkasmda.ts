import { mplBubblegum } from '@metaplex-foundation/mpl-bubblegum';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'

// Use the RPC endpoint of your choice.
const umi = createUmi('http://api.devnet.solana.com')
umi.use(mplBubblegum());

export default umi;
