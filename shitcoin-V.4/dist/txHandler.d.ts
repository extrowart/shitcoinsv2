/// <reference types="@solana/web3.js" />
import { web3 } from "@project-serum/anchor";
import { Result } from "./base/types";
import { AddLiquidityInput, BundleRes, CreateAndBuy, CreateMarketInput, CreatePoolInput, CreateTokenInput, RemoveLiquidityInput, SwapInput } from "./types";
import BN from "bn.js";
export declare function createToken(input: CreateTokenInput): Promise<Result<{
    tokenId: string;
    txSignature: string;
}, string>>;
export declare function addLiquidity(input: AddLiquidityInput): Promise<Result<{
    txSignature: string;
}, string>>;
export declare function removeLiquidityFaster(input: RemoveLiquidityInput): Promise<Result<{
    txSignature: string;
}, string>>;
export declare function removeLiquidity(input: RemoveLiquidityInput): Promise<Result<{
    txSignature: string;
}, string>>;
export declare function createMarket(input: CreateMarketInput): Promise<Result<{
    marketId: string;
    txSignature: string;
}, string>>;
export declare function createPool(input: CreatePoolInput): Promise<Result<{
    poolId: string;
    txSignature: string;
    baseAmount: BN;
    quoteAmount: BN;
    baseDecimals: number;
    quoteDecimals: number;
}, string>>;
export declare function swap(input: SwapInput): Promise<Result<{
    txSignature: string;
}, string>>;
export declare function unwrapSol(url: 'mainnet' | 'devnet'): Promise<void>;
export declare function mintTo(input: {
    token: web3.PublicKey;
    amount: number;
    url: 'mainnet' | 'devnet';
}): Promise<void>;
export declare function revokeAuthority(input: {
    token: web3.PublicKey;
    url: 'mainnet' | 'devnet';
}): Promise<void>;
export declare function createAndBuy(input: CreateAndBuy): Promise<Result<{
    bundleId: string;
    poolId: string;
    createPoolTxSignature: string;
    buyTxSignature: string;
    bundleStatus: number;
}, {
    bundleId: string;
    poolId: string;
} | string>>;
export declare function sendBundle(txs: web3.VersionedTransaction[], feePayerAuthority: web3.Keypair, bundleTips: number, connection: web3.Connection): Promise<Result<{
    bundleId: string;
    txsSignature: string[];
    bundleStatus: number;
}, {
    bundleId: string;
} | string>>;
export declare function getBundleInfo(bundleId: string): Promise<BundleRes>;
