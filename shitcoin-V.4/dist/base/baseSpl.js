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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSpl = void 0;
var anchor_1 = require("@project-serum/anchor");
var spl_token_1 = require("@solana/spl-token");
var utils_1 = require("./utils");
var log = console.log;
var BaseSpl = /** @class */ (function () {
    function BaseSpl(connection) {
        this.splIxs = [];
        this.connection = connection;
        this.cacheAta = new Set();
    }
    BaseSpl.prototype.__reinit = function () {
        this.splIxs = [];
        this.cacheAta = new Set();
    };
    BaseSpl.prototype.createToken = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var mintAuthority, decimal, payer, freezAuthority, mintKeypair, mintingInfo, mint, rent, ix1, ix2, tokenReceiver, allowOffCurveOwner, tokenAmount, _a, ata, createTokenAccountIx, ix3, ixs;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.__reinit();
                        mintAuthority = opts.mintAuthority, decimal = opts.decimal, payer = opts.payer, freezAuthority = opts.freezAuthority, mintKeypair = opts.mintKeypair, mintingInfo = opts.mintingInfo;
                        payer = payer !== null && payer !== void 0 ? payer : mintAuthority;
                        freezAuthority = freezAuthority !== null && freezAuthority !== void 0 ? freezAuthority : mintAuthority;
                        decimal = decimal !== null && decimal !== void 0 ? decimal : 0;
                        mintKeypair = mintKeypair !== null && mintKeypair !== void 0 ? mintKeypair : anchor_1.web3.Keypair.generate();
                        mint = mintKeypair.publicKey;
                        return [4 /*yield*/, this.connection.getMinimumBalanceForRentExemption(spl_token_1.MINT_SIZE)];
                    case 1:
                        rent = _c.sent();
                        ix1 = anchor_1.web3.SystemProgram.createAccount({
                            fromPubkey: payer,
                            lamports: rent,
                            newAccountPubkey: mint,
                            programId: spl_token_1.TOKEN_PROGRAM_ID,
                            space: spl_token_1.MINT_SIZE,
                        });
                        this.splIxs.push(ix1);
                        ix2 = (0, spl_token_1.createInitializeMintInstruction)(mintKeypair.publicKey, decimal, mintAuthority, freezAuthority);
                        this.splIxs.push(ix2);
                        if (mintingInfo && mintingInfo.tokenAmount) {
                            tokenReceiver = mintingInfo.tokenReceiver, allowOffCurveOwner = mintingInfo.allowOffCurveOwner, tokenAmount = mintingInfo.tokenAmount;
                            tokenReceiver = (_b = mintingInfo.tokenReceiver) !== null && _b !== void 0 ? _b : opts.mintAuthority;
                            allowOffCurveOwner = allowOffCurveOwner !== null && allowOffCurveOwner !== void 0 ? allowOffCurveOwner : false;
                            tokenAmount = tokenAmount !== null && tokenAmount !== void 0 ? tokenAmount : 1;
                            tokenAmount = tokenAmount * (Math.pow(10, decimal));
                            _a = this.createTokenAccount(mint, tokenReceiver, allowOffCurveOwner, payer), ata = _a.ata, createTokenAccountIx = _a.ix;
                            this.splIxs.push(createTokenAccountIx);
                            ix3 = (0, spl_token_1.createMintToInstruction)(mint, ata, mintAuthority, tokenAmount);
                            this.splIxs.push(ix3);
                        }
                        ixs = this.splIxs;
                        this.__reinit();
                        return [2 /*return*/, {
                                mintKeypair: mintKeypair,
                                ixs: ixs,
                            }];
                }
            });
        });
    };
    BaseSpl.prototype.createTokenAccount = function (mint, owner, allowOffCurveOwner, payer) {
        if (allowOffCurveOwner === void 0) { allowOffCurveOwner = false; }
        var ata = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner, allowOffCurveOwner);
        var ix = (0, spl_token_1.createAssociatedTokenAccountInstruction)(payer !== null && payer !== void 0 ? payer : owner, ata, owner, mint);
        return {
            ata: ata,
            ix: ix,
        };
    };
    BaseSpl.prototype.getOrCreateTokenAccount = function (input, ixCallBack) {
        return __awaiter(this, void 0, void 0, function () {
            var owner, mint, payer, allowOffCurveOwner, checkCache, ata, ix, info;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        owner = input.owner, mint = input.mint, payer = input.payer, allowOffCurveOwner = input.allowOffCurveOwner, checkCache = input.checkCache;
                        allowOffCurveOwner = allowOffCurveOwner !== null && allowOffCurveOwner !== void 0 ? allowOffCurveOwner : false;
                        payer = payer !== null && payer !== void 0 ? payer : owner;
                        ata = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner, allowOffCurveOwner);
                        ix = null;
                        return [4 /*yield*/, this.connection.getAccountInfo(ata).catch(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, utils_1.sleep)(2000)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, this.connection.getAccountInfo(ata).catch(function (getAccountInfoError) {
                                                    log({ getAccountInfoError: getAccountInfoError });
                                                    return undefined;
                                                })];
                                    }
                                });
                            }); })];
                    case 1:
                        info = _a.sent();
                        if (info === undefined)
                            throw "Failed to fetch data";
                        if (!info) {
                            ix = this.createTokenAccount(mint, owner, allowOffCurveOwner, payer).ix;
                            if (ixCallBack) {
                                if (checkCache) {
                                    if (!this.cacheAta.has(ata.toBase58())) {
                                        ixCallBack([ix]);
                                        this.cacheAta.add(ata.toBase58());
                                    }
                                    else
                                        log("already exist");
                                }
                                else {
                                    ixCallBack([ix]);
                                }
                            }
                        }
                        return [2 /*return*/, {
                                ata: ata,
                                ix: ix,
                            }];
                }
            });
        });
    };
    BaseSpl.prototype.getMintToInstructions = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var mintAuthority, mint, receiver, amount, receiverIsOffCurve, init_if_needed, mintDecimal, receiverAta, ixs, ataInfo, ix_1, ix;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mintAuthority = input.mintAuthority, mint = input.mint, receiver = input.receiver, amount = input.amount, receiverIsOffCurve = input.receiverIsOffCurve, init_if_needed = input.init_if_needed, mintDecimal = input.mintDecimal;
                        if (typeof mintAuthority == 'string')
                            mintAuthority = new anchor_1.web3.PublicKey(mintAuthority);
                        if (typeof mint == 'string')
                            mint = new anchor_1.web3.PublicKey(mint);
                        if (typeof receiver == 'string')
                            receiver = new anchor_1.web3.PublicKey(receiver);
                        receiver = receiver !== null && receiver !== void 0 ? receiver : mintAuthority;
                        receiverIsOffCurve = receiverIsOffCurve !== null && receiverIsOffCurve !== void 0 ? receiverIsOffCurve : false;
                        init_if_needed = init_if_needed !== null && init_if_needed !== void 0 ? init_if_needed : false;
                        amount = amount !== null && amount !== void 0 ? amount : 1;
                        if (!!mintDecimal) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, spl_token_1.getMint)(this.connection, mint)];
                    case 1:
                        mintDecimal = (_a.sent()).decimals;
                        _a.label = 2;
                    case 2:
                        amount = (0, utils_1.calcNonDecimalValue)(amount, mintDecimal);
                        receiverAta = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, receiver, receiverIsOffCurve);
                        ixs = [];
                        if (!init_if_needed) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.connection.getAccountInfo(receiverAta)];
                    case 3:
                        ataInfo = _a.sent();
                        if (!ataInfo) { // init ata if needed
                            ix_1 = (0, spl_token_1.createAssociatedTokenAccountInstruction)(mintAuthority, receiverAta, receiver, mint);
                            ixs.push(ix_1);
                        }
                        _a.label = 4;
                    case 4:
                        ix = (0, spl_token_1.createMintToInstruction)(mint, receiverAta, mintAuthority, BigInt(amount.toString()));
                        ixs.push(ix);
                        return [2 /*return*/, ixs];
                }
            });
        });
    };
    BaseSpl.prototype.transfer = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var mint, sender, receiver, receiverIsOffCurve, init_if_needed, decimal, payer, ixs, mintInfo, amount, senderAta, receiverAta, _a, _, ix1, _b, __, ix2, ix;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        mint = input.mint, sender = input.sender, receiver = input.receiver, receiverIsOffCurve = input.receiverIsOffCurve, init_if_needed = input.init_if_needed, decimal = input.decimal, payer = input.payer;
                        receiverIsOffCurve = receiverIsOffCurve !== null && receiverIsOffCurve !== void 0 ? receiverIsOffCurve : false;
                        payer = payer !== null && payer !== void 0 ? payer : sender;
                        input.amount = (_c = input.amount) !== null && _c !== void 0 ? _c : 1;
                        if (typeof mint == 'string')
                            mint = new anchor_1.web3.PublicKey(mint);
                        if (typeof sender == 'string')
                            sender = new anchor_1.web3.PublicKey(sender);
                        if (typeof receiver == 'string')
                            receiver = new anchor_1.web3.PublicKey(receiver);
                        if (typeof payer == 'string')
                            payer = new anchor_1.web3.PublicKey(payer);
                        ixs = [];
                        if (!!decimal) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, spl_token_1.getMint)(this.connection, mint)];
                    case 1:
                        mintInfo = _d.sent();
                        decimal = mintInfo.decimals;
                        _d.label = 2;
                    case 2:
                        amount = (0, utils_1.calcNonDecimalValue)(input.amount, decimal);
                        senderAta = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, sender);
                        receiverAta = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, receiver, receiverIsOffCurve);
                        if (!init_if_needed) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getOrCreateTokenAccount({ mint: mint, owner: sender, payer: payer })];
                    case 3:
                        _a = _d.sent(), _ = _a.ata, ix1 = _a.ix;
                        if (ix1)
                            ixs.push(ix1);
                        return [4 /*yield*/, this.getOrCreateTokenAccount({ mint: mint, owner: receiver, payer: payer, allowOffCurveOwner: receiverIsOffCurve })];
                    case 4:
                        _b = _d.sent(), __ = _b.ata, ix2 = _b.ix;
                        if (ix2)
                            ixs.push(ix2);
                        _d.label = 5;
                    case 5:
                        ix = (0, spl_token_1.createTransferInstruction)(senderAta, receiverAta, sender, amount);
                        ixs.push(ix);
                        return [2 /*return*/, ixs];
                }
            });
        });
    };
    BaseSpl.prototype.burn = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var mint, owner, amount, decimal, tokenInfo, ata, ix;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mint = input.mint, owner = input.owner, amount = input.amount, decimal = input.decimal;
                        if (typeof mint == 'string')
                            mint = new anchor_1.web3.PublicKey(mint);
                        if (typeof owner == 'string')
                            owner = new anchor_1.web3.PublicKey(owner);
                        amount = amount !== null && amount !== void 0 ? amount : 1;
                        if (!!decimal) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, spl_token_1.getMint)(this.connection, mint)];
                    case 1:
                        tokenInfo = _a.sent();
                        decimal = tokenInfo.decimals;
                        _a.label = 2;
                    case 2:
                        amount = amount * (Math.pow(10, decimal));
                        ata = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner);
                        ix = (0, spl_token_1.createBurnInstruction)(ata, mint, owner, amount);
                        return [2 /*return*/, ix];
                }
            });
        });
    };
    BaseSpl.prototype.tranferMintAuthority = function (input, ixCallBack) {
        var mint = input.mint, currentAuthority = input.currentAuthority, newAuthority = input.newAuthority;
        var ix = (0, spl_token_1.createSetAuthorityInstruction)(mint, currentAuthority, spl_token_1.AuthorityType.MintTokens, newAuthority);
        if (ixCallBack)
            ixCallBack([ix]);
        return {
            ix: ix,
        };
    };
    BaseSpl.prototype.tranferFreezAuthority = function (input, ixCallBack) {
        var mint = input.mint, currentAuthority = input.currentAuthority, newAuthority = input.newAuthority;
        var ix = (0, spl_token_1.createSetAuthorityInstruction)(mint, currentAuthority, spl_token_1.AuthorityType.FreezeAccount, newAuthority);
        if (ixCallBack)
            ixCallBack([ix]);
        return {
            ix: ix,
        };
    };
    BaseSpl.prototype.revokeAuthority = function (input, ixCallBack) {
        var mint = input.mint, currentAuthority = input.currentAuthority, authorityType = input.authorityType;
        var setAuthType = authorityType == 'MINTING' ? spl_token_1.AuthorityType.MintTokens : spl_token_1.AuthorityType.FreezeAccount;
        var ix = (0, spl_token_1.createSetAuthorityInstruction)(mint, currentAuthority, setAuthType, null);
        if (ixCallBack)
            ixCallBack([ix]);
        // return {
        //   ix,
        // }
        return ix;
    };
    BaseSpl.prototype.listAllOwnerTokens = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedTokenAccounts, res, _i, parsedTokenAccounts_1, i, parsedAccountInfo, mintAddress, tokenBalance;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (typeof owner == 'string')
                            owner = new anchor_1.web3.PublicKey(owner);
                        return [4 /*yield*/, this.connection.getParsedTokenAccountsByOwner(owner, { programId: spl_token_1.TOKEN_PROGRAM_ID })];
                    case 1:
                        parsedTokenAccounts = (_f.sent()).value;
                        res = [];
                        for (_i = 0, parsedTokenAccounts_1 = parsedTokenAccounts; _i < parsedTokenAccounts_1.length; _i++) {
                            i = parsedTokenAccounts_1[_i];
                            parsedAccountInfo = i.account.data;
                            mintAddress = new anchor_1.web3.PublicKey((_b = (_a = parsedAccountInfo.parsed) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.mint);
                            tokenBalance = (_e = (_d = (_c = parsedAccountInfo.parsed) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.tokenAmount) === null || _e === void 0 ? void 0 : _e.uiAmount;
                            res.push({
                                amount: tokenBalance,
                                token: mintAddress
                            });
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    BaseSpl.prototype.getMint = function (mint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof mint == 'string')
                    mint = new anchor_1.web3.PublicKey(mint);
                return [2 /*return*/, (0, spl_token_1.getMint)(this.connection, mint)];
            });
        });
    };
    BaseSpl.getTokenAccountFromAccountInfo = function (accountInfo) {
        if (!accountInfo)
            return null;
        try {
            return spl_token_1.AccountLayout.decode(accountInfo.data);
        }
        catch (error) {
            return null;
        }
    };
    BaseSpl.prototype.getSolBalance = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.getAccountInfo(user).catch(function () { return null; })];
                    case 1:
                        account = _a.sent();
                        if (account) {
                            return [2 /*return*/, (0, utils_1.calcDecimalValue)(account.lamports, 9)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return BaseSpl;
}());
exports.BaseSpl = BaseSpl;
