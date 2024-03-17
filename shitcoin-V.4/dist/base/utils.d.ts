/// <reference types="@solana/web3.js" />
import { web3 } from "@project-serum/anchor";
import { Result } from "./types";
export declare function calcNonDecimalValue(value: number, decimals: number): number;
export declare function calcDecimalValue(value: number, decimals: number): number;
export declare function getKeypairFromStr(str: string): web3.Keypair | null;
export declare function getNullableResutFromPromise<T>(value: Promise<T>, opt?: {
    or?: T;
    logError?: boolean;
}): Promise<T | null>;
export declare function sleep(ms: number): Promise<unknown>;
export declare function createLookupTable(connection: web3.Connection, signer: web3.Keypair, addresses?: web3.PublicKey[]): Promise<Result<{
    txSignature: string;
    lookupTable: string;
}, string>>;
