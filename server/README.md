# Spring Framework (back-end)

## Introdução

O Spring é um conjunto de projetos que focam em levar produtividade ao programador. Auxiliando de maneira a aumentar a produtividade no desenvolvimento de aplicações Java com simplicidade e flexibilidade.
O conjunto de *frameworks* Spring possui o Spring MVC para criação de aplicações web e serviços RESTful, o Spring Data, para  acesso a banco de dados, o Spring Security, para prover segurança em aplicações, e diversos outros projetos como *cloud computing*, microsserviços e *big data*, por exemplo.  
Os projetos Spring são todos **Open Source** e o seu código-fonte pode ser encontrado no [GitHub](https://github.com/spring-projects) [[1](https://github.com/spring-projects)].

## Spring e Java EE

O Spring possui uma série de recursos implementados que não estão presentes no Java EE. Entretanto, o framework Spring também utiliza várias tecnologias que estão implementadas dentro do Java EE. Não existe uma concorrência entre o Spring e o Java EE, o Spring apenas veio para dar maior produtividade ao desenvolvedor com os recursos disponibilizados no *framework*.

## Inversão  de Controle (IoC) e Injeção de Dependências (DI) com Spring

A inversão de controle (ou Inversion of Control – IoC) consistem em transferir o controle da execução da aplicação para um container de IoC, o qual chama a aplicação em determinados momentos da execucão do software, como na ocorrência de um evento. Por meio da IoC o container controla quais métodos da aplicação e em que contexto eles serão chamados [2].

A Injeção de dependências (ou Dependency Injection – DI) é um é um padrão de projeto usado para desacoplar classes de suas dependências dentro de uma aplicação, dessa maneira é possível  obter uma melhor modularização do software [3].

## Spring Data JPA
O *framework* Spring Data JPA atua na camada de persistência [4]. Ele auxilia o programador na criação dos repositórios da aplicação. O projeto (Spring Data JPA) está dentro do Spring Data que possui diversos outros projetos que auxiliam no processo de acesso e persistência de dados. Sendo os principais projetos:
-   Spring Data Commons
-   Spring Data for Apache Cassandra
-   Spring Data Gemfire
-   Spring Data KeyValue
-   Spring Data LDAP
-   Spring Data MongoDB
-   Spring Data Redis
-   Spring Data REST

## REST

REST é a sigla para **Representational State Transfer** ou em português **Transferência de Estado Representacional.** Uma aplicação web RESTful expõe informações sobre si na apresentando seus recursos. Ela também possibilita ao cliente executar ações nesses recursos, como criar novos recursos (por exemplo, criar um novo usuário) ou alterar recursos existentes (por exemplo, editar os dados de um usuário).

Para que uma API web seja RESTful, é necessário  seguir um conjunto de regras ao escrevê-la. O conjunto de regras para uma API REST às tornará mais fáceis de usar e também mais fáceis de descobrir, o que significa que um desenvolvedor que está apenas começando a usar suas APIs terá mais facilidade em aprender como fazê-lo. Isso significa que quando uma API RESTful é chamada, o servidor _transfere_ para o cliente uma _representação_ do _estado_ do recurso solicitado.

REST não é uma arquitetura, biblioteca ou *framework*, é simplesmente um  **modelo** que é utilizado para projetar arquitetura de softwares distribuídos que fazem comunicação de dados pela rede, seja local ou a famosa Internet. No REST nada está pronto ou atrelado a uma tecnologia, tem-se apenas um conjunto de regras que serve como modelo para desenvolver uma API. Esse modelo foi criado por Roy Fielding [5]  um dos principais responsáveis e criadores do protocolo HTTP, basicamente, tudo que está online utiliza o protocolo HTTP ou o HTTPS que é a evolução do mesmo.

# Iniciando o projeto

Durante as aulas será desenvolvido um projeto para controle de compra e venda de produtos, cada produto possui uma categoria. Para realizar qualquer operação o usuário deverá estar autenticado no sistema. O projeto irá iniciar com o cadastro de usuários do sistema. Então será realizada a etapa de autenticação dos usuários do sistema. Na sequência serão realizados os CRUDs de categoria, produto e compras.

## Criação do projeto

O projeto será criado utilizando como base o *framework* Spring Boot, que por sua vez permite que projetos com o Spring MVC, Data JPA e Security já venham configurados por meio de convenções.
Será criado um projeto [Maven](https://maven.apache.org/) por meio da ferramenta web [Spring Initializr](https://start.spring.io/) com as seguintes configurações:
O projeto será do tipo **Maven Project**.
A linguagem será **Java**.
A versão do Spring Boot será a versão estável atual na data de criação do projeto (**3.1.3**).
Os metadados do projeto são:
- Group: **br.edu.utfpr.pb.tads**
- Artifact: **server**
- Options:
  - Packaging: **Jar**
  - Java: **17** ou superior.

Em dependências devem ser selecionados os *frameworks*:
- Spring Data JPA
- Spring Web
- Spring Security
- Spring Devtools
- H2 Database (ou o driver do banco de sua preferência PostgreSQL, MySQL, etc...)
- Lombok
- Validation

O projeto está configurado e pode ser realizado o **download** do mesmo e **importado na IDE**. O conteúdo do arquivo `pom.xml` pode ser visualizado em: [arquivo pom.xml](https://github.com/viniciuspegorini/pw25s/blob/main/server/pom.xml).

### Estrutura do projeto *back-end*

O projeto Spring Boot vêm com uma série de configurações inicias que não precisamos nos preocupar, iniciando com a classe principal da aplicação a **ServerApplication**, nela por meio da anotação **@SpringBootApplication** todas as configurações serão carregadas. O **Spring Security** por exemplo, já vem pré-configurado protegendo todas as URLs, como ainda não vamos configurar, é necessário adicionar a propriedade **exclude = SecurityAutoConfiguration.class**, dessa maneira o **SpringBoot** vai ignorar as configurações de segurança, na sequência do desenvolvimento essa configuração será alterada para o processo de autenticação e autorização funcionar. O banco de dados em memória utilizando o **H2** também já é criado por padrão nesse momento, ou seja, todas as configurações necessárias para o início do desenvolvimento estão prontas.

```java
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ServerApplication {
  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }
}
``` 
Com as configurações básicas definidas será possível iniciar o desenvolvimento do projeto.


### Cadastro de Usuário (*back-end*)

O desenvolvimento irá iniciar o cadastro de usuário o primeiro passo será criar o cadastro de um novo usuário. Para isso devemos criar nosso *controller*, entretanto como o desenvolvimento será realizado por meio de *Test-driven development* (TDD), a primeira classe que vamos criar será a classe **UserControllerTest** dentro da pasta **/src/test**.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {
}
```` 

A anotação **@SpringBootTest** permite que o teste rode a partir das configurações padrão do Spring, ou seja as várias convenções do *framework* para iniciar o projeto já estão pré-configuradas. O Spring permite que a aplicação seja executada em diferentes ambientes (*profiles*), ou seja, ambientes de teste, desenvolvimento, produção, entre outros. Assim, por meio da anotação **@ActiveProfiles("test")** está sendo informado que o projeto será executado com base no *profile test*, isso irá permitir que na sequência do desenvolvimento do projeto ele possa ser executado por meio de configurações diferentes dentro de cada ambiente.

O próximo passo é criar o primeiro teste, para nomear cada teste será utilizado:
**methodName_condition_expectedBehaviour**

Dentro da classe **UserControllerTest** será criado o método ***postUser_whenUserIsValid_receiveOk()***, ou seja ao realizar um HTTP POST, quando o objeto enviar for um Usuário válido deve-se receber um ***HTTP Status: 200 OK***. O objeto ***testRestTemplate*** permite que possamos realizar requisições HTTP para uma URL, no caso do exemplo */users* e tenhamos acesso à resposta vinda da requisição.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {
  @Autowired
  TestRestTemplate testRestTemplate;

  @Test
  public void postUser_whenUserIsValid_receiveOk() {
    User user = new User();
    user.setUsername(“test-user”);
    user.setDisplayName(“test-Display”);
    user.setPassword(“P4ssword”);
    ResponseEntity<Object> response = testRestTemplate.postForEntity(“/users”, user, Object.class);
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
  }
}
```

Com o teste implementado será necessário começar resolver o que esperamos de comportamento da API. Inicialmente será criado uma classe **User**, com os atributos **username**, **displayName** e **password**. A classe deve ser criada na pasta **/src/main/java** no pacote **br.edu.utfpr.pb.tads.model**.  Note que no exemplo a classe possui a anotação **@Data** que vem do **lombok**, dependência que foi adicionada ao projeto. Por meio dessa anotação ao compilar a classe o *lombok* gera os métodos *getters* e *setters* evitando assim que seja necessário criar esses códigos manualmente durante o desenvolvimento. Outras anotações do *lombok* serão utilizadas dentro deste projeto, sempre com a mesma intenção, evitar escrever código e deixar nossas classes mais limpas. Agora a classe **User** pode ser importada dentro da classe de teste.

```java
package br.edu.utfpr.pb.tads.model;

@Data
public class User {
  private String username;
  private String displayName;
  private String password;
}
```
O próximo passo é criar a versão inicial da classe **UserController**, dentro do pacote **br.edu.utfpr.pb.tads.controller**, essa classe deve ter um método que aceita uma requisição do tipo HTTP Post para a URL  */users*. Por meio da anotação **@RestController** uma classe pode criar métodos para receber requisições HTTP. A anotação **@RequestMapping("users")** serve para que essa classe trate todas as requisições vindas em **/users**, independente do método HTTP. Por fim, foi criado o método **createUser()** o qual, por meio da anotação **@PostMapping** irá atender uma requisição do tipo HTTP POST na URL */users*. Feito isso podemos executar nosso teste. Ele vai passar, por mais que o método não tenha nada implementado, ao ser chamado ele vai retornar um ***HTTP Status: 200 OK***, parâmetro esperado pelo primeiro teste criado. Ou seja, agora foi criada a primeira parte da API REST.

```java
@RestController
@RequestMapping("users")
public class UserController {

  @PostMapping
  void createUser() {
  }
}
```

O próximo teste será utilizado para verificar se após receber a requisição HTTP do tipo POST, o usuário enviado na requisição foi efetivamente salvo no banco de dados. Agora é necessário utilizar o **Spring Data** para armazenar o usuário no banco de dados.

```java
//...
public class UsuarioControllerTest {
  @Autowired
  UserRepository userRepository;
  //...
  @Test
  public void postUser_whenUserIsValid_userSavedToDatabase() {
    User user = createValidUser();
    testRestTemplate.postForEntity(“/users”, user, Object.class);
    // Agora precisamos garantir que tudo foi salvo no Banco de Dados.
    assertThat(userRepository.count()).isEqualTo(1);
  }
}
```
O primeiro passo para resolver o teste é fazer com que a classe **User** possa ser lida como uma entidade que pode ser persistida no banco de dados por meio da anotação **@Entity**. Toda a classe que é mapeada com @Entity deve possuir uma chave primária e a mesma deve ser anotada com **@Id**. Além disso é necessário informar como será gerado o incremento da chave primária, o que deve ser feito por meio da anotação **@GeneratedValue**, a qual por padrão incrementa o **Id** automaticamente somando 1 ao valor da chave primária a cada novo registro.

```java
\\...
@Entity
@Data
public class User {

  @Id
  @GeneratedValue
  private long id;
  private String username;
	\\... o restante da classe permanece igual
}
```
Agora é necessário criar as operações de escrita e leitura no banco de dados, isso por ser feito por meio da *interface* **JpaRepository**, disponibilizada pelo *framework* Spring Data. A *interface* **UserRepository** será criada dentro do pacote **br.edu.utfpr.pb.tads.repository**. Ao herdar as características de **JpaRepository** a *interface* conta com os principais métodos CRUD, tais como *save(), delete(), findAll(), findById()*, entre outros. Agora a classe **UserRepository** pode ser importada dentro da classe de teste.

```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```
Agora é possível utilizar a interface **UserRepository ** para persistir um usuário no banco de dados. Nesse momento será criada a classe **UserService**, dentro do pacote **br.edu.utfpr.pb.tads.service**, para controlar as operações realizadas com a interface **UserRepository** e o banco de dados. Assim é possível manter todas as regras de negócio da aplicação fora da classe ***controller***, além disso também é possível fazer o controle transacional do banco de dados por meio da classe **UserService**.

```java
@Service
public class UserService {
  UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    super();
    this.userRepository = userRepository;
  }
  public User save (User user){
    return userRepository.save(user);
  }
}
```

Para salvar o usuário basta fazer a injeção de **UserService **, então utilizar o método ***userService.save()*** que espera como parâmetro de entrada um objeto do tipo **User**, o objeto será persistido no banco de dados. Nesse momento é possível executar o teste e o mesmo vai passar.

```java
@RestController
@RequestMapping("users")
public class UserController {
  @Autowired
  private UserService userService;

  @PostMapping
  void createUser(@RequestBody User user) {
    userService.save(user);
  }
}
```
Para evitar problemas durante a execução dos testes é importante limpar o banco de dados a cada execução, para isso vamos criar um método que remove os registros do banco a cada execução.

``` java
//...
public class UsuarioControllerTest {
	//...
	@BeforeEach
	public void cleanup() {
		userRepository.deleteAll();
		testRestTemplate.getRestTemplate().getInterceptors().clear();
	}
	//...
}
```

Podemos testar a API via requisição HTTP fora do nosso ambiente de testes, como ainda não iniciamos a criação do cliente com React, é necessário utilizar um *software* como o Postman ou Insomnia. Antes de criar o teste no **software** é necessário fazer alguns ajustes no projeto. Primeiro será necessário criar um arquivo de configuração para que tenhamos acesso ao banco de dados que está sendo utilizado durante os testes, o H2. Dentro da pasta **/src/main/resources/** criar o arquivo **application.yml**.  Muito cuidado na **indentação** do código do aquivo **yml** pois é a maneira que ele utiliza para acessar a árvore de propriedades. As configurações servem para que sejá possível gerar um nome de banco de dados único ao executara aplicação (*jdbc:h2:mem:testdb*) e para que possa ser acessado o console do banco por meio da URL **http://localhost:8080/h2-console**.
```yml
spring:
  datasource:
    generate-unique-name: false
  h2:
    console:
    enabled: true
    path: /h2-console
```

Ao acessar a URL **http://localhost:8080/h2-console** em um navegador irá abrir a tela de conexão do **H2** a configuração está praticamente pronta, bastando alterar a URL de conexão com o banco para: **jdbc:h2:mem:testdb**. Ao clicar para realizar a conexão temos acesso ao banco de dados gerado, por enquanto foi criada apenas a tabela **User**, ao clicar na tabela é habilitado o console no qual podemos realizar consultas. Ao fazer um **select * from user** e executar o comando recebemos uma tabela vazia como resultado, para adicionar um usuário no banco de dados será utilizados o Postman.

### Realizando uma requisição HTTP POST por meio do Postman

Ao abrir o Postam basta clicar em **File > New Tab** e uma nova aba para realizar requisições HTTP será aberta. No método selecionar a opção **POST** e na URL **http://localhost:8080/users**. O próximo passo é configurar o corpo da requisição com um objeto JSON representando um usuário. Clicar na aba **Body** marcar a opção **raw** e no final das opções selecionar **JSON**. Com isso é possível adicionar no corpo da requisição o objeto que representa um usuário.
```json
{
  "username" : "user-test",
  "displayName" : "user-dispay-test",
  "password": "P4ssword"
}
```
Adicionado o **JSON** basta clicar em send e a requisição será enviada para a API, o retorno que aparece em **Response** é um **200 OK** sem nenhum outro texto, pois é assim que está o código por enquanto. Agora é possível executar novamente o **select** no banco **H2** e consultar o usuário que foi adicionado na base de dados.

### Continuando o desenvolvimento da API

No próximo teste será retornado ao cliente que chama a API além do **status HTTP**, uma mensagem de sucesso. A mensagem irá retornar por meio de um objeto do tipo **GenericResponse**.

```java
//...
public class UsuarioControllerTest {
  //...

  @Test
  public void postUser_whenUserIsValid_receiveSuccessMessage() {
    User user = createValidUser();
    ResponseEntity<GenericResponse> response = testRestTemplate.postForEntity(API_USERS, user, GenericResponse.class);
    assertThat(response.getBody().getMessage()).isNotNull();
  }
  //...
}
```

A classe **GenericResponse** será criada no pacote **br.edu.utfpr.pb.tads.shared** e por enquanto terá apenas o atributo **message**.

```java
@Data
@NoArgsConstructor
public class GenericResponse {
  private String message;
  public GenericResponse(String message) {
    this.message = message;
  }
}
```
A próxima alteração de código será realizado no método **createUser()** da classe **UserController**, que agora deverá retornar um objeto do tipo **GenericResponse**. Após essa alteração o teste criado irá passar. Para visualizar o comportamento na prática a requisição pode ser realizada novamente por meio do Postman.

```java
    \\...
@PostMapping
    GenericResponse createUser(@RequestBody User user) {
        userService.save(user);
        return new GenericResponse("Registro salvo");
        }
        \\...
```

Com essa etapa finalizada, agora serão adicionadas algumas melhorias no código e na maneira com que os dados são persistidos. Ao fazer o **select** no banco de dados é possível observar que a coluna **password** está sendo armazenada como texto, o que não é uma boa prática. O teste a seguir irá validar se a senha salva no banco está diferente da senha que foi enviada para cadastro, o que sinaliza que ela estará criptografada no banco de dados.

```java
    \\...
@Test
public void postUser_whenUserIsValid_passwordIsHashedInDatabase() {
        User user = createValidUser();
        testRestTemplate.postForEntity(API_USERS, user, Object.class);
        List<User> users = userRepository.findAll();
        User userBD = users.get(0);
        assertThat(userBD.getPassword()).isNotEqualTo(user.getPassword());
        }
        \...
```
A criptografia da senha será realizada na classe **UserService** para evitar que regras de negócio da aplicação sejam implementadas na classe ***controller***. Para criptografia da senha será utilizada a classe **BCryptPasswordEncoder**[6]. Ao executar o método **bCryptPasswordEncoder.encode()** a senha será criptografada antes de ser salva no banco. Ao executar o teste ele vai passar. Para visualizar na prática só executar a requisição via Postman e conferir no console do **H2**.

```java
@Service
public class UserService {
  UserRepository userRepository;
  BCryptPasswordEncoder bCryptPasswordEncoder;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
    this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
  }
  public User save(User user) {
    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()) );
    return userRepository.save(user);
  }
}
```
Com isso finalizamos o básico do cadastro de usuário na API, agora será realizada a validação dos dados obrigatórios do usuário, pois por enquanto é possível cadastrar um usuário sem informar todos os dados, pois os mesmos não estão sem validados.

### Validando os dados de cadastro do usuário

Para realizar a validação dos dados obrigatórios das entidade na API, será utilizado Java Bean Validation [7], utilizando os validadores padrão, também serão criados validadores customizados e por fim, será tratada da internacionalização das mensagens de erro.

Até o momento só foram testados os casos de sucesso na API. Mas sabe-se que não é a realidade, pois constantemente os usuário preenchem os formulários no lado cliente e acabam passando dados inválidos para o servidor. Por isso serão validadas todas as entradas de usuário, tanto no *front-end* quanto no *back-end*.

Nesse primeiro teste será validado o caso de recebimento do campo **username** como nulo. Esse teste também será criado na classe **UsuarioControllerTest ** e irá testar se, caso o campo **username** estiver nulo, a resposta **HTTP** recebida deverá ser **400 BAD_REQUEST**.

```java
//...
public class UsuarioControllerTest {
  //...
  @Test
  public void postUser_whenUserHasNullUsername_receiveBadRequest() {
    User user = createValidUser();
    user.setUsername(null);
    ResponseEntity<Object> response = postSignUp(user, Object.class);
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
  }
  //...
}
```
Para resolver esse teste o inicialmente será adicionada a anotação **@NotNull** (importada de: import javax.validation.constraints.NotNull;) no campo **username** da classe **User**, conforme o código abaixo.

```java
@Data
@Entity(name = "tb_user")
public class User {

  @Id
  @GeneratedValue
  private long id;

  @NotNull
  private String username;
  private String displayName;
  private String password;
}
```

Com a anotação feita será delegado ao controller (**UserController**) validar o usuário antes da entrada no método que realiza a persistência dos dados. Será utilizada a anotação @Valid (importado de: import javax.validation.Valid;) antes da declaração do objeto user no médoto *createUser()*. Com isso o campo será validado e o cliente da API irá receber uma mensagem criada pelo Spring informando que o campo username não pode ser nulo.

```java
@RestController
@RequestMapping("users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  GenericResponse createUser(@RequestBody @Valid User user) {
    userService.save(user);
    return new GenericResponse("Registro salvo");
  }
}
```

O mesmo teste (**UserControllerTest**) será realizado para o campo **password** da classe **User**.

```java
    @Test
public void postUser_whenUserHasNullPassword_receiveBadRequest() {
        User user = createValidUser();
        user.setPassword(null);
        ResponseEntity<Object> response = postSignUp(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        }
```

Para resolver o teste será adicionada a anotação **@NotNull** no atributo **password**. E será a única modificação necessária, pois o **@Valid** presente na classe **UserController** será responsável por todas as validações necessárias de cada atributo da classe **User**. Existem outras validações que podem ser utilizadas nos atributos das classes, para conhecê-las basta acessar a documentação do  Java Bean Validation [7]. No código abaixo algumas outras anotações foram adicionadas nos atributos da classe **User**.
```java
@Data
@Entity(name = "tb_user")
public class User {

  @Id
  @GeneratedValue
  private long id;

  @NotNull
  @Size(min = 4, max = 255)  // valida para que o campo tenha entre 4 e 255 caracteres
  private String username;

  @NotNull
  private String displayName;

  @NotNull
  @Size(min = 6, max = 254)
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")   //valida para que o campo tenha pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.
  private String password;
}
```

### Adicionando Autenticação e Autorização com Spring Security

O conteúdo abordado na sequência é o conceito de autenticação e autorização com o *framework* **Spring Security**[8]. Neste projeto será criado um arquivo de configuração para sobrescrever alguns comportamentos padrão do **Spring Security**. A classe **User** será utilizada para criar os objetos dos usuários que poderão se autenticar na API. E a interface **UserRepository** será utilizada para criar a consulta que irá retornar o usuário do banco de dados.

O primeiro passo a ser realizado para o **Spring Security** funcionar é retirar o trecho de código *exclude = SecurityAutoConfiguration.class* da classe **ServerApplication**, pois agora é necessário que o Spring traga algumas configurações já definidas no projeto. Por padrão, ao retirar essa configuração o **Spring Security** volta a funcionar na aplicação e todas as rotas da API passam a necessitar de autenticação. Ou seja nesse momento os testes vão parar de funcionar e, ao tentar fazer uma requisição **HTTP POST** para a url **/users** da API o retorno será um código **HTTP** **403 FORBIDEN**, mesmo todos os campos estando corretos, pois o Spring está validando o acesso às rotas.

```java
@SpringBootApplication
public class ServerApplication {
  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }
}
``` 

A estrutura da camada de **segurança** da API desenvolvida com o **Spring Security** será composta pelas seguintes classes:

- **User**: responsável por representar o objeto que será utilizado no processo de autenticação, que com os atributos **username** e **password**;
- **UserRepository**: responsável por realizar a consulta ao banco de dados para buscar um usuário;
- **AuthUserService**: trata a consulta realizada pelo UserRepository e retorna o objeto com o usuário autenticado no caso de sucesso;
- **WebSecurity**: classe responsável por receber as configurações personalizadas do Spring Security neste projeto;
- **SecurityConstants**: constantes utilizadas na geração do token de autenticação;
- **JWTAuthenticationFilter**: filtro utilizado no processo de autenticação do usuário;
- **JWTAuthorizationFilter**: filtro utilizado no processo de autorização do usuário autenticado;
- **EntryPointUnauthorizedHandler**: tratamento das exceções que poderão ocorrer durante o processo de autenticação;
- **AuthenticationResponse**: objeto que será retornado no caso de autenticação realizada com sucesso;
- **UserResponseDTO**: objeto que representa um usuário e será retornado como propriedade do AuthenticationResponse;
- **AuthorityResponseDTO**: objeto que representa uma permissão de usuário e será retornado como propriedade do UserResponseDTO;

#### Configurações na classe **User**, **UserRepository** e a criação da classe **AuthUserService**

Para autenticar-se em um sistema qualquer geralmente precisamos ter credenciais, no caso deste projeto as credenciais para acesso serão gerenciadas pela classe **User** por meio dos campos **username** e **password**. Dessa maneira os objetos instanciados de **User** serão armazenados no banco de dados e utilizados posteriormente para autenticação e autorização. O processo de salvar um novo usuário já foi explicado no início deste documento, já o processo de autenticação e autorização está sendo descrito agora. Por padrão, para autenticar-se em uma aplicação Spring Security é necessário realizar uma requisição do tipo **HTTP POST** para URL **/login**  (no caso dessa aplicação: http://localhost:8025/login), enviando no corpo da requisição os dados de usuário e senha.

Agora serão descritas as configurações na classe **User**, **UserRepository** e a criação da classe **AuthUserService**. Como iremos utilizar o *framework* **Spring Security** para gerenciar a autenticação e autorização da API, deve-se obedecer a documentação do mesmo, que define que para utilizar uma classe criada na API a mesma deverá implementar a *interface* **UserDetails**. Essa *interface* exige a implementação de alguns métodos padrão , sendo os pricipais o **getUsername()**, o **getPassword()** e o **getAuthorities() **. O método **getUsername()** deve retornar o nome de usuário utilizado na autenticação (que pode ser outro campo da classe **User**, por exemplo, o campo email), nesse caso basta retornar **this.email** no método. O método **getPassword()** deverá retornar a senha e, por fim o método **getAuthorities() ** deverá retornar as permissões de usuário, nesse caso só teremos uma permissão, por isso o retorno é **return AuthorityUtils.createAuthorityList("Role_USER");**.

```java
\\... imports
public class User implements UserDetails {  
  
    @Id 
    @GeneratedValue 
    private long id;  
  
    @UniqueUsername 
    @NotNull(message = "{br.edu.utfpr.pb.tads.username}")  
    @Size(min = 4, max = 255)  
    private String username;  
  
    @NotNull  
    private String displayName;  
  
    @NotNull  
    @Size(min = 6, max = 254)  
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")  
    private String password;  
  
    @Override  
    @Transient 
    @JsonIgnore  
    public Collection<? extends GrantedAuthority> getAuthorities() {  
        return AuthorityUtils.createAuthorityList("Role_USER");  
    }  
  
    @Override  
    @Transient  
    public boolean isAccountNonExpired() {  
        return true;  
    }  
  
    @Override  
    @Transient  public boolean isAccountNonLocked() {  
        return true;  
    }  
  
    @Override  
    @Transient  public boolean isCredentialsNonExpired() {  
        return true;  
    }  
  
    @Override  
    @Transient  public boolean isEnabled() {  
        return true;  
    }  
}
```

Os demais métodos: **isAccountNonExpired(), isAccountNonLocked**, etc. estão retornando **true** por padrão, pois o Spring Security utiliza esses dados para verificar se a conta de usuário é válida. Nesse caso não foi implementado nenhum tipo de validação, mas esses métodos poderiam retornar valores armazenados no banco.

Na interface **UserRepository** foi adicionado a assinatura do método **findByUsername** que recebe como parâmetro o atributo **username** e retorna um objeto **User**. Esse método será utilizado para buscar o usuário que está tentando autenticar-se no sistema.

```java
\\...
@Repository  
public interface UserRepository extends JpaRepository<User, Long> {  
    User findByUsername(String username);  
}
```

A classe **AuthUserService** implementa a interface do Spring Security **UserDetailsService**, a qual obriga a implementação do método **loadUserByUsername**, que recebe uma interface **username** por parâmetro e retorna um **UserDetails**, pois o Spring Security utiliza esse objeto para verificar se um usuário existe no banco. Caso exista o usuário o Spring Security irá comparar a senha criptografada no banco com a senha informada pelo usuário durante o processo de autenticação.

```java
\\...
@Service  
public class AuthUserService implements UserDetailsService {  
	private final UserRepository userRepository;  
	
	public AuthUserService(UserRepository userRepository) {  
        this.userRepository = userRepository;  
    }  

    @Override 
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("Usuário não encontrado!");
        }
        return user;
    }  
}
```

#### Criação da classe WebSecurity e filtros
Para configurar o **Spring Security** será criada a classe **WebSecurity** no pacote **br.edu.utfpr.pb.tads.server.security**. Nessa classe serão sobrescritas as configurações padrão do Spring Security, por isso ela recebe a anotação **@EnableWebSecurity** e como serão criados objetos compartilhados a anotação **@Configuration**. O objeto **authService** será explicado na sequência do texto e é utilizado para buscar um usuário no banco.  O objeto **authenticationEntryPoint** é responsável por realizar o tratamento de exceção quando o usuário informar credenciais incorretas ao autenticar-se. O método **filterChain()** retorna um objeto do tipo **SecurityFilterChain**, nesse método serão sobrescritas algumas configurações padrão do Spring, pelas configurações utilizadas neste projeto. Essas configurações serão alteradas por meio do objeto **http** instanciado de **HttpSecurity**, nele podem ser alteados os objetos de tratamento de erro, quais rotas da aplicação serão autenticadas/autorizadas, as rotas para autenticação, controle do tipo de sessão e no caso desse projeto os filtros utilizados na Autenticação (**authenticationManager**) e autorização dos usuários (**authorizationManager**), conforme pode ser observado nos comentários do código abaixo.

```java
@EnableWebSecurity
@Configuration
public class WebSecurity {

    // Service responsável por buscar um usuário no banco de dados por meio do método loadByUsername()
    private final AuthService authService;
    // Objeto responsável por realizar o tratamento de exceção quando o usuário informar credenciais incorretas ao autenticar-se.
    /private final AuthenticationEntryPoint authenticationEntryPoint;

    public WebSecurity(AuthService authService, AuthenticationEntryPoint authenticationEntryPoint) {
        this.authService = authService;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Bean
    @SneakyThrows
    public SecurityFilterChain filterChain(HttpSecurity http) {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(authService)
                .passwordEncoder(passwordEncoder());
        // authenticationManager -> responsável por gerenciar a autenticação dos usuários
        AuthenticationManager authenticationManager =
                authenticationManagerBuilder.build();

        //Configuração para funcionar o console do H2.
        http.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));
        // desabilita o uso de csrf
        http.csrf(AbstractHttpConfigurer::disable);
        // Adiciona configuração de CORS
        http.cors(cors -> corsConfigurationSource());
        //define o objeto responsável pelo tratamento de exceção ao entrar com credenciais inválidas
        http.exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(authenticationEntryPoint));

        // configura a authorização das requisições
        http.authorizeHttpRequests((authorize) -> authorize
                //permite que a rota "/users" seja acessada, mesmo sem o usuário estar autenticado desde que o método HTTP da requisição seja POST
                .requestMatchers(antMatcher(HttpMethod.POST, "/users/**")).permitAll()
                //permite que a rota "/error" seja acessada por qualquer requisição mesmo o usuário não estando autenticado
                .requestMatchers(antMatcher("/error/**")).permitAll()
                .requestMatchers(antMatcher("/h2-console/**")).permitAll()
                //as demais rotas da aplicação só podem ser acessadas se o usuário estiver autenticado
                .anyRequest().authenticated()
        );
        http.authenticationManager(authenticationManager)
                //Filtro da Autenticação - sobrescreve o método padrão do Spring Security para Autenticação.
                .addFilter(new JWTAuthenticationFilter(authenticationManager, authService))
                //Filtro da Autorização - - sobrescreve o método padrão do Spring Security para Autorização.
                .addFilter(new JWTAuthorizationFilter(authenticationManager, authService))
                //Como será criada uma API REST e todas as requisições que necessitam de autenticação/autorização serão realizadas com o envio do token JWT do usuário, não será necessário fazer controle de sessão no *back-end*.
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    // Criação do objeto utilizado na criptografia da senha, ele é usado no UserService ao cadastrar um usuário e pelo authenticationManagerBean para autenticar um usuário no sistema.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuração de CORS para ser possível acessar a API criada do cliente que será desenvolvido em React
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT"));
        configuration.setAllowedHeaders(List.of("Authorization","x-xsrf-token",
                "Access-Control-Allow-Headers", "Origin",
                "Accept", "X-Requested-With", "Content-Type",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers", "Auth-Id-Token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

Conforme configurado na classe **WebSecurity** um filtro chamado **JWTAuthenticationFilter** será criado para realizar o processo de autenticação. Essa classe herda as características de **UsernamePasswordAuthenticationFilter** que é a classe do Spring Security que é utilizada para autenticação via usuário e senha. O método **attemptAuthentication** que foi sobrescrito é chamado quando o usuário realiza uma requisição **HTTP** do tipo **POST** para URL **/login**. Esse método recebe como parâmetros um objeto **HttpServletRequest ** que contém todos os dados da requisição, ou seja, é possível extrair do corpo da requisição o usuário e senha informado pelo usuário no momento da autenticação. Como está sendo utilizado JSON para transferência de dados entre o cliente e a API será necessário enviar os dados nesse formato, ex: `{"username":"user","password":"P4ssword"}`

Esses dados são recuperados dentro do método **attemptAuthentication**. Então será realizada  uma consulta no banco de dados para verificar se o usuário existe, caso exista a senha informada durante a autenticação é comparada com a senha armazenada no banco de dados e no caso de sucesso o usuário será autenticado. No caso de falha uma *Exception* é gerada e o usuário irá receber um erro **401**. No caso de sucesso será chamado o método **successfulAuthentication**, que também foi sobrescrito, para que seja gerado o **Token JWT** que será enviado para o cliente, assim o cliente poderá utilizar esse Token para realizar a autorização nas próximas requisições. O método **successfulAuthentication** recebe como parâmetro um objeto do tipo **HttpServletResponse** que é utilizado para enviar a resposta ao cliente que solicitou a autenticação. A aplição irá retornar como respostar um **Token JWT** por meio de um objeto do tipo **AuthenticationResponse** que foi criado para retornar apenas o Token para o cliente no formato JSON.

```java
@NoArgsConstructor  
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {  
  
    private AuthenticationManager authenticationManager;  
    private AuthService authService;  
  
    public JWTAuthenticationFilter(AuthenticationManager authenticationManager,  
                                   AuthService authService) {  
        this.authenticationManager = authenticationManager;  
        this.authService = authService;  
    }  
  
    @Override  
  public Authentication attemptAuthentication(HttpServletRequest request,  
                                                HttpServletResponse response)  
                                                throws AuthenticationException {  
  
        try {  
            //HTTP.POST {"username":"admin", "password":"P4ssword"}  
 //Obtém os dados de username e password utilizando o ObjectMapper para converter o JSON //em um objeto User com esses dados.  User credentials = new User();  
            User user = new User();  
            //Verifica se o usuário existe no banco de dados, caso não exista uma Exception será disparada  
 //e o código será parado de executar nessa parte e o usuário irá receber uma resposta //com falha na autenticação (classe: EntryPointUnauthorizedHandler)  if (request.getInputStream() != null && request.getInputStream().available() > 0) {  
                credentials = new ObjectMapper().readValue(request.getInputStream(), User.class);  
                user = (User) authService.loadUserByUsername(credentials.getUsername());  
            }  
            //Caso o usuário seja encontrado, o objeto authenticationManager encarrega-se de autenticá-lo.  
 //Como o authenticationManager foi configurado na classe WebSecurity e, foi informado o método //de criptografia da senha, a senha informada durante a autenticação é criptografada e //comparada com a senha armazenada no banco. Caso não esteja correta uma Exception será disparada //Caso ocorra sucesso será chamado o método: successfulAuthentication dessa classe  return authenticationManager.authenticate(  
                    new UsernamePasswordAuthenticationToken(  
                            credentials.getUsername(),  
                            credentials.getPassword(),  
                            user.getAuthorities()  
                    )  
            );  
        } catch (StreamReadException e) {  
            throw new RuntimeException(e);  
        } catch (DatabindException e) {  
            throw new RuntimeException(e);  
        } catch (IOException e) {  
            throw new RuntimeException(e);  
        }  
    }  
  
    @Override  
  protected void successfulAuthentication(HttpServletRequest request,  
                                            HttpServletResponse response,  
                                            FilterChain chain,  
                                            Authentication authResult) throws IOException, ServletException {  
        User user = (User) authService.loadUserByUsername(authResult.getName());  
        // o método create() da classe JWT é utilizado para criação de um novo token JWT  
  String token = JWT.create()  
                // o objeto authResult possui os dados do usuário autenticado, nesse caso o método getName() retorna o username do usuário foi autenticado no método attemptAuthentication.  
  .withSubject(authResult.getName())  
                //a data de validade do token é a data atual mais o valor armazenado na constante EXPIRATION_TIME, nesse caso 1 dia  
  .withExpiresAt(  
                    new Date(System.currentTimeMillis()  + SecurityConstants.EXPIRATION_TIME)  
                )  
                //Por fim é informado o algoritmo utilizado para assinar o token e por parâmetro a chave utilizada para assinatura. O Secret também pode ser alterado na classe SecurityConstants que armazena alguns dados de configuração do Spring Security  
  .sign(Algorithm.HMAC512(SecurityConstants.SECRET));  
        response.setContentType("application/json");  
        response.getWriter().write(  
                new ObjectMapper().writeValueAsString(  
                        new AuthenticationResponse(token, new UserResponseDTO(user)))  
        );  
  
    }  
  
    @Override  
  protected AuthenticationSuccessHandler getSuccessHandler() {  
        return super.getSuccessHandler();  
    }  
}
```
Abaixo está o JSON que deverá ser enviado via **HTTP POST** para URL **/login** para autenticar-se na aplicação.
```json
{"username":"user","password":"P4ssword"}
```
Abaixo está um exemplo de resposta ao cliente após a autenticação realizada com sucesso.

```json
{"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.restante.dotoken"}
```

Com posse do Token recebido o cliente poderá realizar novas requisições ao servidor nas rotas que necessitam de autorização. Para isso basta enviar o Token no cabeçalho da requisição utilizando a chave **Authorization**.
`Authorization:  Bearer  aqui.vai.otoken`

Entretanto, para que o Token seja utilizado para autorizar no usuário nas novas requisições foi criada a classe **JWTAuthorizationFilter**, que será responsável por extrair o Token do cabeçalho da requisição **HTTP** e verificar se ele é válido. A classe herda de **BasicAuthenticationFilter ** e implementa o método **doFilterInternal**, esse método recebe como parâmetro um objeto do tipo HttpServletRequest, e é desse objeto que é extraído o token do cabeçalho da requisição. Após pegar o token do cabeçalho o mesmo é passado por parâmetro para o método **getAuthentication**, no qual é verificado a validade do token, então é recuperado o **username** que está  no corpo do token. Na sequência é verificado se o usuário que está tentando autorização ainda existe no banco de dados, caso exista o usuário é autorizado e a autorização é adicionada no contexto do Spring Security.

```java
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {  
  
    private final AuthService authService;  
  
    public JWTAuthorizationFilter(AuthenticationManager authenticationManager,  
                                  AuthService authService) {  
        super(authenticationManager);  
        this.authService = authService;  
    }  
  
    @Override  
  protected void doFilterInternal(HttpServletRequest request,  
                                    HttpServletResponse response,  
                                    FilterChain chain) throws IOException, ServletException {  
  
        //Recuperar o token do Header(cabeçalho) da requisição  
  String header = request.getHeader(SecurityConstants.HEADER_STRING);  
        //Verifica se o token existe no cabeçalho  
  if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {  
            chain.doFilter(request, response);  
            return;  
        }  
        //Chama o método getAuthentication e retorna o usuário autenticado para dar sequência na requisição  
  UsernamePasswordAuthenticationToken authenticationToken =  
                getAuthentication(request);  
        //Adiciona o usuário autenticado no contexto do spring security  
  SecurityContextHolder.getContext().setAuthentication(authenticationToken);  
        chain.doFilter(request, response);  
    }  
  
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {  
        String token = request.getHeader(SecurityConstants.HEADER_STRING);  
  
        //verifica se o token é válido e retorna o username  
  String username = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET))  
                .build()  
                .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))  
                .getSubject();  
  
        if (username != null) {  
            // com posse do username é verificado se ele existe na base de dados  
  User user = (User) authService.loadUserByUsername(username);  
            //caso exista o usuário é autenticado e a requisição continua a ser executada.  
  return new UsernamePasswordAuthenticationToken(  
                    user.getUsername(),  
                    null,  
                    user.getAuthorities());  
        }  
        // senão é retornado null, se a url que o usuário solicitou necessita de autenticação ele vai receber erro 401 - Unauthorized  
  return null;  
    }  
}
```
Com o Token validado e o usuário autenticado e autorizado adicionado adicionado no contexto do Spring Security, qualquer **endpoint** da aplicação que necessite de autorização para acesso precisa ser acessado enviando o token gerado durante a autenticação.

## Criação dos _endpoints_ para as operações de CRUD de Categoria e Produto

Com o processo de criação de usuário e autenticação funcionando, agora serão criadas as novas funcionalidades da API. Vamos criar as operações de **CRUD** para classe que irá armazenar a categoria que será relacionada ao produto. Para isso deverá ser criado o **model**, o **repository**, o **service** e o **controller**.


Para representar uma categoria será criada a classe **Category** com os atributos **id** e **name**:

```java
@Entity  
@Table(name = "tb_category")  
@NoArgsConstructor  
@AllArgsConstructor  
@Builder  
@Getter @Setter  
public class Category {  
  
    @Id  
 @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long id;  
  
    @NotNull  
 @Size(min = 2, max = 50)  
    @Column(length = 50, nullable = false)  
    private String name;  
  
    @Override  
  public boolean equals(Object o) {  
        if (this == o) return true;  
        if (o == null || getClass() != o.getClass()) return false;  
        Category category = (Category) o;  
        return Objects.equals(id, category.id);  
    }  
  
    @Override  
  public int hashCode() {  
        return Objects.hash(id);  
    }  
}
```
Para disponibilizar as operações de CRUD  da aplicação será criada a *interface* **CategoryRepository** que irá herdar as características de ***JpaRepository***, essa interface que faz parte do _framework_ Springn Data irá fornecer as operações de CRUD sem que seja necessário outras implementações.

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {  
}
```
Agora será adicionada uma camada de ***service***, assim caso existam regras de negócio, regradas de validação, etc., essas funcionalidades podem ser adicionadas no *service*,  melhorando a estrutura do código-fonte. Será criada a *interface* **ICategoryService** no pacote **service** e na sequência será criada a implementação dessa *interface* no pacote **service.impl** com o nome de **CategoryServiceImpl**.


```java
public interface ICategoryService {  
    List<Category> findAll();  
    Page<Category> findAll(Pageable pageable);   
    Category save(Category category);  
    Category findOne(Long id);  
    boolean exists(Long id);  
    void delete(Long id);  
}
```
Abaixo está o código da classe **CategoryServiceImpl** que utiliza-se de um objeto **categoryRepository** para realizar as operações de CRUD.
```java
@Service  
public class CategoryServiceImpl implements ICategoryService {  
	private final CategoryRepository categoryRepository;  
  
    public CategoryServiceImpl(CategoryRepository categoryRepository) {  
        this.categoryRepository = categoryRepository;  
    }  
  
    @Override  
	public List<Category> findAll() {  
        return categoryRepository.findAll();  
    }  
  
    @Override  
	public Page<Category> findAll(Pageable pageable) {  
        return categoryRepository.findAll(pageable);  
    }  
  
    @Override  
	public Category save(Category category) {  
        return categoryRepository.save(category);  
    }  
  
    @Override  
	public Category findOne(Long id) {  
        return categoryRepository.findById(id).orElse(null);  
    }  
  
    @Override  
	public boolean exists(Long id) {  
        return categoryRepository.existsById(id);  
    }  
  
    @Override  
	public void delete(Long id) {  
        categoryRepository.deleteById(id);  
    }  
}
```
No próximo passo será criada a classe que irá atuar como controlador das operações com categoria. No desenvolvimento do ***controller*** de categoria serão criados métodos para salvar, editar, listar e remover um registro de categoria. Além de um método para retornar o número de registros e se existe um registro na base de dados com o código informado. O _framework_ Spring Web será utilizado como base para desenvolvimento desse _controller_, iniciando pela anotação ***@RestController***, que indica que esse controlador irá atender requisições HTTP na URL `/categories` como pode ser observado na anotação ***@RequestMapping("categories")*** .

No construtor da classe **CategoryController** é realizada a injeção de dependência do **service** de categoria (ICategoryService), pois é por meio dele que serão realizadas as operações com ligação ao banco de dados.

O primeiro método implementado é o ***findAll()***, que retorna uma lista de categorias quando ocorrer uma requisição do tipo HTTP GET na URL `/categories`. Os demais métodos são apresentados nos comentários do código baixo.

```java
@RestController  
@RequestMapping("categories")  
public class CategoryController {
	  
    private final ICategoryService categoryService;  

    public CategoryController(ICategoryService categoryService) {  
        this.categoryService = categoryService;  
    }  
  
	// O Método findAll() é executando quando é realizada uma
	// requisição do tipo GET para:
	// http://localhost:8025/categories
	// e o retorno será um json no formato:
	// [{id:1, name: "Category One"}, {...}, ...]
    @GetMapping  
	public ResponseEntity<List<Category>> findAll() {  
        return ResponseEntity.ok(categoryService.findAll());  
    }  
  
    // O Método create() é executando quando é realizada uma
	// requisição do tipo POST para:
	// http://localhost:8025/categories
	// Recebe como parâmetro um objeto JSON no formato:
	// {id: null, name: "Category One"}
	// e o retorno será um json no formato:
	// {id:1, name: "Category One"}
	// Ou seja a categoria com o ID gerado ao armazenar o registro no banco de dados
    @PostMapping  
    public ResponseEntity<Category> create(@RequestBody @Valid Category category) {  
        categoryService.save(category);  
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()  
                .path("/{id}")  
                .buildAndExpand( category.getId() ).toUri();  
  
        return ResponseEntity.created( location ).body( category );  
    }  
    // O Método findOne() é executando quando é realizada uma
	// requisição do tipo GET para:
	// http://localhost:8025/categories/1 
	// onde o 1 é o ID da categoria que deverá ser retornada,
	//e o retorno será um json no formato:
	// {id:1, name: "Category One"}
    @GetMapping("{id}") //http://localhost:8025/categories/1  
    public ResponseEntity<Category> findOne(@PathVariable("id") Long id) {  
        return ResponseEntity.ok(categoryService.findOne(id));  
    }  

	// O Método delete() é executando quando é realizada uma
	// requisição do tipo DELETE para:
	// http://localhost:8025/categories/1 
	// onde o 1 é o ID da categoria que deverá ser removida,
	//e o retorno, no caso de sucesso será
	//um corpo de requisição vazio com o status:
	// 204 - NO CONTENT
    @DeleteMapping("{id}")  
    @ResponseStatus(HttpStatus.NO_CONTENT)  
    public void delete(@PathVariable Long id) {  
        categoryService.delete(id);  
    }  
  
    @GetMapping("page")  
    // http://localhost:8025/categories/page?page=0&size=5&order=name&asc=true  
  public ResponseEntity<Page<Category>> findAllPaged(  
                                @RequestParam int page,  
                                @RequestParam int size,  
                                @RequestParam(required = false) String order,  
                                @RequestParam(required = false) Boolean asc  
                                ) {  
        PageRequest pageRequest = PageRequest.of(page, size);  
        if (order != null && asc != null) {  
            pageRequest = PageRequest.of(page, size,  
                    asc ? Sort.Direction.ASC : Sort.Direction.DESC, order);  
        }  
        return ResponseEntity.ok(categoryService.findAll(pageRequest));  
    }   
}
```

Agora será criada a classe **Product** para que possamos realizar as operações de CRUD com produtos e a classe **repository** que herda as características de **JpaRepository**.

```java
@Entity  
@Table(name = "tb_product")  
@AllArgsConstructor  
@NoArgsConstructor  
@Builder  
public class Product {  
  
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    @Getter @Setter  
    private Long id;  
  
    @NotNull  
    @Getter @Setter  
    private String name;  
  
    @NotNull  
    @Column(length = 1024)  
    @Getter @Setter  
    private String description;  
  
    @NotNull  
    @Getter @Setter  
    private BigDecimal price;  
  
    @ManyToOne  
    @JoinColumn(name = "category_id", referencedColumnName = "id")  
    @Getter @Setter  
    private Category category;
 }
```
Interface **ProductRepository **:
```java
public interface ProductRepository extends JpaRepository<Product, Long> {  
}
```
Os códigos da interface e implementação da camada ***service*** e ***controller*** seguem a mesma lógica que as que foram criadas para o CRUD de categoria. Seguindo as boas práticas de orientação a objetos o próximo passo é a criação de interfaces e classes genéricas para reduzir a quantidade de códigos redundantes.

## Melhorando o Código: adicionando herança

### Criando a classe abstrata na camada _Service_
Na camada ***service*** serão criadas a _interface_ genérica  **ICrudService** e a classe abstrata **CrudServiceImpl**. Como parâmetros para herdar da interface deverão ser passados a classe "T" e a chave primária "ID".
```java
public interface ICrudService<T, ID extends Serializable> {  
    List<T> findAll();  
    List<T> findAll(Sort sort);    
    Page<T> findAll(Pageable pageable);  
    T save(T entity);  
    T saveAndFlush(T entity);  
    Iterable<T> save(Iterable<T> iterable);  
    void flush();  
    T findOne(ID id);  
    boolean exists(ID id);  
    long count();  
    void delete(ID id);  
    void delete(Iterable<? extends T> iterable);  
    void deleteAll();  
}
```
A implementação da interface é realizada na classe **CrudServiceImpl** que irá conter a implementação genérica de todos os métodos CRUD. Essa classe abstrata possui um método abstrato ( ***getRepository()*** ), esse método é utilizado para retornar um objeto do tipo **JpaRepository**  responsável por realizar as operações com o banco de dados.

```java
public abstract class CrudServiceImpl<T, ID extends Serializable> implements ICrudService<T, ID> {  
  
    protected abstract JpaRepository<T, ID> getRepository();  
  
    @Override  
    public List<T> findAll() {  
        return getRepository().findAll();  
    }  
  
    @Override  
    public List<T> findAll(Sort sort) {  
        return getRepository().findAll(sort);  
    }  
  
    @Override  
    public Page<T> findAll(Pageable pageable) {  
        return getRepository().findAll(pageable);  
    }  
  
    @Override  
    public T save(T entity) {  
        return getRepository().save(entity);  
    }  
  
    @Override  
    public T saveAndFlush(T entity) {  
        return getRepository().saveAndFlush(entity);  
    }  
  
    @Override  
    public Iterable<T> save(Iterable<T> iterable) {  
        return getRepository().saveAll(iterable);  
    }  
  
    @Override  
    public void flush() {  
        getRepository().flush();  
    }  
  
    @Override  
    public T findOne(ID id) {  
        return getRepository().findById(id).orElse(null);  
    }  
  
    @Override  
    public boolean exists(ID id) {  
        return getRepository().existsById(id);  
    }  
  
    @Override  
    @Transactional(readOnly = true)  
    public long count() {  
        return getRepository().count();  
    }  
  
    @Override  
    public void delete(ID id) {  
        getRepository().deleteById(id);  
    }  
  
    @Override  
    public void delete(Iterable<? extends T> iterable) {  
        getRepository().deleteAll(iterable);  
    }  
  
    @Override  
    public void deleteAll() {  
        getRepository().deleteAll();  
    }  
}
```
### Criando a classe abstrata na camada _Controller_

Também com o objetivo de reduzir a quantidade de código repetida entre as classes da aplicação será criada uma classe abstrata para a camada de ***controller***. A classe **CrudController ** irá receber três parâmetros: **T** - classe principal, **D** - *data transfer object* (DTO) e **ID** - chave primária. Foram criados dois métodos abstratos, o ***getService()*** que será a instância da camada ***service*** para as operações de CRUD e o ***getModelMapper()*** que será responsável pela conversão da classe principal para DTO e vise-versa. Além disso, foi criado um construtor com dois parâmetros para receber o tipo das classes principal e DTO, os quais serão utilizados pelo ***modelMapper** para realizar a conversão dos objetos.

O padrão DTO é utilizado na transferência de dados entre as camadas de uma aplicação, no nosso caso entre a aplicação cliente e a API. Pode ser que em alguns momentos nem sempre o model que representa a entidade que será armazenada no banco de dados reflete os dados vindos do cliente. Ou ainda os dados que consultamos no banco precisam ser formatados antes de enviar para o lado cliente, para isso podemos utilizar o padrão DTO.

```java
// T = class type, D = dto type, ID = attribute related to primary key type  
public abstract class CrudController <T, D, ID extends Serializable> {  
  
    protected abstract ICrudService<T, ID> getService();  
    protected abstract ModelMapper getModelMapper();  
    private final Class<T> typeClass;  
    private final Class<D> typeDtoClass;  
  
    public CrudController(Class<T> typeClass, Class<D> typeDtoClass) {  
        this.typeClass = typeClass;  
        this.typeDtoClass = typeDtoClass;  
    }  
  
    private D convertToDto(T entity) {  
        return getModelMapper().map(entity, this.typeDtoClass);  
    }  
  
    private T convertToEntity(D entityDto) {  
        return getModelMapper().map(entityDto, this.typeClass);  
    }  
  
    @GetMapping //http://ip.api:port/classname  
    public ResponseEntity<List<D>> findAll() {  
        return ResponseEntity.ok(  
                getService().findAll().stream().map(  
                        this::convertToDto).collect(Collectors.toList()  
                )  
        );  
    }  
  
    @GetMapping("page")  //http://ip.api:port/classname/page  
  public ResponseEntity<Page<D>> findAll(  
                        @RequestParam int page,  
                        @RequestParam int size,  
                        @RequestParam(required = false) String order,  
                        @RequestParam(required = false) Boolean asc  
                    ) {  
        PageRequest pageRequest = PageRequest.of(page, size);  
        if (order != null && asc != null) {  
            pageRequest = PageRequest.of(page, size,  
                    asc ? Sort.Direction.ASC : Sort.Direction.DESC, order);  
        }  
        return ResponseEntity.ok(  
                getService().findAll(pageRequest).map(this::convertToDto)  
        );  
    }  
  
    @GetMapping("{id}")  
    public ResponseEntity<D> findOne(@PathVariable ID id) {  
        T entity = getService().findOne(id);  
        if ( entity != null) {  
            return ResponseEntity.ok(convertToDto(entity));  
        } else {  
            return ResponseEntity.noContent().build();  
        }  
    }  
  
    @PostMapping  
    public ResponseEntity<D> create(@RequestBody @Valid D entity) {  
        return ResponseEntity.status(HttpStatus.CREATED)  
                .body(convertToDto(getService().save(convertToEntity(entity))));  
  
    }  
  
    @PutMapping("{id}")  
    public ResponseEntity<D> update(@PathVariable ID id, @RequestBody @Valid D entity) {  
        return ResponseEntity.status(HttpStatus.OK)  
                .body(convertToDto(getService().save(convertToEntity(entity))));  
  
    }  
  
    @GetMapping("exists/{id}")  
    public ResponseEntity<Boolean> exists(@PathVariable ID id) {  
        return ResponseEntity.ok(getService().exists(id));  
    }  
  
    @GetMapping("count")  
    public ResponseEntity<Long> count() {  
        return ResponseEntity.ok(getService().count());  
    }  
  
    @DeleteMapping("{id}")  
    public ResponseEntity<Void> delete(@PathVariable ID id) {  
        getService().delete(id);  
        return ResponseEntity.noContent().build();  
    }  
  
}
```

### Implementando o CRUD de Categoria com base na nova estrutura

Inicialmente será ajustada a interface de categoria, **ICategoryService**, que agora ficará com o seguinte conteúdo:

```java
public interface ICategoryService extends ICrudService<Category, Long> {  
}
```
Como estamos herdando as características de **ICrudService** não é necessário reescrever a assinatura de todos os métodos. Na sequência é apresentada a implementação do ***service** de categoria:

```java
@Service  
public class CategoryServiceImpl extends CrudServiceImpl<Category, Long>  
        implements ICategoryService {  
  
    private final CategoryRepository categoryRepository;  
  
    public CategoryServiceImpl(CategoryRepository categoryRepository) {  
        this.categoryRepository = categoryRepository;  
    }  
  
    @Override  
    protected JpaRepository<Category, Long> getRepository() {  
        return categoryRepository;  
    }  
}
```
A lógica é a mesma, estamos herdando as características da classe abstrata **CrudServiceImpl**, por isso todos os métodos lá implementados estarão disponíveis para as instâncias de **CategoryServiceImpl**. Novos métodos específicos para Categoria quando implementados devem primeiro ser declarados na interface ICategoryService e então implementados na classe CategoryServiceImpl.

Antes de implementar a classe controladora, vamos criar o DTO de categoria:

```java
@Data  
public class CategoryDTO {  
  
    private Long id;  
  
    @NotNull  
    @Size(min = 2, max = 50)  
    private String name;  
}
```

A camada de ***controller*** se assemelha a camada de serviços, em que as características serão herdadas da classe **CrudController**. A classe **CategoryController** ficará com a seguinte estrutura:

```java
@RestController  
@RequestMapping("categories")  
public class CategoryController extends CrudController<Category, CategoryDTO, Long> {  
  
    private static ICategoryService categoryService;  
    private static ModelMapper modelMapper;  
  
    public CategoryController(ICategoryService categoryService,  
                              ModelMapper modelMapper) {  
        super(Category.class, CategoryDTO.class);  
        CategoryController.categoryService = categoryService;  
        CategoryController.modelMapper = modelMapper;  
    }  
  
    @Override  
    protected ICrudService<Category, Long> getService() {  
        return CategoryController.categoryService;  
    }  
  
    @Override  
    protected ModelMapper getModelMapper() {  
        return CategoryController.modelMapper;  
    }  
}
```

As anotações  `@RestController` e `@RequestMapping("categories")` são mantidas, assim como a instância do objeto da camada ***service**. Entretanto agora foi adicionado a instância do objeto **modelMapper** e também foi chamado o construtor da classe abstrata passando o tipos: **Category.class** e **CategoryDTO.class**.

Agora a implementação da estrutura para entidade de Produto ficará mais simples.

### Implementando o CRUD de Produto com base na nova estrutura

Serão apresentadas na sequência a _interface_ **IProductService**, a classe **ProductServiceImpl**, a classe **ProductDTO** e a classe **ProductController**.

#### IProductService
```java
public interface IProductService extends ICrudService<Product, Long> {  
}
```

#### ProductServiceImpl
```java
@Service  
public class ProductServiceImpl extends CrudServiceImpl<Product, Long>  
            implements IProductService {  
  
    private final ProductRepository productRepository;  
  
    public ProductServiceImpl(ProductRepository productRepository) {  
        this.productRepository = productRepository;  
    }  
  
    @Override  
    protected JpaRepository<Product, Long> getRepository() {  
        return productRepository;  
    }  
}
```
#### ProductDTO
```java
@Data  
public class ProductDTO {  
  
    private Long id;  
  
    @NotNull  
  private String name;  
  
    @NotNull  
  private String description;  
  
    @NotNull  
  private BigDecimal price;  
  
    private CategoryDTO category;  
}
```
#### ProductController

```java
@RestController  
@RequestMapping("products")  
public class ProductController extends CrudController<Product, ProductDTO, Long> {  
  
    private static IProductService productService;  
  
    private static ModelMapper modelMapper;  
  
    public ProductController(IProductService productService, ModelMapper modelMapper) {  
        super(Product.class, ProductDTO.class);  
        ProductController.productService = productService;  
        ProductController.modelMapper = modelMapper;  
    }  
  
    @Override  
    protected ICrudService<Product, Long> getService() {  
        return productService;  
    }  
  
    @Override  
    protected ModelMapper getModelMapper() {  
        return modelMapper;  
    }  
}
```
Com isso todas as operações de CRUD tanto de categoria quanto produto estão implementadas. Para testá-las inicialmente é necessário executar a classe principal e após o projeto iniciado cadastrar um novo usuário na API, utilizando o software Postman, Insomnia ou similar podemos fazer um HTTP POST para:
`http://localhost:8025/users`
Adicionando no corpo da requisição um JSON com um usuário válido, por exemplo:
`{"id": null, "displayName": "Jane Doe", "username":"test", "password":"P4ssword" }`

Agora é possível autenticar-se, para isso basta realizar uma chamada HTTP POST para:
`http://localhost:8025/login`
Adicionando no corpo da requisição um JSON com o ***username*** e ***password***:
`{"username":"test", "password":"P4ssword" }`

O retorno da requisição será um **token** JWT. Para testarmos os _endpoints_ do *controller* de categoria vamos precisar do token que acabamos de receber.
Para cadastrar uma nova categoria podemos fazer uma requisição do tipo HTTP POST para URL:
`http://localhost:8025/categories`
Adicionando no corpo da requisição um JSON com as propriedades de categoria:
`{"id": null, name":"Category Test"}`
Além disso precisamos ir na aba de segurança do software Postman ou Insomnia e adicionar o **header** **Authorization** com o valor **Bearer token.gerado.nologin**. Após isso podemos enviar a requisição.
Como retorno teremos o objeto com a categoria cadastrada, como o servidor retorna o próprio objeto ele virá com o ID gerado no momento da persistência da categoria.
`{"id": 1, name":"Category Test"}`

Os demais _endpoints_ da API seguem a mesma ideia, sendo que as URLs que precisam de autenticação sempre deverão receber um token válido.

# Referências
[1] Spring Framework, https://spring.io/.

[2] JOHNSON, R. E.; FOOTE, B.. Designing reusable classes. Journal of Object-Oriented Programming, 1(2):22–35, 1988.

[3] Prasanna, D.R., Dependency Injection: Design Patterns Using Spring and Guice, isbn=9781933988559, Manning- Manning Pubs Co Series,  url: https://books.google.com.br/books?id=b6O6OgAACAAJ, 2009.

[4] Spring Data JPA - Disponível em: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#reference

[5] Fielding, Roy. Architectural Styles and the Design of Network-based Software Architectures  Disponível em: https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf

[6] BCryptPasswordEncoder. Disponível em: https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCryptPasswordEncoder.html

[7] Java Bean Validation. Disponível em:  https://beanvalidation.org/3.0/

[8] Spring Security [https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)

[9] CSRF Attack [https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-explained](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-explained)
