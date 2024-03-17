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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMpl = void 0;
var anchor_1 = require("@project-serum/anchor");
var bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
var baseSpl_1 = require("./baseSpl");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var js_1 = require("@metaplex-foundation/js");
var spl_token_1 = require("@solana/spl-token");
var log = console.log;
var BaseMpl = /** @class */ (function () {
    function BaseMpl(wallet, web3Config) {
        var _this = this;
        this.mplIxs = [];
        this.mplSigns = [];
        this.setUpCallBack = function (ixs, signs) {
            var _a, _b;
            if (ixs) {
                (_a = _this.mplIxs).push.apply(_a, ixs);
                log("ixs added to mpl : ", ixs);
            }
            if (signs) {
                log("sings added to mpl : ", signs);
                (_b = _this.mplSigns).push.apply(_b, signs);
            }
        };
        this.connection = new anchor_1.web3.Connection(web3Config.endpoint, { commitment: 'confirmed' });
        this.metaplex = new js_1.Metaplex(this.connection);
        this.provider = new anchor_1.AnchorProvider(this.connection, wallet, { commitment: 'confirmed' });
        this.baseSpl = new baseSpl_1.BaseSpl(this.connection);
        if (this.metaplex.identity().publicKey.toBase58() != wallet.publicKey.toBase58()) {
            this.metaplex.identity().setDriver({
                publicKey: wallet.publicKey,
                signMessage: null, //TODO: Need to improve it
                signTransaction: wallet.signTransaction,
                signAllTransactions: wallet.signAllTransactions,
            });
        }
    }
    BaseMpl.prototype.reinit = function (wallet) {
        var user = wallet.publicKey;
        if (this.metaplex.identity().publicKey.toBase58() != user.toBase58()) {
            this.metaplex.identity().setDriver({
                publicKey: user,
                signMessage: wallet.signMessage,
                signTransaction: wallet.signTransaction,
                signAllTransactions: wallet.signAllTransactions,
            });
        }
        this.mplIxs = [];
        this.mplSigns = [];
        this.provider = new anchor_1.AnchorProvider(this.connection, wallet, { commitment: 'confirmed' });
    };
    BaseMpl.getEditionAccount = function (tokenId) {
        return anchor_1.web3.PublicKey.findProgramAddressSync([
            bytes_1.utf8.encode("metadata"),
            mpl_token_metadata_1.PROGRAM_ID.toBuffer(),
            tokenId.toBuffer(),
            bytes_1.utf8.encode("edition"),
        ], mpl_token_metadata_1.PROGRAM_ID)[0];
    };
    BaseMpl.getMetadataAccount = function (tokenId) {
        return anchor_1.web3.PublicKey.findProgramAddressSync([bytes_1.utf8.encode("metadata"), mpl_token_metadata_1.PROGRAM_ID.toBuffer(), tokenId.toBuffer()], mpl_token_metadata_1.PROGRAM_ID)[0];
    };
    BaseMpl.getCollectionAuthorityRecordAccount = function (collection, authority) {
        return anchor_1.web3.PublicKey.findProgramAddressSync([
            bytes_1.utf8.encode("metadata"),
            mpl_token_metadata_1.PROGRAM_ID.toBuffer(),
            collection.toBuffer(),
            bytes_1.utf8.encode("collection_authority"),
            authority.toBuffer()
        ], mpl_token_metadata_1.PROGRAM_ID)[0];
    };
    BaseMpl.prototype.createToken = function (input, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var ixs, user, baseSpl, decimal, mintAmount, mintKeypair, _a, mintIxs, _mintKeypair, mint, txBuilder, setMetadataIxs, updateCuIx, recentBlockhash, tx_1, res, error_1;
            var _b;
            var _this = this;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        ixs = [];
                        user = (_c = this === null || this === void 0 ? void 0 : this.provider) === null || _c === void 0 ? void 0 : _c.publicKey;
                        baseSpl = new baseSpl_1.BaseSpl(this.connection);
                        decimal = opts.decimal, mintAmount = opts.mintAmount, mintKeypair = opts.mintKeypair;
                        decimal = decimal !== null && decimal !== void 0 ? decimal : 0;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        mintKeypair = mintKeypair !== null && mintKeypair !== void 0 ? mintKeypair : anchor_1.web3.Keypair.generate();
                        return [4 /*yield*/, baseSpl.createToken({ decimal: decimal, mintAuthority: user, mintingInfo: { tokenAmount: mintAmount }, mintKeypair: mintKeypair })];
                    case 2:
                        _a = _d.sent(), mintIxs = _a.ixs, _mintKeypair = _a.mintKeypair;
                        ixs.push.apply(ixs, mintIxs);
                        input.useNewMint = mintKeypair;
                        input.mintTokens = false;
                        mint = mintKeypair.publicKey;
                        return [4 /*yield*/, this.metaplex.nfts().builders().create(input)];
                    case 3:
                        txBuilder = _d.sent();
                        setMetadataIxs = txBuilder.getInstructions();
                        ixs.push.apply(ixs, setMetadataIxs);
                        updateCuIx = anchor_1.web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: constants_1.ENV.COMPUTE_UNIT_PRICE });
                        return [4 /*yield*/, this.connection.getLatestBlockhash()];
                    case 4:
                        recentBlockhash = (_d.sent()).blockhash;
                        if (opts.revokeAuthorities) {
                            ixs.push(this.baseSpl.revokeAuthority({ authorityType: 'MINTING', currentAuthority: this.provider.publicKey, mint: mint }));
                            ixs.push(this.baseSpl.revokeAuthority({ authorityType: 'FREEZING', currentAuthority: this.provider.publicKey, mint: mint }));
                        }
                        tx_1 = (_b = new anchor_1.web3.Transaction()).add.apply(_b, __spreadArray([updateCuIx], ixs, false));
                        tx_1.feePayer = user;
                        tx_1.recentBlockhash = recentBlockhash;
                        tx_1.sign((0, utils_1.getKeypairFromEnv)());
                        tx_1.sign(mintKeypair);
                        return [4 /*yield*/, this.provider.sendAndConfirm(tx_1, [mintKeypair], { maxRetries: 20 }).catch(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, utils_1.sleep)(2000)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, this.provider.sendAndConfirm(tx_1, [mintKeypair], { maxRetries: 20 }).catch(function (createTokenSendAndConfirmError) {
                                                    log({ createTokenSendAndConfirmError: createTokenSendAndConfirmError });
                                                    return null;
                                                })];
                                    }
                                });
                            }); })];
                    case 5:
                        res = _d.sent();
                        // const res = await sendAndConfirmTransaction(tx, this.connection).catch((sendAndConfirmTransactionError) => {
                        //   log({ sendAndConfirmTransactionError })
                        //   return null
                        // })
                        if (!res)
                            throw "Tx failed";
                        return [2 /*return*/, {
                                txSignature: res,
                                token: mintKeypair.publicKey.toBase58()
                            }];
                    case 6:
                        error_1 = _d.sent();
                        log({ mplTokenCreateError: error_1 });
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BaseMpl.prototype.transfer = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var mint, receiver, sender, amount, tokenStandard, isPNFT, authorizationDetails, tokenInfo, rules, ixs, tx, sign, error_2;
            var _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        mint = input.mint, receiver = input.receiver, sender = input.sender, amount = input.amount, tokenStandard = input.tokenStandard, isPNFT = input.isPNFT;
                        if (typeof mint == 'string')
                            mint = new anchor_1.web3.PublicKey(mint);
                        if (typeof sender == 'string')
                            sender = new anchor_1.web3.PublicKey(sender);
                        if (typeof receiver == 'string')
                            receiver = new anchor_1.web3.PublicKey(receiver);
                        amount = amount !== null && amount !== void 0 ? amount : 1;
                        isPNFT = isPNFT !== null && isPNFT !== void 0 ? isPNFT : false;
                        if (!isPNFT) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getTokenInfo(mint)];
                    case 1:
                        tokenInfo = _d.sent();
                        rules = (_c = (_b = tokenInfo.metadata) === null || _b === void 0 ? void 0 : _b.programmableConfig) === null || _c === void 0 ? void 0 : _c.ruleSet;
                        if (rules)
                            authorizationDetails = { rules: rules };
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        ixs = this.metaplex.nfts().builders().transfer({
                            nftOrSft: { address: mint, tokenStandard: tokenStandard },
                            toOwner: receiver,
                            amount: { basisPoints: new anchor_1.BN(amount), currency: { decimals: 0, namespace: "spl-token", symbol: "" } }, //TODO:
                            // amount: null as any,
                            fromOwner: sender,
                            authorizationDetails: authorizationDetails
                        }).getInstructions();
                        tx = (_a = new anchor_1.web3.Transaction()).add.apply(_a, ixs);
                        return [4 /*yield*/, this.provider.sendAndConfirm(tx)];
                    case 3:
                        sign = _d.sent();
                        return [2 /*return*/, sign];
                    case 4:
                        error_2 = _d.sent();
                        log({ mplTransferError: error_2 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BaseMpl.prototype.burn = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var mint, owner, amount, decimal, ixs, tx, sign;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mint = input.mint, owner = input.owner, amount = input.amount, decimal = input.decimal;
                        if (typeof mint == 'string')
                            mint = new anchor_1.web3.PublicKey(mint);
                        if (typeof owner == 'string')
                            owner = new anchor_1.web3.PublicKey(owner);
                        if (!!amount) return [3 /*break*/, 1];
                        amount = 1;
                        decimal = 0;
                        return [3 /*break*/, 4];
                    case 1:
                        if (!!decimal) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.baseSpl.getMint(mint)];
                    case 2:
                        decimal = (_b.sent()).decimals;
                        _b.label = 3;
                    case 3:
                        amount = amount * (Math.pow(10, decimal));
                        _b.label = 4;
                    case 4:
                        ixs = this.metaplex.nfts().builders().delete({
                            mintAddress: mint,
                            amount: { basisPoints: new anchor_1.BN(amount), currency: { decimals: decimal, namespace: "spl-token", symbol: "" } } //TODO:
                            // amount: token(amount)
                        }).getInstructions();
                        tx = (_a = new anchor_1.web3.Transaction()).add.apply(_a, ixs);
                        return [4 /*yield*/, this.provider.sendAndConfirm(tx)];
                    case 5:
                        sign = _b.sent();
                        return [2 /*return*/, sign];
                }
            });
        });
    };
    BaseMpl.prototype.getTokenInfo = function (mint) {
        return __awaiter(this, void 0, void 0, function () {
            var metadataAccount, accountInfoes, tokenInfo, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof mint == 'string')
                            mint = new anchor_1.web3.PublicKey(mint);
                        metadataAccount = BaseMpl.getMetadataAccount(mint);
                        return [4 /*yield*/, this.connection.getMultipleAccountsInfo([mint, metadataAccount])];
                    case 1:
                        accountInfoes = _a.sent();
                        if (!accountInfoes[0])
                            throw "Token not found";
                        tokenInfo = spl_token_1.MintLayout.decode(accountInfoes[0].data);
                        if (!tokenInfo.isInitialized)
                            throw "Token dosen't initialise";
                        metadata = null;
                        if (accountInfoes[1])
                            metadata = mpl_token_metadata_1.Metadata.deserialize(accountInfoes[1].data)[0];
                        return [2 /*return*/, {
                                address: mint,
                                mintInfo: tokenInfo,
                                metadata: metadata
                            }];
                }
            });
        });
    };
    BaseMpl.prototype.getAndCheckTokenName = function (mint_1) {
        return __awaiter(this, arguments, void 0, function (mint, defaultName) {
            var metadataAccount, _a, mintAccountInfo, metadataAccountInfo, name_1, res, error_3;
            if (defaultName === void 0) { defaultName = ' '; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        metadataAccount = BaseMpl.getMetadataAccount(mint);
                        return [4 /*yield*/, this.connection.getMultipleAccountsInfo([mint, metadataAccount]).catch(function (error) { return [null, null]; })];
                    case 1:
                        _a = _b.sent(), mintAccountInfo = _a[0], metadataAccountInfo = _a[1];
                        if (!mintAccountInfo
                            || mintAccountInfo.owner.toBase58() != spl_token_1.TOKEN_PROGRAM_ID.toBase58()
                            || mintAccountInfo.data.length != spl_token_1.MintLayout.span)
                            return [2 /*return*/, null];
                        name_1 = mint.toBase58();
                        if (metadataAccountInfo) {
                            res = BaseMpl.getTokenNameFromAccountInfo(metadataAccountInfo);
                            if (res)
                                return [2 /*return*/, res];
                        }
                        return [2 /*return*/, defaultName];
                    case 2:
                        error_3 = _b.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseMpl.getTokenNameFromAccountInfo = function (accountInfo) {
        var _a, _b;
        if (!accountInfo)
            return undefined;
        try {
            var metadata = mpl_token_metadata_1.Metadata.deserialize(accountInfo.data)[0];
            return (_b = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.data) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.split("\0")[0];
        }
        catch (error) {
            return undefined;
        }
    };
    // async verifyCollectionItem(input: VerifyNftCollectionBuilderParams) {
    //   const ixs = this.metaplex
    //     .nfts()
    //     .builders()
    //     .verifyCollection(input)
    //     .getInstructions();
    //   const tx = new web3.Transaction().add(...ixs);
    //   return { tx };
    // }
    BaseMpl.prototype.getRevokeMetadataAuthIx = function (token, owner) {
        var metadata = BaseMpl.getMetadataAccount(token);
        var ix = (0, mpl_token_metadata_1.createUpdateMetadataAccountV2Instruction)({
            metadata: metadata,
            updateAuthority: owner
        }, {
            updateMetadataAccountArgsV2: {
                data: null,
                isMutable: false,
                primarySaleHappened: false,
                updateAuthority: null
            }
        });
        return ix;
    };
    return BaseMpl;
}());
exports.BaseMpl = BaseMpl;
