// Yes! There is the Angular convention of defining types, and yet here we are, ignoring it

export type PdfRequestInfo = {
    firstName: string,
    lastName: string,
    plan: string,
    trackingNo: string,
    date?: string
}

export type KeyMapping = {
    [oldKey: string]: string
}

/* Fakes */
export type FAdviserExt = {
    id: number,
    firstName: string,
    middleNames: string,
    surname: string,
    gender: string,
    email: string,
    address: string,
    role: string
}
