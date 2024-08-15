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

