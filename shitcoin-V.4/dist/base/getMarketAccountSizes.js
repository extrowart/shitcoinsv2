"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var orderbookUtils_1 = require("./orderbookUtils");
function useSerumMarketAccountSizes(_a, connection, programID) {
    var eventQueueLength = _a.eventQueueLength, requestQueueLength = _a.requestQueueLength, orderbookLength = _a.orderbookLength;
    var totalEventQueueSize = (0, orderbookUtils_1.calculateTotalAccountSize)(eventQueueLength, orderbookUtils_1.EVENT_QUEUE_HEADER_SIZE, orderbookUtils_1.EVENT_SIZE);
    var totalRequestQueueSize = (0, orderbookUtils_1.calculateTotalAccountSize)(requestQueueLength, orderbookUtils_1.REQUEST_QUEUE_HEADER_SIZE, orderbookUtils_1.REQUEST_SIZE);
    var totalOrderbookSize = (0, orderbookUtils_1.calculateTotalAccountSize)(orderbookLength, orderbookUtils_1.ORDERBOOK_HEADER_SIZE, orderbookUtils_1.ORDERBOOK_NODE_SIZE);
    // const useRentExemption = connection.getMinimumBalanceForRentExemption
    // const marketAccountRent = await useRentExemption(Market.getLayout(programID).span);
    // const eventQueueRent = await useRentExemption(totalEventQueueSize);
    // const requestQueueRent = await useRentExemption(totalRequestQueueSize);
    // const orderbookRent = await useRentExemption(totalOrderbookSize);
    return {
        // marketRent:
        // marketAccountRent + eventQueueRent + requestQueueRent + 2 * orderbookRent,
        marketRent: 0,
        totalEventQueueSize: totalEventQueueSize,
        totalRequestQueueSize: totalRequestQueueSize,
        totalOrderbookSize: totalOrderbookSize,
    };
}
exports.default = useSerumMarketAccountSizes;
