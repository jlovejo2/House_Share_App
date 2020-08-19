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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const client = new stripe_1.default(`${process.env.S_SECRET_KEY}`, {
    /*eslint-disable @typescript-eslint/ban-ts-ignore */
    //@ts-ignore
    apiVersion: "2019-12-03",
});
exports.Stripe = {
    connect: (code) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.oauth.token({
            /*eslint-disable @typescript-eslint/camelcase */
            grant_type: "authorization_code",
            code,
        });
        if (!response) {
            throw new Error("failed to connect with Stripe");
        }
        return response;
    }),
    disconnect: (stripeUserId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.oauth.deauthorize({
            /* eslint-disable @typescript-eslint/camelcase */
            client_id: `${process.env.S_CLIENT_ID}`,
            stripe_user_id: stripeUserId,
        });
        return response;
    }),
    charge: (amount, source, stripeAccount) => __awaiter(void 0, void 0, void 0, function* () {
        /*eslint-disable @typescript-eslint/camelcase */
        const res = yield client.charges.create({
            amount,
            currency: "usd",
            source,
            application_fee_amount: Math.round(amount * 0.05),
        }, {
            stripeAccount: stripeAccount,
        });
        /*eslint-enable @typescript-eslint/camelcase */
        if (res.status !== "succeeded") {
            throw new Error("Failed to create charge with Stripe.");
        }
    }),
};
