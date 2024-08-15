import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private formData = new Map<string, string>()
  private mockObj: any

  constructor() {
    // TODO: Mocking & Testing machinery
    // this.mockObj = this.mockCommon()
    this.mockObj = this.mockPersonalPension()
    // this.mockObj = this.mockIndividualRetirement()
    // this.mockObj = this.mockMaxpac()
    // this.mockObj = this.mockPVI()
    // this.mockObj = this.mockSI()
    // this.mockObj = this.mockUT()
    this.deepClone(this.mockObj)
  }

  addOrUpdatePageData(pageTitle: string, pageData: string) {
    this.formData.set(pageTitle, pageData)
  }

  getPageData(pageTitle: string) {

    return this.formData.get(pageTitle) || '{}'
  }

  dump() {
    //this if for debugging
    return this.formData
  }

  unset() {
    this.formData.clear()
  }

  // TODO: Mocking & Testing machinery
  deepClone(mockObj: any) {
    Object.keys(mockObj).forEach(
      (key: string) => {
        var value = mockObj[key]
        this.formData.set(key, JSON.stringify(value))
      }
    )
  }

  mockCommon() {
    return {
      "Personal Info": {
        "firstName": "Roselinda",
        "lastName": "Tuya",
        "middleNames": "Soipan",
        "dateOfBirth": "1990-08-01",
        "idDocument": "National ID",
        "docNumber": "34234234",
        "gender": "Female",
        "maritalStatus": "Divorced",
        "title": "Other",
        "titleOther": "Honorable CS",
        "PIN": "A43434234",
        "nationality": "Kenya",
        "countryOfResidence": "Kenya"
      },
      "Contacts": {
        "postalAddress": "122100",
        "postalCode": "00100",
        "townCity": "Nairobi",
        "physicalAddress": "232 Govt Way",
        "mobile": "0799112233",
        "homeNumber": "0788112233",
        "email": "defence@gov.go.ke"
      },
      "Occupation": {
        "typeOfEmployment": "Self Employed",
        "nameOfBusiness": "Government of Kenya",
        "role": "Tenderpreneur",
        "natureOfBusiness": "Purveyor of weapons and advice",
        "workPostalAddress": "112",
        "workPostalCode": "00100",
        "workTownOrCity": "Nairobi",
        "workPhysicalAddress": "Ministry of Defence",
        "workPhone": "0100000000",
        "workEmail": "defence@gov.go.ke"
      }
    }

  }

  mockPersonalPension() {
    return {
      "Personal Info": {
        "firstName": "Roselinda",
        "lastName": "Tuya",
        "middleNames": "Soipan",
        "dateOfBirth": "1990-08-01",
        "idDocument": "National ID",
        "docNumber": "34234234",
        "gender": "Female",
        "maritalStatus": "Divorced",
        "title": "Other",
        "titleOther": "Honorable CS",
        "PIN": "A43434234",
        "nationality": "Kenya",
        "countryOfResidence": "Kenya"
      },
      "Contacts": {
        "postalAddress": "122100",
        "postalCode": "00100",
        "townCity": "Nairobi",
        "physicalAddress": "232 Govt Way",
        "mobile": "0799112233",
        "homeNumber": "0788112233",
        "email": "defence@gov.go.ke"
      },
      "Occupation": {
        "typeOfEmployment": "Self Employed",
        "nameOfBusiness": "Government of Kenya",
        "role": "Tenderpreneur",
        "natureOfBusiness": "Purveyor of weapons and advice",
        "workPostalAddress": "112",
        "workPostalCode": "00100",
        "workTownOrCity": "Nairobi",
        "workPhysicalAddress": "Ministry of Defence",
        "workPhone": "0100000000",
        "workEmail": "defence@gov.go.ke"
      },
      "Source of Funds": {
        "employment": true,
        "savings": false,
        "gifts": false,
        "inheritance": true,
        "disposalOfProperty": false,
        "other": true,
        "sourceOfFundsOther": "Government advisory services and ministerial work",
        "remittance": "Self & Employment",
        "selfEmployed_Contribution": "1500",
        "selfEmployed_MoR": "Standing Order",
        "selfEmployed_Frequency": "Monthly",
        "selfEmployed_Bank": "ADD Bank",
        "selfEmployed_Branch": "Moi Avenue",
        "selfEmployed_AccName": "Roselinda and Company Corp",
        "selfEmployed_AccNo": "RS32423423",
        "employed_A1Contribution": "25000",
        "employed_A2Contribution": "25",
        "employed_B1Contribution": "11000",
        "employed_MoR": "EFT",
        "employed_Bank": "CBA Bank",
        "employed_Branch": "Luthuli Ave",
        "employed_AccName": "Rosey Inc",
        "employed_AccNo": "3242342",
        "employed_Designation": "Adviser",
        "employed_Date": "2024-08-13"
      },
      "Residential Address": {
        "lrNumber": "LR12/12/23243",
        "estate": "Karen Close",
        "houseNo": "231",
        "road": "Karen Close",
        "townArea": "Karen"
      },
      "Dependants": {
        "dependantSurname": "Stephen Tuya",
        "dependantForenames": "Olee",
        "dependantIdDocument": "National ID",
        "dependantDocNumber": "432432424",
        "dependantMobileNo": "0888111222",
        "dependantEmail": "tuyoei@mail.com",
        "dependantSpouse": "Husband",
        "dependantChildNames": "John Lani",
        "dependantChildGender": "Son",
        "dependantChildDoB": "2024-07-28"
      },
      "Dependants_children": {
        "Jane Lani": {
          "names": "Jane Lani",
          "gender": "Daughter",
          "dob": "2024-07-28"
        },
        "John Lani": {
          "names": "John Lani",
          "gender": "Son",
          "dob": "2024-07-28"
        }
      },
      "Next of Kin": {
        "nokSurname": "Zeeder",
        "nokForenames": "Tuyaii",
        "nokDoB": "1970-08-01",
        "nokIdDocument": "National ID",
        "nokDocNumber": "232424",
        "nokMobileNo": "0700111222",
        "nokEmail": "zeed@mail.com"
      },
      "Beneficiaries_ppBeneficiaries": {
        "Smalleki Tuya": {
          "fullname": "Smalleki Tuya",
          "relationship": "Leech",
          "addressAndCode": "2323 Kajiado",
          "phoneNo": "06622113232",
          "dob": "1990-08-01",
          "benefitShare": "20"
        },
        "Aggrey Tuya": {
          "fullname": "Aggrey Tuya",
          "relationship": "Uncle",
          "addressAndCode": "2323 Kajiado",
          "phoneNo": "06622113232",
          "dob": "1990-08-01",
          "benefitShare": "30"
        }
      }
    }
  }

  mockIndividualRetirement() {
    return {
      "Personal Info": {
        "firstName": "Roselinda",
        "lastName": "Tuya",
        "middleNames": "Soipan",
        "dateOfBirth": "1990-08-01",
        "idDocument": "National ID",
        "docNumber": "34234234",
        "gender": "Female",
        "maritalStatus": "Divorced",
        "title": "Other",
        "titleOther": "Honorable CS",
        "PIN": "A43434234",
        "nationality": "Kenya",
        "countryOfResidence": "Kenya"
      },
      "Contacts": {
        "postalAddress": "122100",
        "postalCode": "00100",
        "townCity": "Nairobi",
        "physicalAddress": "232 Govt Way",
        "mobile": "0799112233",
        "homeNumber": "0788112233",
        "email": "defence@gov.go.ke"
      },
      "Occupation": {
        "typeOfEmployment": "Self Employed",
        "nameOfBusiness": "Government of Kenya",
        "role": "Tenderpreneur",
        "natureOfBusiness": "Purveyor of weapons and advice",
        "workPostalAddress": "112",
        "workPostalCode": "00100",
        "workTownOrCity": "Nairobi",
        "workPhysicalAddress": "Ministry of Defence",
        "workPhone": "0100000000",
        "workEmail": "defence@gov.go.ke"
      },
      "Beneficiaries": {
        "beneficiariesNames": "Regina King",
        "beneficiariesRelationship": "Maternal Aunt",
        "beneficiariesDoB": "2024-06-30",
        "phoneAndAddress": "34234324234 Antlaar",
        "beneficiariesShare": "15"
      },
      "Beneficiaries_irBeneficiaries": {
        "Regina Queen": {
          "fullname": "Regina Queen",
          "relationship": "Maternal Aunt",
          "addressAndCode": "2024-06-30",
          "phoneNo": "34234324234 Antlaar",
          "dob": "34234324234 Antlaar",
          "benefitShare": "15"
        },
        "Regina King": {
          "fullname": "Regina King",
          "relationship": "Maternal Aunt",
          "addressAndCode": "2024-06-30",
          "phoneNo": "34234324234 Antlaar",
          "dob": "34234324234 Antlaar",
          "benefitShare": "15"
        }
      },
      "Mode of Payment": {
        "standingOrder": true,
        "debitOrder": "",
        "employerCheckOff": true,
        "benefitsBreakdown": "20 to 70 split"
      },
      "Consent": {
        "personalDataConsentName": "Ali Duba Riba",
        "personalDataConsentDate": "2024-08-12",
        "childDataConsentName": "Ali Duba Riba",
        "childDataConsentDate": "2024-08-12",
        "marketingDataConsentName": "Ali Duba Riba",
        "marketingDataConsentDate": "2024-08-12",
        "consentChoice": "Yes, I consent to receiving all marketing information and communications about all new products and services",
        "declarationName": "Ali Duba Riba",
        "declarationDate": "2024-08-12"
      }
    }
  }

  mockMaxpac() {
    return {
      "Personal Info": {
        "firstName": "Roselinda",
        "lastName": "Tuya",
        "middleNames": "Soipan",
        "dateOfBirth": "1990-08-01",
        "idDocument": "National ID",
        "docNumber": "34234234",
        "gender": "Female",
        "maritalStatus": "Divorced",
        "title": "Other",
        "titleOther": "Honorable CS",
        "PIN": "A43434234",
        "nationality": "Kenya",
        "countryOfResidence": "Kenya"
      },
      "Contacts": {
        "postalAddress": "122100",
        "postalCode": "00100",
        "townCity": "Nairobi",
        "physicalAddress": "232 Govt Way",
        "mobile": "0799112233",
        "homeNumber": "0788112233",
        "email": "defence@gov.go.ke"
      },
      "Occupation": {
        "typeOfEmployment": "Self Employed",
        "nameOfBusiness": "Government of Kenya",
        "role": "Tenderpreneur",
        "natureOfBusiness": "Purveyor of weapons and advice",
        "workPostalAddress": "112",
        "workPostalCode": "00100",
        "workTownOrCity": "Nairobi",
        "workPhysicalAddress": "Ministry of Defence",
        "workPhone": "0100000000",
        "workEmail": "defence@gov.go.ke"
      },
      "Beneficiary": {
        "pobox": "12 Voi",
        "town": "Kiambu",
        "telephoneNo": "0888111222",
        "mobileNo": "0888111222",
        "idDocument": "National ID",
        "docNumber": "34234234",
        "email": "Moraa@gmail.com",
        "accountNo": "234324",
        "insuredFrom": "2024-07-28",
        "insuredTo": "2024-09-07"
      },
      "Spouse": {
        "idDocument": "National ID",
        "docNumber": "34234234",
        "pinNo": "A324234324",
        "occupation": "Elder",
        "mobileNo": "09991111222",
        "dateOfBirth": "2024-07-28",
        "coverOptionForInsured": "A",
        "premiumAmountInsured": "35000",
        "coverOptionForSpouse": "H",
        "premiumAmountSpouse": "67000"
      },
      "Children": {
        "childFullName": "Salaipan Masaipan",
        "dateOfBirth": "2024-08-14",
        "coverForChild": "Plan 1",
        "childPremiumAmount": "20000"
      },
      "Children_children": {
        "Okoitisi Ole Tuya": {
          "fullName": "Okoitisi Ole Tuya",
          "dateOfBirth": "2024-08-14",
          "cover": "Plan 1",
          "premiumAmount": "20000"
        },
        "Danse Ole Tuya": {
          "fullName": "Danse Ole Tuya",
          "dateOfBirth": "2024-08-14",
          "cover": "Plan 1",
          "premiumAmount": "20000"
        },
        "Salaipan Masaipan": {
          "fullName": "Salaipan Masaipan",
          "dateOfBirth": "2024-08-14",
          "cover": "Plan 1",
          "premiumAmount": "20000"
        }
      },
      "Declarations": {
        "paymentMode": "Mobile Money",
        "hasHeldAccidentPolicy": "Yes",
        "insurance": "Agora Hills Insurance",
        "branch": "Boulevard Way",
        "address": "100 Mzima Springs",
        "policyNo": "N/234342",
        "deferredOrDeclined": "Yes",
        "refusedRenewal": "Yes",
        "terminated": "No",
        "increasedPremium": "No",
        "specialConditions": "No",
        "detailsOnYes": "Delayed past premiums",
        "additionalInsurance": "Yes",
        "noOfOtherPolicies": "3",
        "totalDeathBenefit": "234000",
        "totalPremium": "1221000",
        "directOrIntermediaries": "Intermediaries",
        "marketingConsent": "I consent",
        "dateOfEntry": "2024-08-14"
      }
    }
  }

  mockPVI() {
    return {
      "Personal Info": {
        "firstName": "Roselinda",
        "lastName": "Tuya",
        "middleNames": "Soipan",
        "dateOfBirth": "1990-08-01",
        "idDocument": "National ID",
        "docNumber": "34234234",
        "gender": "Female",
        "maritalStatus": "Divorced",
        "title": "Other",
        "titleOther": "Honorable CS",
        "PIN": "A43434234",
        "nationality": "Kenya",
        "countryOfResidence": "Kenya"
      },
      "Contacts": {
        "postalAddress": "122100",
        "postalCode": "00100",
        "townCity": "Nairobi",
        "physicalAddress": "232 Govt Way",
        "mobile": "0799112233",
        "homeNumber": "0788112233",
        "email": "defence@gov.go.ke"
      },
      "Occupation": {
        "typeOfEmployment": "Self Employed",
        "nameOfBusiness": "Government of Kenya",
        "role": "Tenderpreneur",
        "natureOfBusiness": "Purveyor of weapons and advice",
        "workPostalAddress": "112",
        "workPostalCode": "00100",
        "workTownOrCity": "Nairobi",
        "workPhysicalAddress": "Ministry of Defence",
        "workPhone": "0100000000",
        "workEmail": "defence@gov.go.ke"
      },
      "Privacy Notice": {},
      "Vehicles": {
        "regNo": "KDK122Z",
        "chassisNo": "43545345",
        "engineNo": "34535",
        "vehicleMake": "Scania",
        "bodyType": "Lorry",
        "cc": "9000",
        "yom": "2020",
        "estimatedValue": "1000000",
        "purposeOfVehicle": "For carriage of passengers for hire and reward",
        "otherPurpose": "Carrying executives",
        "ownerOfVehicles": "No",
        "otherOwner": "Organisation for the Development of Women",
        "otherPartyInterest": "Yes",
        "otherPartyInterestDetails": "Kenya Womens Finance",
        "leftHandDrive": "No",
        "dutyPaid": "Yes",
        "fittedWithAntiTheft": "Yes"
      },
      "Vehicles_vehicles": {
        "KDK101A": {
          "regNo": "KDK101A",
          "chassisNo": "34354353",
          "engineNo": "2342432423",
          "make": "Mercedes Benz",
          "bodyType": "Sedan",
          "cc": "3000",
          "yom": "2015",
          "purpose": "Carrying executives",
          "estValue": "20000000"
        },
        "KDK100A": {
          "regNo": "KDK100A",
          "chassisNo": "43545345",
          "engineNo": "34535",
          "make": "Scania",
          "bodyType": "Bus",
          "cc": "9000",
          "yom": "2020",
          "purpose": "For carriage of passengers for hire and reward",
          "estValue": "1000000"
        },
        "KDK122Z": {
          "regNo": "KDK122Z",
          "chassisNo": "43545345",
          "engineNo": "34535",
          "make": "Scania",
          "bodyType": "Lorry",
          "cc": "9000",
          "yom": "2020",
          "purpose": "For carriage of passengers for hire and reward",
          "estValue": "1000000"
        }
      },
      "Driving and Claims": {
        "hasDrivingLicense": "Yes",
        "classOfLicense": "C",
        "licenseYear": "2000",
        "hasHadAccidentLast5Years": "Yes",
        "dateOfAccident": "2024-05-01",
        "natureOfAccident": "Skid in the rain",
        "lossEstimate": "30000",
        "hasOffenceConviction": "Yes",
        "hasOffenceConvictionDetails": "Driving with an expired license",
        "vehiclesInsured": "Yes",
        "vehiclesInsuredDetails": "BlueBlack Shield",
        "coverRequired": "Comprehensive",
        "extraWindscreenCover": true,
        "extraRadioCassetteLimit": true,
        "riotStrikePoliticalViolence": "",
        "carHire": true,
        "forcedATMWithdrawal10K": true,
        "forcedATMWithdrawal7500": "",
        "lossOfSpareWheel10K": true,
        "lossOfSpareWheel7500": true,
        "trackingDevices": "",
        "excessWaiver": "",
        "dateOfCompletion": "2024-08-14",
        "personCompletingProposal": "Joey Tribbiani"
      },
      "Policy": {
        "policyType": "NEW/RENEWAL",
        "product": "Motor Private",
        "premium": "345000",
        "sumInsured": "12900800",
        "periodFrom": "2024-08-01",
        "periodTo": "2025-08-01"
      },
      "Consent": {
        "personalDataConsentName": "Tuya Soipan",
        "personalDataConsentDate": "2024-08-14",
        "childDataConsentName": "Tuya Soipan",
        "childDataConsentDate": "2024-08-14",
        "marketingDataConsentName": "Tuya Soipan",
        "marketingDataConsentDate": "2024-08-14",
        "consentChoice": "I do not wish to receive any marketing information",
        "declarationName": "Tuya Soipan",
        "declarationDate": "2024-08-14"
      }
    }
  }

  mockSI() {
    return {
      "Personal Info": {
        "firstName": "Roselinda",
        "lastName": "Tuya",
        "middleNames": "Soipan",
        "dateOfBirth": "1990-08-01",
        "idDocument": "National ID",
        "docNumber": "34234234",
        "gender": "Female",
        "maritalStatus": "Divorced",
        "title": "Other",
        "titleOther": "Honorable CS",
        "PIN": "A43434234",
        "nationality": "Kenya",
        "countryOfResidence": "Kenya"
      },
      "Contacts": {
        "postalAddress": "122100",
        "postalCode": "00100",
        "townCity": "Nairobi",
        "physicalAddress": "232 Govt Way",
        "mobile": "0799112233",
        "homeNumber": "0788112233",
        "email": "defence@gov.go.ke"
      },
      "Occupation": {
        "typeOfEmployment": "Self Employed",
        "nameOfBusiness": "Government of Kenya",
        "role": "Tenderpreneur",
        "natureOfBusiness": "Purveyor of weapons and advice",
        "workPostalAddress": "112",
        "workPostalCode": "00100",
        "workTownOrCity": "Nairobi",
        "workPhysicalAddress": "Ministry of Defence",
        "workPhone": "0100000000",
        "workEmail": "defence@gov.go.ke"
      },
      "Privacy Notice": {},
      "Consent": {
        "personalDataConsentName": "Soipee Tuyee",
        "personalDataConsentDate": "2024-08-14",
        "childDataConsentName": "Soipee Tuyee",
        "childDataConsentDate": "2024-08-14",
        "marketingDataConsentName": "Soipee Tuyee",
        "marketingDataConsentDate": "2024-08-14",
        "consentChoice": "I do not wish to receive any marketing information",
        "declarationName": "Soipee Tuyee",
        "declarationDate": "2024-08-14"
      },
      "Details": {
        "coverSelected": "Plan B",
        "currentInternship": "Leadership Programme from the Trump School",
        "periodFrom": "2024-08-01",
        "periodTo": "2025-08-01",
        "heldPreviousAccidentPolicy": "Yes",
        "heldPreviousAccidentPolicyDetails": "Blueshield Insurance",
        "freeOfDisability": "No",
        "freeOfDisabilityDetails": "Still waiting on the consensus",
        "accidentsInLast5Years": "Fender bender 2010",
        "inExcludedActivities": "Yes",
        "fireworksExplosives": true,
        "sinkingWells": "",
        "dams": "",
        "airOrBoatCrew": true,
        "racing": "",
        "uniformedForces": "",
        "proSport": "",
        "diving": true,
        "mining": "",
        "extensionCover": "Yes",
        "declarationDate": "2024-08-14",
        "byName": "Ali Roba",
        "agency": "Mobius Strip"
      }
    }
  }

  mockUT() {
    return {
      "Personal Info": {
        "firstName": "Roselinda",
        "lastName": "Tuya",
        "middleNames": "Soipan",
        "dateOfBirth": "1990-08-01",
        "idDocument": "National ID",
        "docNumber": "34234234",
        "gender": "Female",
        "maritalStatus": "Divorced",
        "title": "Other",
        "titleOther": "Honorable CS",
        "PIN": "A43434234",
        "nationality": "Kenya",
        "countryOfResidence": "Kenya"
      },
      "Contacts": {
        "postalAddress": "122100",
        "postalCode": "00100",
        "townCity": "Nairobi",
        "physicalAddress": "232 Govt Way",
        "mobile": "0799112233",
        "homeNumber": "0788112233",
        "email": "defence@gov.go.ke"
      },
      "Occupation": {
        "typeOfEmployment": "Self Employed",
        "nameOfBusiness": "Government of Kenya",
        "role": "Tenderpreneur",
        "natureOfBusiness": "Purveyor of weapons and advice",
        "workPostalAddress": "112",
        "workPostalCode": "00100",
        "workTownOrCity": "Nairobi",
        "workPhysicalAddress": "Ministry of Defence",
        "workPhone": "0100000000",
        "workEmail": "defence@gov.go.ke"
      },
      "Joint Account Holder": {
        "jahRelationship": "Other",
        "jahRelationshipOther": "VC Capital Funds",
        "jahCanGetBeneficialOwnership": "Yes",
        "jahSignatories": "Other",
        "jahSignatoriesOther": "Arbiter",
        "jahFirstName": "Doktore",
        "jahSurname": "Tuyaa",
        "jahTitle": "Other",
        "jahTitleOther": "Ambassador",
        "jahIdDocument": "National ID",
        "jahDocNumber": "113423424",
        "jahDateOfBirth": "1969-08-01",
        "jahMaritalStatus": "Married",
        "jahPIN": "A90890890",
        "jahPostalAddress": "1221 Kiambu Main",
        "jahPostalCode": "3424",
        "jahCityOrTown": "Kiambu",
        "jahPhysicalAddress": "1221 Kiambu Main",
        "jahCountryOfResidence": "Kenya",
        "jahOccupationOrBusiness": "Consultant",
        "jahPlaceOfWork": "Remote",
        "jahPhoneNo": "0888111222",
        "jahMobileNo": "0888111222",
        "jahEMail": "Info@gmail.com"
      },
      "Next of Kin": {
        "nokFirstName": "Alex",
        "nokSurname": "Zeeder",
        "nokNationality": "Kenya",
        "nokTitle": "Other",
        "nokTitleOther": "Seer",
        "nokIdDocument": "Military ID",
        "nokDocNumber": "543545",
        "nokDateOfBirth": "1996-08-03",
        "nokMaritalStatus": "Married",
        "nokPIN": "A45654645",
        "nokPostalAddress": "1221 Thika",
        "nokPostalCode": "3424",
        "nokCityOrTown": "Kiambu",
        "nokPhysicalAddress": "1221 Thika",
        "nokCountryOfResidence": "Kenya",
        "nokOccupationOrBusiness": "Advisor",
        "nokPlaceOfWork": "None",
        "nokPhoneNo": "0888111222",
        "nokMobileNo": "0100000000",
        "nokEMail": "Admin@gmail.com"
      },
      "Life Wrapper": {
        "lwBNFirstName": "Alex",
        "lwBNSurname": "Tuyioo",
        "lwBNIDorPassportNo": "5435435",
        "lwBNRelationship": "Niece",
        "lwBNPostalAddress": "1221 Thika",
        "lwBNMobileNo": "0100889900",
        "lwBNEMail": "defence@gov.go.ke",
        "lwIsMinor": "Yes",
        "lwGuardianFirstName": "Gregor",
        "lwGuardianSurname": "Numtee",
        "lwGuardianIDorPassportNo": "14234234",
        "lwGuardianRelationship": "Uncle",
        "lwGuardianPostalAddress": "1221 Mombasa",
        "lwGuardianMobileNo": "0888111222",
        "lwGuardianEMail": "jamie@gmail.com"
      },
      "Life Wrapper Consent": {
        "lwcDataForChildName": "Weiya Tuya",
        "lwcDataForChildDate": "2024-08-14",
        "lwc3rdPartyName": "Weiya Tuya",
        "lwc3rdPartyDate": "2024-08-14",
        "lwcAcceptOrNot": "I consent",
        "lwcAcceptOrNotDate": "2024-08-14",
        "lwcDeclName": "Weiya Tuya",
        "lwcDeclNameDate": "2024-08-14"
      },
      "Source of Funds": {
        "salary": true,
        "businessIncome": false,
        "gifts": true,
        "saleOfProperty": false,
        "savings": false,
        "other": true,
        "otherSourceOfFunds": "Capital Gains"
      },
      "Bank Info": {
        "accountHolder": "Kopp",
        "accountNo": "Tuya",
        "accountType": "Current",
        "bankName": "ABC Bank",
        "branch": "Boulevard Way"
      },
      "Mpesa Activation": {
        "mpesaName": "Roy Masamba",
        "nationalId": "345435345",
        "mpesaNumber": "0711334455"
      },
      "Mpesa Activation_mpesaNums": {
        "Hassan H Liga": {
          "name": "Hassan H Liga",
          "nationalId": "1123232",
          "mpesaNo": "0722334455"
        },
        "Flavia Ikoo": {
          "name": "Flavia Ikoo",
          "nationalId": "345435345",
          "mpesaNo": "0712334455"
        },
        "Roy Masamba": {
          "name": "Roy Masamba",
          "nationalId": "345435345",
          "mpesaNo": "0711334455"
        }
      },
      "Income Distribution": {
        "moneyMarket": true,
        "equityFund": false,
        "balancedFund": true,
        "bondFund": false,
        "cheque": true,
        "directCash": false,
        "eftRtgs": true,
        "internationalTransfer": false,
        "postaPay": false,
        "imoneyMarketFund": "1000",
        "iequityFund": "1230",
        "ibalancedFund": "1560",
        "ibondFund": "8900",
        "totalInvested": "120",
        "totalInvestedWords": "200",
        "imoneyMarketFund_1": "9080",
        "iequityFund_1": "1100",
        "ibalancedFund_1": "600",
        "ibondFund_1": "12000",
        "totalInvested_1": "4500",
        "totalInvestedWords_1": "1220"
      },
      "Privacy Notice": {},
      "Risk Assessment": {
        "ageGroup": "18 to 35 years (3)",
        "investedPicks": "More than 3 investment categories (3)",
        "holdings": "More than 3 of the above (3)",
        "projectedIncome": "Decline / Stop (1)",
        "portion": "0 - 40% (3)",
        "knowledge": "No knowledge at all (1)",
        "returns": "Same as bank (1)",
        "onLoss": "It would not bother me, I would give it whatever timeframe it requires to grow and probably invest more(3)",
        "attracts": "Its good return, regardless of the risk (3)",
        "savings": "None (1)",
        "projectedWithdrawal": "Less than a year (1)",
        "monthlyIncomeRange": "Below Kshs 50000 (1)",
        "monthlyIncomeSource": "Salary plus business income (3)",
        "dateOfDecl": "2024-08-14"
      }
    }
  }

}
