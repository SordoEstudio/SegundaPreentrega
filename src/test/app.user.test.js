import app from "../server.js";
import request from "supertest";
import { fakerES as faker } from "@faker-js/faker";
import * as chai from "chai";
import { set } from "mongoose";
const { expect } = chai;

const mockProduct = () => {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 10, max: 1000 }),
    thumbnails: [faker.image.url()],
    code: faker.string.alphanumeric(5),
    stock: faker.number.int({ min: 10, max: 100 }),
    category: faker.commerce.department(),
    status: faker.datatype.boolean(),
  };
};

describe("conjunto de pruebas API con login de User", () => {

  let token;
  const errorMensaje = 'Este endpoint es para usuarios administradores'

  before(async () => {
    const userData = {
      email: "userCoder@coder.com",
      password: "user",
    };
    const response = await request(app).post("/api/users/login").send(userData);
    expect(response.status).to.be.equal(200);
    expect(response.body.data).to.be.an("string"); 
    token = response.body.data; 
  });

  it("[POST] products/", async () => {
    const body = mockProduct();
    const errorMensaje = 'Este endpoint es para usuarios administradores'
    const response = await request(app)
      .post("/api/products")
      .set("Cookie", `token=${token}`) 
      .send(body);

     expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object"); 
     expect(response.body.data).to.be.equal(errorMensaje);

  });
  it("[GET] products/", async () => {
    const response = await request(app)
      .get("/api/products")
      .set("Cookie", `token=${token}`); 
    expect(response.status).to.be.equal(200);
    expect(response.body.payload).to.be.an("array");
  });
  it("[POST] carts/", async () => {
    const response = await request(app)
      .post("/api/carts")
      .set("Cookie", `token=${token}`); 

     expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object"); 
     expect(response.body.data).to.be.equal(errorMensaje);


  });

});
