/// <reference types="@solana/web3.js" />
/// <reference types="bn.js" />
import { web3 } from "@project-serum/anchor";
import { LiquidityPoolJsonInfo, LiquidityPoolKeysV4, TokenAmount, Percent, LiquidityPoolKeys, SwapSide } from '@raydium-io/raydium-sdk';
import { BaseRayInput } from "./types";
import { BN } from '@project-serum/anchor';
import { Result } from "./types";
export type CreateMarketInput = {
    baseMint: web3.PublicKey;
    quoteMint: web3.PublicKey;
    tickers: {
        lotSize: number;
        tickSize: number;
    };
};
export type AddLiquidityInput = {
    user: web3.PublicKey;
    poolKeys: LiquidityPoolKeys;
    baseMintAmount: number | BN;
    quoteMintAmount: number | BN;
    fixedSide: 'base' | 'quote';
};
export type RemoveLiquidityInput = {
    user: web3.PublicKey;
    poolKeys: LiquidityPoolKeys;
    amount: number;
};
export type BuyFromPoolInput = {
    poolKeys: LiquidityPoolKeys;
    amountIn: TokenAmount;
    amountOut: TokenAmount;
    user: web3.PublicKey;
    fixedSide: SwapSide;
    tokenAccountIn: web3.PublicKey;
    tokenAccountOut: web3.PublicKey;
};
export type CreatePoolInput = {
    baseMint: web3.PublicKey;
    quoteMint: web3.PublicKey;
    marketId: web3.PublicKey;
    baseMintAmount: number;
    quoteMintAmount: number;
};
export type ComputeBuyAmountInput = {
    poolKeys: LiquidityPoolKeys;
    user: web3.PublicKey;
    amount: number;
    inputAmountType: 'send' | 'receive';
    buyToken: 'base' | 'quote';
    /** default (1 %) */
    slippage?: Percent;
};
export type ComputeAnotherAmountInput = {
    poolKeys: LiquidityPoolKeysV4;
    amount: number;
    /** default( `true` ) */
    isRawAmount?: boolean;
    /** default( `Percent(1, 100)` = 1%) */
    slippage?: Percent;
    fixedSide: 'base' | 'quote';
};
export declare class BaseRay {
    private connection;
    private baseSpl;
    private cacheIxs;
    private pools;
    private cachedPoolKeys;
    ammProgramId: web3.PublicKey;
    private orderBookProgramId;
    private feeDestinationId;
    constructor(input: BaseRayInput);
    getMarketInfo(marketId: web3.PublicKey): Promise<{
        baseLotSize: BN;
        quoteLotSize: BN;
        baseVault: web3.PublicKey;
        quoteVault: web3.PublicKey;
        baseMint: web3.PublicKey;
        quoteMint: web3.PublicKey;
        ownAddress: web3.PublicKey;
        vaultSignerNonce: BN;
        baseDepositsTotal: BN;
        baseFeesAccrued: BN;
        quoteDepositsTotal: BN;
        quoteFeesAccrued: BN;
        quoteDustThreshold: BN;
        requestQueue: web3.PublicKey;
        eventQueue: web3.PublicKey;
        bids: web3.PublicKey;
        asks: web3.PublicKey;
        feeRateBps: BN;
        referrerRebatesAccrued: BN;
    } | null>;
    private ixsAdderCallback;
    reInit: () => never[];
    getPoolInfo: (poolId: string) => LiquidityPoolJsonInfo | undefined;
    getPoolKeys(poolId: web3.PublicKey): Promise<LiquidityPoolKeys>;
    private addPoolKeys;
    addLiquidity(input: AddLiquidityInput): Promise<{
        ixs: web3.TransactionInstruction[];
        signers: web3.Signer[];
    }>;
    removeLiquidity(input: RemoveLiquidityInput): Promise<Result<{
        ixs: web3.TransactionInstruction[];
    }, string>>;
    removeLiquidityFaster(input: RemoveLiquidityInput): Promise<Result<{
        ixs: web3.TransactionInstruction[];
    }, string>>;
    buyFromPool(input: BuyFromPoolInput): Promise<{
        ixs: web3.TransactionInstruction[];
        signers: web3.Signer[];
    }>;
    createPool(input: CreatePoolInput, user: web3.PublicKey): Promise<{
        ixs: web3.TransactionInstruction[];
        signers: web3.Signer[];
        poolId: web3.PublicKey;
        baseAmount: BN;
        quoteAmount: BN;
        baseDecimals: number;
        quoteDecimals: number;
    }>;
    createMarket(input: CreateMarketInput, user: web3.PublicKey): Promise<Result<{
        marketId: web3.PublicKey;
        vaultInstructions: web3.TransactionInstruction[];
        vaultSigners: web3.Signer[];
        marketInstructions: web3.TransactionInstruction[];
        marketSigners: web3.Signer[];
    }, string>>;
    computeBuyAmount(input: ComputeBuyAmountInput, etc?: {
        extraBaseResever?: number;
        extraQuoteReserve?: number;
        extraLpSupply?: number;
    }): Promise<{
        amountIn: TokenAmount;
        amountOut: TokenAmount;
        tokenAccountIn: web3.PublicKey;
        tokenAccountOut: web3.PublicKey;
        fixedSide: SwapSide;
    }>;
    computeAnotherAmount({ amount, fixedSide, poolKeys, isRawAmount, slippage }: ComputeAnotherAmountInput): Promise<{
        baseMintAmount: BN;
        quoteMintAmount: BN;
        liquidity: BN;
    }>;
}
