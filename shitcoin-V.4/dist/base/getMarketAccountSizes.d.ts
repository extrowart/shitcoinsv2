/// <reference types="@solana/web3.js" />
import { web3 } from "@project-serum/anchor";
type useSerumMarketAccountSizesProps = {
    eventQueueLength: number;
    requestQueueLength: number;
    orderbookLength: number;
};
export default function useSerumMarketAccountSizes({ eventQueueLength, requestQueueLength, orderbookLength, }: useSerumMarketAccountSizesProps, connection: web3.Connection, programID: web3.PublicKey): {
    marketRent: number;
    totalEventQueueSize: number;
    totalRequestQueueSize: number;
    totalOrderbookSize: number;
};
export {};
