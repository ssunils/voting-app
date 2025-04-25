import { faker } from '@faker-js/faker'

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement([
      'active',
      'suspended',
    ]),
    role: faker.helpers.arrayElement([
      'voter',
      'admin',
      'teller',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
