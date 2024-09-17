export class Mpesa {
    name: string
    nationalId: string
    mpesaNo: string

    constructor(name: string, nationalId: string, mpesaNo: string) {
        this.name = name
        this.nationalId = nationalId
        this.mpesaNo = mpesaNo
    }
}
