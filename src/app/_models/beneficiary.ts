export class Beneficiary {
    fullname: string
    relationship: string
    addressAndCode: string
    phoneNo: string
    dob: string
    benefitShare: string

    constructor(fullname: string, relationship: string, addressAndCode: string, phoneNo: string, dob: string, benefitShare: string) {
        this.fullname = fullname, 
        this.relationship = relationship, 
        this.addressAndCode = addressAndCode
        this.phoneNo = phoneNo
        this.dob = dob
        this.benefitShare = benefitShare
    }
}
