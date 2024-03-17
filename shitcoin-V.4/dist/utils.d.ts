/// <reference types="@solana/web3.js" />
import { web3 } from "@project-serum/anchor";
import { Percent } from "@raydium-io/raydium-sdk";
export declare function calcNonDecimalValue(value: number, decimals: number): number;
export declare function calcDecimalValue(value: number, decimals: number): number;
export declare function getKeypairFromStr(str: string): web3.Keypair | null;
export declare function getNullableResutFromPromise<T>(value: Promise<T>, opt?: {
    or?: T;
    logError?: boolean;
}): Promise<T | null>;
export declare function getSlippage(value?: number): Percent;
export declare function getKeypairFromEnv(): web3.Keypair;
export declare function deployJsonData(data: any): Promise<string | null>;
export declare function sleep(ms: number): Promise<unknown>;
export declare function getPubkeyFromStr(str?: string): web3.PublicKey | null;
export declare function sendAndConfirmTransaction(tx: web3.VersionedTransaction | web3.Transaction, connection: web3.Connection): Promise<string | null>;
