"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64 = {
    encode: (plainText) => {
        try {
            const buff = Buffer.from(plainText.toString(), "utf8");
            return buff.toString("base64");
        }
        catch (err) {
            throw err;
        }
    },
    decode: (base64Text) => {
        try {
            const buff = Buffer.from(base64Text, "base64");
            return buff.toString("utf-8");
        }
        catch (err) {
            throw err;
        }
    },
};
exports.default = base64;
