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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var helpers_1 = require("yargs/helpers");
var txHandler_1 = require("./txHandler");
var utils_1 = require("./utils");
var log = console.log;
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .usage('Usage: $0 <command> [options]')
    .command('run', 'run it all', function (yargs) {
    return yargs.option('name', {
        alias: 'n',
        describe: "Token name",
        type: "string",
        demandOption: "Token name is required"
    }).option('symbol', {
        alias: 's',
        describe: "Token symbol",
        type: "string",
    }).option('image', {
        alias: 'i',
        describe: "token image/logo url",
        type: "string",
    }).option('decimals', {
        alias: 'd',
        describe: "token decimals (default: 6)",
        default: 6,
        type: 'number'
    }).option("website", {
        alias: 'w',
        describe: "external website link",
        type: 'string',
        default: ""
    }).option("telegram", {
        alias: 'tg',
        describe: "external telegram link",
        type: 'string',
        default: ""
    }).option("twitter", {
        alias: 'tw',
        describe: "external twitter link",
        type: 'string',
        default: ""
    }).option("description", {
        alias: 'desc',
        describe: "description",
        type: 'string',
        default: ""
    }).option("initial-minting", {
        alias: 'im',
        describe: "How many token you want to mint initially ? (default: 0)",
        type: 'number',
        default: 0
    }).option("url", {
        alias: 'u',
        describe: "network type (devnet/mainnet) default (mainnet)",
        type: 'string',
        default: "mainnet"
    }).option('base-amount', {
        alias: 'ba',
        describe: "Initial base token liquidity",
        type: "number",
        demandOption: "base amount require"
    }).option('quote-amount', {
        alias: 'qa',
        describe: "Initial quote token liquidity",
        type: "number",
        demandOption: "quote amount require"
    }).option('order-size', {
        alias: 'os',
        describe: "Order size used to create market (default: 0.1)",
        type: "number",
        default: 0.1,
    }).option('price-tick', {
        alias: 'pt',
        describe: "Price tick used to create market (default: 0.1)",
        type: "number",
        default: 0.1,
    }).option('delay-seconds', {
        describe: "Time to wait before removing liquidity",
        type: "number",
        default: 0,
    });
}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var name, symbol, image, decimals, website, telegram, twitter, description, url, initialMinting, delaySeconds, createTokenRes, orderSize, priceTick, baseMint, quoteMint, createMarketRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = argv.name, symbol = argv.symbol, image = argv.image, decimals = argv.decimals, website = argv.website, telegram = argv.telegram, twitter = argv.twitter, description = argv.description, url = argv.url, initialMinting = argv.initialMinting, delaySeconds = argv.delaySeconds;
                if (url != 'mainnet' && url != 'devnet') {
                    log("Invalid url");
                    return [2 /*return*/];
                }
                log({
                    name: name,
                    image: image,
                    symbol: symbol,
                    initialMinting: initialMinting,
                    decimals: decimals,
                    website: website,
                    twitter: twitter,
                    telegram: telegram,
                    description: description,
                    url: url
                });
                log("Creating token ...");
                return [4 /*yield*/, (0, txHandler_1.createToken)({
                        name: name,
                        symbol: symbol,
                        url: url,
                        image: image,
                        decimals: decimals,
                        website: website,
                        twitter: twitter,
                        telegram: telegram,
                        description: "",
                        initialMintingAmount: initialMinting,
                        revokeAuthorities: true
                    }).catch(function (createTokenError) {
                        log({
                            createTokenError: createTokenError
                        });
                        return null;
                    })];
            case 1:
                createTokenRes = _a.sent();
                if (createTokenRes === null || createTokenRes === void 0 ? void 0 : createTokenRes.Err) {
                    log(createTokenRes.Err);
                    return [2 /*return*/];
                }
                if (!createTokenRes || !createTokenRes.Ok) {
                    log("failed to create tx");
                    return [2 /*return*/];
                }
                if (!createTokenRes.Ok) return [3 /*break*/, 4];
                log("---- Token successfully minted ----");
                log("Tx Signature : ", createTokenRes.Ok.txSignature);
                log("Token Address : ", createTokenRes.Ok.tokenId);
                // auto revoke inside the token creation
                // log("Revoking Authorities ...") 
                // const token = getPubkeyFromStr(createTokenRes.Ok.tokenId)
                // await revokeAuthority({
                //     token: token!,
                //     url
                // })
                // CREATE MARKET
                log("creating market");
                return [4 /*yield*/, delay(25000)];
            case 2:
                _a.sent();
                orderSize = argv.orderSize, priceTick = argv.priceTick;
                baseMint = undefined;
                quoteMint = undefined;
                baseMint = (0, utils_1.getPubkeyFromStr)(createTokenRes.Ok.tokenId);
                if (!baseMint) {
                    log("Invalid base token address");
                    return [2 /*return*/];
                }
                quoteMint = (0, utils_1.getPubkeyFromStr)("So11111111111111111111111111111111111111112");
                if (!quoteMint) {
                    log("Invalid quote token address");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, txHandler_1.createMarket)({
                        baseMint: baseMint,
                        orderSize: orderSize,
                        priceTick: priceTick,
                        quoteMint: quoteMint,
                        url: url
                    }).catch(function (createMarketError) {
                        log({
                            createMarketError: createMarketError
                        });
                        return null;
                    })];
            case 3:
                createMarketRes = _a.sent();
                if (!createMarketRes)
                    return [2 /*return*/, log("failed to create pool")];
                if (createMarketRes.Err)
                    return [2 /*return*/, log({
                            error: createMarketRes.Err
                        })];
                if (!createMarketRes.Ok)
                    return [2 /*return*/, log("failed to create pool")];
                log("Transaction Successfully Executed:");
                log("Transaction Signature: ", createMarketRes.Ok.txSignature);
                log("Market Address: ", createMarketRes.Ok.marketId);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); })
    .command('createtoken', 'token creation', function (yargs) {
    return yargs.option('name', {
        alias: 'n',
        describe: "Token name",
        type: "string",
        demandOption: "Token name is required"
    }).option('symbol', {
        alias: 's',
        describe: "Token symbol",
        type: "string",
    }).option('image', {
        alias: 'i',
        describe: "token image/logo url",
        type: "string",
    }).option('decimals', {
        alias: 'd',
        describe: "token decimals (default: 6)",
        default: 6,
        type: 'number'
    }).option("website", {
        alias: 'w',
        describe: "external website link",
        type: 'string',
        default: ""
    }).option("telegram", {
        alias: 'tg',
        describe: "external telegram link",
        type: 'string',
        default: ""
    }).option("twitter", {
        alias: 'tw',
        describe: "external twitter link",
        type: 'string',
        default: ""
    }).option("description", {
        alias: 'desc',
        describe: "description",
        type: 'string',
        default: ""
    }).option("initial-minting", {
        alias: 'im',
        describe: "How many token you want to mint initially ? (default: 0)",
        type: 'number',
        default: 0
    }).option("url", {
        alias: 'u',
        describe: "network type (devnet/mainnet) default (mainnet)",
        type: 'string',
        default: "mainnet"
    });
}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var name, symbol, image, decimals, website, telegram, twitter, description, url, initialMinting, createTokenRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = argv.name, symbol = argv.symbol, image = argv.image, decimals = argv.decimals, website = argv.website, telegram = argv.telegram, twitter = argv.twitter, description = argv.description, url = argv.url, initialMinting = argv.initialMinting;
                log({
                    name: name,
                    image: image,
                    symbol: symbol,
                    initialMinting: initialMinting,
                    decimals: decimals,
                    website: website,
                    twitter: twitter,
                    telegram: telegram,
                    url: url,
                    description: description
                });
                log("Creating token ...");
                return [4 /*yield*/, (0, txHandler_1.createToken)({
                        name: name,
                        symbol: symbol,
                        url: url,
                        image: image,
                        decimals: decimals,
                        website: website,
                        twitter: twitter,
                        telegram: telegram,
                        description: description,
                        initialMintingAmount: initialMinting
                    }).catch(function (createTokenError) {
                        log({
                            createTokenError: createTokenError
                        });
                        return null;
                    })];
            case 1:
                createTokenRes = _a.sent();
                if (!createTokenRes) {
                    log("failed to create tx");
                    return [2 /*return*/];
                }
                if (createTokenRes.Ok) {
                    log("---- Token successfully minted ----");
                    log("Tx Signature : ", createTokenRes.Ok.txSignature);
                    log("Token Address : ", createTokenRes.Ok.tokenId);
                }
                else if (createTokenRes.Err) {
                    log(createTokenRes.Err);
                }
                return [2 /*return*/];
        }
    });
}); })
    .command('createmarket', 'create a market to create a pool', function (yargs) {
    return yargs.option('base', {
        alias: 'b',
        describe: "Base token address",
        type: "string",
        demandOption: "base token address must require"
    }).option('quote', {
        alias: 'q',
        describe: "Quote token address",
        type: "string",
        demandOption: "quore token address must require"
    }).option('order-size', {
        alias: 'os',
        describe: "Order size used to create market (default: 0.1)",
        type: "number",
        default: 0.1,
    }).option('price-tick', {
        alias: 'pt',
        describe: "Price tick used to create market (default: 0.1)",
        type: "number",
        default: 0.1,
    }).option("url", {
        alias: 'u',
        describe: "network type (devnet/mainnet) default (mainnet)",
        type: 'string',
        default: "mainnet"
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var orderSize, priceTick, url, baseMint, quoteMint, res, _a, marketId, txSignature;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                orderSize = args.orderSize, priceTick = args.priceTick, url = args.url;
                baseMint = undefined;
                quoteMint = undefined;
                if (url != 'mainnet' && url != 'devnet') {
                    log("please provide right url value ( 'mainnet' / 'devnet')");
                    return [2 /*return*/];
                }
                baseMint = (0, utils_1.getPubkeyFromStr)(args.base);
                if (!baseMint) {
                    log("Invalid base token address");
                    return [2 /*return*/];
                }
                quoteMint = (0, utils_1.getPubkeyFromStr)(args.quote);
                if (!quoteMint) {
                    log("Invalid quote token address");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, txHandler_1.createMarket)({
                        baseMint: baseMint,
                        orderSize: orderSize,
                        priceTick: priceTick,
                        quoteMint: quoteMint,
                        url: url
                    }).catch(function (createMarketError) {
                        log({
                            createMarketError: createMarketError
                        });
                        return null;
                    })];
            case 1:
                res = _b.sent();
                if (!res)
                    return [2 /*return*/, log("failed to create pool")];
                if (res.Err)
                    return [2 /*return*/, log({
                            error: res.Err
                        })];
                if (!res.Ok)
                    return [2 /*return*/, log("failed to create pool")];
                _a = res.Ok, marketId = _a.marketId, txSignature = _a.txSignature;
                log("Transaction Successfully Executed:");
                log("Transaction Signature: ", txSignature);
                log("Market Address: ", marketId);
                return [2 /*return*/];
        }
    });
}); })
    .command('createpool', 'create pool and add liquidity', function (yargs) {
    return yargs.option('market', {
        alias: 'm',
        describe: "Market id",
        type: "string",
        demandOption: "Market id must require"
    }).option('base-amount', {
        alias: 'ba',
        describe: "Initial base token liquidity",
        type: "number",
        demandOption: "base amount require"
    }).option('quote-amount', {
        alias: 'qa',
        describe: "Initial quote token liquidity",
        type: "number",
        demandOption: "quote amount require"
    }).option("url", {
        alias: 'u',
        describe: "network type (devnet/mainnet) default (mainnet)",
        type: 'string',
        default: "mainnet"
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var baseAmount, quoteAmount, orderSize, priceTick, url, marketId, id, res, _a, poolId, txSignature;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                baseAmount = args.baseAmount, quoteAmount = args.quoteAmount, orderSize = args.orderSize, priceTick = args.priceTick, url = args.url;
                orderSize = orderSize !== null && orderSize !== void 0 ? orderSize : 0.1;
                priceTick = priceTick !== null && priceTick !== void 0 ? priceTick : 0.1;
                marketId = undefined;
                if (url != 'mainnet' && url != 'devnet') {
                    log("Provide right url value ( 'mainnet' / 'devnet')");
                    return [2 /*return*/];
                }
                id = (0, utils_1.getPubkeyFromStr)(args.market);
                if (!id) {
                    log("Invalid market id");
                    return [2 /*return*/];
                }
                marketId = id;
                return [4 /*yield*/, (0, txHandler_1.createPool)({
                        marketId: marketId,
                        baseMintAmount: baseAmount,
                        quoteMintAmount: quoteAmount,
                        url: url
                    }).catch(function (error) {
                        console.log({
                            createPoolError: error
                        });
                        return null;
                    })];
            case 1:
                res = _b.sent();
                if (!res)
                    return [2 /*return*/, log("failed to create pool")];
                if (res.Err)
                    return [2 /*return*/, log({
                            error: res.Err
                        })];
                if (!res.Ok)
                    return [2 /*return*/, log("failed to create pool")];
                _a = res.Ok, poolId = _a.poolId, txSignature = _a.txSignature;
                log("Pool creation transaction successfully:");
                log("transaction signature: ", txSignature);
                log("pool address: ", poolId);
                return [2 /*return*/];
        }
    });
}); })
    .command('buy', 'buy token from pool', function (yargs) {
    return yargs.option("pool", {
        alias: 'p',
        describe: "Pool id",
        type: "string",
        demandOption: true
    }).option("buy-token", {
        alias: 'b',
        describe: "which token you want to buy (base / quote)",
        type: "string",
        demandOption: true
    }).option("amount", {
        alias: 'a',
        describe: "how many tokens you want to buy",
        type: "string",
        demandOption: true
    }).option("slippage", {
        alias: 's',
        describe: "slippage tolerance (default: 1%)",
        type: "number",
        default: 1
    }).option("url", {
        alias: 'u',
        describe: "solana network type (default: mainnet )(ex: mainnet / devnet)",
        type: "string",
        default: 'mainnet'
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var buyToken, url, slippageAmount, slippage, poolId, amount, txRes;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                args.url = args.url;
                args.poolId = (_a = args.poolId) !== null && _a !== void 0 ? _a : '';
                buyToken = args.buyToken, url = args.url;
                if (url != 'mainnet' && url != 'devnet')
                    return [2 /*return*/, log("please enter valid url value")];
                if (buyToken != 'base' && buyToken != 'quote')
                    return [2 /*return*/, log("buyToken args values should be 'base' or 'quote'")
                        // const slippageAmount = Number(args.slipapge)
                    ];
                slippageAmount = args.slippage;
                log({ slippageAmount: slippageAmount });
                if (Number.isNaN(slippageAmount))
                    return [2 /*return*/, log("Please enter valid slippage amount")];
                slippage = (0, utils_1.getSlippage)(slippageAmount);
                poolId = (0, utils_1.getPubkeyFromStr)(args.pool.trim());
                if (!poolId)
                    return [2 /*return*/, log("Please enter valid pool address")];
                amount = Number(((_b = args.amount) !== null && _b !== void 0 ? _b : "").trim());
                if (Number.isNaN(amount))
                    return [2 /*return*/, log("Please enter valid amount")];
                return [4 /*yield*/, (0, txHandler_1.swap)({
                        amount: amount,
                        amountSide: 'receive',
                        buyToken: buyToken,
                        poolId: poolId,
                        slippage: slippage,
                        url: url
                    }).catch(function (error) {
                        console.log({
                            swapTxError: error
                        });
                        return null;
                    })];
            case 1:
                txRes = _c.sent();
                if (!txRes)
                    return [2 /*return*/, log("transaction failed")];
                if (txRes.Err)
                    return [2 /*return*/, log({
                            Error: txRes.Err
                        })];
                if (!txRes.Ok)
                    return [2 /*return*/, log("transaction failed")];
                log("--- Buy transaction successfull ---");
                log("Tx signature : ", txRes.Ok.txSignature);
                return [2 /*return*/];
        }
    });
}); })
    .command('sell', 'sell token from pool', function (yargs) {
    return yargs.option("pool", {
        alias: 'p',
        describe: "Pool id",
        type: "string",
        demandOption: true
    }).option("sell-token", {
        alias: 'st',
        describe: "which token you want to buy (base / quote)",
        type: "string",
        demandOption: true
    }).option("amount", {
        alias: 'a',
        describe: "how many tokens you want to buy",
        type: "string",
        demandOption: true
    }).option("slippage", {
        alias: 's',
        describe: "slippage tolerance (default: 1%)",
        type: "number",
        default: 1
    }).option("url", {
        alias: 'u',
        describe: "solana network type (default: mainnet )(ex: mainnet / devnet)",
        type: "string",
        default: 'mainnet'
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var sellToken, url, slippageAmount, slippage, poolId, amount, txRes;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                args.url = args.url;
                args.poolId = (_a = args.poolId) !== null && _a !== void 0 ? _a : '';
                sellToken = args.sellToken, url = args.url;
                if (url != 'mainnet' && url != 'devnet')
                    return [2 /*return*/, log("please enter valid url value")];
                if (sellToken != 'base' && sellToken != 'quote')
                    return [2 /*return*/, log("buyToken args values should be 'base' or 'quote'")
                        // const slippageAmount = Number(args.slipapge)
                    ];
                slippageAmount = args.slippage;
                log({ slippageAmount: slippageAmount });
                if (Number.isNaN(slippageAmount))
                    return [2 /*return*/, log("Please enter valid slippage amount")];
                slippage = (0, utils_1.getSlippage)(slippageAmount);
                poolId = (0, utils_1.getPubkeyFromStr)(args.pool.trim());
                if (!poolId)
                    return [2 /*return*/, log("Please enter valid pool address")];
                amount = Number(((_b = args.amount) !== null && _b !== void 0 ? _b : "").trim());
                if (Number.isNaN(amount))
                    return [2 /*return*/, log("Please enter valid amount")];
                return [4 /*yield*/, (0, txHandler_1.swap)({
                        amount: amount,
                        amountSide: 'send',
                        buyToken: 'base',
                        sellToken: sellToken,
                        poolId: poolId,
                        slippage: slippage,
                        url: url
                    }).catch(function (error) {
                        console.log({
                            swapTxError: error
                        });
                        return null;
                    })];
            case 1:
                txRes = _c.sent();
                if (!txRes)
                    return [2 /*return*/, log("transaction failed")];
                if (txRes.Err)
                    return [2 /*return*/, log({
                            Error: txRes.Err
                        })];
                if (!txRes.Ok)
                    return [2 /*return*/, log("transaction failed")];
                log("--- Sell transaction successfull ---");
                log("Tx signature : ", txRes.Ok.txSignature);
                return [2 /*return*/];
        }
    });
}); })
    .command("addliquidity", "add liquidity in pool", function (yargs) {
    return yargs.option("pool", {
        alias: 'p',
        describe: "pool address",
        demandOption: "poolId require",
        type: 'string'
    }).option("amount", {
        alias: 'a',
        describe: "how much token you want to add (another token amount calcualted automatically)",
        demandOption: "reqire to enter amount",
        type: 'number'
    }).option("amount-side", {
        alias: 'as',
        describe: "which token amount you want to enter (base/quote)",
        demandOption: "reqire to enter amount size",
        type: 'string'
    }).option("slippage", {
        alias: 's',
        describe: "slippage tolerance",
        type: 'number',
        default: 1,
    }).option("url", {
        alias: 'u',
        describe: "solana network type (default: mainnet )(ex: mainnet / devnet)",
        type: "string",
        default: 'mainnet'
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, amountSide, url, poolId, slippage, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = args.amount, amountSide = args.amountSide, url = args.url;
                if (amountSide != 'base' && amountSide != 'quote') {
                    return [2 /*return*/, log("invalid amount side value")];
                }
                if (url != 'mainnet' && url != 'devnet') {
                    return [2 /*return*/, log("invalid url value")];
                }
                poolId = (0, utils_1.getPubkeyFromStr)(args.pool);
                if (!poolId) {
                    log("Invalid pool id");
                    return [2 /*return*/];
                }
                slippage = (0, utils_1.getSlippage)(args.slippage);
                return [4 /*yield*/, (0, txHandler_1.addLiquidity)({
                        amount: amount,
                        amountSide: amountSide,
                        poolId: poolId,
                        slippage: slippage,
                        url: url
                    }).catch(function (outerAddLiquidityError) {
                        log({
                            outerAddLiquidityError: outerAddLiquidityError
                        });
                        return null;
                    })];
            case 1:
                res = _a.sent();
                if (!res)
                    return [2 /*return*/, log("failed to send the transaction")];
                if (res.Err)
                    return [2 /*return*/, log({
                            error: res.Err
                        })];
                if (!res.Ok)
                    return [2 /*return*/, log("failed to send the transaction")];
                log("Add liquidity transaction successfull\nTx Signature: ".concat(res.Ok.txSignature));
                return [2 /*return*/];
        }
    });
}); })
    .command('removeliquidity', 'remove liquidity from the pool', function (yargs) {
    return yargs.option("pool", {
        alias: 'p',
        describe: "pool address",
        demandOption: "poolId require",
        type: 'string'
    }).option("amount", {
        alias: 'a',
        describe: "amount of lp tokens (enter -1 to remove all liquidity)",
        demandOption: "reqire to enter amount",
        type: 'number'
    }).option("url", {
        alias: 'u',
        describe: "solana network type (default: mainnet )(ex: mainnet / devnet)",
        type: "string",
        default: 'mainnet'
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, url, poolId, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = args.amount, url = args.url;
                if (url != 'mainnet' && url != 'devnet') {
                    return [2 /*return*/, log("invalid url value")];
                }
                poolId = (0, utils_1.getPubkeyFromStr)(args.pool);
                if (!poolId) {
                    log("Invalid pool id");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, txHandler_1.removeLiquidity)({
                        amount: amount,
                        poolId: poolId,
                        url: url
                    }).catch(function (outerRemoveLiquidityError) {
                        log({
                            outerRemoveLiquidityError: outerRemoveLiquidityError
                        });
                        return null;
                    })];
            case 1:
                res = _a.sent();
                if (!res)
                    return [2 /*return*/, log("failed to send the transaction")];
                if (res.Err)
                    return [2 /*return*/, log({
                            error: res.Err
                        })];
                if (!res.Ok)
                    return [2 /*return*/, log("failed to send the transaction")];
                log("Remove liquidity transaction successfull\nTx Signature: ".concat(res.Ok.txSignature));
                return [2 /*return*/];
        }
    });
}); })
    .command('unwrap', 'unwrap wrapped sol to normal sol', function (yargs) {
    return yargs.option('url', {
        alias: 'u',
        describe: "solana network type (default: mainnet )(ex: mainnet / devnet)",
        type: "string",
        default: 'mainnet'
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log("unwrapping sol ...");
                url = args.url;
                if (url != 'mainnet' && url != 'devnet')
                    return [2 /*return*/, log("invalid url value")];
                return [4 /*yield*/, (0, txHandler_1.unwrapSol)(url)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .command('minting', 'token minting', function (yargs) {
    return yargs.option('token', {
        alias: 't',
        describe: "Token address",
        type: "string",
        demandOption: "token address require"
    }).option('amount', {
        alias: 'a',
        describe: "how many tokens to mint",
        type: 'number',
        demandOption: "token address require"
    }).option('url', {
        alias: 'u',
        describe: "solana network type (default: mainnet )(ex: mainnet / devnet)",
        type: "string",
        default: 'mainnet'
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var url, token, amount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log("token minting ...");
                url = args.url;
                if (url != 'mainnet' && url != 'devnet')
                    return [2 /*return*/, log("invalid url value")];
                token = (0, utils_1.getPubkeyFromStr)(args.token);
                if (!token)
                    return [2 /*return*/, log("Please enter valid token address")];
                amount = args.amount;
                return [4 /*yield*/, (0, txHandler_1.mintTo)({
                        token: token,
                        amount: amount,
                        url: url
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .command("revokeauth", 'revoke token authority', function (yargs) {
    return yargs.option('token', {
        alias: 't',
        description: "Token address",
        type: 'string',
        demandOption: "token address must require"
    }).option('url', {
        alias: 'u',
        describe: "solana network type (default: mainnet )(ex: mainnet / devnet)",
        type: "string",
        default: 'mainnet'
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var url, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = args.url;
                token = (0, utils_1.getPubkeyFromStr)(args.token);
                if (!token) {
                    log("Invalid token address");
                    return [2 /*return*/];
                }
                if (url != 'mainnet' && url != 'devnet') {
                    log("Invalid url");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, txHandler_1.revokeAuthority)({
                        token: token,
                        url: url
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .command('createpool-buy', 'create pool, bundle buy', function (yargs) {
    return yargs.option('market', {
        alias: 'm',
        describe: "Market id",
        type: "string",
        demandOption: "Market id must require"
    }).option('base-amount', {
        alias: 'ba',
        describe: "Initial base token liquidity",
        type: "number",
        demandOption: "base amount require"
    }).option('quote-amount', {
        alias: 'qa',
        describe: "Initial quote token liquidity",
        type: "number",
        demandOption: "quote amount require"
    }).option("buy-token", {
        alias: 'bt',
        describe: "Which tokne you want to buy (base/quote) ?",
        type: 'string',
        default: "base"
    }).option("buy-amount", {
        describe: "how many token you want to buy instantly",
        type: 'number',
        demandOption: "buy amount require"
    }).option("url", {
        alias: 'u',
        describe: "network type (devnet/mainnet) default (mainnet)",
        type: 'string',
        default: "mainnet"
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var baseAmount, quoteAmount, market, buyToken, buyAmount, url, marketId, res, err, bundleId, poolId, _a, bundleId, bundleStatus, buyTxSignature, createPoolTxSignature, poolId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                baseAmount = args.baseAmount, quoteAmount = args.quoteAmount, market = args.market, buyToken = args.buyToken, buyAmount = args.buyAmount, url = args.url;
                if (url != 'mainnet' && url != 'devnet') {
                    log("Provide right url value ( 'mainnet' / 'devnet')");
                    return [2 /*return*/];
                }
                marketId = (0, utils_1.getPubkeyFromStr)(market);
                if (!marketId) {
                    log("Invalid market id");
                    return [2 /*return*/];
                }
                if (buyToken != 'base' && buyToken != 'quote') {
                    log("invalid buy token value (value should be `base` or `quote`");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, txHandler_1.createAndBuy)({
                        marketId: marketId,
                        baseMintAmount: baseAmount,
                        quoteMintAmount: quoteAmount,
                        buyToken: buyToken,
                        buyAmount: buyAmount,
                        url: url
                    }).catch(function (createAndBuyError) {
                        log({
                            createAndBuyError: createAndBuyError
                        });
                        return null;
                    })];
            case 1:
                res = _b.sent();
                if (!res) {
                    log("Failed to send bundle");
                    return [2 /*return*/];
                }
                if (res.Err) {
                    err = res.Err;
                    console.log({
                        err: err
                    });
                    if (typeof err == 'string')
                        return [2 /*return*/, log(err)];
                    bundleId = err.bundleId, poolId = err.poolId;
                    log("Unable to verify the bundle transaction");
                    log("please check it");
                    log("Bundle id: ", bundleId);
                    log("poolId: ", poolId);
                    log("Check the bundle here: https://explorer.jito.wtf/bundle/".concat(bundleId));
                }
                if (res.Ok) {
                    _a = res.Ok, bundleId = _a.bundleId, bundleStatus = _a.bundleStatus, buyTxSignature = _a.buyTxSignature, createPoolTxSignature = _a.createPoolTxSignature, poolId = _a.poolId;
                    log("Bundle send successfully");
                    log("Bundle id: ", bundleId);
                    log("Pool Id: ", poolId);
                    log("Create pool transaction signature: ", createPoolTxSignature);
                    log("Buy transaction signature: ", buyTxSignature);
                    log("Check the bundle here: https://explorer.jito.wtf/bundle/".concat(bundleId));
                }
                return [2 /*return*/, log("Failed to send bundle")];
        }
    });
}); })
    .command('createpool-buy-remove', 'create pool, add liq, bundle buy, wait and remove liq', function (yargs) {
    return yargs.option('market', {
        alias: 'm',
        describe: "Market id",
        type: "string",
        demandOption: "Market id must require"
    }).option('base-amount', {
        alias: 'ba',
        describe: "Initial base token liquidity",
        type: "number",
        demandOption: "base amount require"
    }).option('quote-amount', {
        alias: 'qa',
        describe: "Initial quote token liquidity",
        type: "number",
        demandOption: "quote amount require"
    }).option("buy-token", {
        alias: 'bt',
        describe: "Which tokne you want to buy (base/quote) ?",
        type: 'string',
        default: "base"
    }).option("buy-amount", {
        describe: "how many token you want to buy instantly",
        type: 'number',
        demandOption: "buy amount require"
    }).option("url", {
        alias: 'u',
        describe: "network type (devnet/mainnet) default (mainnet)",
        type: 'string',
        default: "mainnet"
    }).option('delay-seconds', {
        describe: "Time to wait before removing liquidity",
        type: "number",
        default: 0,
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var baseAmount, quoteAmount, market, buyToken, buyAmount, url, delaySeconds, marketId, res, removePoolId, err, bundleId, poolId, _a, bundleId, bundleStatus, buyTxSignature, createPoolTxSignature, poolId, amount, poolId, removeLiqRes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                baseAmount = args.baseAmount, quoteAmount = args.quoteAmount, market = args.market, buyToken = args.buyToken, buyAmount = args.buyAmount, url = args.url, delaySeconds = args.delaySeconds;
                if (url != 'mainnet' && url != 'devnet') {
                    log("Provide right url value ( 'mainnet' / 'devnet')");
                    return [2 /*return*/];
                }
                marketId = (0, utils_1.getPubkeyFromStr)(market);
                if (!marketId) {
                    log("Invalid market id");
                    return [2 /*return*/];
                }
                if (buyToken != 'base' && buyToken != 'quote') {
                    log("invalid buy token value (value should be `base` or `quote`");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, txHandler_1.createAndBuy)({
                        marketId: marketId,
                        baseMintAmount: baseAmount,
                        quoteMintAmount: quoteAmount,
                        buyToken: buyToken,
                        buyAmount: buyAmount,
                        url: url
                    }).catch(function (createAndBuyError) {
                        log({
                            createAndBuyError: createAndBuyError
                        });
                        return null;
                    })];
            case 1:
                res = _b.sent();
                if (!res) {
                    log("Failed to send bundle");
                    return [2 /*return*/];
                }
                removePoolId = null;
                if (res.Err) {
                    err = res.Err;
                    console.log({ err: err });
                    if (typeof err == 'string')
                        return [2 /*return*/, log(err)];
                    bundleId = err.bundleId, poolId = err.poolId;
                    removePoolId = poolId;
                    log("Unable to verify the bundle transaction");
                    log("please check it");
                    log("Bundle id: ", bundleId);
                    log("poolId: ", poolId);
                    log("Check the bundle here: https://explorer.jito.wtf/bundle/".concat(bundleId));
                }
                if (res.Ok) {
                    _a = res.Ok, bundleId = _a.bundleId, bundleStatus = _a.bundleStatus, buyTxSignature = _a.buyTxSignature, createPoolTxSignature = _a.createPoolTxSignature, poolId = _a.poolId;
                    removePoolId = poolId;
                    log("Bundle send successfully");
                    log("Bundle id: ", bundleId);
                    log("Pool Id: ", poolId);
                    log("Create pool transaction signature: ", createPoolTxSignature);
                    log("Buy transaction signature: ", buyTxSignature);
                    log("Check the bundle here: https://explorer.jito.wtf/bundle/".concat(bundleId));
                }
                return [4 /*yield*/, delay(delaySeconds * 1000)];
            case 2:
                _b.sent();
                if (!(removePoolId != null)) return [3 /*break*/, 5];
                amount = -1;
                poolId = (0, utils_1.getPubkeyFromStr)(removePoolId);
                if (!poolId) {
                    log("Invalid pool id");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, txHandler_1.removeLiquidity)({
                        amount: amount,
                        poolId: poolId,
                        url: url
                    }).catch(function (outerRemoveLiquidityError) {
                        log({ outerRemoveLiquidityError: outerRemoveLiquidityError });
                        return null;
                    })];
            case 3:
                removeLiqRes = _b.sent();
                if (!removeLiqRes)
                    return [2 /*return*/, log("failed to send the transaction")];
                if (removeLiqRes.Err)
                    return [2 /*return*/, log({ error: removeLiqRes.Err })];
                if (!removeLiqRes.Ok)
                    return [2 /*return*/, log("failed to send the transaction")];
                log("Remove liquidity transaction successfull\nTx Signature: ".concat(removeLiqRes.Ok.txSignature));
                return [4 /*yield*/, (0, txHandler_1.unwrapSol)(url)];
            case 4:
                _b.sent();
                log("Unwrapped sol");
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); })
    .command('createpool-remove', 'create pool, add liq, wait and remove liq', function (yargs) {
    return yargs.option('market', {
        alias: 'm',
        describe: "Market id",
        type: "string",
        demandOption: "Market id must require"
    }).option('base-amount', {
        alias: 'ba',
        describe: "Initial base token liquidity",
        type: "number",
        demandOption: "base amount require"
    }).option('quote-amount', {
        alias: 'qa',
        describe: "Initial quote token liquidity",
        type: "number",
        demandOption: "quote amount require"
    }).option("url", {
        alias: 'u',
        describe: "network type (devnet/mainnet) default (mainnet)",
        type: 'string',
        default: "mainnet"
    }).option('delay-seconds', {
        describe: "Time to wait before removing liquidity",
        type: "number",
        default: 0,
    });
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var baseAmount, quoteAmount, orderSize, priceTick, url, delaySeconds, marketId, id, res, amount, poolId, removeCallback, rHandler, removeCallback2, rHandler2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseAmount = args.baseAmount, quoteAmount = args.quoteAmount, orderSize = args.orderSize, priceTick = args.priceTick, url = args.url, delaySeconds = args.delaySeconds;
                orderSize = orderSize !== null && orderSize !== void 0 ? orderSize : 0.1;
                priceTick = priceTick !== null && priceTick !== void 0 ? priceTick : 0.1;
                marketId = undefined;
                if (url != 'mainnet' && url != 'devnet') {
                    log("Provide right url value ( 'mainnet' / 'devnet')");
                    return [2 /*return*/];
                }
                id = (0, utils_1.getPubkeyFromStr)(args.market);
                if (!id) {
                    log("Invalid market id");
                    return [2 /*return*/];
                }
                marketId = id;
                return [4 /*yield*/, (0, txHandler_1.createPool)({
                        marketId: marketId,
                        baseMintAmount: baseAmount,
                        quoteMintAmount: quoteAmount,
                        url: url
                    }).catch(function (error) {
                        console.log({ createPoolError: error });
                        return null;
                    })];
            case 1:
                res = _a.sent();
                if (!res)
                    return [2 /*return*/, log("failed to create pool")];
                if (res.Err)
                    return [2 /*return*/, log({ error: res.Err })];
                if (!res.Ok)
                    return [2 /*return*/, log("failed to create pool")];
                log("Pool creation transaction successfully:");
                log("transaction signature: ", res.Ok.txSignature);
                log("pool address: ", res.Ok.poolId);
                log("Removing liquidity ...");
                return [4 /*yield*/, delay(delaySeconds * 1000)];
            case 2:
                _a.sent();
                amount = -1;
                poolId = (0, utils_1.getPubkeyFromStr)(res.Ok.poolId);
                if (!poolId) {
                    log("Invalid pool id");
                    return [2 /*return*/];
                }
                removeCallback = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, baseAmount, baseDecimals, quoteAmount, quoteDecimals, bA, qA, bq, sbq, extr, amount;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = res.Ok, baseAmount = _a.baseAmount, baseDecimals = _a.baseDecimals, quoteAmount = _a.quoteAmount, quoteDecimals = _a.quoteDecimals;
                                bA = Number(baseAmount.toString());
                                qA = Number(quoteAmount.toString());
                                bq = (bA * qA);
                                sbq = Math.sqrt(bq);
                                extr = Math.pow(10, baseDecimals);
                                amount = Math.trunc(sbq - extr);
                                log({ removeAmount: amount });
                                return [4 /*yield*/, (0, txHandler_1.removeLiquidityFaster)({ amount: amount, poolId: poolId, url: url, unwrapSol: true })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                rHandler = removeCallback().catch(function (outerRemoveLiquidityFaster) {
                    log({ outerRemoveLiquidityFaster: outerRemoveLiquidityFaster });
                    log("faster remove liquidity faild");
                }).then(function () { return log('Lightning remove liquidity pass'); });
                removeCallback2 = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var removeLiqRes;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, txHandler_1.removeLiquidity)({
                                    amount: amount,
                                    poolId: poolId,
                                    url: url,
                                    unwrapSol: true
                                }).catch(function (outerRemoveLiquidityError) {
                                    log({ outerRemoveLiquidityError: outerRemoveLiquidityError });
                                    return null;
                                })];
                            case 1:
                                removeLiqRes = _a.sent();
                                if (!removeLiqRes)
                                    return [2 /*return*/, log("failed to send the transaction")];
                                if (removeLiqRes.Err)
                                    return [2 /*return*/, log({ error: removeLiqRes.Err })];
                                if (!removeLiqRes.Ok)
                                    return [2 /*return*/, log("failed to send the transaction")];
                                log("Remove liquidity transaction successfull\nTx Signature: ".concat(removeLiqRes.Ok.txSignature));
                                return [2 /*return*/];
                        }
                    });
                }); };
                rHandler2 = removeCallback2().catch(function (outerRemoveLiquidityError2) {
                    log({ outerRemoveLiquidityError2: outerRemoveLiquidityError2 });
                });
                return [4 /*yield*/, rHandler];
            case 3:
                _a.sent();
                return [4 /*yield*/, rHandler2
                    // log("unwraping sol...")
                    // await delay(10_000)
                    // await unwrapSol(url)
                    // log(`Unwrapped sol`)
                ];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
})
    .parse();
