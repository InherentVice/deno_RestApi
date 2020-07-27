import Product from "../types.ts";
import { RouterContext, v4 } from "../dependencies.ts";

let products: Array<Product> = [
  {
    id: "1",
    name: "Product One",
    description: "this is the first Product",
    price: 29.99,
  },
  {
    id: "2",
    name: "Product Two",
    description: "this is the second Product",
    price: 19.99,
  },
  {
    id: "3",
    name: "Product Three",
    description: "this is the third Product",
    price: 39.99,
  },
];

// @desc  get all products
// @route GET /api/v1/products

export const getProducts = ({ response }: { response: any }) => {
  response.status = 200;
  response.body = {
    success: true,
    data: products,
  };
};

// @desc get single products
// @route GET /api/v1/products/:id

export const getProduct = (ctx: RouterContext) => {
  const { params, response } = ctx;
  const product: Product | undefined = products.find((prod) =>
    prod.id = params.id
  );

  if (product) {
    response.status = 200;
    response.body = { success: true, data: product };
  } else {
    response.status = 404;
    response.body = { success: false, message: "No product found" };
  }
  return;
};

// @desc add product
// @route POST /api/v1/products

export const addProduct = async (ctx: RouterContext) => {
  const { request, response } = ctx;
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = { success: false, message: "no Data" };
  } else {
    const product = await body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = { success: true, data: product };
  }
  return;
};

// @desc update product
// @route PUT /api/v1/products/:id

export const updateProduct = async (ctx: RouterContext) => {
  const { request, response, params } = ctx;
  const product: Product | undefined = products.find((prod) =>
    prod.id = params.id
  );

  if (product) {
    const body = await request.body();
    const updateData: { name?: string; description?: string; price?: number } =
      await body.value;

    products = products.map((prod) =>
      prod.id === params.id ? { ...prod, ...updateData } : prod
    );
    response.status = 200;
    response.body = { success: true, data: products };
  } else {
    response.status = 404;
    response.body = { success: false, message: "No product found" };
  }
  return;
};

// @desc delete product
// @route DELETE /api/v1/products/:id

export const deleteProduct = (ctx: RouterContext) => {
  const { params, response } = ctx;
  const product: Product | undefined = products.find((prod) =>
    prod.id = params.id
  );
  if (product) {
    products = products.filter((prod) => prod.id !== params.id);
    response.body = { success: true, message: `Product ${params.id} removed` };
  } else {
    response.status = 404;
    response.body = { success: false, message: "No product found" };
  }
};
