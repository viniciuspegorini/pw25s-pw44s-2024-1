import { ICategory } from "@/commons/interfaces";
import CategoryService from "@/service/CategoryService";
import { useEffect, useState } from "react";

export function CategoryListPage() {
  const [data, setData] = useState<ICategory[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await CategoryService.findAll();
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const onClickRemove = async (id?: number) => {
    if (id) {
      const response = await CategoryService.remove(id);
      if (response.status === 200 || response.status === 204) {
        loadData();
      }
    }
  };

  return (
    <>
      <main className="container">
        <div className="text-center">
          <h1 className="h3 mb-3 fw-normal">Lista de Categorias</h1>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {data.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td> ... </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => onClickRemove(category.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
