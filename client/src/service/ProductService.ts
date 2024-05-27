import { IProduct } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const productURL = "/products";

const save = async (product: IProduct): Promise<any> => {
  let response;
  try {
    response = await api.post(productURL, product);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(productURL);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const findOne = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${productURL}/${id}`);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${productURL}/${id}`);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const ProductService = {
  save,
  findAll,
  findOne,
  remove,
};

export default ProductService;
