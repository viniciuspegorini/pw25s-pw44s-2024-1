import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import CategoryService from "@/service/CategoryService";
import ProductService from "@/service/ProductService";
import { ICategory, IProduct } from "@/commons/interfaces";

export function ProductFormPageV2() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IProduct>();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [entity, setEntity] = useState<IProduct>({
    id: undefined,
    name: "",
    price: 0,
    description: "",
    category: { id: undefined, name: "" },
  });
  const { save, findOne } = ProductService;
  const { findAll } = CategoryService;

  // Executa ao carregar o componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Busca a lista de categorias
    const response = await findAll();
    if (response.status === 200) {
      setCategories(response.data);
      setApiError("");
    } else {
      setApiError("Falha ao carregar a combo de categorias.");
    }
    if (id) {
      // ao editar um produto, busca ele no back-end e carrega no objeto form que está no state.
      const response = await findOne(parseInt(id));
      if (response.status === 200) {
        setEntity({
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          description: response.data.description,
          category: { id: response.data.category.id, name: "" },
        });
        setApiError("");
      } else {
        setApiError("Falha ao carregar o produto.");
      }
    } else {
      // ao cadastrar um novo produto, valoriza no objeto form a primeira categoria do select
      setEntity((previousEntity) => {
        return {
          ...previousEntity,
          category: { id: categories[0]?.id, name: "" },
        };
      });
    }
  };

  useEffect(() => {
    reset(entity);
  }, [entity, reset]);

  const onSubmit = async (data: IProduct) => {
    const product: IProduct = {
      ...data,
      id: entity.id,
      category: { id: data.category.id, name: "" },
    };
    const response = await save(product);
    if (response.status === 200 || response.status === 201) {
      navigate("/products-v2");
    } else {
      setApiError("Falha ao salvar o produto.");
    }
  };

  return (
    <div className="container">
      <h1 className="fs-2 text-center">Cadastro de Produto - V2</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name && true}>
          <FormLabel htmlFor="name">Nome</FormLabel>
          <Input
            id="name"
            placeholder="Nome do produto"
            {...register("name", {
              required: "O campo nome é obrigatório",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.price && true}>
          <FormLabel htmlFor="price">Preço</FormLabel>
          <Input
            id="price"
            placeholder="0.0"
            {...register("price", {
              required: "O campo preço é obrigatório",
              min: { value: 0.01, message: "O valor deve ser maior que zero" },
            })}
            type="number"
            step="any"
          />

          <FormErrorMessage>
            {errors.price && errors.price.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.description && true}>
          <FormLabel htmlFor="description">Descrição</FormLabel>
          <Textarea
            id="description"
            placeholder="Descrição do produto"
            {...register("description", {
              required: "O campo descrição é obrigatório",
              minLength: {
                value: 2,
                message: "O tamanho deve ser entre 2 e 1024 caracteres",
              },
              maxLength: {
                value: 1024,
                message: "O tamanho deve ser entre 2 e 1024 caracteres",
              },
            })}
            size="sm"
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.category && true}>
          <FormLabel htmlFor="category">Categoria</FormLabel>

          <Select
            id="category"
            {...register("category.id", {
              required: "O campo categoria é obrigatório",
            })}
            size="sm"
          >
            {categories.map((category: ICategory) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <div className="text-center">
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </form>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
      <div className="text-center">
        <Link to="/products-v2">Voltar</Link>
      </div>
    </div>
  );
}