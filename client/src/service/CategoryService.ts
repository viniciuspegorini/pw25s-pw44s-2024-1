import { ICategory } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const URL = "/categories";

const save = async (category: ICategory): Promise<any> => {
  let response;
  try {
    response = await api.post(URL, category);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const findAll = async (): Promise<any> => {
    let response;
    try {
        response = await api.get(URL);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const remove = async (id: number): Promise<any> => {
    let response;
    try {
        response = await api.delete(`${URL}/${id}`);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const findById = async (id: number): Promise<any> => {
    let response;
    try {
        response = await api.get(`${URL}/${id}`);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const CategoryService = { save, findAll, remove, findById };

export default CategoryService;
