import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "@/service/ProductService";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  BsThreeDotsVertical,
  BsPencilSquare,
  BsTrash,
  BsPlusCircle,
} from "react-icons/bs";
import { IProduct } from "@/commons/interfaces";

export function ProductListPageV2() {
  const [data, setData] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { findAll, remove } = ProductService;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await findAll();
    if (response.status === 200) {
      setData(response.data);
      setApiError("");
    } else {
      setApiError("Falha ao carregar a lista de produtos.");
    }
  };

  const onEdit = (url: string) => {
    navigate(url);
  };

  const onRemove = async (id: number) => {
    const response = await remove(id);
    if (response.status === 200 || response.status === 204) {
      setData(
        data.filter((product) => {
          return product.id !== id;
        })
      );
      console.log(data);
      setApiError("");
    } else {
      setApiError("Falha ao remover o produto.");
    }
  };

  return (
    <div className="container">
      <h1 className="fs-2 mb-4 text-center">Lista de Produto V2</h1>
      <div className="text-center">
        <Link
          className="btn btn-success btn-icon mb-3"
          to="/products-v2/new"
          title="Novo Produto"
          style={{ display: "inline-block" }}
        >
          <BsPlusCircle style={{ display: "inline-block" }} /> Novo Produto
        </Link>
      </div>
      <TableContainer>
        <Table>
          <TableCaption>Lista de Produtos</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Nome</Th>
              <Th isNumeric>Preço</Th>
              <Th>Categoria</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product: IProduct) => (
              <Tr
                key={product.id}
                _hover={{ cursor: "pointer", background: "#eee" }}
              >
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td isNumeric>{product.price}</Td>
                <Td>{product.category?.name}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Actions"
                      icon={<BsThreeDotsVertical size={20} />}
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<BsPencilSquare />}
                        onClick={() => onEdit(`/products-v2/${product.id}`)}
                      >
                        Editar
                      </MenuItem>
                      <MenuItem
                        icon={<BsTrash />}
                        onClick={() => onRemove(product.id!)}
                      >
                        Remover
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>#</Th>
              <Th>Nome</Th>
              <Th isNumeric>Preço</Th>
              <Th>Categoria</Th>
              <Th>Ações</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
    </div>
  );
}