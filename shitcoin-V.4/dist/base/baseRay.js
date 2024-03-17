"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRay = void 0;
var anchor_1 = require("@project-serum/anchor");
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var spl_token_1 = require("@solana/spl-token");
var baseSpl_1 = require("./baseSpl");
var spl_token_2 = require("@solana/spl-token");
var orderbookUtils_1 = require("./orderbookUtils");
var openbook_1 = require("@openbook-dex/openbook");
var anchor_2 = require("@project-serum/anchor");
var getMarketAccountSizes_1 = __importDefault(require("./getMarketAccountSizes"));
var utils_1 = require("./utils");
var bigint_buffer_1 = require("bigint-buffer");
var log = console.log;
var BaseRay = /** @class */ (function () {
    function BaseRay(input) {
        var _this = this;
        this.ixsAdderCallback = function (ixs) {
            var _a;
            if (ixs === void 0) { ixs = []; }
            (_a = _this.cacheIxs).push.apply(_a, ixs);
        };
        this.reInit = function () { return _this.cacheIxs = []; };
        this.getPoolInfo = function (poolId) { return _this.pools.get(poolId); };
        this.connection = new anchor_1.web3.Connection(input.rpcEndpointUrl, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
        this.baseSpl = new baseSpl_1.BaseSpl(this.connection);
        this.cacheIxs = [];
        this.cachedPoolKeys = new Map();
        this.pools = new Map();
        if (input.rpcEndpointUrl == "https://api.devnet.solana.com") {
            this.ammProgramId = new anchor_1.web3.PublicKey("HWy1jotHpo6UqeQxx49dpYYdQB8wj9Qk9MdxwjLvDHB8");
            this.feeDestinationId = new anchor_1.web3.PublicKey("3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR");
            this.orderBookProgramId = new anchor_1.web3.PublicKey("EoTcMgcDRTJVZDMZWBoU6rhYHZfkNTVEAfz3uUJRcYGj");
        }
        else {
            this.feeDestinationId = new anchor_1.web3.PublicKey("7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5");
            this.ammProgramId = new anchor_1.web3.PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8");
            this.orderBookProgramId = new anchor_1.web3.PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX");
        }
        // let liquidityJson: any = {};
        // try {
        //   liquidityJson = JSON.parse(fs.readFileSync("./rayRes.json").toString());
        // } catch (error) {
        //   this.fetchPools()
        // }
        // const officialPools = liquidityJson?.official ?? [];
        // const unOfficialPools = liquidityJson?.unOfficial ?? [];
        // for (let pool of officialPools) this.pools.set(pool.id, pool)
        // for (let pool of unOfficialPools) this.pools.set(pool.id, pool)
    }
    BaseRay.prototype.getMarketInfo = function (marketId) {
        return __awaiter(this, void 0, void 0, function () {
            var marketAccountInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.getAccountInfo(marketId).catch(function (error) { return null; })];
                    case 1:
                        marketAccountInfo = _a.sent();
                        if (!marketAccountInfo)
                            throw "Market not found";
                        try {
                            return [2 /*return*/, raydium_sdk_1.Market.getLayouts(3).state.decode(marketAccountInfo.data)];
                        }
                        catch (parseMeketDataError) {
                            // log({ parseMeketDataError })
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    BaseRay.prototype.getPoolKeys = function (poolId) {
        return __awaiter(this, void 0, void 0, function () {
            var cache2, accountInfo, poolState, version, poolAccountOwner, _a, authority, baseDecimals, baseMint, baseVault, configId, id, lookupTableAccount, lpDecimals, lpMint, lpVault, marketAuthority, marketId, marketProgramId, marketVersion, nonce, openOrders, programId, quoteDecimals, quoteMint, quoteVault, targetOrders, 
            // version,
            withdrawQueue, marketState, marketAccountInfo, marketBaseVault, marketQuoteVault, marketEventQueue, marketBids, marketAsks, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.pools)
                            this.pools = new Map();
                        if (!this.cachedPoolKeys)
                            this.cachedPoolKeys = new Map();
                        cache2 = this.cachedPoolKeys.get(poolId.toBase58());
                        if (cache2) {
                            return [2 /*return*/, cache2];
                        }
                        return [4 /*yield*/, this.connection.getAccountInfo(poolId)];
                    case 1:
                        accountInfo = _b.sent();
                        if (!accountInfo)
                            throw "Pool info not found";
                        poolState = undefined;
                        version = undefined;
                        poolAccountOwner = accountInfo.owner;
                        if (accountInfo.data.length == raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V4.span) {
                            poolState = raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V4.decode(accountInfo.data);
                            version = 4;
                        }
                        else if (accountInfo.data.length == raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V5.span) {
                            poolState = raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V5.decode(accountInfo.data);
                            version = 5;
                        }
                        else
                            throw "Invalid Pool data lenght";
                        if (!poolState || !version)
                            throw "Invalid pool address";
                        _a = raydium_sdk_1.Liquidity.getAssociatedPoolKeys({
                            baseMint: poolState.baseMint,
                            baseDecimals: poolState.baseDecimal.toNumber(),
                            quoteMint: poolState.quoteMint,
                            quoteDecimals: poolState.quoteDecimal.toNumber(),
                            marketId: poolState.marketId,
                            marketProgramId: poolState.marketProgramId,
                            marketVersion: 3,
                            programId: poolAccountOwner,
                            version: version,
                        }), authority = _a.authority, baseDecimals = _a.baseDecimals, baseMint = _a.baseMint, baseVault = _a.baseVault, configId = _a.configId, id = _a.id, lookupTableAccount = _a.lookupTableAccount, lpDecimals = _a.lpDecimals, lpMint = _a.lpMint, lpVault = _a.lpVault, marketAuthority = _a.marketAuthority, marketId = _a.marketId, marketProgramId = _a.marketProgramId, marketVersion = _a.marketVersion, nonce = _a.nonce, openOrders = _a.openOrders, programId = _a.programId, quoteDecimals = _a.quoteDecimals, quoteMint = _a.quoteMint, quoteVault = _a.quoteVault, targetOrders = _a.targetOrders, withdrawQueue = _a.withdrawQueue;
                        if (lpMint.toBase58() != poolState.lpMint.toBase58()) {
                            throw "Found some invalid keys";
                        }
                        marketState = undefined;
                        return [4 /*yield*/, this.connection.getAccountInfo(marketId).catch(function (error) { return null; })];
                    case 2:
                        marketAccountInfo = _b.sent();
                        if (!marketAccountInfo)
                            throw "Market not found";
                        try {
                            marketState = raydium_sdk_1.Market.getLayouts(marketVersion).state.decode(marketAccountInfo.data);
                            // if (mProgramIdStr != _SERUM_PROGRAM_ID_V3 && mProgramIdStr != _OPEN_BOOK_DEX_PROGRAM) {
                            // }
                        }
                        catch (parseMeketDataError) {
                            log({ parseMeketDataError: parseMeketDataError });
                        }
                        if (!marketState)
                            throw "MarketState not found";
                        marketBaseVault = marketState.baseVault, marketQuoteVault = marketState.quoteVault, marketEventQueue = marketState.eventQueue, marketBids = marketState.bids, marketAsks = marketState.asks;
                        res = {
                            baseMint: baseMint,
                            quoteMint: quoteMint,
                            quoteDecimals: quoteDecimals,
                            baseDecimals: baseDecimals,
                            authority: authority,
                            baseVault: baseVault,
                            quoteVault: quoteVault,
                            id: id,
                            lookupTableAccount: lookupTableAccount,
                            lpDecimals: lpDecimals,
                            lpMint: lpMint,
                            lpVault: lpVault,
                            marketAuthority: marketAuthority,
                            marketId: marketId,
                            marketProgramId: marketProgramId,
                            marketVersion: marketVersion,
                            openOrders: openOrders,
                            programId: programId,
                            targetOrders: targetOrders,
                            version: version,
                            withdrawQueue: withdrawQueue,
                            marketAsks: marketAsks,
                            marketBids: marketBids,
                            marketBaseVault: marketBaseVault,
                            marketQuoteVault: marketQuoteVault,
                            marketEventQueue: marketEventQueue,
                        };
                        this.cachedPoolKeys.set(poolId.toBase58(), res);
                        // log({ poolKeys: res })
                        return [2 /*return*/, res];
                }
            });
        });
    };
    BaseRay.prototype.addPoolKeys = function (poolInfo, marketState) {
        var authority = poolInfo.authority, baseDecimals = poolInfo.baseDecimals, baseMint = poolInfo.baseMint, baseVault = poolInfo.baseVault, configId = poolInfo.configId, id = poolInfo.id, lookupTableAccount = poolInfo.lookupTableAccount, lpDecimals = poolInfo.lpDecimals, lpMint = poolInfo.lpMint, lpVault = poolInfo.lpVault, marketAuthority = poolInfo.marketAuthority, marketId = poolInfo.marketId, marketProgramId = poolInfo.marketProgramId, marketVersion = poolInfo.marketVersion, nonce = poolInfo.nonce, openOrders = poolInfo.openOrders, programId = poolInfo.programId, quoteDecimals = poolInfo.quoteDecimals, quoteMint = poolInfo.quoteMint, quoteVault = poolInfo.quoteVault, targetOrders = poolInfo.targetOrders, version = poolInfo.version, withdrawQueue = poolInfo.withdrawQueue;
        var marketBaseVault = marketState.baseVault, marketQuoteVault = marketState.quoteVault, marketEventQueue = marketState.eventQueue, marketBids = marketState.bids, marketAsks = marketState.asks;
        var res = {
            baseMint: baseMint,
            quoteMint: quoteMint,
            quoteDecimals: quoteDecimals,
            baseDecimals: baseDecimals,
            authority: authority,
            baseVault: baseVault,
            quoteVault: quoteVault,
            id: id,
            lookupTableAccount: lookupTableAccount,
            lpDecimals: lpDecimals,
            lpMint: lpMint,
            lpVault: lpVault,
            marketAuthority: marketAuthority,
            marketId: marketId,
            marketProgramId: marketProgramId,
            marketVersion: marketVersion,
            openOrders: openOrders,
            programId: programId,
            targetOrders: targetOrders,
            version: version,
            withdrawQueue: withdrawQueue,
            marketAsks: marketAsks,
            marketBids: marketBids,
            marketBaseVault: marketBaseVault,
            marketQuoteVault: marketQuoteVault,
            marketEventQueue: marketEventQueue,
        };
        this.cachedPoolKeys.set(id.toBase58(), res);
    };
    // async fetchPools() {
    //   const liquidityJsonStr = await (await fetch("https://api.raydium.io/v2/sdk/token/raydium.mainnet.json")).text();
    //   const liquidityJson = JSON.parse(liquidityJsonStr)
    //   const officialPools = liquidityJson?.official ?? [];
    //   const unOfficialPools = liquidityJson?.unOfficial ?? [];
    //   for (let pool of officialPools) this.pools.set(pool.id, pool)
    //   for (let pool of unOfficialPools) this.pools.set(pool.id, pool)
    //   fs.writeFileSync('./rayRes.json', liquidityJsonStr)
    //   log("Pool fetched")
    // }
    BaseRay.prototype.addLiquidity = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var poolKeys, baseAmount, quoteAmount, fixedSide, user, base, baseMintDecimals, quote, quoteMintDecimals, lpMint, lpTokenAccount, baseTokenAccount, quoteTokenAccount, baseAmountIn, quoteAmountIn, nativeAmount, nativeTokenAccount, sendSolIx, syncWSolAta, rayIxs, recentBlockhash, message, mainTx;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.reInit();
                        poolKeys = input.poolKeys, baseAmount = input.baseMintAmount, quoteAmount = input.quoteMintAmount, fixedSide = input.fixedSide;
                        user = input.user;
                        base = poolKeys.baseMint;
                        baseMintDecimals = poolKeys.baseDecimals;
                        quote = poolKeys.quoteMint;
                        quoteMintDecimals = poolKeys.quoteDecimals;
                        lpMint = poolKeys.lpMint;
                        return [4 /*yield*/, this.baseSpl.getOrCreateTokenAccount({ mint: lpMint, owner: user, checkCache: true }, this.ixsAdderCallback)];
                    case 1:
                        lpTokenAccount = (_b.sent()).ata;
                        return [4 /*yield*/, this.baseSpl.getOrCreateTokenAccount({ mint: base, owner: user, checkCache: true }, this.ixsAdderCallback)];
                    case 2:
                        baseTokenAccount = (_b.sent()).ata;
                        return [4 /*yield*/, this.baseSpl.getOrCreateTokenAccount({ mint: quote, owner: user, checkCache: true }, this.ixsAdderCallback)];
                    case 3:
                        quoteTokenAccount = (_b.sent()).ata;
                        if (typeof baseAmount == 'number' && typeof quoteAmount == 'number') {
                            baseAmountIn = (0, utils_1.calcNonDecimalValue)(baseAmount, baseMintDecimals).toString();
                            quoteAmountIn = (0, utils_1.calcNonDecimalValue)(quoteAmount, quoteMintDecimals).toString();
                        }
                        else {
                            baseAmountIn = baseAmount.toNumber().toString();
                            quoteAmountIn = quoteAmount.toNumber().toString();
                        }
                        if (base.toBase58() == spl_token_1.NATIVE_MINT.toBase58() || quote.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                            nativeAmount = void 0;
                            nativeTokenAccount = void 0;
                            if (base.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                                nativeTokenAccount = baseTokenAccount;
                                nativeAmount = baseAmountIn;
                            }
                            else {
                                nativeTokenAccount = quoteTokenAccount;
                                nativeAmount = quoteAmountIn;
                            }
                            sendSolIx = anchor_1.web3.SystemProgram.transfer({
                                fromPubkey: user,
                                toPubkey: nativeTokenAccount,
                                lamports: BigInt(nativeAmount)
                            });
                            syncWSolAta = (0, spl_token_2.createSyncNativeInstruction)(nativeTokenAccount, spl_token_1.TOKEN_PROGRAM_ID);
                            this.cacheIxs.push(sendSolIx, syncWSolAta);
                        }
                        rayIxs = raydium_sdk_1.Liquidity.makeAddLiquidityInstruction({
                            baseAmountIn: baseAmountIn,
                            quoteAmountIn: quoteAmountIn,
                            fixedSide: fixedSide,
                            poolKeys: poolKeys,
                            userKeys: {
                                baseTokenAccount: baseTokenAccount,
                                lpTokenAccount: lpTokenAccount,
                                owner: user,
                                quoteTokenAccount: quoteTokenAccount
                            }
                        }).innerTransaction;
                        return [4 /*yield*/, this.connection.getLatestBlockhash()];
                    case 4:
                        recentBlockhash = (_b.sent()).blockhash;
                        message = new anchor_1.web3.TransactionMessage({
                            instructions: __spreadArray(__spreadArray([], this.cacheIxs, true), rayIxs.instructions, true),
                            payerKey: user,
                            recentBlockhash: recentBlockhash
                        }).compileToV0Message();
                        mainTx = new anchor_1.web3.VersionedTransaction(message);
                        if (rayIxs.signers)
                            (_a = mainTx.signatures).push.apply(_a, rayIxs.signers);
                        return [2 /*return*/, {
                                ixs: __spreadArray(__spreadArray([], this.cacheIxs, true), rayIxs.instructions, true),
                                signers: __spreadArray([], rayIxs.signers, true)
                            }];
                }
            });
        });
    };
    BaseRay.prototype.removeLiquidity = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var user, poolKeys, baseMint, quoteMint, lpMint, lpDecimals, baseTokenAccount, quoteTokenAccount, lpTokenAccount, lpTokenAccountInfo, totalLp, totalLpD, amount, ixs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = input.user, poolKeys = input.poolKeys;
                        baseMint = poolKeys.baseMint, quoteMint = poolKeys.quoteMint, lpMint = poolKeys.lpMint, lpDecimals = poolKeys.lpDecimals;
                        return [4 /*yield*/, this.baseSpl.getOrCreateTokenAccount({ mint: baseMint, owner: user, checkCache: true }, this.ixsAdderCallback)];
                    case 1:
                        baseTokenAccount = (_a.sent()).ata;
                        return [4 /*yield*/, this.baseSpl.getOrCreateTokenAccount({ mint: quoteMint, owner: user, checkCache: true }, this.ixsAdderCallback)];
                    case 2:
                        quoteTokenAccount = (_a.sent()).ata;
                        return [4 /*yield*/, this.baseSpl.getOrCreateTokenAccount({ mint: lpMint, owner: user, checkCache: true }, this.ixsAdderCallback)];
                    case 3:
                        lpTokenAccount = (_a.sent()).ata;
                        return [4 /*yield*/, this.connection.getAccountInfo(lpTokenAccount)];
                    case 4:
                        lpTokenAccountInfo = _a.sent();
                        if (!lpTokenAccountInfo)
                            return [2 /*return*/, { Err: "No lp token found" }];
                        totalLp = Number(spl_token_1.AccountLayout.decode(lpTokenAccountInfo.data).amount.toString());
                        totalLpD = (0, utils_1.calcDecimalValue)(totalLp, lpDecimals);
                        log("lp token: ", lpMint.toBase58());
                        log("user lp token ata: ", lpTokenAccount.toBase58());
                        log("Total available lp tokens : ", totalLpD);
                        amount = (0, utils_1.calcNonDecimalValue)(input.amount, lpDecimals).toString();
                        if (Number(amount) > totalLp) {
                            return [2 /*return*/, { Err: "not have enought lp tokens" }];
                        }
                        if (input.amount == -1)
                            amount = totalLp.toString();
                        ixs = raydium_sdk_1.Liquidity.makeRemoveLiquidityInstruction({
                            amountIn: amount,
                            poolKeys: poolKeys,
                            userKeys: {
                                baseTokenAccount: baseTokenAccount,
                                lpTokenAccount: lpTokenAccount,
                                owner: user,
                                quoteTokenAccount: quoteTokenAccount
                            }
                        }).innerTransaction.instructions;
                        return [2 /*return*/, {
                                Ok: {
                                    ixs: __spreadArray(__spreadArray([], this.cacheIxs, true), ixs, true)
                                }
                            }];
                }
            });
        });
    };
    BaseRay.prototype.removeLiquidityFaster = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var user, poolKeys, baseMint, quoteMint, lpMint, lpDecimals, baseTokenAccount, quoteTokenAccount, lpTokenAccount, amount, ixs;
            return __generator(this, function (_a) {
                user = input.user, poolKeys = input.poolKeys;
                baseMint = poolKeys.baseMint, quoteMint = poolKeys.quoteMint, lpMint = poolKeys.lpMint, lpDecimals = poolKeys.lpDecimals;
                baseTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(baseMint, user);
                quoteTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(quoteMint, user);
                lpTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(lpMint, user);
                amount = input.amount;
                ixs = raydium_sdk_1.Liquidity.makeRemoveLiquidityInstruction({
                    amountIn: amount.toString(),
                    poolKeys: poolKeys,
                    userKeys: {
                        baseTokenAccount: baseTokenAccount,
                        lpTokenAccount: lpTokenAccount,
                        owner: user,
                        quoteTokenAccount: quoteTokenAccount
                    }
                }).innerTransaction.instructions;
                return [2 /*return*/, {
                        Ok: {
                            ixs: __spreadArray([], ixs, true)
                        }
                    }];
            });
        });
    };
    BaseRay.prototype.buyFromPool = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var amountIn, amountOut, poolKeys, user, fixedSide, tokenAccountIn, tokenAccountOut, baseMint, quoteMint, baseTokenAccount, quoteTokenAccount, inToken, lamports, sendSolIx, syncWSolAta, rayIxs, recentBlockhash, message, mainTx;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.reInit();
                        amountIn = input.amountIn, amountOut = input.amountOut, poolKeys = input.poolKeys, user = input.user, fixedSide = input.fixedSide, tokenAccountIn = input.tokenAccountIn, tokenAccountOut = input.tokenAccountOut;
                        baseMint = poolKeys.baseMint, quoteMint = poolKeys.quoteMint;
                        return [4 /*yield*/, this.baseSpl.getOrCreateTokenAccount({ mint: baseMint, owner: user, checkCache: true }, this.ixsAdderCallback)];
                    case 1:
                        baseTokenAccount = (_b.sent()).ata;
                        return [4 /*yield*/, this.baseSpl.getOrCreateTokenAccount({ mint: quoteMint, owner: user, checkCache: true }, this.ixsAdderCallback)];
                    case 2:
                        quoteTokenAccount = (_b.sent()).ata;
                        inToken = amountIn.token.mint;
                        if (inToken.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                            lamports = BigInt(amountIn.raw.toNumber());
                            sendSolIx = anchor_1.web3.SystemProgram.transfer({
                                fromPubkey: user,
                                toPubkey: tokenAccountIn,
                                lamports: lamports
                            });
                            syncWSolAta = (0, spl_token_2.createSyncNativeInstruction)(tokenAccountIn, spl_token_1.TOKEN_PROGRAM_ID);
                            this.cacheIxs.push(sendSolIx, syncWSolAta);
                        }
                        rayIxs = raydium_sdk_1.Liquidity.makeSwapInstruction({
                            poolKeys: poolKeys,
                            amountIn: amountIn.raw,
                            amountOut: amountOut.raw,
                            fixedSide: fixedSide,
                            userKeys: { owner: user, tokenAccountIn: tokenAccountIn, tokenAccountOut: tokenAccountOut },
                        }).innerTransaction;
                        return [4 /*yield*/, this.connection.getLatestBlockhash()];
                    case 3:
                        recentBlockhash = (_b.sent()).blockhash;
                        message = new anchor_1.web3.TransactionMessage({
                            instructions: __spreadArray(__spreadArray([], this.cacheIxs, true), rayIxs.instructions, true),
                            payerKey: user,
                            recentBlockhash: recentBlockhash
                        }).compileToV0Message();
                        mainTx = new anchor_1.web3.VersionedTransaction(message);
                        if (rayIxs.signers)
                            (_a = mainTx.signatures).push.apply(_a, rayIxs.signers);
                        return [2 /*return*/, {
                                ixs: __spreadArray(__spreadArray([], this.cacheIxs, true), rayIxs.instructions, true),
                                signers: __spreadArray([], rayIxs.signers, true)
                            }];
                }
            });
        });
    };
    BaseRay.prototype.createPool = function (input, user) {
        return __awaiter(this, void 0, void 0, function () {
            var userBaseAta, userQuoteAta, _a, baseMintAccountInfo, quoteMintAccountInfo, marketAccountInfo, userBaseAtaInfo, userQuoteAtaInfo, todo, buf, todo, buf, baseMintState, quoteMintState, marketInfo, baseMintInfo, quoteMintInfo, baseAmount, quoteAmount, poolInfo, marketState, startTime, createPoolIxs, ixs, signers, _i, createPoolIxs_1, ix;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.reInit();
                        userBaseAta = (0, spl_token_1.getAssociatedTokenAddressSync)(input.baseMint, user);
                        userQuoteAta = (0, spl_token_1.getAssociatedTokenAddressSync)(input.quoteMint, user);
                        return [4 /*yield*/, this.connection.getMultipleAccountsInfo([input.baseMint, input.quoteMint, input.marketId, userBaseAta, userQuoteAta]).catch(function () { return [null, null, null, null]; })];
                    case 1:
                        _a = _b.sent(), baseMintAccountInfo = _a[0], quoteMintAccountInfo = _a[1], marketAccountInfo = _a[2], userBaseAtaInfo = _a[3], userQuoteAtaInfo = _a[4];
                        if (!baseMintAccountInfo || !quoteMintAccountInfo || !marketAccountInfo)
                            throw "AccountInfo not found";
                        if (input.baseMint.toBase58() != spl_token_1.NATIVE_MINT.toBase58() && !userBaseAtaInfo)
                            throw "Don't have enought tokens";
                        else {
                            if (input.baseMint.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                                todo = anchor_1.web3.PublicKey.default;
                                buf = Buffer.alloc(raydium_sdk_1.SPL_ACCOUNT_LAYOUT.span);
                                raydium_sdk_1.SPL_ACCOUNT_LAYOUT.encode({
                                    mint: spl_token_1.NATIVE_MINT,
                                    amount: new anchor_2.BN(0),
                                    isNative: new anchor_2.BN(1),
                                    owner: user,
                                    closeAuthority: todo,
                                    closeAuthorityOption: 1,
                                    delegate: todo,
                                    delegatedAmount: new anchor_2.BN(1),
                                    delegateOption: 1,
                                    isNativeOption: 1,
                                    state: 1
                                }, buf);
                                userBaseAtaInfo = {
                                    data: buf,
                                };
                            }
                        }
                        if (input.quoteMint.toBase58() != spl_token_1.NATIVE_MINT.toBase58() && !userQuoteAtaInfo)
                            throw "Don't have enought tokens";
                        else {
                            if (input.quoteMint.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                                todo = anchor_1.web3.PublicKey.default;
                                buf = Buffer.alloc(raydium_sdk_1.SPL_ACCOUNT_LAYOUT.span);
                                raydium_sdk_1.SPL_ACCOUNT_LAYOUT.encode({
                                    mint: spl_token_1.NATIVE_MINT,
                                    amount: new anchor_2.BN(0),
                                    isNative: new anchor_2.BN(1),
                                    owner: user,
                                    closeAuthority: todo,
                                    closeAuthorityOption: 1,
                                    delegate: todo,
                                    delegatedAmount: new anchor_2.BN(1),
                                    delegateOption: 1,
                                    isNativeOption: 1,
                                    state: 1
                                }, buf);
                                userQuoteAtaInfo = {
                                    data: buf,
                                };
                            }
                        }
                        baseMintState = spl_token_1.MintLayout.decode(baseMintAccountInfo.data);
                        quoteMintState = spl_token_1.MintLayout.decode(quoteMintAccountInfo.data);
                        marketInfo = {
                            marketId: input.marketId,
                            programId: marketAccountInfo.owner
                        };
                        baseMintInfo = {
                            mint: input.baseMint,
                            decimals: baseMintState.decimals
                        };
                        quoteMintInfo = {
                            mint: input.quoteMint,
                            decimals: quoteMintState.decimals
                        };
                        baseAmount = new anchor_2.BN((0, bigint_buffer_1.toBufferBE)(BigInt((0, utils_1.calcNonDecimalValue)(input.baseMintAmount, baseMintState.decimals).toString()), 8));
                        quoteAmount = new anchor_2.BN((0, bigint_buffer_1.toBufferBE)(BigInt((0, utils_1.calcNonDecimalValue)(input.quoteMintAmount, quoteMintState.decimals).toString()), 8));
                        poolInfo = raydium_sdk_1.Liquidity.getAssociatedPoolKeys({
                            version: 4,
                            marketVersion: 3,
                            marketId: marketInfo.marketId,
                            baseMint: baseMintInfo.mint,
                            quoteMint: quoteMintInfo.mint,
                            baseDecimals: baseMintInfo.decimals,
                            quoteDecimals: quoteMintInfo.decimals,
                            programId: this.ammProgramId,
                            marketProgramId: marketInfo.programId,
                        });
                        marketState = raydium_sdk_1.Market.getLayouts(3).state.decode(marketAccountInfo.data);
                        this.addPoolKeys(poolInfo, marketState);
                        startTime = new anchor_2.BN(Math.trunc(Date.now() / 1000) - 4);
                        return [4 /*yield*/, raydium_sdk_1.Liquidity.makeCreatePoolV4InstructionV2Simple({
                                marketInfo: marketInfo,
                                baseMintInfo: baseMintInfo,
                                quoteMintInfo: quoteMintInfo,
                                baseAmount: baseAmount,
                                quoteAmount: quoteAmount,
                                associatedOnly: true,
                                checkCreateATAOwner: true,
                                connection: this.connection,
                                feeDestinationId: this.feeDestinationId,
                                makeTxVersion: raydium_sdk_1.TxVersion.LEGACY,
                                ownerInfo: {
                                    feePayer: user,
                                    tokenAccounts: [
                                        { accountInfo: raydium_sdk_1.SPL_ACCOUNT_LAYOUT.decode(userBaseAtaInfo.data), programId: spl_token_1.TOKEN_PROGRAM_ID, pubkey: userBaseAta },
                                        { accountInfo: raydium_sdk_1.SPL_ACCOUNT_LAYOUT.decode(userQuoteAtaInfo.data), programId: spl_token_1.TOKEN_PROGRAM_ID, pubkey: userQuoteAta }
                                    ],
                                    wallet: user,
                                    useSOLBalance: true
                                },
                                programId: this.ammProgramId,
                                startTime: startTime
                                // computeBudgetConfig: { microLamports: 250_000, units: 8000_000 },
                            })];
                    case 2:
                        createPoolIxs = (_b.sent()).innerTransactions;
                        ixs = [];
                        signers = [];
                        // ixs.push(...createPoolIxs.instructions)
                        // signers.push(...createPoolIxs.signers)
                        for (_i = 0, createPoolIxs_1 = createPoolIxs; _i < createPoolIxs_1.length; _i++) {
                            ix = createPoolIxs_1[_i];
                            ixs.push.apply(ixs, ix.instructions);
                            signers.push.apply(signers, ix.signers);
                        }
                        return [2 /*return*/, { ixs: ixs, signers: signers, poolId: raydium_sdk_1.Liquidity.getAssociatedId({ marketId: marketInfo.marketId, programId: this.ammProgramId }), baseAmount: baseAmount, quoteAmount: quoteAmount, baseDecimals: poolInfo.baseDecimals, quoteDecimals: poolInfo.quoteDecimals }];
                }
            });
        });
    };
    BaseRay.prototype.createMarket = function (input, user) {
        return __awaiter(this, void 0, void 0, function () {
            var Keypair, SystemProgram, baseMint, quoteMint, marketAccounts, programID, vaultInstructions, vaultSigners, _a, vaultOwner, vaultOwnerNonce, _b, _c, _d, _e, _f, _g, _h, _j, _k, baseMintAccountInfo, quoteMintAccountInfo, baseMintDecimals, quoteMintDecimals, tickers, baseLotSize, quoteLotSize, marketInstructions, marketSigners, _l, _m, _o, _p, _q, totalEventQueueSize, totalOrderbookSize, totalRequestQueueSize, _r, _s, _t, _u, _v, _w, _x, _y, orderBookRentExempt;
            var _z, _0, _1, _2, _3;
            return __generator(this, function (_4) {
                switch (_4.label) {
                    case 0:
                        Keypair = anchor_1.web3.Keypair, SystemProgram = anchor_1.web3.SystemProgram;
                        baseMint = input.baseMint, quoteMint = input.quoteMint;
                        marketAccounts = {
                            market: Keypair.generate(),
                            requestQueue: Keypair.generate(),
                            eventQueue: Keypair.generate(),
                            bids: Keypair.generate(),
                            asks: Keypair.generate(),
                            baseVault: Keypair.generate(),
                            quoteVault: Keypair.generate(),
                        };
                        programID = this.orderBookProgramId;
                        vaultInstructions = [];
                        vaultSigners = [];
                        return [4 /*yield*/, (0, orderbookUtils_1.getVaultOwnerAndNonce)(marketAccounts.market.publicKey, programID)];
                    case 1:
                        _a = _4.sent(), vaultOwner = _a[0], vaultOwnerNonce = _a[1];
                        _c = (_b = vaultInstructions.push).apply;
                        _d = [vaultInstructions];
                        _f = (_e = SystemProgram).createAccount;
                        _z = {
                            fromPubkey: user,
                            newAccountPubkey: marketAccounts.baseVault.publicKey
                        };
                        return [4 /*yield*/, this.connection.getMinimumBalanceForRentExemption(spl_token_1.ACCOUNT_SIZE)];
                    case 2:
                        _g = [
                            _f.apply(_e, [(_z.lamports = _4.sent(),
                                    _z.space = spl_token_1.ACCOUNT_SIZE,
                                    _z.programId = spl_token_1.TOKEN_PROGRAM_ID,
                                    _z)])
                        ];
                        _j = (_h = SystemProgram).createAccount;
                        _0 = {
                            fromPubkey: user,
                            newAccountPubkey: marketAccounts.quoteVault.publicKey
                        };
                        return [4 /*yield*/, this.connection.getMinimumBalanceForRentExemption(spl_token_1.ACCOUNT_SIZE)];
                    case 3:
                        _c.apply(_b, _d.concat([_g.concat([
                                _j.apply(_h, [(_0.lamports = _4.sent(),
                                        _0.space = spl_token_1.ACCOUNT_SIZE,
                                        _0.programId = spl_token_1.TOKEN_PROGRAM_ID,
                                        _0)]),
                                (0, spl_token_1.createInitializeAccountInstruction)(marketAccounts.baseVault.publicKey, baseMint, vaultOwner),
                                (0, spl_token_1.createInitializeAccountInstruction)(marketAccounts.quoteVault.publicKey, quoteMint, vaultOwner)
                            ])]));
                        vaultSigners.push(marketAccounts.baseVault, marketAccounts.quoteVault);
                        return [4 /*yield*/, this.connection.getMultipleAccountsInfo([baseMint, quoteMint])];
                    case 4:
                        _k = _4.sent(), baseMintAccountInfo = _k[0], quoteMintAccountInfo = _k[1];
                        if (!baseMintAccountInfo || !quoteMintAccountInfo)
                            return [2 /*return*/, { Err: "Invalid token address! Token not found" }];
                        try {
                            baseMintDecimals = spl_token_1.MintLayout.decode(baseMintAccountInfo.data).decimals;
                            quoteMintDecimals = spl_token_1.MintLayout.decode(quoteMintAccountInfo.data).decimals;
                        }
                        catch (error) {
                            return [2 /*return*/, { Err: "Invalid token address! Token not found" }];
                        }
                        tickers = input.tickers;
                        baseLotSize = new anchor_2.BN(Math.round(Math.pow(10, baseMintDecimals) * tickers.lotSize));
                        quoteLotSize = new anchor_2.BN(Math.round(tickers.lotSize * Math.pow(10, quoteMintDecimals) * tickers.tickSize));
                        if (baseLotSize.eq(raydium_sdk_1.ZERO))
                            return [2 /*return*/, { Err: 'lot size is too small' }];
                        if (quoteLotSize.eq(raydium_sdk_1.ZERO))
                            return [2 /*return*/, { Err: 'tick size or lot size is too small' }
                                // log({ baseLotSize: baseLotSize.toNumber() })
                                // log({ quoteLotSize: quoteLotSize.toNumber() })
                                // create market account
                            ];
                        marketInstructions = [];
                        marketSigners = [marketAccounts.market, marketAccounts.bids, marketAccounts.asks, marketAccounts.eventQueue, marketAccounts.requestQueue];
                        _m = (_l = marketInstructions).push;
                        _p = (_o = SystemProgram).createAccount;
                        _1 = {
                            newAccountPubkey: marketAccounts.market.publicKey,
                            fromPubkey: user,
                            space: openbook_1.Market.getLayout(programID).span
                        };
                        return [4 /*yield*/, this.connection.getMinimumBalanceForRentExemption(openbook_1.Market.getLayout(programID).span)];
                    case 5:
                        _m.apply(_l, [_p.apply(_o, [(_1.lamports = _4.sent(),
                                    _1.programId = programID,
                                    _1)])]);
                        _q = (0, getMarketAccountSizes_1.default)({
                            eventQueueLength: orderbookUtils_1.EVENT_QUEUE_LENGTH,
                            requestQueueLength: orderbookUtils_1.REQUEST_QUEUE_LENGTH,
                            orderbookLength: orderbookUtils_1.ORDERBOOK_LENGTH,
                        }, this.connection, programID), totalEventQueueSize = _q.totalEventQueueSize, totalOrderbookSize = _q.totalOrderbookSize, totalRequestQueueSize = _q.totalRequestQueueSize;
                        // create request queue
                        _s = (_r = marketInstructions).push;
                        _u = (_t = SystemProgram).createAccount;
                        _2 = {
                            newAccountPubkey: marketAccounts.requestQueue.publicKey,
                            fromPubkey: user,
                            space: totalRequestQueueSize
                        };
                        return [4 /*yield*/, this.connection.getMinimumBalanceForRentExemption(totalRequestQueueSize)];
                    case 6:
                        // create request queue
                        _s.apply(_r, [_u.apply(_t, [(_2.lamports = _4.sent(),
                                    _2.programId = programID,
                                    _2)])]);
                        // create event queue
                        _w = (_v = marketInstructions).push;
                        _y = (_x = SystemProgram).createAccount;
                        _3 = {
                            newAccountPubkey: marketAccounts.eventQueue.publicKey,
                            fromPubkey: user,
                            space: totalEventQueueSize
                        };
                        return [4 /*yield*/, this.connection.getMinimumBalanceForRentExemption(totalEventQueueSize)];
                    case 7:
                        // create event queue
                        _w.apply(_v, [_y.apply(_x, [(_3.lamports = _4.sent(),
                                    _3.programId = programID,
                                    _3)])]);
                        return [4 /*yield*/, this.connection.getMinimumBalanceForRentExemption(totalOrderbookSize)];
                    case 8:
                        orderBookRentExempt = _4.sent();
                        // create bids
                        marketInstructions.push(SystemProgram.createAccount({
                            newAccountPubkey: marketAccounts.bids.publicKey,
                            fromPubkey: user,
                            space: totalOrderbookSize,
                            lamports: orderBookRentExempt,
                            programId: programID,
                        }));
                        // create asks
                        marketInstructions.push(SystemProgram.createAccount({
                            newAccountPubkey: marketAccounts.asks.publicKey,
                            fromPubkey: user,
                            space: totalOrderbookSize,
                            lamports: orderBookRentExempt,
                            programId: programID,
                        }));
                        marketInstructions.push(openbook_1.DexInstructions.initializeMarket({
                            market: marketAccounts.market.publicKey,
                            requestQueue: marketAccounts.requestQueue.publicKey,
                            eventQueue: marketAccounts.eventQueue.publicKey,
                            bids: marketAccounts.bids.publicKey,
                            asks: marketAccounts.asks.publicKey,
                            baseVault: marketAccounts.baseVault.publicKey,
                            quoteVault: marketAccounts.quoteVault.publicKey,
                            baseMint: baseMint,
                            quoteMint: quoteMint,
                            baseLotSize: baseLotSize,
                            quoteLotSize: quoteLotSize,
                            feeRateBps: 150, // Unused in v3
                            quoteDustThreshold: new anchor_2.BN(500), // Unused in v3
                            vaultSignerNonce: vaultOwnerNonce,
                            programId: programID,
                        }));
                        return [2 /*return*/, {
                                Ok: {
                                    marketId: marketAccounts.market.publicKey,
                                    vaultInstructions: vaultInstructions,
                                    vaultSigners: vaultSigners,
                                    marketInstructions: marketInstructions,
                                    marketSigners: marketSigners
                                }
                            }];
                }
            });
        });
    };
    BaseRay.prototype.computeBuyAmount = function (input, etc) {
        return __awaiter(this, void 0, void 0, function () {
            var amount, buyToken, inputAmountType, poolKeys, user, slippage, base, baseMintDecimals, quote, quoteMintDecimals, baseTokenAccount, quoteTokenAccount, baseR, quoteR, amountIn, amountOut, tokenAccountIn, tokenAccountOut, _a, lpAccountInfo, baseVAccountInfo, quoteVAccountInfo, lpSupply, baseReserve, quoteReserve, fixedSide, poolInfo;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        amount = input.amount, buyToken = input.buyToken, inputAmountType = input.inputAmountType, poolKeys = input.poolKeys, user = input.user;
                        slippage = (_b = input.slippage) !== null && _b !== void 0 ? _b : new raydium_sdk_1.Percent(1, 100);
                        base = poolKeys.baseMint;
                        baseMintDecimals = poolKeys.baseDecimals;
                        quote = poolKeys.quoteMint;
                        quoteMintDecimals = poolKeys.quoteDecimals;
                        baseTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(base, user);
                        quoteTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(quote, user);
                        baseR = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, base, baseMintDecimals);
                        quoteR = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, quote, quoteMintDecimals);
                        return [4 /*yield*/, this.connection.getMultipleAccountsInfo([poolKeys.lpMint, poolKeys.baseVault, poolKeys.quoteVault].map(function (e) { return new anchor_1.web3.PublicKey(e); })).catch(function () { return [null, null, null, null]; })];
                    case 1:
                        _a = _f.sent(), lpAccountInfo = _a[0], baseVAccountInfo = _a[1], quoteVAccountInfo = _a[2];
                        if (!lpAccountInfo || !baseVAccountInfo || !quoteVAccountInfo)
                            throw "Failed to fetch some data";
                        lpSupply = new anchor_2.BN((0, bigint_buffer_1.toBufferBE)(spl_token_1.MintLayout.decode(lpAccountInfo.data).supply, 8)).addn((_c = etc === null || etc === void 0 ? void 0 : etc.extraLpSupply) !== null && _c !== void 0 ? _c : 0);
                        baseReserve = new anchor_2.BN((0, bigint_buffer_1.toBufferBE)(spl_token_1.AccountLayout.decode(baseVAccountInfo.data).amount, 8)).addn((_d = etc === null || etc === void 0 ? void 0 : etc.extraBaseResever) !== null && _d !== void 0 ? _d : 0);
                        quoteReserve = new anchor_2.BN((0, bigint_buffer_1.toBufferBE)(spl_token_1.AccountLayout.decode(quoteVAccountInfo.data).amount, 8)).addn((_e = etc === null || etc === void 0 ? void 0 : etc.extraQuoteReserve) !== null && _e !== void 0 ? _e : 0);
                        poolInfo = {
                            baseDecimals: poolKeys.baseDecimals,
                            quoteDecimals: poolKeys.quoteDecimals,
                            lpDecimals: poolKeys.lpDecimals,
                            lpSupply: lpSupply,
                            baseReserve: baseReserve,
                            quoteReserve: quoteReserve,
                            startTime: null,
                            status: null
                        };
                        if (inputAmountType == 'send') {
                            fixedSide = 'in';
                            if (buyToken == 'base') {
                                amountIn = new raydium_sdk_1.TokenAmount(quoteR, amount.toString(), false);
                                // amountOut = Liquidity.computeAmountOut({ amountIn, currencyOut: baseR, poolInfo, poolKeys, slippage }).amountOut
                                amountOut = raydium_sdk_1.Liquidity.computeAmountOut({ amountIn: amountIn, currencyOut: baseR, poolInfo: poolInfo, poolKeys: poolKeys, slippage: slippage }).minAmountOut;
                            }
                            else {
                                amountIn = new raydium_sdk_1.TokenAmount(baseR, amount.toString(), false);
                                // amountOut = Liquidity.computeAmountOut({ amountIn, currencyOut: quoteR, poolInfo, poolKeys, slippage }).amountOut
                                amountOut = raydium_sdk_1.Liquidity.computeAmountOut({ amountIn: amountIn, currencyOut: quoteR, poolInfo: poolInfo, poolKeys: poolKeys, slippage: slippage }).minAmountOut;
                            }
                        }
                        else {
                            fixedSide = 'out';
                            if (buyToken == 'base') {
                                amountOut = new raydium_sdk_1.TokenAmount(baseR, amount.toString(), false);
                                // amountIn = Liquidity.computeAmountIn({ amountOut, currencyIn: quoteR, poolInfo, poolKeys, slippage }).amountIn
                                amountIn = raydium_sdk_1.Liquidity.computeAmountIn({ amountOut: amountOut, currencyIn: quoteR, poolInfo: poolInfo, poolKeys: poolKeys, slippage: slippage }).maxAmountIn;
                            }
                            else {
                                amountOut = new raydium_sdk_1.TokenAmount(quoteR, amount.toString(), false);
                                // amountIn = Liquidity.computeAmountIn({ amountOut, currencyIn: baseR, poolInfo, poolKeys, slippage }).amountIn
                                amountIn = raydium_sdk_1.Liquidity.computeAmountIn({ amountOut: amountOut, currencyIn: baseR, poolInfo: poolInfo, poolKeys: poolKeys, slippage: slippage }).maxAmountIn;
                            }
                        }
                        if (buyToken == 'base') {
                            tokenAccountOut = baseTokenAccount;
                            tokenAccountIn = quoteTokenAccount;
                        }
                        else {
                            tokenAccountOut = quoteTokenAccount;
                            tokenAccountIn = baseTokenAccount;
                        }
                        return [2 /*return*/, {
                                amountIn: amountIn,
                                amountOut: amountOut,
                                tokenAccountIn: tokenAccountIn,
                                tokenAccountOut: tokenAccountOut,
                                fixedSide: fixedSide
                            }];
                }
            });
        });
    };
    BaseRay.prototype.computeAnotherAmount = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var baseMint, baseVault, quoteMint, quoteVault, baseDecimals, quoteDecimals, lpDecimals, lpMint, anotherToken, _c, poolAccountInfo, baseVAccountInfo, quoteVAccountInfo, lpMintAInfo, poolState, lpSupply, baseReserve, quoteReserve, current, currentTokenAmount, another, status, poolOpenTime, poolInfo, res;
            var amount = _b.amount, fixedSide = _b.fixedSide, poolKeys = _b.poolKeys, isRawAmount = _b.isRawAmount, slippage = _b.slippage;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        isRawAmount = isRawAmount !== null && isRawAmount !== void 0 ? isRawAmount : true;
                        slippage = slippage !== null && slippage !== void 0 ? slippage : new raydium_sdk_1.Percent(1, 100);
                        baseMint = poolKeys.baseMint, baseVault = poolKeys.baseVault, quoteMint = poolKeys.quoteMint, quoteVault = poolKeys.quoteVault, baseDecimals = poolKeys.baseDecimals, quoteDecimals = poolKeys.quoteDecimals, lpDecimals = poolKeys.lpDecimals, lpMint = poolKeys.lpMint;
                        anotherToken = fixedSide == 'base' ? poolKeys.quoteMint : poolKeys.baseMint;
                        return [4 /*yield*/, this.connection.getMultipleAccountsInfo([poolKeys.id, baseVault, quoteVault, lpMint]).catch(function () { return [null, null, null, null, null]; })];
                    case 1:
                        _c = _d.sent(), poolAccountInfo = _c[0], baseVAccountInfo = _c[1], quoteVAccountInfo = _c[2], lpMintAInfo = _c[3];
                        if (!poolAccountInfo
                            || !baseVAccountInfo
                            || !quoteVAccountInfo
                            || !lpMintAInfo)
                            throw "Failed to fetch somedata";
                        poolState = undefined;
                        if (poolAccountInfo.data.length == raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V4.span) {
                            poolState = raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V4.decode(poolAccountInfo.data);
                        }
                        else if (poolAccountInfo.data.length == raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V5.span) {
                            poolState = raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V5.decode(poolAccountInfo.data);
                        }
                        else
                            throw "Invalid Pool data lenght";
                        if (!poolState)
                            throw "Invalid pool address";
                        lpSupply = new anchor_2.BN(Number(spl_token_1.MintLayout.decode(lpMintAInfo.data).supply.toString()));
                        baseReserve = new anchor_2.BN(Number(spl_token_1.AccountLayout.decode(baseVAccountInfo.data).amount.toString()));
                        quoteReserve = new anchor_2.BN(Number(spl_token_1.AccountLayout.decode(quoteVAccountInfo.data).amount.toString()));
                        // let anotherTokenAmount: TokenAmount
                        if (anotherToken.toBase58() == quoteMint.toBase58()) {
                            current = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, baseMint, baseDecimals);
                            another = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, quoteMint, quoteDecimals);
                            currentTokenAmount = new raydium_sdk_1.TokenAmount(current, amount.toString(), isRawAmount);
                        }
                        else {
                            current = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, quoteMint, quoteDecimals);
                            another = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, baseMint, baseDecimals);
                            currentTokenAmount = new raydium_sdk_1.TokenAmount(current, amount.toString(), isRawAmount);
                        }
                        status = poolState.status, poolOpenTime = poolState.poolOpenTime;
                        poolInfo = {
                            baseDecimals: baseDecimals,
                            quoteDecimals: quoteDecimals,
                            baseReserve: baseReserve,
                            lpDecimals: lpDecimals,
                            lpSupply: lpSupply,
                            quoteReserve: quoteReserve,
                            startTime: poolOpenTime,
                            status: status
                        };
                        res = raydium_sdk_1.Liquidity.computeAnotherAmount({ poolKeys: poolKeys, slippage: slippage, amount: currentTokenAmount, anotherCurrency: another, poolInfo: poolInfo });
                        if (current.mint.toBase58() == baseMint.toBase58()) {
                            return [2 /*return*/, {
                                    baseMintAmount: currentTokenAmount.raw,
                                    quoteMintAmount: res.maxAnotherAmount.raw,
                                    liquidity: res.liquidity
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    baseMintAmount: res.maxAnotherAmount.raw,
                                    quoteMintAmount: currentTokenAmount.raw,
                                    liquidity: res.liquidity
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return BaseRay;
}());
exports.BaseRay = BaseRay;
