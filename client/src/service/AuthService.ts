import { api } from "@/lib/axios";
import { IUserSignup } from "@/commons/interfaces";

const signup = async (user: IUserSignup): Promise<any> => {
  let response;
  try {
    response = await api.post("/users", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const AuthService = {
  signup,
};

export default AuthService;
