/// <reference types="jito-ts/node_modules/@solana/web3.js" />
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export declare const EVENT_QUEUE_LENGTH = 128;
export declare const EVENT_SIZE = 88;
export declare const EVENT_QUEUE_HEADER_SIZE = 32;
export declare const REQUEST_QUEUE_LENGTH = 63;
export declare const REQUEST_SIZE = 80;
export declare const REQUEST_QUEUE_HEADER_SIZE = 32;
export declare const ORDERBOOK_LENGTH = 201;
export declare const ORDERBOOK_NODE_SIZE = 72;
export declare const ORDERBOOK_HEADER_SIZE = 40;
export declare function getVaultOwnerAndNonce(marketAddress: PublicKey, dexAddress: PublicKey): Promise<[vaultOwner: PublicKey, nonce: BN]>;
export declare function calculateTotalAccountSize(individualAccountSize: number, accountHeaderSize: number, length: number): number;
export declare function calculateAccountLength(totalAccountSize: number, accountHeaderSize: number, individualAccountSize: number): number;
