import { faker } from '@faker-js/faker';

export const generateProduct = () => {
  return {
    title: faker.commerce.product(),
    description: faker.lorem.paragraph(),
    price: faker.number.int({ min: 10, max: 1000 }),
    thumbnails: [faker.image.url()],
    code: faker.string.sample(10),
    stock: faker.number.int({ min: 10, max: 100 }),
    category: faker.commerce.department(),
    status: faker.datatype.boolean()
  };
};
 