/// <reference types="@solana/web3.js" />
/// <reference types="node" />
import { AnchorProvider, Wallet, web3 } from "@project-serum/anchor";
import { BaseSpl } from "./baseSpl";
import { TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { CreateNftBuilderParams, Metaplex } from "@metaplex-foundation/js";
import { MPLTokenInfo } from "./types";
type MPLTransferInput = {
    mint: web3.PublicKey | string;
    sender: web3.PublicKey | string;
    receiver: web3.PublicKey | string;
    /** default it take a single one token easy for NFT, SFT */
    amount?: number;
    /** default (`true`)*/
    init_ata_if_needed?: boolean;
    tokenStandard: TokenStandard;
    /** default (`false`)*/
    isPNFT?: boolean;
};
type BurnInput = {
    mint: web3.PublicKey | string;
    owner: web3.PublicKey | string;
    /** default it burn a single one token easy for NFT, SFT */
    amount?: number;
    /** default(`get from the onchain data`) */
    decimal?: number;
};
export declare class BaseMpl {
    connection: web3.Connection;
    mplIxs: web3.TransactionInstruction[];
    mplSigns: web3.Keypair[];
    metaplex: Metaplex;
    provider: AnchorProvider;
    baseSpl: BaseSpl;
    constructor(wallet: Wallet, web3Config: {
        endpoint: string;
    });
    setUpCallBack: (ixs: web3.TransactionInstruction[], signs: web3.Keypair[]) => void;
    reinit(wallet: Wallet): void;
    static getEditionAccount(tokenId: web3.PublicKey): web3.PublicKey;
    static getMetadataAccount(tokenId: web3.PublicKey): web3.PublicKey;
    static getCollectionAuthorityRecordAccount(collection: web3.PublicKey, authority: web3.PublicKey): web3.PublicKey;
    createToken(input: CreateNftBuilderParams, opts: {
        decimal?: number;
        mintAmount?: number;
        mintKeypair?: web3.Keypair;
        revokeAuthorities?: boolean;
    }): Promise<{
        txSignature: string;
        token: string;
    } | null>;
    transfer(input: MPLTransferInput): Promise<string | undefined>;
    burn(input: BurnInput): Promise<string>;
    getTokenInfo(mint: web3.PublicKey | string): Promise<MPLTokenInfo>;
    getAndCheckTokenName(mint: web3.PublicKey, defaultName?: string): Promise<string | null>;
    static getTokenNameFromAccountInfo(accountInfo: web3.AccountInfo<Buffer> | null): string | undefined;
    getRevokeMetadataAuthIx(token: web3.PublicKey, owner: web3.PublicKey): web3.TransactionInstruction;
}
export {};
