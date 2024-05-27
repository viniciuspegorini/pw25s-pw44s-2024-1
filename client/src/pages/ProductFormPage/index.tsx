import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ICategory, IProduct } from "@/commons/interfaces";
import CategoryService from "@/service/CategoryService";
import { useForm } from "react-hook-form";
import ProductService from "@/service/ProductService";

export function ProductFormPage() {
  // hook useForm do react-hook-forms que irá controlar o estado do formulário.
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IProduct>();
    
  // apiError controla a exibição das mensagem de erro que ocorrem ao realizar uma requisição HTTP para o servidor.
  const [apiError, setApiError] = useState("");
  // lista de categorias utilizada para carregar o select
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { findAll } = CategoryService;
  const { save, findOne } = ProductService;

  // Executa uma vez ao carregar o componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Busca a lista de categorias na API
    const responseCategories = await findAll();
    if (responseCategories.status === 200) {
      // caso sucesso, adiciona a lista de categorias na variável de estado categories
      setCategories(responseCategories.data);
      setApiError("");
    } else {
      setApiError("Falha ao carregar a combo de categorias.");
    }

    if (id) {
      // ao editar um produto, busca ele na API e carrega no objeto form que está no state.
      const responseProduct = await findOne(parseInt(id));
      if (responseProduct.status === 200) {
        reset(responseProduct.data);
        setApiError("");
      } else {
        setApiError("Falha ao carregar o produto");
      }
    } else {
      // ao cadastrar um novo produto, valoriza no objeto form a primeira categoria do select
      reset((previousForm) => {
        return {
          ...previousForm,
          category: { id: categories[0]?.id, name: "" },
        };
      });
    }
  };

  const onSubmit = async (data: IProduct) => {
    const product: IProduct = {
      ...data,
      category: { id: data.category.id, name: "" },
    };

    const response = await save(product);
    if (response.status === 200 || response.status === 201) {
      navigate("/products");
    } else {
      setApiError("Falha ao salvar o produto.");
    }
  };

  return (
    <>
      <main className="container row justify-content-center">
        <form
          className="form-floating col-md-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">Cadastro de Produto</h1>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              placeholder="Informe o nome"
              {...register("name", {
                required: "O campo nome é obrigatório.",
                minLength: {
                  value: 2,
                  message: "O tamanho deve ser entre 2 e 100 caracteres.",
                },
                maxLength: {
                  value: 100,
                  message: "O tamanho deve ser entre 2 e 100 caracteres.",
                },
              })}
            />
            <label htmlFor="name">Nome</label>
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className={"form-control" + (errors.price ? " is-invalid" : "")}
              placeholder="Informe o preço"
              {...register("price", {
                required: "O campo preço é obrigatório.",
              })}
            />
            <label htmlFor="price">Preço</label>
            {errors.price && (
              <div className="invalid-feedback">{errors.price.message}</div>
            )}
          </div>
          <div className="form-floating mb-3">
            <textarea
              className={
                "form-control" + (errors.description ? " is-invalid" : "")
              }
              placeholder="Informe a descrição"
              {...register("description", {
                required: "O campo descrição é obrigatório.",
              })}
            ></textarea>
            <label htmlFor="description">Descrição</label>
            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description.message}
              </div>
            )}
          </div>
          <div className="form-floating mb-3">
            <select
              className={
                "form-control" + (errors.category ? " is-invalid" : "")
              }
              {...register("category.id", {
                required: "O campo descrição é obrigatório.",
              })}
            >
              {/* Monta a lista de options do Select de acordo com a lista de categorias vindas do servidor */}
              {categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="category">Categoria</label>
            {errors.category && (
              <div className="invalid-feedback d-block">
                {errors.category.message}
              </div>
            )}
          </div>
          {apiError && <div className="alert alert-danger">{apiError}</div>}
          <div className="text-center mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting ? true : false}
            >
              Salvar
            </button>
          </div>
          <div className="text-center">
            <Link to="/products" className="nav nav-link">
              Voltar
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
