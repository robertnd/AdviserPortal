import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { inject } from '@angular/core';
import { AlertService } from '@app/_services';

export function validateDate(): ValidatorFn {
  return (control: AbstractControl):  ValidationErrors | null => {
    const today = new Date().valueOf()
    const startDate = new Date('1900-01-01').valueOf()
    const value = control.value
    if (value == null || value == '') {
      return { required: true }
    }
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

