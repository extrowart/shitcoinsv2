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
exports.calculateAccountLength = exports.calculateTotalAccountSize = exports.getVaultOwnerAndNonce = exports.ORDERBOOK_HEADER_SIZE = exports.ORDERBOOK_NODE_SIZE = exports.ORDERBOOK_LENGTH = exports.REQUEST_QUEUE_HEADER_SIZE = exports.REQUEST_SIZE = exports.REQUEST_QUEUE_LENGTH = exports.EVENT_QUEUE_HEADER_SIZE = exports.EVENT_SIZE = exports.EVENT_QUEUE_LENGTH = void 0;
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = __importDefault(require("bn.js"));
// export const EVENT_QUEUE_LENGTH = 2978;
exports.EVENT_QUEUE_LENGTH = 128;
exports.EVENT_SIZE = 88;
exports.EVENT_QUEUE_HEADER_SIZE = 32;
exports.REQUEST_QUEUE_LENGTH = 63;
exports.REQUEST_SIZE = 80;
exports.REQUEST_QUEUE_HEADER_SIZE = 32;
// export const ORDERBOOK_LENGTH = 909;
exports.ORDERBOOK_LENGTH = 201;
exports.ORDERBOOK_NODE_SIZE = 72;
exports.ORDERBOOK_HEADER_SIZE = 40;
function getVaultOwnerAndNonce(marketAddress, dexAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var nonce, vaultOwner, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonce = new bn_js_1.default(0);
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, web3_js_1.PublicKey.createProgramAddress([marketAddress.toBuffer(), nonce.toArrayLike(Buffer, "le", 8)], dexAddress)];
                case 3:
                    vaultOwner = _a.sent();
                    return [2 /*return*/, [vaultOwner, nonce]];
                case 4:
                    e_1 = _a.sent();
                    nonce.iaddn(1);
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getVaultOwnerAndNonce = getVaultOwnerAndNonce;
function calculateTotalAccountSize(individualAccountSize, accountHeaderSize, length) {
    var accountPadding = 12;
    var minRequiredSize = accountPadding + accountHeaderSize + length * individualAccountSize;
    var modulo = minRequiredSize % 8;
    return modulo <= 4
        ? minRequiredSize + (4 - modulo)
        : minRequiredSize + (8 - modulo + 4);
}
exports.calculateTotalAccountSize = calculateTotalAccountSize;
function calculateAccountLength(totalAccountSize, accountHeaderSize, individualAccountSize) {
    var accountPadding = 12;
    return Math.floor((totalAccountSize - accountPadding - accountHeaderSize) /
        individualAccountSize);
}
exports.calculateAccountLength = calculateAccountLength;
