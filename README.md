# CI/CD com Jest

#### Objetivo dessa branch

A branch `04-ci-with-jest` da oficina de testes com Jest tem como objetivo apresentar o funcionamento de uma pipeline de Integração Contínua (CI) utilizando o GitHub Actions.

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

> [!NOTE]
>
> Nesta oficina, não abordaremos a implementação da Entrega Contínua (CD), pois o foco desta etapa está na Integração Contínua (CI), e não na entrega ou implantação da aplicação.
>
> Para entender como o CD funciona e como ele se relaciona com a CI, consulte o capítulo [5.5 — Tá, mas e o CD?](https://app.notion.com/p/5-Automa-o-com-CI-CD-3f7bc7f8170180f6a375dd4c9f2aea0a?source=copy_link#3f9bc7f8170180389ab3f9839f82dcd1), do módulo **5. Automação com CI/CD** da nossa oficina.

## Analisando o `ci.yml`

#### Onde posso encontrar esse arquivo?

Ele está localizado em:

```text
.github/
└── workflows/
    └── ci.yml
```

### Observe as nomenclaturas em questão

```yml
# Nome da pipeline que será exibido na aba Actions do GitHub.
name: CI - 04-ci-with-jest

# Define os eventos que disparam a execução da pipeline.
on:
  # Executa a pipeline sempre que houver um push na branch especificada.
  push:
    branches: [04-ci-with-jest]

jobs:
  # Identificador do job responsável por executar os testes.
  tests-check:
    # Define o sistema operacional da máquina virtual que executará o job.
    runs-on: ubuntu-latest

    # Lista as etapas executadas sequencialmente dentro do job.
    steps:
      # Obtém o código-fonte do repositório para disponibilizá-lo no ambiente.
      - name: Checkout repository
        uses: actions/checkout@v4

      # Configura a versão do Node.js necessária para executar o projeto.
      # O cache do npm ajuda a acelerar a configuração das dependências
      # em execuções futuras da pipeline.
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      # Instala as dependências do projeto com base no package-lock.json.
      # O npm ci é adequado para ambientes de CI, pois realiza uma instalação
      # reproduzível a partir do arquivo de dependências bloqueadas.
      - name: Install dependencies
        run: npm ci

      # Executa os testes definidos no script "test" do package.json.
      # Se algum teste falhar, o comando retornará um código de erro
      # e o job será marcado como falho.
      - name: Run tests
        run: npm run test
```

O **GitHub Actions** executará essas etapas automaticamente a cada `push` na branch configurada.

## Vamos subir uma alteração no código

Para enviar alterações ao repositório, normalmente utilizamos os comandos `git commit` e `git push`.

Após enviar uma alteração, a pipeline será executada automaticamente caso o evento correspondente esteja configurado no arquivo `ci.yml`. A partir daí, podemos acompanhar a execução e verificar se os testes automatizados foram concluídos com sucesso.

### Cenário com erro identificado

Na aba [Actions](https://github.com/genzo-dev/oficina-jest/actions) do nosso repositório, uma execução que apresenta falha será sinalizada visualmente com ❌.

**Exemplo de uma execução com falha:**

![IMAGEM MOSTRANDO O ERRO](/images/ci-error-screen.png)
_Figura 1 — Execução da pipeline com falha no GitHub Actions._

Mas como descobrir o que aconteceu?

Abra a execução e consulte os logs da etapa que apresentou o problema. Eles exibem informações sobre os comandos executados e, quando ocorre uma falha em um teste, apresentam mensagens que ajudam a identificar o cenário que não passou.

**Exemplo de logs com uma falha em um teste:**

![IMAGEM DOS LOGS MOSTRANDO O ERRO](/images/ci-error-screen-logs.png)
_Figura 2 — Exemplo de uma falha identificada nos logs da pipeline._

### Cenário sem erro identificado

Quando os testes e as demais etapas obrigatórias da execução são concluídos com sucesso, o GitHub Actions apresenta um resultado positivo.

**Exemplo de uma execução bem-sucedida:**

![IMAGEM MOSTRANDO QUE TÁ TUDO CERTO](/images/ci-no-error-screen.png)
_Figura 3 — Execução da pipeline concluída com sucesso._

Observe o indicador de sucesso, representado por um ✔️.

Também podemos consultar os logs para verificar quais etapas foram executadas e confirmar que os testes automatizados passaram.

**Exemplo de logs de uma execução bem-sucedida:**

![IMAGEM MOSTRANDO LOGS QUE TÁ TUDO CERTO](/images/ci-no-error-screen-logs.png)
_Figura 4 — Exemplo de logs de uma execução bem-sucedida._

Uma execução bem-sucedida indica que as verificações configuradas foram concluídas sem falhas. Isso não significa que a aplicação esteja livre de todos os defeitos possíveis, mas que passou pelas verificações definidas na pipeline.

## Vamos ver isso melhor?

Agora vamos acompanhar uma demonstração prática!

Será introduzido intencionalmente um erro no código, fazendo com que um dos testes de integração falhe. Seu trabalho será acessar a aba [Actions](https://github.com/genzo-dev/oficina-jest/actions) do repositório, consultar os logs e identificar o problema.

Durante a investigação, procure responder:

1. Qual teste apresentou falha?
2. Qual era o resultado esperado?
3. Qual resultado foi obtido?
4. O que pode ter provocado essa diferença?
5. Em qual parte do código você investigaria o problema?

Depois da investigação, mostraremos onde está localizado o erro e como corrigi-lo.

Por fim, enviaremos uma nova alteração ao repositório para executar a pipeline novamente e verificar se os testes passam após a correção.

**O objetivo é aprender a utilizar os logs do GitHub Actions para investigar falhas e compreender como a CI ajuda a verificar as alterações realizadas no código.**
