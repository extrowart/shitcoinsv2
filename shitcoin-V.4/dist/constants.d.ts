/// <reference types="@solana/web3.js" />
import { web3 } from "@project-serum/anchor";
export declare const RPC_ENDPOINT_MAIN = "http://127.0.0.1:8899";
export declare const RPC_ENDPOINT_DEV = "http://127.0.0.1:8899";
export declare const ENV: {
    PINATA_API_kEY: string;
    PINATA_API_SECRET_KEY: string;
    PINATA_DOMAIN: string;
    IN_PRODUCTION: boolean;
    COMPUTE_UNIT_PRICE: number;
    JITO_AUTH_KEYPAIR: web3.Keypair;
    JITO_BLOCK_ENGINE_URL: string;
};
