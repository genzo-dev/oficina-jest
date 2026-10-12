# Iniciando testes com Jest

#### Objetivo dessa branch

A branch atual da oficina de testes com Jest é te fazer entender como instalar e configurar testes com a tecnologia Jest, incluindo boas práticas utilizadas no desenvolvimento de testes.

Todas as referências desse material foram retiradas da própria [documentação do Jest](https://jestjs.io/)

> [!IMPORTANT]
>
> O Jest executa sobre o Node.js. Portanto, você precisa ter o Node.js e o npm instalados para executar os exemplos. Para isso, basta acessar a [plataforma oficial do Node.js](https://nodejs.org/pt-br) e seguir os comandos para sua instalação de acordo com a sua máquina.
>
> Confirme com:
> `node -v` e `npm -v` no terminal

## Instalando o Jest

Para instalar o Jest rode no terminal:

```bash
npm install --save-dev jest
```

Após a instalação serão adicionados os seguintes arquivos:

- `node_modules/` — diretório que contém os pacotes instalados e suas dependências.
- `package.json` — registra informações do projeto, scripts e dependências declaradas.
- `package-lock.json` — registra a árvore de dependências resolvida, incluindo versões específicas e informações necessárias para favorecer instalações reproduzíveis.

### Adicionando script no `package.json`

Para facilitar a execução dos testes, adicione esse trecho no `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Seu arquivo deve ficar assim no final:

```json
{
  "devDependencies": {
    "jest": "^30.5.2"
  },
  "scripts": {
    "test": "jest"
  }
}
```

## Entendendo a estrutura de testes AAA e executando os primeiros testes

Um dos padrões de design mais utilizados para testes, talvez o mais utilizado, é o padrão AAA (Arrange, Act, Assert). Graças a ele é possível estruturar testes de maneira clara, organizada e padronizada.

### Vamos entender?

É bem simples, a ideia é:

- Arrange (Preparar): Configurar o cenário necessário para o teste rodar
- Act (Agir): Executar a ação que está sendo testada (uma função, um método, etc...)
- Assert (Verificar): Validar se o resultado obtido é o resultado esperado pelo seu teste

#### Exemplificando

Observe a função `sum.js`:

```js
function sum(a, b) {
  return a + b;
}

module.exports = { sum };
```

Agora observe o trecho do arquivo `sum.spec.js`:

```js
const { sum } = require("./sum");

describe("testes da função sum.js", () => {
  // Isso deveria somar dois números e retornar uma resposta correta
  it("should sum two numbers and return a correct answer", () => {
    // 1. Arrange (Preparar): Configurar os dados que o teste precisa
    const a = 5;
    const b = 10;
    const expectedResult = 15;

    // 2. Act (Agir): Executar a função que queremos testar
    const result = sum(a, b);

    // 3. Assert (Verificar): Validar se o resultado obtido é igual ao esperado
    expect(result).toBe(expectedResult);
  });
});
```

**Atenção**: os comentários no teste acima servem apenas como recurso didático, não são uma obrigação para testes de um projeto real

#### Observe também a função `isAdult.js`:

```js
function isAdult(age) {
  return age >= 18;
}

module.exports = { isAdult };
```

Ela é uma função booleana, nesse caso podemos testar dois cenários, assim como mostrado no `isAdult.spec.js`:

```js
const { isAdult } = require("./isAdult");

// Descreve o que é esperado nos testes abaixo
describe("testes da função isAdult.js", () => {
  // Isso deveria retornar verdadeiro
  it("should return true for an adult", () => {
    // 1. Arrange (Preparar): Configurar os dados que o teste precisa
    const myAge = 18;

    // 2. Act (Agir): Executar a função que queremos testar
    const result = isAdult(myAge);

    // 3. Assert (Verificar): Validar se o resultado obtido é igual ao esperado
    expect(result).toBeTruthy();
  });

  // Isso deveria retornar falso
  it("should return false for someone under 18", () => {
    // 1. Arrange (Preparar): Configurar os dados que o teste precisa
    const myAge = 1;

    // 2. Act (Agir): Executar a função que queremos testar
    const result = isAdult(myAge);

    // 3. Assert (Verificar): Validar se o resultado obtido é igual ao esperado
    expect(result).toBeFalsy();
  });
});
```

**Atenção**: os comentários no teste acima servem apenas como recurso didático, não são uma obrigação para testes de um projeto real

## Para finalizar o conteúdo dessa branch, vamos rodar os testes

```bash
npm run test
```

### Vamos analisar a saída

Ao executar `npm run test`, o Jest apresentará um resultado semelhante a este:

```text
> test
> jest

PASS ./isAdult.spec.js
PASS ./sum.spec.js

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.226 s
Ran all test suites.
```

Vamos entender as principais informações:

- **PASS:** indica que os testes do arquivo foram executados com sucesso.
- **Test Suites:** informa quantas suítes de testes passaram ou falharam. Nesse caso, temos duas suítes, correspondentes aos arquivos `isAdult.spec.js` e `sum.spec.js`.
- **Tests:** apresenta a quantidade total de testes executados e quantos passaram. Neste exemplo, temos três testes, todos aprovados.
- **Snapshots:** são registros de referência que o Jest utiliza para comparar a saída atual de um teste com uma saída previamente armazenada. Não veremos nessa oficina.
- **Time:** indica quanto tempo a execução dos testes levou.
- **Ran all test suites:** informa que todas as suítes de testes encontradas foram executadas.

**Atenção:** a saída apresentada é apenas um exemplo. O tempo de execução e a ordem dos arquivos podem variar de acordo com o ambiente.

## Autores

|                                                                                                                         |                                                                                                                                |                                                                                                                                     |
| :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|                <img src="https://github.com/genzo-dev.png" alt="Gabriel Enzo (genzo-dev)" width="160"/>                 |                        <img src="https://github.com/LuisF3L1P3dev.png" alt="Luis Felipe" width="160"/>                         |                                <img src="https://github.com/rangelro.png" alt="Rangel" width="160"/>                                |
|                                              **Gabriel Enzo (genzo-dev)**                                               |                                                        **Luis Felipe**                                                         |                                                             **Rangel**                                                              |
|                                           <sub>Fullstack web developer</sub>                                            |                                               <sub>Fullstack web developer</sub>                                               |                                                 <sub>Fullstack web developer</sub>                                                  |
| <a href="https://www.linkedin.com/in/genzo-dev/">💼 LinkedIn</a> · <a href="https://github.com/genzo-dev">🐙 GitHub</a> | <a href="https://www.linkedin.com/in/luisfelipe15/">💼 LinkedIn</a> · <a href="https://github.com/LuisF3L1P3dev">🐙 GitHub</a> | <a href="https://www.linkedin.com/in/rangel-rocha-779139228/">💼 LinkedIn</a> · <a href="https://github.com/rangelro">🐙 GitHub</a> |
