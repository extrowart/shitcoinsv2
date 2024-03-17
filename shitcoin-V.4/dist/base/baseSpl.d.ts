/// <reference types="@solana/web3.js" />
/// <reference types="node" />
import { web3 } from "@project-serum/anchor";
export type CreateTokenOptions = {
    mintAuthority: web3.PublicKey;
    /** default (`mintAuthority`) */
    payer?: web3.PublicKey;
    /** default (`mintAuthority`) */
    freezAuthority?: web3.PublicKey;
    /** default (`0`) */
    decimal?: number;
    /** default (`Keypair.genrate()`) */
    mintKeypair?: web3.Keypair;
    mintingInfo?: {
        /** default (`mintAuthority`) */
        tokenReceiver?: web3.PublicKey;
        /** default (`1`) */
        tokenAmount?: number;
        /** default (`false`) */
        allowOffCurveOwner?: boolean;
    };
};
export type GetOrCreateTokenAccountOptions = {
    mint: web3.PublicKey;
    owner: web3.PublicKey;
    /** default (`owner`) */
    payer?: web3.PublicKey;
    /** default (`false`) */
    allowOffCurveOwner?: boolean;
    checkCache?: boolean;
};
export type MintToInput = {
    mintAuthority: web3.PublicKey | string;
    /** default (`mintAuthority`) */
    receiver?: web3.PublicKey | string;
    mint: web3.PublicKey | string;
    /** default (`1`) */
    amount?: number;
    /** default (`false`) */
    receiverIsOffCurve?: boolean;
    /** default (`false`) */
    init_if_needed?: boolean;
    /** default (`null`) fetch from mint*/
    mintDecimal?: number;
};
export type TransferInput = {
    sender: web3.PublicKey | string;
    receiver: web3.PublicKey | string;
    mint: web3.PublicKey | string;
    /** default (`1`) */
    amount?: number;
    receiverIsOffCurve?: boolean;
    /** get decimal from onchain token data if not found provided */
    decimal?: number;
    init_if_needed?: boolean;
    /** default (`sender`) */
    payer?: web3.PublicKey | string;
};
export type BurnInput = {
    mint: web3.PublicKey | string;
    owner: web3.PublicKey | string;
    amount?: number;
    decimal?: number;
};
export type TranferMintAuthority = {
    mint: web3.PublicKey;
    currentAuthority: web3.PublicKey;
    newAuthority: web3.PublicKey;
};
export type RevokeAuthorityInput = {
    authorityType: "MINTING" | "FREEZING";
    mint: web3.PublicKey;
    currentAuthority: web3.PublicKey;
};
export declare class BaseSpl {
    private connection;
    private splIxs;
    private cacheAta;
    constructor(connection: web3.Connection);
    __reinit(): void;
    createToken(opts: CreateTokenOptions): Promise<{
        mintKeypair: web3.Keypair;
        ixs: web3.TransactionInstruction[];
    }>;
    createTokenAccount(mint: web3.PublicKey, owner: web3.PublicKey, allowOffCurveOwner?: boolean, payer?: web3.PublicKey): {
        ata: web3.PublicKey;
        ix: web3.TransactionInstruction;
    };
    getOrCreateTokenAccount(input: GetOrCreateTokenAccountOptions, ixCallBack?: (ixs?: web3.TransactionInstruction[]) => void): Promise<{
        ata: web3.PublicKey;
        ix: web3.TransactionInstruction | null;
    }>;
    getMintToInstructions(input: MintToInput): Promise<web3.TransactionInstruction[]>;
    transfer(input: TransferInput): Promise<web3.TransactionInstruction[]>;
    burn(input: BurnInput): Promise<web3.TransactionInstruction>;
    tranferMintAuthority(input: TranferMintAuthority, ixCallBack?: (ixs?: web3.TransactionInstruction[]) => void): {
        ix: web3.TransactionInstruction;
    };
    tranferFreezAuthority(input: TranferMintAuthority, ixCallBack?: (ixs?: web3.TransactionInstruction[]) => void): {
        ix: web3.TransactionInstruction;
    };
    revokeAuthority(input: RevokeAuthorityInput, ixCallBack?: (ixs?: web3.TransactionInstruction[]) => void): web3.TransactionInstruction;
    listAllOwnerTokens(owner: web3.PublicKey | string): Promise<{
        token: web3.PublicKey;
        amount: number;
    }[]>;
    getMint(mint: web3.PublicKey | string): Promise<import("@solana/spl-token").Mint>;
    static getTokenAccountFromAccountInfo(accountInfo: web3.AccountInfo<Buffer> | null): import("@solana/spl-token").RawAccount | null;
    getSolBalance(user: web3.PublicKey): Promise<number | null>;
}
