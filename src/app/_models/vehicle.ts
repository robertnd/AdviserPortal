export class Vehicle {
    regNo: string
    chassisNo: string
    engineNo: string
    make: string
    model: string
    bodyType: string
    cc: string
    yom: string
    purpose: string
    estValue: number
    
    constructor(
        regNo: string, chassisNo: string, engineNo: string, make: string, bodyType: string, cc: string, yom: string, purpose: string, estValue: number
        ) {
      this.regNo = regNo
      this.chassisNo = chassisNo
      this.engineNo = engineNo
      this.make = make
      this.bodyType = bodyType
      this.cc = cc
      this.yom = yom
      this.purpose = purpose
      this.estValue = estValue
    }
  }