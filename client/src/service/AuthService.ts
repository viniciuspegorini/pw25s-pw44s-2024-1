import { api } from "@/lib/axios";
import { IUserLogin, IUserSignup } from "@/commons/interfaces";

const signup = async (user: IUserSignup): Promise<any> => {
  let response;
  try {
    response = await api.post("/users", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const login = async (user: IUserLogin): Promise<any> => {
  let response;
  try {
    response = await api.post("/login", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const AuthService = {
  signup,
  login,	
};

export default AuthService;
