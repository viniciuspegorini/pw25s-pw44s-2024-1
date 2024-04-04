# Aulas da disciplina de Programação para Web - PW25S e PW44S - Turma 5SI - 2024/1

## Back-end 

### Softwares
	- JDK 17 ou superior
	- IDE:
		- ItelliJ IDEA Ultimate (recomendado)
		- Spring Tools Suite 4 (STS-4)
		- Eclipe for JavaEE ...
	- SDBG:
		- Postgresql
	- Ferramenta para testar a API:
		- Postman
		- Insomnia
	- Git
	- Docker
	
## Front-end 

### Softwares
	- IDE:
		- Visual Studio Code (recomendado)
		- Web Storm
		- Atom...
	- Git
	- Node.js
	- Docker

	- Moodle:
		- Disciplina PW25S_1, código de inscrição: pw25s_1

## Links:

- [Tutorial Git e Github](https://www.udemy.com/course/git-e-github-para-iniciantes/?LSNPUBID=mP6UMnc5Ozo&ranEAID=mP6UMnc5Ozo&ranMID=39197&ranSiteID=mP6UMnc5Ozo-PNOUmvRPBgtOo7asFXll8w&utm_medium=udemyads&utm_source=aff-campaign)


## Projetos:

### aula1 -  Introdução
O conteúdo do projeto é uma introdução sobre os *frameworks* **Spring, Spring Boot, Spring Web e Spring Data**.


# Avaliação da disciplina:

## Projeto da disciplina - Aplicação de Comércio Eletrônico

Neste projeto, os alunos terão a oportunidade de aplicar seus conhecimentos em desenvolvimento web para criar uma aplicação web de comércio eletrônico. O objetivo é desenvolver uma plataforma de compras online funcional. Os alunos serão desafiados a implementar uma variedade de recursos essenciais para um site de *e-commerce*, incluindo catálogo de produtos, página individual de produtos, carrinho de compras, processamento de pedidos, entre outros. A solução deverá ser dividida entre uma API Rest desenvolvida com o *framework* Spring e um cliente desenvolvido com o *framework* React.


## Datas:
##### Primeira entrega: 22/04/2024 e 24/04/2024
##### Entrega final: 24/06/2024	 e 26/06/2024

#### Requisitos mínimos:

1. A aplicação deverá conter uma página para listar todos os produtos, utilizar como exemplo os sites de compra disponíveis na internet, a lista de produtos deve conter o nome, valor e a imagem do produto (pode ser uma URL externa).

2. A aplicação deve conter uma página para exibir um produto com detalhes, apresentando o nome, valor, descrição, imagem e botão para adicionar em uma lista de compras.

3. A aplicação deve conter uma página que representa o carrinho de compras, essa tela vai listar os itens adicionados na lista de compras, com a possibilidade de ajustar a quantidade dos itens adicionados e um botão para ir para tela de finalizar compra.

4. Para finalizar a compra é necessário estar autenticado, para     isso criar uma tela para cadastro de cliente (usuário) e uma tela para autenticação.

5. Após autenticado exibir a tela com o resumo da compra e um botão para finalizar a compra, nessa etapa os dados devem ser enviados ao servidor e a compra deve ser finalizada.

6. A página de lista de produtos, produto individual e carrinho de compras devem ser exibidas para todos os usuários, mesmo não autenticados.

#### Requisitos extras:

7. Criar uma página para listar os pedidos realizados pelo usuário.

8. Permitir filtrar os produtos por categoria.

9. Criar paginação para a página com a lista de produtos.


#### Observações:
- Não será necessário criar tela para o cadastro de produtos e categorias, esses podem vir diretamente do banco de dados.
- Deverão ser criados pelo menos 5 casos de teste na API a critério do desenvolvedor.

#### Avaliação final distribuídos por funcionalidade:
Lista de produtos: 1,0
Lista individual de produto: 1,0
Carrinho de compras: 2,5
Cadastro de Usuário, autenticação e autorização: 1,0

Listar os pedidos realizados: 1,0
Permitir filtrar os produtos por categoria: 0,50
Criar paginação para a página com a lista de produtos: 0,50

|Atividade  | Peso  |
|--|--|
|Lista de Produtos| 1,00 |
|Lista Individual de Produto|1,00|  
|Carrinho de Compras | 2,50 |
|Cadastro de Usuário, autenticação e autorização | 1,00 |
|Finalizar compra | 2,50 |
|Listar os pedidos realizados | 1,00 |
|Permitir filtrar os produtos por categoria | 0,50 |
|Criar paginação para a página com a lista de produtos | 0,50 |
|Total | 10.0|

##### Sugestão de entidades:
- Usuário = {id: Long, nome: String, senha: String}
- Categoria = {id: Long, nome: String}
- Produto = {id: Long, nome: String, descricao: String, preço: BigDecimal, urlImagem: String, categoriaId: Long}
- Pedido = {id: Long, data: DateTime, usuarioId: Long}
- ItensDoPedido = {pedidoId: Long, produtoId: Long, preço: BigDecimal, quantidade: Integer} 