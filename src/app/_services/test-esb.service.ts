import { Injectable } from '@angular/core';
import { fadvisers } from '../_data/fadvisers'

@Injectable({
  providedIn: 'root'
})
export class TestEsbService {

  constructor() { }
  mockAdviser() {
    console.log(fadvisers[0])
    return {
      // username: faker.internet.userName(),
      // firstName: faker.person.firstName(),
      // middleNames: faker.person.middleName(),
      // surname: faker.person.lastName(),
      // email: faker.internet.email(),
      // role: faker.person.jobTitle(),
      // birthdate: faker.date.birthdate()
    }
  }
}
