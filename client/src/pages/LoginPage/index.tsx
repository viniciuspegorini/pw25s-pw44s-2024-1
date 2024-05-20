import { IUserLogin } from "@/commons/interfaces";
import AuthService from "@/service/AuthService";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickLogin = async () => {
    const login: IUserLogin = {
      username: form.username,
      password: form.password,
    };

    const response = await AuthService.login(login);
    if (response.status === 200 || response.status === 201) {
      setApiSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      setApiError("Erro ao cadastrar o usuário!");
    }

    setPendingApiCall(false);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">Login</h1>
        <div className="col-12 mb-3">
          <label htmlFor="username">Informe seu usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            placeholder="Informe seu usuário"
            className="form-control"
            onChange={onChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="password">Informe sua senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            placeholder="******"
            className="form-control"
            onChange={onChange}
          />
        </div>
        {apiError && (
          <div className="alert alert-danger text-center">{apiError}</div>
        )}
        {apiSuccess && (
          <div className="alert alert-success text-center">{apiSuccess}</div>
        )}
        <div className="text-center">
          <button
            disabled={pendingApiCall}
            className="btn btn-primary"
            onClick={onClickLogin}
          >
            {pendingApiCall && (
              <div
                className="spinner-border spinner-border-sm text-light-spinner mr-sm-1"
                role="status"
              ></div>
            )}
            Cadastrar
          </button>
        </div>
        <div className="text-center">
          <Link to="/signup">Cadastre-se</Link>
        </div>
      </div>
    </>
  );
}
