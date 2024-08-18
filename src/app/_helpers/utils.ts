export function getPersonalInfo(personalInfo: any) {
    return {
        "firstName": personalInfo.firstName,
        "middleNames": personalInfo.middleNames,
        "surname": personalInfo.lastName,
        "lastName": personalInfo.lastName,
        "dateOfBirth": personalInfo.dateOfBirth,
        "idDocumentType": personalInfo.idDocument,
        "idDocumentValue": personalInfo.docNumber,
        "gender": personalInfo.gender,
        "maritalStatus": personalInfo.maritalStatus,
        "title": personalInfo.title,
        "titleOther": personalInfo.titleOther,
        "PIN": personalInfo.PIN,
        "nationality": personalInfo.nationality,
        "countryOfResidence": personalInfo.countryOfResidence
    }
}

export function getContacts(contacts: any) {
    return {
        "postalAddress": contacts.postalAddress,
        "postalCode": contacts.postalCode,
        "townCity": contacts.townCity,
        "physicalAddress": contacts.physicalAddress,
        "mobileNo": contacts.mobile,
        "homeNo": contacts.homeNumber,
        "email": contacts.email
    }
}

export function getOccupation(occupation: any) {
    return {
        "occupationType": occupation.typeOfEmployment,
        "occupationNarration": occupation.natureOfBusiness,
        "jobTitle": occupation.role,
        "workplaceName": occupation.nameOfBusiness,
        "workPostalAddress": occupation.workPostalAddress,
        "workPostalCode": occupation.workPostalCode,
        "workTownCity": occupation.workTownOrCity,
        "workPhysicalAddress": occupation.workPhysicalAddress,
        "workPhoneNo": occupation.workPhone,
        "workEmail": occupation.workEmail
    }
}

export type KeyMapping = {
    [oldKey: string]: string
}

export function renameKeys<T extends object>(array: T[], keyMapping: KeyMapping): Array<{ [key: string]: any }> {
    return array.map(item => {
        const newItem: { [key: string]: any } = {}
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const newKey = keyMapping[key] || key
                newItem[newKey] = item[key]
            }
        }
        return newItem
    })
}

export function showSpinner() {
    // var node = document.createElement("li")
    var node = document.createElement("div")
    var imgNode = document.createElement("img")
    imgNode.src = "../../assets/img/spinner.gif"
    node.appendChild(imgNode)
    // document.getElementById('spinnerList')!.appendChild(node)
    document.getElementById('spinnerDiv')!.appendChild(node)
}

export function removeSpinner() {
    // const spinner = document.getElementById('spinnerList')!
    const spinner = document.getElementById('spinnerDiv')!
    while (spinner.hasChildNodes()) {
        spinner.removeChild(spinner.firstChild!)
    }
}

export function pickleError(obj: any) {
    var msg = 'Unknown condition'
    if (obj && obj.error && obj.error.message) msg = obj.error.message
    else if (obj && obj.message) msg = obj.message
    else msg = JSON.stringify(obj)
    return msg
}

