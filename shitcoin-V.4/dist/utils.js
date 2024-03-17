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
exports.sendAndConfirmTransaction = exports.getPubkeyFromStr = exports.sleep = exports.deployJsonData = exports.getKeypairFromEnv = exports.getSlippage = exports.getNullableResutFromPromise = exports.getKeypairFromStr = exports.calcDecimalValue = exports.calcNonDecimalValue = void 0;
var anchor_1 = require("@project-serum/anchor");
var bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var axios_1 = __importDefault(require("axios"));
var dotenv_1 = require("dotenv");
var constants_1 = require("./constants");
(0, dotenv_1.config)();
var log = console.log;
function calcNonDecimalValue(value, decimals) {
    return Math.trunc(value * (Math.pow(10, decimals)));
}
exports.calcNonDecimalValue = calcNonDecimalValue;
function calcDecimalValue(value, decimals) {
    return value / (Math.pow(10, decimals));
}
exports.calcDecimalValue = calcDecimalValue;
function getKeypairFromStr(str) {
    try {
        return anchor_1.web3.Keypair.fromSecretKey(Uint8Array.from(bytes_1.bs58.decode(str)));
    }
    catch (error) {
        return null;
    }
}
exports.getKeypairFromStr = getKeypairFromStr;
function getNullableResutFromPromise(value, opt) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, value.catch(function (error) {
                    if (opt)
                        console.log({ error: error });
                    return (opt === null || opt === void 0 ? void 0 : opt.or) != undefined ? opt.or : null;
                })];
        });
    });
}
exports.getNullableResutFromPromise = getNullableResutFromPromise;
function getSlippage(value) {
    var _a;
    try {
        var slippageVal = value !== null && value !== void 0 ? value : 0;
        var denominator = ((_a = slippageVal.toString().split('.')[1]) !== null && _a !== void 0 ? _a : "").length;
        denominator = Math.pow(10, denominator);
        var number = slippageVal * denominator;
        denominator = denominator * 100;
        var slippage = new raydium_sdk_1.Percent(number, denominator);
        return slippage;
    }
    catch (error) {
        throw "failed to parse slippage input";
    }
}
exports.getSlippage = getSlippage;
function getKeypairFromEnv() {
    var _a;
    var keypairStr = (_a = process.env.KEYPAIR) !== null && _a !== void 0 ? _a : "";
    try {
        var keypair = getKeypairFromStr(keypairStr);
        if (!keypair)
            throw "keypair not found";
        return keypair;
    }
    catch (error) {
        console.log({ error: error });
        throw "Keypair Not Found";
    }
}
exports.getKeypairFromEnv = getKeypairFromEnv;
function deployJsonData(data) {
    return __awaiter(this, void 0, void 0, function () {
        var url, pinataApiKey, pinataSecretApiKey;
        return __generator(this, function (_a) {
            url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
            pinataApiKey = constants_1.ENV.PINATA_API_kEY;
            pinataSecretApiKey = constants_1.ENV.PINATA_API_SECRET_KEY;
            // console.log({pinataApiKey, pinataSecretApiKey})
            return [2 /*return*/, axios_1.default.post(url, data, {
                    headers: {
                        'Content-Type': "application/json",
                        'pinata_api_key': pinataApiKey,
                        'pinata_secret_api_key': pinataSecretApiKey
                    }
                }).then(function (response) {
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.IpfsHash;
                }).catch(function (error) {
                    console.log({ jsonUploadErr: error });
                    return null;
                })];
        });
    });
}
exports.deployJsonData = deployJsonData;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
function getPubkeyFromStr(str) {
    try {
        return new anchor_1.web3.PublicKey((str !== null && str !== void 0 ? str : "").trim());
    }
    catch (error) {
        return null;
    }
}
exports.getPubkeyFromStr = getPubkeyFromStr;
function sendAndConfirmTransaction(tx, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var rawTx, txSignature;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rawTx = tx.serialize();
                    return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed', maxRetries: 4 })
                            .catch(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sleep(500)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, anchor_1.web3.sendAndConfirmRawTransaction(connection, Buffer.from(rawTx), { commitment: 'confirmed' })
                                                .catch(function (txError) {
                                                log({ txError: txError });
                                                return null;
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    txSignature = (_a.sent());
                    return [2 /*return*/, txSignature];
            }
        });
    });
}
exports.sendAndConfirmTransaction = sendAndConfirmTransaction;
