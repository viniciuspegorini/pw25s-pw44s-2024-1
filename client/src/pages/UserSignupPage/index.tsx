import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";

export function UserSignupPage() {
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    displayName: "",
    username: "",
    password: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickSignup = () => {
    const user = {
      displayName: form.displayName,
      username: form.username,
      password: form.password,
    };

    axios
      .post("http://localhost:8025/users", user)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        if (error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors);
        }
      });
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">
          Sign Up - {form.displayName} - {form.username}
        </h1>
        <div className="col-12 mb-3">
          <Input
            id="displayName"
            name="displayName"
            label="Informe seu nome:"
            type="text"
            value={form.displayName}
            placeholder="Informe seu nome"
            hasError={errors.displayName ? true : false}
            error={errors.displayName}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="username">Informe seu usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            placeholder="Informe seu usuário"
            className={"form-control" + (errors?.username ? " is-invalid" : "")}
            onChange={onChange}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="password">Informe sua senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            placeholder="******"
            className={"form-control" + (errors.password && " is-invalid")}
            onChange={onChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={onClickSignup}>
            Cadastrar
          </button>
        </div>
        <div className="text-center">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
