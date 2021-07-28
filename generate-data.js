const faker = require('faker');
const fs = require('fs');

// Set locale to use VietNamese

faker.locale = 'vi';

// Random data

const randomCategoryList = (n) => {
  if (n <= 0) return;
  const categoryList = [];
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: new Number(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        adjective: faker.commerce.productAdjective(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      productList.push(product);
    });
  }
  return productList;
};

const categoryList = randomCategoryList(5);
const productList = randomProductList(categoryList, 4);
// IFFE
(() => {
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Po',
    },
  };
  // write db object to de

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully =))');
  });
})();
