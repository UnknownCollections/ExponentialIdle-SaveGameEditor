export declare module Crypto {
    function encrypt(text: string, compress?: boolean): string;
    function decrypt(text: string): string;
}

export declare module Utils {
    function intToBytes(num: number, littleEndian?: boolean): Uint8Array;
    function stringToU8arr(bStr: string): Uint8Array;
    function u8Arr2Hex(u8: Uint8Array): string;
    function mergeTypedArrays(a: ArrayLike<any>, b: ArrayLike<any>): ArrayLike<any>;
    function desDecrypt(data: Uint8Array, key: string, iv: string): Uint8Array;
    function desEncrypt(data: Uint8Array, key: string, iv: string): Uint8Array;
    function sha512(msg: string): string;
}