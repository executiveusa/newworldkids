import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_KEY = process.env.VITE_NFT_STORAGE_KEY as string;
const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY });

export class BlockchainService {
  private connection: Connection;
  private provider: AnchorProvider;

  constructor(connection: Connection, provider: AnchorProvider) {
    this.connection = connection;
    this.provider = provider;
  }

  async mintNFTBadge(
    metadata: {
      name: string;
      description: string;
      image: File;
      attributes: Array<{ trait_type: string; value: string }>;
    }
  ) {
    try {
      // Upload metadata to IPFS
      const metadataUrl = await nftStorage.store({
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: metadata.attributes,
      });

      // Create mint account
      const mintAccount = web3.Keypair.generate();
      const tokenAccount = web3.Keypair.generate();

      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: this.provider.wallet.publicKey,
          newAccountPubkey: mintAccount.publicKey,
          space: 82,
          lamports: await this.connection.getMinimumBalanceForRentExemption(82),
          programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        })
      );

      // Sign and send transaction
      const signature = await this.provider.send(transaction, [mintAccount, tokenAccount]);
      
      return {
        signature,
        mintAccount: mintAccount.publicKey.toString(),
        tokenAccount: tokenAccount.publicKey.toString(),
        metadataUrl: metadataUrl.url,
      };
    } catch (error) {
      console.error('Error minting NFT badge:', error);
      throw error;
    }
  }

  async processDonation(amount: number, projectPubKey: string) {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: this.provider.wallet.publicKey,
          toPubkey: new PublicKey(projectPubKey),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await this.provider.send(transaction, []);
      
      return {
        signature,
        amount,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error processing donation:', error);
      throw error;
    }
  }

  async getTransactionHistory(pubKey: string) {
    try {
      const signatures = await this.connection.getSignaturesForAddress(
        new PublicKey(pubKey),
        { limit: 10 }
      );

      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          const tx = await this.connection.getTransaction(sig.signature);
          return {
            signature: sig.signature,
            timestamp: sig.blockTime ? new Date(sig.blockTime * 1000).toISOString() : null,
            amount: tx?.meta?.fee || 0,
          };
        })
      );

      return transactions;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  }
}
