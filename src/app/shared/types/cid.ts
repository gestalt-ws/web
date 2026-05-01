
// IPFS Content Identifier
export type CID = string & { readonly __brand: unique symbol };

/**
 * Validate a type is an IPFS CID.
 * @param value - CID string.
 * @return boolean - is a CID or not.
 **/
export function isCID(value: string): value is CID {
    const cidRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]{58,})$/;
    return cidRegex.test
}
