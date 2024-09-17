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

