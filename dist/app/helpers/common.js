"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.isJSON = void 0;
function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.isJSON = isJSON;
function isObject(input) {
    return typeof input === "object" && !Array.isArray(input);
}
exports.isObject = isObject;
