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
exports.getBundleInfo = exports.sendBundle = exports.createAndBuy = exports.revokeAuthority = exports.mintTo = exports.unwrapSol = exports.swap = exports.createPool = exports.createMarket = exports.removeLiquidity = exports.removeLiquidityFaster = exports.addLiquidity = exports.createToken = void 0;
var anchor_1 = require("@project-serum/anchor");
var baseMpl_1 = require("./base/baseMpl");
var utils_1 = require("./utils");
var constants_1 = require("./constants");
var baseRay_1 = require("./base/baseRay");
var mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var spl_token_1 = require("@solana/spl-token");
var baseSpl_1 = require("./base/baseSpl");
var searcher_1 = require("jito-ts/dist/sdk/block-engine/searcher");
var jito_ts_1 = require("jito-ts");
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var bn_js_1 = __importDefault(require("bn.js"));
var fs_1 = __importDefault(require("fs"));
var log = console.log;
// export async function updateMetadata(mintAddress: string, input: CreateTokenInput) {
//
//   log("CREATING METADATA")
//
//   const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
//   const keypair = getKeypairFromEnv();
//
//   // Define our Mint address
//   const mint = new web3.PublicKey(mintAddress)
//
//   // Add the Token Metadata Program
//   const token_metadata_program_id = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
//
//   // Create PDA for token metadata
//   const metadata_seeds = [
//       Buffer.from('metadata'),
//       token_metadata_program_id.toBuffer(),
//       mint.toBuffer(),
//   ];
//   const [metadata_pda, _bump] = web3.PublicKey.findProgramAddressSync(metadata_seeds, token_metadata_program_id);
//   console.log({ mint })
//   console.log({ metadata_pda })
//   console.log({ _bump })
//
//   // Start here
//   const metadaAccount = createCreateMetadataAccountV3Instruction(
//     {
//       metadata: metadata_pda,
//       mint: mint,
//       mintAuthority: keypair.publicKey,
//       payer: keypair.publicKey,
//       updateAuthority: keypair.publicKey,
//       systemProgram: web3.SystemProgram.programId,
//     },
//     {
//       createMetadataAccountArgsV3: {
//         isMutable: false,
//         collectionDetails: null,
//         data: {
//           name: input.name || "",
//           symbol: input.symbol || "",
//           uri: input.image || "", // IPFS link to hosted metadata
//           sellerFeeBasisPoints: 0,
//           creators: null,
//           collection: null,
//           uses: null,
//         },
//         // extensions: {
//         //   website: input.website || "",
//         //   twitter: input.twitter || "",
//         //   telegram: input.telegram || "",
//         // },
//         // "updateAuthority": keypair.publicKey,
//         // "mint": mintAddress,
//         // "primarySaleHappened": 0,
//         // "isMutable": false,
//         // "editionNonce": 254,
//         // "tokenStandard": 2,
//         // "name": input.name || "",
//         // "symbol": input.symbol || "",
//         // "image": input.image || "",
//         // "description": "", // TODO?
//         // "tags": [],
//         // "creator": {
//         //   "name": "DEXLAB MINTING LAB",
//         //   "site": "https://www.dexlab.space"
//         // }
//       }
//     }
//   );
//   const tx = new web3.Transaction().add(metadaAccount);
//   const txhash = await web3.sendAndConfirmTransaction(
//     connection,
//     tx,
//     [keypair]
//   );
//   console.log(`Success! Check out your TX here: https://solscan.io/tx/${txhash}?cluster=devnet`);
// }
function createToken(input) {
    return __awaiter(this, void 0, void 0, function () {
        var decimals, name_1, image, symbol, website, telegram, twitter, url, initialMintingAmount, metadata, keypair, wallet, endpoint, baseMpl, ipfsHash, hash, uri, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    decimals = input.decimals, name_1 = input.name, image = input.image, symbol = input.symbol, website = input.website, telegram = input.telegram, twitter = input.twitter, url = input.url, initialMintingAmount = input.initialMintingAmount;
                    metadata = {};
                    metadata.name = input.name;
                    metadata.symbol = input.symbol;
                    metadata.description = input.description || "";
                    metadata.extensions = { website: "", twitter: "", telegram: "" };
                    metadata.extensions.website = input.website;
                    metadata.extensions.twitter = input.twitter;
                    metadata.extensions.telegram = input.telegram;
                    metadata.tags = [];
                    metadata.creator = {
                        name: "DEXLAB MINTING LAB",
                        site: "https://www.dexlab.space",
                    };
                    if (input.image)
                        metadata.image = image;
                    console.log({ input: input });
                    console.log({ metadata: metadata });
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    wallet = new anchor_1.Wallet(keypair);
                    endpoint = url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV;
                    baseMpl = new baseMpl_1.BaseMpl(wallet, { endpoint: endpoint });
                    ipfsHash = "Null";
                    if (!constants_1.ENV.IN_PRODUCTION) return [3 /*break*/, 2];
                    console.log("Deploying json metadata");
                    return [4 /*yield*/, (0, utils_1.deployJsonData)(metadata).catch(function () { return null; })];
                case 1:
                    hash = _a.sent();
                    console.log("Deployed json metadata");
                    if (!hash) {
                        return [2 /*return*/, { Err: "failed to deploy json metadata" }];
                    }
                    ipfsHash = hash;
                    _a.label = 2;
                case 2:
                    if (!ipfsHash)
                        throw "Failed to deploy metadata";
                    uri = "https://".concat(constants_1.ENV.PINATA_DOMAIN, "/ipfs/").concat(ipfsHash);
                    console.log("Creating token");
                    return [4 /*yield*/, baseMpl.createToken({
                            name: name_1,
                            uri: uri,
                            symbol: symbol,
                            sellerFeeBasisPoints: 0,
                            tokenStandard: mpl_token_metadata_1.TokenStandard.Fungible,
                            creators: [{ address: wallet.publicKey, share: 100 }]
                        }, {
                            decimal: decimals,
                            mintAmount: initialMintingAmount !== null && initialMintingAmount !== void 0 ? initialMintingAmount : 0,
                            revokeAuthorities: input.revokeAuthorities
                        })];
                case 3:
                    res = _a.sent();
                    if (!res) {
                        return [2 /*return*/, { Err: "Failed to send the transation" }];
                    }
                    // console.log(`DEPLOYED TO ${res.token}, UPDATING METADATA`)
                    // await updateMetadata(res.token, input)
                    return [2 /*return*/, {
                            Ok: {
                                txSignature: res.txSignature,
                                tokenId: res.token
                            }
                        }];
                case 4:
                    error_1 = _a.sent();
                    log({ error: error_1 });
                    return [2 /*return*/, { Err: "failed to create the token" }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createToken = createToken;
function addLiquidity(input) {
    return __awaiter(this, void 0, void 0, function () {
        var amount, amountSide, poolId, url, slippage, keypair, user, connection, baseRay, poolKeys, amountInfo, baseMintAmount, liquidity, quoteMintAmount, txInfo, ixs, updateCuIx, recentBlockhash, tx, res;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    amount = input.amount, amountSide = input.amountSide, poolId = input.poolId, url = input.url, slippage = input.slippage;
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    user = keypair.publicKey;
                    connection = new anchor_1.web3.Connection(input.url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    baseRay = new baseRay_1.BaseRay({ rpcEndpointUrl: connection.rpcEndpoint });
                    return [4 /*yield*/, baseRay.getPoolKeys(poolId).catch(function (getPoolKeysError) { log({ getPoolKeysError: getPoolKeysError }); return null; })];
                case 1:
                    poolKeys = _b.sent();
                    if (!poolKeys)
                        return [2 /*return*/, { Err: "Pool not found" }];
                    return [4 /*yield*/, baseRay.computeAnotherAmount({ amount: amount, fixedSide: amountSide, poolKeys: poolKeys, isRawAmount: false, slippage: slippage }).catch(function (computeAnotherAmountError) { log({ computeAnotherAmount: computeAnotherAmountError }); return null; })];
                case 2:
                    amountInfo = _b.sent();
                    if (!amountInfo)
                        return [2 /*return*/, { Err: "Failed to clculate the amount" }];
                    baseMintAmount = amountInfo.baseMintAmount, liquidity = amountInfo.liquidity, quoteMintAmount = amountInfo.quoteMintAmount;
                    return [4 /*yield*/, baseRay.addLiquidity({ baseMintAmount: baseMintAmount, fixedSide: amountSide, poolKeys: poolKeys, quoteMintAmount: quoteMintAmount, user: user }).catch(function (addLiquidityError) { log({ addLiquidityError: addLiquidityError }); return null; })];
                case 3:
                    txInfo = _b.sent();
                    if (!txInfo)
                        return [2 /*return*/, { Err: 'failed to prepare tx' }];
                    ixs = txInfo.ixs;
                    updateCuIx = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE });
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 4:
                    recentBlockhash = (_b.sent()).blockhash;
                    tx = (_a = new anchor_1.web3.Transaction()).add.apply(_a, __spreadArray([updateCuIx], ixs, false));
                    tx.feePayer = keypair.publicKey;
                    tx.recentBlockhash = recentBlockhash;
                    tx.sign(keypair);
                    return [4 /*yield*/, (0, utils_1.sendAndConfirmTransaction)(tx, connection).catch(function (sendAndConfirmTransactionError) {
                            log({ sendAndConfirmTransactionError: sendAndConfirmTransactionError });
                        })];
                case 5:
                    res = _b.sent();
                    if (!res)
                        return [2 /*return*/, { Err: "failed to send the transaction" }];
                    return [2 /*return*/, { Ok: { txSignature: res } }];
            }
        });
    });
}
exports.addLiquidity = addLiquidity;
function removeLiquidityFaster(input) {
    return __awaiter(this, void 0, void 0, function () {
        var amount, poolId, url, keypair, user, connection, baseRay, poolKeys, txInfo, userSplAta, initSplAta, ixs, userSolAta, updateCuIx, tx, recentBlockhash, handlers, _loop_1, i, _i, handlers_1, h, rawTx, txSignature;
        var _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    amount = input.amount, poolId = input.poolId, url = input.url;
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    user = keypair.publicKey;
                    connection = new anchor_1.web3.Connection(input.url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    baseRay = new baseRay_1.BaseRay({ rpcEndpointUrl: connection.rpcEndpoint });
                    return [4 /*yield*/, baseRay.getPoolKeys(poolId).catch(function (getPoolKeysError) { log({ getPoolKeysError: getPoolKeysError }); return null; })];
                case 1:
                    poolKeys = _b.sent();
                    if (!poolKeys)
                        return [2 /*return*/, { Err: "Pool not found" }];
                    return [4 /*yield*/, baseRay.removeLiquidityFaster({ amount: amount, poolKeys: poolKeys, user: user }).catch(function (removeLiquidityError) { log({ removeLiquidityError: removeLiquidityError }); return null; })];
                case 2:
                    txInfo = _b.sent();
                    if (!txInfo)
                        return [2 /*return*/, { Err: "failed to prepare tx" }];
                    if (txInfo.Err)
                        return [2 /*return*/, { Err: txInfo.Err }];
                    if (!txInfo.Ok)
                        return [2 /*return*/, { Err: "failed to prepare tx" }];
                    userSplAta = (0, spl_token_1.getAssociatedTokenAddressSync)(spl_token_1.NATIVE_MINT, user);
                    initSplAta = (0, spl_token_1.createAssociatedTokenAccountInstruction)(user, userSplAta, user, spl_token_1.NATIVE_MINT);
                    ixs = __spreadArray([initSplAta], txInfo.Ok.ixs, true);
                    userSolAta = (0, spl_token_1.getAssociatedTokenAddressSync)(spl_token_1.NATIVE_MINT, user);
                    if (input.unwrapSol)
                        ixs.push((0, spl_token_1.createCloseAccountInstruction)(userSolAta, user, user));
                    updateCuIx = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE * 3 });
                    tx = (_a = new anchor_1.web3.Transaction()).add.apply(_a, __spreadArray([updateCuIx], ixs, false));
                    tx.feePayer = keypair.publicKey;
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 3:
                    recentBlockhash = (_b.sent()).blockhash;
                    tx.recentBlockhash = recentBlockhash;
                    tx.sign(keypair);
                    handlers = [];
                    _loop_1 = function (i) {
                        var handle = connection.sendTransaction(tx, [keypair], { skipPreflight: true }).catch(function (sendTxError) { return null; }).then(function (res) {
                            if (res) {
                                log("lightning try: ".concat(i + 1, " | txSignature: ").concat(res));
                            }
                        });
                        handlers.push(handle);
                    };
                    for (i = 0; i < 4; ++i) {
                        _loop_1(i);
                    }
                    _i = 0, handlers_1 = handlers;
                    _b.label = 4;
                case 4:
                    if (!(_i < handlers_1.length)) return [3 /*break*/, 7];
                    h = handlers_1[_i];
                    return [4 /*yield*/, h];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    rawTx = tx.serialize();
                    return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                            .catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("remove liq tx1 failed");
                                        return [4 /*yield*/, (0, utils_1.sleep)(500)];
                                    case 1:
                                        _a.sent();
                                        console.log("sending remove liq tx2");
                                        return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                                                .catch(function (createPoolAndBuyTxFail) {
                                                log({ createPoolAndBuyTxFail: createPoolAndBuyTxFail });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 8:
                    txSignature = (_b.sent());
                    console.log("confirmed remove liq tx");
                    // const res = await connection.sendTransaction(tx, [keypair]).catch(sendTxError => { log({ sendTxError }); return null });
                    if (!txSignature)
                        return [2 /*return*/, { Err: "failed to send the transaction" }];
                    return [2 /*return*/, { Ok: { txSignature: txSignature } }];
            }
        });
    });
}
exports.removeLiquidityFaster = removeLiquidityFaster;
function removeLiquidity(input) {
    return __awaiter(this, void 0, void 0, function () {
        var amount, poolId, url, keypair, user, connection, baseRay, poolKeys, txInfo, ixs, userSolAta, updateCuIx, tx, recentBlockhash, handlers, _loop_2, i, _i, handlers_2, h, rawTx, txSignature;
        var _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    amount = input.amount, poolId = input.poolId, url = input.url;
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    user = keypair.publicKey;
                    connection = new anchor_1.web3.Connection(input.url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    baseRay = new baseRay_1.BaseRay({ rpcEndpointUrl: connection.rpcEndpoint });
                    return [4 /*yield*/, baseRay.getPoolKeys(poolId).catch(function (getPoolKeysError) { log({ getPoolKeysError: getPoolKeysError }); return null; })];
                case 1:
                    poolKeys = _b.sent();
                    if (!poolKeys)
                        return [2 /*return*/, { Err: "Pool not found" }];
                    return [4 /*yield*/, baseRay.removeLiquidity({ amount: amount, poolKeys: poolKeys, user: user }).catch(function (removeLiquidityError) { log({ removeLiquidityError: removeLiquidityError }); return null; })];
                case 2:
                    txInfo = _b.sent();
                    if (!txInfo)
                        return [2 /*return*/, { Err: "failed to prepare tx" }];
                    if (txInfo.Err)
                        return [2 /*return*/, { Err: txInfo.Err }];
                    if (!txInfo.Ok)
                        return [2 /*return*/, { Err: "failed to prepare tx" }];
                    ixs = txInfo.Ok.ixs;
                    userSolAta = (0, spl_token_1.getAssociatedTokenAddressSync)(spl_token_1.NATIVE_MINT, user);
                    if (input.unwrapSol)
                        ixs.push((0, spl_token_1.createCloseAccountInstruction)(userSolAta, user, user));
                    updateCuIx = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE * 3 });
                    tx = (_a = new anchor_1.web3.Transaction()).add.apply(_a, __spreadArray([updateCuIx], ixs, false));
                    tx.feePayer = keypair.publicKey;
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 3:
                    recentBlockhash = (_b.sent()).blockhash;
                    tx.recentBlockhash = recentBlockhash;
                    tx.sign(keypair);
                    handlers = [];
                    _loop_2 = function (i) {
                        var handle = connection.sendTransaction(tx, [keypair], { skipPreflight: true }).catch(function (sendTxError) { return null; }).then(function (res) {
                            if (res) {
                                log("try: ".concat(i + 1, " | txSignature: ").concat(res));
                            }
                        });
                        handlers.push(handle);
                    };
                    for (i = 0; i < 4; ++i) {
                        _loop_2(i);
                    }
                    _i = 0, handlers_2 = handlers;
                    _b.label = 4;
                case 4:
                    if (!(_i < handlers_2.length)) return [3 /*break*/, 7];
                    h = handlers_2[_i];
                    return [4 /*yield*/, h];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    rawTx = tx.serialize();
                    console.log("sending remove liq tx");
                    return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                            .catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("remove liq tx1 failed");
                                        return [4 /*yield*/, (0, utils_1.sleep)(500)];
                                    case 1:
                                        _a.sent();
                                        console.log("sending remove liq tx2");
                                        return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                                                .catch(function (createPoolAndBuyTxFail) {
                                                log({ createPoolAndBuyTxFail: createPoolAndBuyTxFail });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 8:
                    txSignature = (_b.sent());
                    console.log("confirmed remove liq tx");
                    // const res = await connection.sendTransaction(tx, [keypair]).catch(sendTxError => { log({ sendTxError }); return null });
                    if (!txSignature)
                        return [2 /*return*/, { Err: "failed to send the transaction" }];
                    return [2 /*return*/, { Ok: { txSignature: txSignature } }];
            }
        });
    });
}
exports.removeLiquidity = removeLiquidity;
function createMarket(input) {
    return __awaiter(this, void 0, void 0, function () {
        var baseMint, orderSize, priceTick, quoteMint, url, keypair, connection, baseRay, preTxInfo, marketId, payer, info, updateCuIx1, recentBlockhash1, tx1, txSignature1, updateCuIx2, recentBlockhash2, tx2, txSignature, accountInfo, accountInfo_1, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    baseMint = input.baseMint, orderSize = input.orderSize, priceTick = input.priceTick, quoteMint = input.quoteMint, url = input.url;
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    connection = new anchor_1.web3.Connection(input.url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    log({ baseMint: baseMint.toBase58(), quoteMint: quoteMint.toBase58() });
                    baseRay = new baseRay_1.BaseRay({ rpcEndpointUrl: connection.rpcEndpoint });
                    return [4 /*yield*/, baseRay.createMarket({ baseMint: baseMint, quoteMint: quoteMint, tickers: { lotSize: orderSize, tickSize: priceTick } }, keypair.publicKey).catch(function (createMarketError) { return null; })];
                case 1:
                    preTxInfo = _c.sent();
                    if (!preTxInfo) {
                        return [2 /*return*/, { Err: "Failed to prepare market creation transaction" }];
                    }
                    if (preTxInfo.Err) {
                        return [2 /*return*/, { Err: preTxInfo.Err }];
                    }
                    if (!preTxInfo.Ok)
                        return [2 /*return*/, { Err: "failed to prepare tx" }];
                    marketId = preTxInfo.Ok.marketId;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 13, , 14]);
                    payer = keypair.publicKey;
                    info = preTxInfo.Ok;
                    updateCuIx1 = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE });
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 3:
                    recentBlockhash1 = (_c.sent()).blockhash;
                    tx1 = (_a = new anchor_1.web3.Transaction()).add.apply(_a, __spreadArray([updateCuIx1], info.vaultInstructions, false));
                    tx1.feePayer = keypair.publicKey;
                    tx1.recentBlockhash = recentBlockhash1;
                    tx1.sign(keypair);
                    // const tx1 = new web3.Transaction().add(...info.vaultInstructions)
                    console.log("sending vault instructions tx");
                    return [4 /*yield*/, connection.sendTransaction(tx1, __spreadArray([keypair], info.vaultSigners, true), { maxRetries: 20 })];
                case 4:
                    txSignature1 = _c.sent();
                    console.log("awaiting vault instructions tx");
                    return [4 /*yield*/, connection.confirmTransaction(txSignature1)];
                case 5:
                    _c.sent();
                    console.log("confirmed vault instructions tx");
                    updateCuIx2 = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE });
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 6:
                    recentBlockhash2 = (_c.sent()).blockhash;
                    tx2 = (_b = new anchor_1.web3.Transaction()).add.apply(_b, __spreadArray([updateCuIx2], info.marketInstructions, false));
                    tx2.feePayer = keypair.publicKey;
                    tx2.recentBlockhash = recentBlockhash2;
                    tx2.sign(keypair);
                    // const tx2 = new web3.Transaction().add(...info.marketInstructions)
                    console.log("sending create market tx");
                    return [4 /*yield*/, connection.sendTransaction(tx2, __spreadArray([keypair], info.marketSigners, true), { maxRetries: 20, skipPreflight: true })];
                case 7:
                    txSignature = _c.sent();
                    console.log("awaiting create market tx");
                    return [4 /*yield*/, connection.confirmTransaction(txSignature)];
                case 8:
                    _c.sent();
                    console.log("confirmed create market tx");
                    return [4 /*yield*/, connection.getAccountInfo(info.marketId)];
                case 9:
                    accountInfo = _c.sent();
                    if (!!accountInfo) return [3 /*break*/, 12];
                    return [4 /*yield*/, (0, utils_1.sleep)(25000)];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, connection.getAccountInfo(info.marketId)];
                case 11:
                    accountInfo_1 = _c.sent();
                    if (!accountInfo_1) {
                        return [2 /*return*/, {
                                Err: "Failed to verify market creation. marketId: ".concat(marketId.toBase58())
                            }];
                    }
                    _c.label = 12;
                case 12: return [2 /*return*/, {
                        Ok: {
                            marketId: marketId.toBase58(),
                            txSignature: txSignature
                        }
                    }];
                case 13:
                    error_2 = _c.sent();
                    log({ error: error_2 });
                    return [2 /*return*/, { Err: "failed to send the transaction" }];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.createMarket = createMarket;
function createPool(input) {
    return __awaiter(this, void 0, void 0, function () {
        var baseMintAmount, quoteMintAmount, marketId, keypair, connection, baseRay, marketState, baseMint, quoteMint, txInfo, updateCuIx, recentBlockhash, txMsg, tx, rawTx, simRes, txSignature;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseMintAmount = input.baseMintAmount, quoteMintAmount = input.quoteMintAmount, marketId = input.marketId;
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    connection = new anchor_1.web3.Connection(input.url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    baseRay = new baseRay_1.BaseRay({ rpcEndpointUrl: connection.rpcEndpoint });
                    return [4 /*yield*/, baseRay.getMarketInfo(marketId).catch(function (getMarketInfoError) { log({ getMarketInfoError: getMarketInfoError }); return null; })
                        // log({marketState})
                    ];
                case 1:
                    marketState = _a.sent();
                    // log({marketState})
                    if (!marketState) {
                        return [2 /*return*/, { Err: "market not found" }];
                    }
                    baseMint = marketState.baseMint, quoteMint = marketState.quoteMint;
                    log({
                        baseToken: baseMint.toBase58(),
                        quoteToken: quoteMint.toBase58(),
                    });
                    return [4 /*yield*/, baseRay.createPool({ baseMint: baseMint, quoteMint: quoteMint, marketId: marketId, baseMintAmount: baseMintAmount, quoteMintAmount: quoteMintAmount }, keypair.publicKey).catch(function (innerCreatePoolError) { log({ innerCreatePoolError: innerCreatePoolError }); return null; })];
                case 2:
                    txInfo = _a.sent();
                    if (!txInfo)
                        return [2 /*return*/, { Err: "Failed to prepare create pool transaction" }
                            // speedup
                        ];
                    updateCuIx = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE });
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 3:
                    recentBlockhash = (_a.sent()).blockhash;
                    txMsg = new anchor_1.web3.TransactionMessage({
                        instructions: __spreadArray([updateCuIx], txInfo.ixs, true),
                        payerKey: keypair.publicKey,
                        recentBlockhash: recentBlockhash,
                    }).compileToV0Message();
                    tx = new anchor_1.web3.VersionedTransaction(txMsg);
                    tx.sign(__spreadArray([keypair], txInfo.signers, true));
                    rawTx = tx.serialize();
                    console.log("PoolId: ", txInfo.poolId.toBase58());
                    console.log("SENDING CREATE POOL TX");
                    return [4 /*yield*/, connection.simulateTransaction(tx)];
                case 4:
                    simRes = (_a.sent()).value;
                    fs_1.default.writeFileSync('./poolCreateTxSim.json', JSON.stringify(simRes));
                    return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                            .catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, utils_1.sleep)(500)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                                                .catch(function (createPoolAndBuyTxFail) {
                                                log({ createPoolAndBuyTxFail: createPoolAndBuyTxFail });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 5:
                    txSignature = (_a.sent());
                    console.log("CONFIRMED CREATE POOL TX");
                    if (!txSignature)
                        log("Tx failed");
                    // const txSignature = await connection.sendTransaction(tx).catch((error) => { log({ createPoolTxError: error }); return null });
                    if (!txSignature) {
                        return [2 /*return*/, { Err: "Failed to send transaction" }];
                    }
                    return [2 /*return*/, {
                            Ok: {
                                poolId: txInfo.poolId.toBase58(),
                                txSignature: txSignature,
                                baseAmount: txInfo.baseAmount,
                                quoteAmount: txInfo.quoteAmount,
                                baseDecimals: txInfo.baseDecimals,
                                quoteDecimals: txInfo.quoteDecimals,
                            }
                        }];
            }
        });
    });
}
exports.createPool = createPool;
function swap(input) {
    return __awaiter(this, void 0, void 0, function () {
        var keypair, user, connection, baseRay, slippage, poolKeys, amount, amountSide, buyToken, swapAmountInfo, amountIn, amountOut, fixedSide, tokenAccountIn, tokenAccountOut, txInfo, recentBlockhash, txMsg, tx, txSignature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (input.sellToken) {
                        if (input.sellToken == 'base') {
                            input.buyToken = "quote";
                        }
                        else {
                            input.buyToken = "base";
                        }
                    }
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    user = keypair.publicKey;
                    connection = new anchor_1.web3.Connection(input.url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    baseRay = new baseRay_1.BaseRay({ rpcEndpointUrl: connection.rpcEndpoint });
                    slippage = input.slippage;
                    return [4 /*yield*/, baseRay.getPoolKeys(input.poolId).catch(function (getPoolKeysError) { log({ getPoolKeysError: getPoolKeysError }); return null; })];
                case 1:
                    poolKeys = _a.sent();
                    if (!poolKeys) {
                        return [2 /*return*/, { Err: "Pool info not found" }];
                    }
                    log({
                        baseToken: poolKeys.baseMint.toBase58(),
                        quoteToken: poolKeys.quoteMint.toBase58(),
                    });
                    amount = input.amount, amountSide = input.amountSide, buyToken = input.buyToken;
                    return [4 /*yield*/, baseRay.computeBuyAmount({
                            amount: amount,
                            buyToken: buyToken,
                            inputAmountType: amountSide,
                            poolKeys: poolKeys,
                            user: user,
                            slippage: slippage
                        }).catch((function (computeBuyAmountError) { return log({ computeBuyAmountError: computeBuyAmountError }); }))];
                case 2:
                    swapAmountInfo = _a.sent();
                    if (!swapAmountInfo)
                        return [2 /*return*/, { Err: "failed to calculate the amount" }];
                    amountIn = swapAmountInfo.amountIn, amountOut = swapAmountInfo.amountOut, fixedSide = swapAmountInfo.fixedSide, tokenAccountIn = swapAmountInfo.tokenAccountIn, tokenAccountOut = swapAmountInfo.tokenAccountOut;
                    return [4 /*yield*/, baseRay.buyFromPool({ amountIn: amountIn, amountOut: amountOut, fixedSide: fixedSide, poolKeys: poolKeys, tokenAccountIn: tokenAccountIn, tokenAccountOut: tokenAccountOut, user: user }).catch(function (buyFromPoolError) { log({ buyFromPoolError: buyFromPoolError }); return null; })];
                case 3:
                    txInfo = _a.sent();
                    if (!txInfo)
                        return [2 /*return*/, { Err: "failed to prepare swap transaction" }];
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 4:
                    recentBlockhash = (_a.sent()).blockhash;
                    txMsg = new anchor_1.web3.TransactionMessage({
                        instructions: txInfo.ixs,
                        payerKey: keypair.publicKey,
                        recentBlockhash: recentBlockhash,
                    }).compileToV0Message();
                    tx = new anchor_1.web3.VersionedTransaction(txMsg);
                    tx.sign(__spreadArray([keypair], txInfo.signers, true));
                    return [4 /*yield*/, (0, utils_1.sendAndConfirmTransaction)(tx, connection).catch(function (sendAndConfirmTransactionError) {
                            log({ sendAndConfirmTransactionError: sendAndConfirmTransactionError });
                            return null;
                        })
                        // const txSignature = await connection.sendTransaction(tx).catch((error) => { log({ createPoolTxError: error }); return null });
                    ];
                case 5:
                    txSignature = _a.sent();
                    // const txSignature = await connection.sendTransaction(tx).catch((error) => { log({ createPoolTxError: error }); return null });
                    if (!txSignature) {
                        return [2 /*return*/, { Err: "Failed to send transaction" }];
                    }
                    return [2 /*return*/, {
                            Ok: {
                                txSignature: txSignature,
                            }
                        }];
            }
        });
    });
}
exports.swap = swap;
function unwrapSol(url) {
    return __awaiter(this, void 0, void 0, function () {
        var keypair, user, connection, ata, ix, updateCuIx, recentBlockhash, tx, rawTx, txSignature;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    user = keypair.publicKey;
                    connection = new anchor_1.web3.Connection(url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    ata = (0, spl_token_1.getAssociatedTokenAddressSync)(spl_token_1.NATIVE_MINT, user);
                    ix = (0, spl_token_1.createCloseAccountInstruction)(ata, user, user);
                    updateCuIx = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE });
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 1:
                    recentBlockhash = (_a.sent()).blockhash;
                    tx = new anchor_1.web3.Transaction().add(updateCuIx, ix);
                    tx.feePayer = keypair.publicKey;
                    tx.recentBlockhash = recentBlockhash;
                    tx.sign(keypair);
                    rawTx = tx.serialize();
                    return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                            .catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, utils_1.sleep)(500)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                                                .catch(function (createPoolAndBuyTxFail) {
                                                log({ createPoolAndBuyTxFail: createPoolAndBuyTxFail });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 2:
                    txSignature = (_a.sent());
                    if (!txSignature)
                        log("Tx failed");
                    log("Transaction successfull\nTx Signature: ", txSignature);
                    return [2 /*return*/];
            }
        });
    });
}
exports.unwrapSol = unwrapSol;
function mintTo(input) {
    return __awaiter(this, void 0, void 0, function () {
        var token, url, amount, keypair, user, connection, baseSpl, ixs, tx, res;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = input.token, url = input.url, amount = input.amount;
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    user = keypair.publicKey;
                    connection = new anchor_1.web3.Connection(url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    baseSpl = new baseSpl_1.BaseSpl(connection);
                    return [4 /*yield*/, baseSpl.getMintToInstructions({ mint: token, mintAuthority: user, amount: amount, init_if_needed: true })];
                case 1:
                    ixs = _b.sent();
                    tx = (_a = new anchor_1.web3.Transaction()).add.apply(_a, ixs);
                    return [4 /*yield*/, (0, utils_1.sendAndConfirmTransaction)(tx, connection).catch(function (sendAndConfirmTransactionError) {
                            log({ sendAndConfirmTransactionError: sendAndConfirmTransactionError });
                            return null;
                        })];
                case 2:
                    res = _b.sent();
                    if (!res)
                        log("Tx failed");
                    log("Transaction successfull\nTx Signature: ", res);
                    return [2 /*return*/];
            }
        });
    });
}
exports.mintTo = mintTo;
function revokeAuthority(input) {
    return __awaiter(this, void 0, void 0, function () {
        var token, url, keypair, user, wallet, connection, baseSpl, baseMpl, _a, mintAccountInfo, metadataAccountInfo, ixs, mintInfo, metadataInfo, metadataUpdateAuthStr, updateCuIx, recentBlockhash, tx, txSignature;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    token = input.token, url = input.url;
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    user = keypair.publicKey;
                    wallet = new anchor_1.Wallet(keypair);
                    connection = new anchor_1.web3.Connection(url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV, { commitment: "confirmed", confirmTransactionInitialTimeout: 60000 });
                    baseSpl = new baseSpl_1.BaseSpl(connection);
                    baseMpl = new baseMpl_1.BaseMpl(wallet, { endpoint: connection.rpcEndpoint });
                    return [4 /*yield*/, connection.getMultipleAccountsInfo([token, baseMpl_1.BaseMpl.getMetadataAccount(token)]).catch(function (error) { return [null, null]; })];
                case 1:
                    _a = _c.sent(), mintAccountInfo = _a[0], metadataAccountInfo = _a[1];
                    if (!mintAccountInfo) {
                        log("Token not found");
                        return [2 /*return*/];
                    }
                    ixs = [];
                    mintInfo = spl_token_1.MintLayout.decode(mintAccountInfo.data);
                    if (mintInfo.mintAuthority.toBase58() == user.toBase58() && mintInfo.mintAuthorityOption == 1) {
                        ixs.push(baseSpl.revokeAuthority({ authorityType: 'MINTING', currentAuthority: user, mint: token }));
                    }
                    else {
                        if (mintInfo.mintAuthorityOption == 0) {
                            log("Minting authority already been revoked");
                        }
                        else {
                            log("You don't have minting authority");
                        }
                    }
                    if (mintInfo.freezeAuthority.toBase58() == user.toBase58() && mintInfo.freezeAuthorityOption == 1) {
                        ixs.push(baseSpl.revokeAuthority({ authorityType: 'FREEZING', currentAuthority: user, mint: token }));
                    }
                    else {
                        if (mintInfo.freezeAuthorityOption == 0) {
                            log("Freezing authority already been revoked");
                        }
                        else {
                            log("You don't have freezing authority");
                        }
                    }
                    if (metadataAccountInfo) {
                        metadataInfo = mpl_token_metadata_1.Metadata.deserialize(metadataAccountInfo.data)[0];
                        metadataUpdateAuthStr = metadataInfo.updateAuthority.toBase58();
                        if (metadataUpdateAuthStr == user.toBase58() && metadataInfo.isMutable) {
                            ixs.push(baseMpl.getRevokeMetadataAuthIx(token, user));
                        }
                        else if (!metadataInfo.isMutable) {
                            log('Update authority already been revoked');
                        }
                        else {
                            log("You don't have metadata update authority");
                        }
                    }
                    if (ixs.length == 0) {
                        log("All authority are revoked");
                        return [2 /*return*/];
                    }
                    updateCuIx = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE });
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 2:
                    recentBlockhash = (_c.sent()).blockhash;
                    tx = (_b = new anchor_1.web3.Transaction()).add.apply(_b, __spreadArray([updateCuIx], ixs, false));
                    tx.feePayer = keypair.publicKey;
                    tx.recentBlockhash = recentBlockhash;
                    tx.sign(keypair);
                    console.log("SENDING REVOKE TX");
                    return [4 /*yield*/, connection.sendTransaction(tx, [keypair])];
                case 3:
                    txSignature = _c.sent();
                    console.log("AWAITING REVOKE TX");
                    return [4 /*yield*/, connection.confirmTransaction(txSignature)];
                case 4:
                    _c.sent();
                    console.log("CONFIRMED REVOKE TX");
                    return [2 /*return*/];
            }
        });
    });
}
exports.revokeAuthority = revokeAuthority;
function createAndBuy(input) {
    return __awaiter(this, void 0, void 0, function () {
        var baseMintAmount, quoteMintAmount, marketId, keypair, user, connection, baseRay, marketState, baseMint, quoteMint, createPoolTxInfo, poolId, initialBaseMintAmount, initialQuoteMintAmount, poolKeys, amountIn, amountOut, tokenAccountIn, tokenAccountOut, baseR, quoteR, poolInfo, buyTokenType, buyAmount, poolSolFund, _a, userAccountInfo, ataInfo, balance, minRequiredBuyerBalance, tokenBalance, _b, userAccountInfo, ataInfo, balance, minRequiredBuyerBalance, tokenBalance, buyFromPoolTxInfo, createPoolRecentBlockhash, createPoolTxMsg, createPoolTx, buyRecentBlockhash, buyTxMsg, buyTx, bundleTips, bundleTxRes, _c, bundleId, bundleStatus, txsSignature, createPoolTxSignature, buyTxSignature, Err;
        var _this = this;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    baseMintAmount = input.baseMintAmount, quoteMintAmount = input.quoteMintAmount, marketId = input.marketId;
                    keypair = (0, utils_1.getKeypairFromEnv)();
                    user = keypair.publicKey;
                    connection = new anchor_1.web3.Connection(input.url == 'mainnet' ? constants_1.RPC_ENDPOINT_MAIN : constants_1.RPC_ENDPOINT_DEV);
                    baseRay = new baseRay_1.BaseRay({ rpcEndpointUrl: connection.rpcEndpoint });
                    return [4 /*yield*/, baseRay.getMarketInfo(marketId).catch(function (getMarketInfoError) { log({ getMarketInfoError: getMarketInfoError }); return null; })];
                case 1:
                    marketState = _f.sent();
                    if (!marketState) {
                        return [2 /*return*/, { Err: "market not found" }];
                    }
                    baseMint = marketState.baseMint, quoteMint = marketState.quoteMint;
                    log({
                        baseToken: baseMint.toBase58(),
                        quoteToken: quoteMint.toBase58(),
                    });
                    return [4 /*yield*/, baseRay.createPool({ baseMint: baseMint, quoteMint: quoteMint, marketId: marketId, baseMintAmount: baseMintAmount, quoteMintAmount: quoteMintAmount }, keypair.publicKey).catch(function (innerCreatePoolError) { log({ innerCreatePoolError: innerCreatePoolError }); return null; })];
                case 2:
                    createPoolTxInfo = _f.sent();
                    if (!createPoolTxInfo)
                        return [2 /*return*/, { Err: "Failed to prepare create pool transaction" }
                            //buy
                        ];
                    poolId = createPoolTxInfo.poolId, initialBaseMintAmount = createPoolTxInfo.baseAmount, initialQuoteMintAmount = createPoolTxInfo.quoteAmount;
                    return [4 /*yield*/, baseRay.getPoolKeys(poolId)];
                case 3:
                    poolKeys = _f.sent();
                    baseR = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, poolKeys.baseMint, poolKeys.baseDecimals);
                    quoteR = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, poolKeys.quoteMint, poolKeys.quoteDecimals);
                    poolInfo = {
                        baseDecimals: poolKeys.baseDecimals,
                        quoteDecimals: poolKeys.quoteDecimals,
                        lpDecimals: poolKeys.lpDecimals,
                        lpSupply: new bn_js_1.default(0),
                        baseReserve: initialBaseMintAmount,
                        quoteReserve: initialQuoteMintAmount,
                        startTime: null,
                        status: null
                    };
                    buyTokenType = input.buyToken, buyAmount = input.buyAmount;
                    poolSolFund = 0;
                    if (baseMint.toBase58() == spl_token_1.NATIVE_MINT.toBase58() || quoteMint.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                        if (baseMint.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                            poolSolFund = input.baseMintAmount;
                        }
                        else {
                            poolSolFund = input.quoteMintAmount;
                        }
                    }
                    if (!(buyTokenType == 'base')) return [3 /*break*/, 5];
                    amountOut = new raydium_sdk_1.TokenAmount(baseR, buyAmount.toString(), false);
                    amountIn = raydium_sdk_1.Liquidity.computeAmountIn({ amountOut: amountOut, currencyIn: quoteR, poolInfo: poolInfo, poolKeys: poolKeys, slippage: new raydium_sdk_1.Percent(1, 100) }).maxAmountIn;
                    tokenAccountOut = (0, spl_token_1.getAssociatedTokenAddressSync)(poolKeys.baseMint, user);
                    tokenAccountIn = (0, spl_token_1.getAssociatedTokenAddressSync)(poolKeys.quoteMint, user);
                    return [4 /*yield*/, connection.getMultipleAccountsInfo([user, tokenAccountIn]).catch(function () { return [null, null, null]; })];
                case 4:
                    _a = _f.sent(), userAccountInfo = _a[0], ataInfo = _a[1];
                    if (!userAccountInfo)
                        return [2 /*return*/, { Err: "wallet dosen't have enought Sol to create pool" }];
                    balance = (0, utils_1.calcDecimalValue)(userAccountInfo.lamports, 9);
                    if (balance < poolSolFund)
                        return [2 /*return*/, { Err: "wallet dosen't have enought Sol to create pool" }];
                    minRequiredBuyerBalance = poolSolFund;
                    if (amountIn.token.mint.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                        minRequiredBuyerBalance += (0, utils_1.calcDecimalValue)(amountIn.raw.toNumber(), 9);
                        if (balance < minRequiredBuyerBalance)
                            return [2 /*return*/, { Err: "Second wallet dosen't have enought Sol to buy the tokens" }];
                    }
                    else {
                        log("else");
                        if (!ataInfo)
                            return [2 /*return*/, { Err: "Second wallet dosen't have enought fund to buy another token" }];
                        tokenBalance = Number(spl_token_1.AccountLayout.decode(ataInfo.data).amount.toString());
                        if (tokenBalance < amountIn.raw.toNumber()) {
                            return [2 /*return*/, { Err: "Second wallet dosen't have enought fund to buy another token" }];
                        }
                    }
                    return [3 /*break*/, 7];
                case 5:
                    amountOut = new raydium_sdk_1.TokenAmount(quoteR, buyAmount.toString(), false);
                    amountIn = raydium_sdk_1.Liquidity.computeAmountIn({ amountOut: amountOut, currencyIn: baseR, poolInfo: poolInfo, poolKeys: poolKeys, slippage: new raydium_sdk_1.Percent(1, 100) }).maxAmountIn;
                    tokenAccountOut = (0, spl_token_1.getAssociatedTokenAddressSync)(poolKeys.quoteMint, user);
                    tokenAccountIn = (0, spl_token_1.getAssociatedTokenAddressSync)(poolKeys.baseMint, user);
                    return [4 /*yield*/, connection.getMultipleAccountsInfo([user, tokenAccountIn]).catch(function () { return [null, null]; })];
                case 6:
                    _b = _f.sent(), userAccountInfo = _b[0], ataInfo = _b[1];
                    if (!userAccountInfo)
                        return [2 /*return*/, { Err: "wallet dosen't have enought Sol to create pool" }];
                    balance = (0, utils_1.calcDecimalValue)(userAccountInfo.lamports, 9);
                    if (balance < poolSolFund)
                        return [2 /*return*/, { Err: "wallet dosen't have enought Sol to create pool" }];
                    minRequiredBuyerBalance = poolSolFund;
                    if (amountIn.token.mint.toBase58() == spl_token_1.NATIVE_MINT.toBase58()) {
                        minRequiredBuyerBalance += (0, utils_1.calcDecimalValue)(amountIn.raw.toNumber(), 9);
                        if (balance < minRequiredBuyerBalance)
                            return [2 /*return*/, { Err: "Second wallet dosen't have enought Sol to buy or distribute the tokens" }];
                    }
                    else {
                        log("else");
                        if (!ataInfo)
                            return [2 /*return*/, { Err: "Second wallet dosen't have enought fund to buy another token" }];
                        tokenBalance = Number(spl_token_1.AccountLayout.decode(ataInfo.data).amount.toString());
                        if (tokenBalance < amountIn.raw.toNumber()) {
                            return [2 /*return*/, { Err: "Second wallet dosen't have enought fund to buy another token" }];
                        }
                    }
                    _f.label = 7;
                case 7: return [4 /*yield*/, baseRay.buyFromPool({
                        amountIn: amountIn,
                        amountOut: amountOut,
                        fixedSide: 'out',
                        poolKeys: poolKeys,
                        tokenAccountIn: tokenAccountIn,
                        tokenAccountOut: tokenAccountOut,
                        user: user
                    }).catch(function (innerBuyTxError) { log({ innerBuyTxError: innerBuyTxError }); return null; })];
                case 8:
                    buyFromPoolTxInfo = _f.sent();
                    if (!buyFromPoolTxInfo)
                        return [2 /*return*/, { Err: "Failed to create buy transaction" }];
                    return [4 /*yield*/, connection.getLatestBlockhash().catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, utils_1.sleep)(2000)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, connection.getLatestBlockhash().catch(function (getLatestBlockhashError) {
                                                log({ getLatestBlockhashError: getLatestBlockhashError });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 9:
                    createPoolRecentBlockhash = (_d = (_f.sent())) === null || _d === void 0 ? void 0 : _d.blockhash;
                    if (!createPoolRecentBlockhash)
                        return [2 /*return*/, { Err: "Failed to prepare transaction" }];
                    createPoolTxMsg = new anchor_1.web3.TransactionMessage({
                        instructions: createPoolTxInfo.ixs,
                        payerKey: keypair.publicKey,
                        recentBlockhash: createPoolRecentBlockhash
                    }).compileToV0Message();
                    createPoolTx = new anchor_1.web3.VersionedTransaction(createPoolTxMsg);
                    createPoolTx.sign(__spreadArray([keypair], createPoolTxInfo.signers, true));
                    return [4 /*yield*/, (0, utils_1.sleep)(1000)];
                case 10:
                    _f.sent();
                    return [4 /*yield*/, connection.getLatestBlockhash().catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, utils_1.sleep)(2000)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, connection.getLatestBlockhash().catch(function (getLatestBlockhashError) {
                                                log({ getLatestBlockhashError: getLatestBlockhashError });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 11:
                    buyRecentBlockhash = (_e = (_f.sent())) === null || _e === void 0 ? void 0 : _e.blockhash;
                    if (!buyRecentBlockhash)
                        return [2 /*return*/, { Err: "Failed to prepare transaction" }];
                    buyTxMsg = new anchor_1.web3.TransactionMessage({
                        instructions: buyFromPoolTxInfo.ixs,
                        payerKey: user,
                        recentBlockhash: buyRecentBlockhash
                    }).compileToV0Message();
                    buyTx = new anchor_1.web3.VersionedTransaction(buyTxMsg);
                    buyTx.sign([keypair]);
                    bundleTips = 5000000;
                    return [4 /*yield*/, sendBundle([createPoolTx, buyTx], keypair, bundleTips, connection).catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, null];
                            });
                        }); }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(res === null || typeof res.Err == 'string')) return [3 /*break*/, 3];
                                        return [4 /*yield*/, (0, utils_1.sleep)(2000)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, sendBundle([createPoolTx, buyTx], keypair, bundleTips, connection).catch(function (sendBundleError) {
                                                log({ sendBundleError: sendBundleError });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                    case 3: return [2 /*return*/, res];
                                }
                            });
                        }); })];
                case 12:
                    bundleTxRes = _f.sent();
                    if (!bundleTxRes) {
                        return [2 /*return*/, { Err: "Failed to send the bundle" }];
                    }
                    if (bundleTxRes.Ok) {
                        _c = bundleTxRes.Ok, bundleId = _c.bundleId, bundleStatus = _c.bundleStatus, txsSignature = _c.txsSignature;
                        createPoolTxSignature = txsSignature[0];
                        buyTxSignature = txsSignature[1];
                        if (!createPoolTxSignature || !buyTxSignature)
                            return [2 /*return*/, { Err: { bundleId: bundleId, poolId: poolId.toBase58() } }];
                        return [2 /*return*/, {
                                Ok: {
                                    bundleId: bundleId,
                                    poolId: poolId.toBase58(),
                                    createPoolTxSignature: createPoolTxSignature,
                                    buyTxSignature: buyTxSignature,
                                    bundleStatus: bundleStatus,
                                }
                            }];
                    }
                    else if (bundleTxRes.Err) {
                        console.log({ bundleTxRes: bundleTxRes });
                        Err = bundleTxRes.Err;
                        if (typeof Err == 'string') {
                            return [2 /*return*/, { Err: Err }];
                        }
                        else {
                            return [2 /*return*/, {
                                    Err: {
                                        bundleId: Err.bundleId,
                                        poolId: poolId.toBase58(),
                                    }
                                }];
                        }
                    }
                    return [2 /*return*/, { Err: "Failed to send the bundle" }];
            }
        });
    });
}
exports.createAndBuy = createAndBuy;
function sendBundle(txs, feePayerAuthority, bundleTips, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var jitoClient, jitoTipAccounts, jitoTipAccount, jitoLeaderNextSlot, recentBlockhash, b, bundleId, bundleRes, transactions, status;
        var _this = this;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    jitoClient = (0, searcher_1.searcherClient)(constants_1.ENV.JITO_BLOCK_ENGINE_URL, constants_1.ENV.JITO_AUTH_KEYPAIR);
                    return [4 /*yield*/, jitoClient.getTipAccounts().catch(function (getTipAccountsError) { log({ getTipAccountsError: getTipAccountsError }); return null; })];
                case 1:
                    jitoTipAccounts = _b.sent();
                    if (!jitoTipAccounts)
                        return [2 /*return*/, { Err: "Unable to prepare the bunde transaction" }];
                    jitoTipAccount = new anchor_1.web3.PublicKey(jitoTipAccounts[Math.floor(Math.random() * jitoTipAccounts.length)]);
                    return [4 /*yield*/, jitoClient.getNextScheduledLeader().catch(function (getNextScheduledLeaderError) { log({ getNextScheduledLeaderError: getNextScheduledLeaderError }); return null; })];
                case 2:
                    jitoLeaderNextSlot = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.nextLeaderSlot;
                    if (!jitoLeaderNextSlot)
                        return [2 /*return*/, { Err: "Unable to prepare the bunde transaction" }
                            // log("jito LedgerNext slot", jitoLeaderNextSlot)
                        ];
                    return [4 /*yield*/, (connection.getLatestBlockhash())];
                case 3:
                    recentBlockhash = (_b.sent()).blockhash;
                    b = new jito_ts_1.bundle.Bundle(txs, txs.length + 1).addTipTx(feePayerAuthority, bundleTips, jitoTipAccount, recentBlockhash);
                    if (b instanceof Error) {
                        log({ bundleError: b });
                        return [2 /*return*/, { Err: "Failed to prepare the bunde transaction" }];
                    }
                    return [4 /*yield*/, jitoClient.sendBundle(b).catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, utils_1.sleep)(3000)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, jitoClient.sendBundle(b).catch(function (sendBunderError) {
                                                log({ sendBunderError: sendBunderError });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 4:
                    bundleId = _b.sent();
                    if (!bundleId) {
                        return [2 /*return*/, { Err: "Bundle transaction failed" }];
                    }
                    // const bundleId = "6f2145c078bf21e7d060d348ff785a42da3546a69ee2201844c9218211360c0d"
                    return [4 /*yield*/, (0, utils_1.sleep)(5000)];
                case 5:
                    // const bundleId = "6f2145c078bf21e7d060d348ff785a42da3546a69ee2201844c9218211360c0d"
                    _b.sent();
                    return [4 /*yield*/, getBundleInfo(bundleId).catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, utils_1.sleep)(5000)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, getBundleInfo(bundleId).catch(function (getBundleInfoError) {
                                                log({ getBundleInfoError: getBundleInfoError });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 6:
                    bundleRes = _b.sent();
                    if (bundleRes === undefined) {
                        //TODO: Bundle failed
                        return [2 /*return*/, { Err: { bundleId: bundleId } }];
                    }
                    if (!bundleRes) {
                        return [2 /*return*/, { Err: { bundleId: bundleId } }];
                    }
                    transactions = bundleRes.transactions, status = bundleRes.status;
                    if (!transactions || !status) {
                        return [2 /*return*/, { Err: { bundleId: bundleId } }];
                    }
                    return [2 /*return*/, {
                            Ok: {
                                bundleId: bundleId,
                                bundleStatus: status,
                                txsSignature: transactions
                            }
                        }];
            }
        });
    });
}
exports.sendBundle = sendBundle;
function getBundleInfo(bundleId) {
    return __awaiter(this, void 0, void 0, function () {
        var bundleRes, bundleResJ;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch("https://explorer.jito.wtf/api/graphqlproxy", {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "en-GB,en;q=0.5",
                            "content-type": "application/json",
                            "Referer": "https://explorer.jito.wtf/bundle/".concat(bundleId)
                        },
                        "body": "{\"operationName\":\"getBundleById\",\"variables\":{\"id\":\"".concat(bundleId, "\"},\"query\":\"query getBundleById($id: String!) {\\n  getBundle(req: {id: $id}) {\\n    bundle {\\n      uuid\\n      timestamp\\n      validatorIdentity\\n      transactions\\n      slot\\n      status\\n      landedTipLamports\\n      signer\\n      __typename\\n    }\\n    __typename\\n  }\\n}\"}"),
                        "method": "POST"
                    })];
                case 1:
                    bundleRes = _c.sent();
                    return [4 /*yield*/, bundleRes.json()];
                case 2:
                    bundleResJ = _c.sent();
                    return [2 /*return*/, (_b = (_a = bundleResJ === null || bundleResJ === void 0 ? void 0 : bundleResJ.data) === null || _a === void 0 ? void 0 : _a.getBundle) === null || _b === void 0 ? void 0 : _b.bundle];
            }
        });
    });
}
exports.getBundleInfo = getBundleInfo;
