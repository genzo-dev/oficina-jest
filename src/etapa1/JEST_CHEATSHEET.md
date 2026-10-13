# Jest Cheatsheet — Oficina de Testes Unitários

Este documento reúne os principais métodos e recursos do Jest utilizados na oficina, com exemplos e explicações para consulta durante os exercícios.

Para uma documentação mais completa, consulte a [documentação oficial do Jest](https://jestjs.io/docs/getting-started).

## 1. Organização dos testes

### `describe()`

Agrupa testes relacionados, facilitando sua organização e leitura.

```js
describe("UserService", () => {
  // Testes relacionados ao serviço de usuários.
});
```

É possível criar grupos aninhados para organizar os testes por método:

```js
describe("UserService", () => {
  describe("createUser", () => {
    it("deve criar um usuário quando o nome for válido", () => {
      // Teste...
    });
  });
});
```

### `it()`

Define um caso de teste individual. O Jest também disponibiliza `test()`, que pode ser utilizado como alternativa.

```js
it("deve criar um usuário quando o nome for válido", () => {
  // Implementação do teste...
});
```

O texto passado como primeiro argumento descreve o comportamento que o teste deverá verificar.

## 2. Preparação dos testes

### `beforeEach()`

Executa uma função antes de cada teste do grupo em que está definido.

```js
beforeEach(() => {
  userRepository = {
    createUser: jest.fn(),
  };

  userService = createUserService(userRepository);
});
```

É útil para preparar um cenário inicial comum aos testes, evitando repetir a mesma configuração em cada caso.

No exemplo da oficina, ele cria um novo repositório simulado e uma nova instância do serviço antes de cada teste.

## 3. Criando funções simuladas

### `jest.fn()`

Cria uma função mock, permitindo observar suas chamadas e configurar seu comportamento.

```js
const createUser = jest.fn();

createUser("Gabriel");

expect(createUser).toHaveBeenCalledWith("Gabriel");
```

Além de verificar se a função foi chamada, você pode consultar seus argumentos e configurar valores de retorno.

**Importante:** uma função criada apenas com `jest.fn()` retorna `undefined` quando chamada, a menos que você configure outro comportamento.

### `mockResolvedValue()`

Configura uma função mock para retornar uma `Promise` resolvida com o valor informado.

```js
const findById = jest.fn().mockResolvedValue({
  id: 1,
  name: "Gabriel",
});
```

Quando `findById()` for chamada, ela retornará uma `Promise` que será resolvida com o objeto configurado.

Esse recurso é útil para simular métodos assíncronos sem depender de um banco de dados ou de outra implementação real.

Também podemos simular um resultado sem dados:

```js
findById.mockResolvedValue(null);
```

Assim, podemos representar o cenário em que um produto ou usuário não foi encontrado.

## 4. Verificando resultados e comportamentos

### `expect()`

Inicia uma verificação sobre um valor ou comportamento observado pelo teste.

```js
const result = 2 + 2;

expect(result).toBe(4);
```

O `expect()` é combinado com um _matcher_, que determina qual condição deverá ser verificada.

### `toEqual()`

Verifica se o valor recebido corresponde ao valor esperado, comparando recursivamente as propriedades de objetos e arrays.

```js
expect(result).toEqual({
  id: 1,
  name: "Gabriel",
});
```

É útil quando precisamos verificar o conteúdo de um objeto retornado por um serviço.

### `toHaveBeenCalledWith()`

Verifica se uma função mock foi chamada com os argumentos informados.

```js
expect(userRepository.createUser).toHaveBeenCalledWith("Gabriel");
```

Essa verificação é importante quando queremos garantir que o serviço encaminhou corretamente os dados para uma dependência.

### `not.toHaveBeenCalled()`

Verifica se uma função mock não foi chamada.

```js
expect(userRepository.createUser).not.toHaveBeenCalled();
```

É útil para garantir, por exemplo, que o repositório não seja acionado quando o serviço recebe uma entrada inválida.

O `not` pode ser utilizado com outros matchers para negar a condição verificada.

### `rejects.toThrow()`

Verifica se uma `Promise` é rejeitada com um erro que corresponda à condição informada.

```js
await expect(userService.createUser()).rejects.toThrow(
  "O nome do usuário é obrigatório",
);
```

Como o método retorna uma `Promise`, utilizamos `rejects` para verificar sua rejeição e `toThrow()` para conferir o erro esperado.

**Atenção:** não esqueça o `await`. Sem ele, o teste pode terminar antes que a verificação assíncrona seja concluída.

## 5. Exemplo combinando os recursos

Considere um serviço que cria usuários e recebe um repositório por injeção de dependência.

Podemos configurar um mock para simular o retorno do repositório:

```js
const userRepository = {
  createUser: jest.fn().mockResolvedValue({
    id: 1,
    name: "Gabriel",
  }),
};

const userService = createUserService(userRepository);
```

Depois, verificamos o resultado e a interação com a dependência:

```js
const result = await userService.createUser("Gabriel");

expect(result).toEqual({
  id: 1,
  name: "Gabriel",
});

expect(userRepository.createUser).toHaveBeenCalledWith("Gabriel");
```

Nesse exemplo, verificamos duas coisas diferentes:

- O serviço retornou o objeto esperado.
- O repositório recebeu o nome informado.

Podemos também verificar o comportamento quando o nome não é informado:

```js
await expect(userService.createUser()).rejects.toThrow(
  "O nome do usuário é obrigatório",
);

expect(userRepository.createUser).not.toHaveBeenCalled();
```

Nesse caso, verificamos que o serviço rejeita a operação com o erro esperado e não chama o repositório.
