# Jest Cheatsheet — Testes de Integração

Este material reúne os principais recursos do Jest utilizados nos exemplos
de testes de integração desta etapa.

## 1. Organizando os testes

### `describe()`

Agrupa testes relacionados, permitindo organizar a suíte por funcionalidade
ou comportamento.

```javascript
describe("Integration between service and repository", () => {
  // Tests vem aqui
});
```

### `it()`

Define um cenário de teste.

```javascript
it("should return an existing user", async () => {
  // Arrange, Act and Assert.
});
```

Também é possível utilizar `test()`, o `it()` funciona como um alias dele.

## 2. Preparando e limpando o ambiente

### `beforeEach(() => {...})`

Executa uma função antes de cada teste. É útil para preparar o banco de
dados e instanciar os componentes necessários.

```javascript
beforeEach(() => {
  database = new Database(":memory:");
});
```

### `afterEach(() => {...})`

Executa uma função após cada teste. Pode ser utilizado para fechar conexões
e liberar recursos.

```javascript
afterEach(() => {
  database.close();
});
```

## 3. Verificando resultados

### `expect().toEqual()`

Compara valores e estruturas de objetos.

```javascript
expect(user).toEqual({
  id: expect.any(Number),
  name: "Gabriel",
  email: "gabriel@example.com",
});
```

### ` expect.any()`

Permite verificar se um valor pertence a determinado tipo, como o `Number`, sem exigir um valor específico.

```javascript
expect(user.id).toEqual(expect.any(Number));
```

### ` expect().toThrow()`

Verifica se uma operação síncrona lança um erro.

```javascript
expect(() => {
  throw new Error("Unexpected error");
}).toThrow("Unexpected error");
```

### `expect().rejects.toThrow()`

Verifica se uma Promise é rejeitada com o erro esperado.

```javascript
await expect(service.findUserById(-1)).rejects.toThrow("User not found");
```

O `await` é importante para que o Jest aguarde a verificação da Promise.

## 4. Testes de integração com SQLite

### Criando um banco em memória

```javascript
const Database = require("better-sqlite3");

const database = new Database(":memory:");
```

O SQLite executa operações reais no banco, mas os dados são mantidos em memória.

### Preparando a estrutura:

```javascript
database.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
`);
```

### Inserindo dados

```javascript
const result = database
  .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
  .run("Gabriel", "gabriel@example.com");
```

### Consultando dados

```javascript
const user = database
  .prepare("SELECT id, name, email FROM users WHERE id = ?")
  .get(result.lastInsertRowid);
```

### Fechando a conexão

```javascript
database.close();
```

Feche a conexão ao terminar os testes para liberar os recursos utilizados.
