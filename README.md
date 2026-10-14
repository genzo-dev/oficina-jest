# Testes de Integração com Jest

#### Objetivo dessa branch

A branch `03-integration-test` da oficina de testes com Jest é dividida em duas etapas:

1. A primeira etapa apresentará exemplos práticos de testes de integração (`user-service.integration.spec.js`).
2. Na segunda etapa, você colocará em prática os conceitos apresentados anteriormente, completando os testes de integração do serviço `productService.js`.

> [!IMPORTANT]
>
> O Jest executa sobre o Node.js. Portanto, você precisa ter o Node.js e o npm instalados para executar os exemplos. Para isso, basta acessar a [plataforma oficial do Node.js](https://nodejs.org/pt-br) e seguir os comandos para sua instalação de acordo com a sua máquina.
>
> Confirme com:
> `node -v` e `npm -v` no terminal

#### Comece instalando as dependências

```bash
npm install
```

Isso instalará tanto o Jest quanto o `better-sqlite3` para termos um banco de dados real em memória.

## 1ª Etapa — Exemplificando Testes de Integração com Jest

Aqui o Jest já está implementado e configurado. Também utilizaremos o SQLite para verificar a integração entre o serviço, o repositório e o banco de dados.

Para executar os exemplos, utilize:

```bash
npm run test -- etapa1/user-service.integration.spec.js
```

Os exemplos de testes de integração estão localizados em `src/etapa1/`.

O arquivo `userRepository.js` implementa as operações de acesso ao banco de dados, enquanto `userService.js` contém as regras de negócio relacionadas aos usuários. Já o arquivo `user-service.integration.spec.js` apresenta os testes que verificam o cadastro, a consulta e o tratamento de erros utilizando os componentes reais.

Para facilitar o entendimento dos exemplos, consulte também o arquivo `JEST_CHEATSHEET.md`, que reúne explicações e exemplos dos principais recursos do Jest utilizados nesta etapa, além de comandos e operações básicas do SQLite.

Observe como os testes utilizam `beforeEach(() => {...})` para preparar um banco de dados em memória antes de cada cenário e `afterEach(() => {...})` para fechar a conexão após sua execução.

### Vamos analisar a saída

Após executar os testes, você verá uma saída semelhante a esta:

```bash
$ npm test -- etapa1/user-service.integration.spec.js

> test
> jest etapa1/user-service.integration.spec.js

 PASS  src/etapa1/user-service.integration.spec.js
  Integration between service, repository and SQLite
    ✓ should create and persist a user (21 ms)
    ✓ should return an existing user (2 ms)
    ✓ should throw when the user does not exist (4 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.408 s
Ran all test suites matching etapa1/user-service.integration.spec.js.
```

Os resultados indicam que os três cenários foram executados sem falhas.

O objetivo não é apenas verificar se o serviço retorna os dados esperados, mas também validar a interação entre o serviço, o repositório e o banco de dados. Por isso, nos testes de cadastro, consultamos diretamente o banco de dados para confirmar que os registros foram persistidos corretamente.

> [!NOTE]
>
> Recomendamos a leitura dos comentários presentes em `user-service.integration.spec.js` e dos arquivos `userService.js` e `userRepository.js` para compreender como os componentes trabalham em conjunto. Caso tenha dúvidas sobre os recursos do Jest utilizados nos testes, consulte também o arquivo `src/etapa1/JEST_CHEATSHEET.md`.

## 2ª Etapa — Criando meus primeiros Testes de Integração com Jest

Os conteúdos da **2ª Etapa** estão localizados em `src/etapa2/`.

Nesta etapa, você encontrará o serviço `productService.js`, o repositório `productRepository.js` e uma estrutura inicial de testes no arquivo `product-service.integration.spec.js`.

### Seu desafio

Complete os testes indicados pelos comentários `TODO` em `product-service.integration.spec.js`.

Você deverá implementar testes para os seguintes cenários:

1. Criar um produto e verificar sua persistência no banco de dados.
2. Consultar um produto existente.
3. Verificar o erro retornado ao consultar um produto inexistente.
4. Verificar a rejeição de um produto com preço inválido.

### ⚠️ ATENÇÃO

Os testes de integração devem verificar o funcionamento conjunto dos componentes envolvidos. Portanto, não utilize mocks para simular justamente a integração que cada cenário pretende testar.

Por exemplo, ao testar o cadastro de um produto, não basta verificar se o serviço retorna um objeto com os dados esperados. Você também deve verificar se o registro foi persistido corretamente no banco de dados.

### Como saber se o desafio foi concluído?

Execute os testes para verificar se os cenários estão passando:

```bash
npm run test
```

A saída deve ser similar a essa:

```bash
$ npm run test

> test
> jest

 PASS  src/etapa2/product-service.integration.spec.js
 PASS  src/etapa1/user-service.integration.spec.js

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.857 s, estimated 1 s
Ran all test suites.
```

Em seguida, execute a análise de cobertura para verificar quais partes do código foram exercitadas pelos testes:

```bash
npm run test:coverage
```

A saída deve ser similar a essa:

```bash
$ npm run test:coverage

> test:coverage
> jest --coverage

 PASS  src/etapa1/user-service.integration.spec.js
 PASS  src/etapa2/product-service.integration.spec.js
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |   94.11 |       90 |     100 |   94.11 |
 etapa1                |   93.75 |     87.5 |     100 |   93.75 |
  userRepository.js    |     100 |      100 |     100 |     100 |
  userService.js       |   88.88 |    83.33 |     100 |   88.88 | 8
 etapa2                |   94.44 |    91.66 |     100 |   94.44 |
  productRepository.js |     100 |      100 |     100 |     100 |
  productService.js    |    90.9 |       90 |     100 |    90.9 | 8
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        1.581 s, estimated 2 s
Ran all test suites.
```

> O desafio estará concluído quando todos os testes passarem e a execução da cobertura apresentar resultados compatíveis com a implementação.
>
> Analise os resultados e verifique se todos os cenários foram contemplados, incluindo os casos de sucesso e de erro.

#### Se precisar de ajuda

Caso tenha dificuldades para completar os testes, consulte a colinha em `src/etapa2/COLINHA.md`, que contém exemplos de implementação dos quatro cenários propostos.

## Autores

|                                                                                                                         |                                                                                                                                |                                                                                                                                     |
| :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|                <img src="https://github.com/genzo-dev.png" alt="Gabriel Enzo (genzo-dev)" width="160"/>                 |                        <img src="https://github.com/LuisF3L1P3dev.png" alt="Luis Felipe" width="160"/>                         |                                <img src="https://github.com/rangelro.png" alt="Rangel" width="160"/>                                |
|                                              **Gabriel Enzo (genzo-dev)**                                               |                                                        **Luis Felipe**                                                         |                                                             **Rangel**                                                              |
|                                           <sub>Fullstack web developer</sub>                                            |                                               <sub>Fullstack web developer</sub>                                               |                                                 <sub>Fullstack web developer</sub>                                                  |
| <a href="https://www.linkedin.com/in/genzo-dev/">💼 LinkedIn</a> · <a href="https://github.com/genzo-dev">🐙 GitHub</a> | <a href="https://www.linkedin.com/in/luisfelipe15/">💼 LinkedIn</a> · <a href="https://github.com/LuisF3L1P3dev">🐙 GitHub</a> | <a href="https://www.linkedin.com/in/rangel-rocha-779139228/">💼 LinkedIn</a> · <a href="https://github.com/rangelro">🐙 GitHub</a> |
