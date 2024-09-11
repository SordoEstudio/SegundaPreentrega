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
describe("conjunto de pruebas API con login de Admin", () => {
  let token;
  let _idCart;
  before(async () => {
    const userData = {
      email: "adminCoder@coder.com",
      password: "admin",
    };
    const response = await request(app).post("/api/users/login").send(userData);
    expect(response.status).to.be.equal(200);
    expect(response.body.data).to.be.an("string"); // El token debe ser una cadena
    token = response.body.data; // Asigna el token recibido
  });

  it("[POST] products/", async () => {
    const body = mockProduct();

    const response = await request(app)
      .post("/api/products")
      .set("Cookie", `token=${token}`) // Agrega el token como cookie
      .send(body);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body.title).to.be.equal(body.title);
    expect(response.body.description).to.be.equal(body.description);
    expect(response.body.code).to.be.equal(body.code);
    expect(response.body.stock).to.be.equal(body.stock);
    expect(response.body.category).to.be.equal(body.category);
  });
  it("[GET] products/", async () => {
    const response = await request(app)
      .get("/api/products")
      .set("Cookie", `token=${token}`); // Agrega el token como cookie
    expect(response.status).to.be.equal(200);
    expect(response.body.payload).to.be.an("array");
  });
  it("[POST] carts/", async () => {
    const response = await request(app)
      .post("/api/carts")
      .set("Cookie", `token=${token}`); // Agrega el token como cookie
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body.products).to.be.an("array");
  });
  it("[GET] carts/:id", async () => {
    const response = await request(app)
      .post("/api/carts")
      .set("Cookie", `token=${token}`); // Agrega el token como cookie
    _idCart = response.body._id;
    const responseCart = await request(app)
      .get(`/api/carts/${_idCart}`)
      .set("Cookie", `token=${token}`); // Agrega el token como cookie
    expect(responseCart.status).to.be.equal(200);
    expect(responseCart.body).to.be.an("object");
    expect(responseCart.body._id).to.be.equal(_idCart);
    expect(responseCart.body.products).to.be.an("array");
  });
});
