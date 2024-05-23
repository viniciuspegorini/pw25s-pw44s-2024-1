import { ICategory } from "@/commons/interfaces";
import CategoryService from "@/service/CategoryService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function CategoryFormPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICategory>();

  const navigate = useNavigate();
  const { id } = useParams();
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (id) {
      loadData(Number(id));
    }
  }, []);

  const loadData = async (id: number) => {
    const response = await CategoryService.findById(id);
    if (response.status === 200) {
      reset(response.data);
    } else {
      setApiError("Falha ao carregar a categoria!");
    }
  };

  const onSubmit = async (data: ICategory) => {
    const response = await CategoryService.save(data);
    if (response.status === 200 || response.status === 201) {
      navigate("/categories");
    } else {
      setApiError("Falha ao salvar a categoria!");
    }
  };

  return (
    <>
      <main className="container row justify-content-center">
        <form
          className="form-floating col-md-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center mb-3">
            <span className="h3 mb-3 fw-normal">Cadastro de Categoria</span>
            <input type="hidden" {...register("id")} />

            <div className="form-floating mb-3">
              <input
                type="text"
                className={"form-control" + (errors.name ? " is-invalid" : "")}
                id="name"
                placeholder="Nome"
                {...register("name", {
                  required: "O campo nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O campo nome deve ter no mínimo 2 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "O campo nome deve ter no máximo 50 caracteres",
                  },
                })}
              />
              <label htmlFor="name">Nome</label>
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>
            {apiError && (
              <div className="alert alert-danger text-center">{apiError}</div>
            )}
            <button
              className="w-100 btn btn-lg btn-primary mb-3"
              type="submit"
              disabled={isSubmitting ? true : false}
            >
              Salvar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
