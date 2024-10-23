import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function validateDate(): ValidatorFn {
  return (control: AbstractControl):  ValidationErrors | null => {
    const today = new Date().valueOf()
    const startDate = new Date('1900-01-01').valueOf()
    const value = control.value
    // if (value == null || value == '') {
    //   return { required: true }
    // }
    const valueDate = new Date(value).valueOf()
    if (valueDate > today) {
      return { futureDate: true }
    }
    if (valueDate < startDate) {
      return { invalidValue: true }
    }
    return null
  }
}

export function nowOrFutureDate(): ValidatorFn {
  return (control: AbstractControl):  ValidationErrors | null => {
    const startDate = new Date('1900-01-01').valueOf()
    const value = control.value
    // if (value == null || value == '') {
    //   return { required: true }
    // }
    const valueDate = new Date(value).valueOf()
    if (valueDate < startDate) {
      return { invalidValue: true }
    }
    return null
  }
}

export function mustBeNumber(): ValidatorFn {
  return (control: AbstractControl):  ValidationErrors | null => {
    if (isNaN(+control.value)) return { mustBeNumber: true }
    return null
  }
}

export function mustBePositiveNumber(): ValidatorFn {
  return (control: AbstractControl):  ValidationErrors | null => {
    if (isNaN(+control.value)) return { mustBeNumber: true }
    if (Number(control.value) <= 0) return { mustBePositiveNumber: true }
    return null
  }
}

export function mustBeLessThan100(): ValidatorFn {
  return (control: AbstractControl):  ValidationErrors | null => {
    if (isNaN(+control.value)) return { mustBeNumber: true }
    if (Number(control.value) > 100) return { mustBeLessThan100: true }
    return null
  }
}

// /^254(11\d{7}|7[0-3]\d{7}|74[0-8]\d{6}|7[5-9]\d{7})$/ - 254749001122 / 254748001122
export function validateMobileNo_Kenya(): ValidatorFn {
  const regex = /^254(1[0-1]\d{7}|7[0-3]\d{7}|74[0-8]\d{6}|7[5-9]\d{7})$/
  return (control: AbstractControl):  ValidationErrors | null => {
    if ( !regex.test(control.value) ) return { mustBeKenyanMobileNo: true }
    return null
  }
}

