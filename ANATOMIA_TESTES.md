# Anatomia de um teste com Jest

Agora que o Jest está instalado e configurado, vamos entender como funciona um teste automatizado e qual é a responsabilidade de cada parte do código.

A ideia não é decorar a sintaxe. O mais importante é compreender **o que estamos verificando, qual resultado esperamos e como o Jest nos ajuda a confirmar essa expectativa**.

Para isso, vamos utilizar o primeiro teste do nosso repositório: um teste para a função `sum()`, responsável por somar dois números.

## 1. Conhecendo o teste

Este é o teste que vamos analisar:

```js
const { sum } = require("./sum");

// ATENÇÃO: Os comentários nos testes abaixo servem apenas como
// recurso didático, não costumam ser utilizados em projetos reais.

// Descreve o que é esperado nos testes abaixo
describe("testes da função sum.js", () => {
  // Isso deveria somar dois números e retornar uma resposta correta
  it("should sum two numbers and return the correct result", () => {
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

E esta é a função que está sendo testada:

```js
function sum(a, b) {
  return a + b;
}

module.exports = { sum };
```

A função `sum()` recebe dois valores, `a` e `b`, e retorna a soma deles.

No teste, passamos `5` e `10`. Como sabemos que a soma desses valores é `15`, esperamos que a função retorne exatamente esse resultado.

Agora, vamos entender como cada parte funciona.

## 2. Importando a função que será testada

```js
const { sum } = require("./sum");
```

Antes de executar o teste, precisamos ter acesso à função que queremos verificar.

No arquivo `sum.js`, a função é exportada desta forma:

```js
module.exports = { sum };
```

Isso disponibiliza um objeto que contém a propriedade `sum`.

No arquivo de teste, utilizamos `require("./sum")` para importar esse objeto. Em seguida, usamos a desestruturação `{ sum }` para obter a função diretamente.

Assim, podemos chamar `sum()` no teste sem precisar reescrever sua implementação.

> O caminho `./sum` indica que o módulo está no mesmo diretório do arquivo de teste. Nesse caso, podemos omitir a extensão `.js`.

## 3. `describe()`: agrupando testes relacionados

Observe esta parte do código:

```js
describe("testes da função sum.js", () => {
  // testes ficam aqui
});
```

A função `describe()` cria um agrupamento lógico para testes relacionados.

Ela recebe dois argumentos principais:

- **Descrição:** um texto que identifica o grupo de testes.
- **Função de callback:** contém os testes que pertencem àquele grupo.

No nosso exemplo, estamos agrupando os testes relacionados à função `sum()`.

Esse agrupamento ajuda a organizar os resultados apresentados pelo Jest e facilita a leitura quando o projeto possui muitos testes.

Imagine uma aplicação com funções para cadastrar usuários, calcular pagamentos e gerar relatórios. Poderíamos utilizar diferentes agrupamentos para organizar os testes de cada funcionalidade.

O uso de `describe()` é opcional, mas se torna bastante útil conforme a suíte de testes cresce.

## 4. `it()`: descrevendo um comportamento esperado

Dentro do agrupamento, encontramos:

```js
it("should sum two numbers and return the correct result", () => {
  // código do teste
});
```

A função `it()` define um teste individual.

Ela recebe dois argumentos principais:

- **Descrição do teste:** explica qual comportamento queremos verificar.
- **Função de callback:** contém o código que será executado durante o teste.

A descrição utilizada no nosso exemplo significa:

> Deve somar dois números e retornar o resultado correto.

Um bom nome de teste ajuda a entender o que está sendo verificado sem precisar analisar todos os detalhes da implementação.

Compare estas duas descrições:

```js
it("teste 1", () => {
  // ...
});
```

```js
it("should sum two numbers and return the correct result", () => {
  // ...
});
```

A segunda descrição é muito mais informativa. Se o teste falhar, será mais fácil identificar qual comportamento apresentou um problema.

### E qual é a diferença entre `it()` e `test()`?

O Jest também disponibiliza a função `test()`, que funciona como um alias de `it()`.

Na prática, ambas podem ser utilizadas para definir testes. A escolha depende da convenção adotada pelo projeto.

Por enquanto, continuaremos utilizando `it()`, seguindo o exemplo do nosso repositório.

## 5. O padrão AAA: Arrange, Act, Assert

Agora chegamos a uma das partes mais importantes do nosso teste.

Observe que o código dentro de `it()` está dividido em três etapas:

1. **Arrange (Preparar)**
2. **Act (Agir)**
3. **Assert (Verificar)**

Essa organização é conhecida como padrão AAA (_Arrange, Act, Assert_).

Ela não é uma exigência do Jest, mas uma convenção que ajuda a escrever testes mais claros e organizados.

Vamos entender cada etapa.

### 5.1. Arrange — Preparar

```js
const a = 5;
const b = 10;
const expectedResult = 15;
```

Nesta etapa, preparamos os dados necessários para executar o teste.

No nosso exemplo, definimos três variáveis:

- `a`: primeiro número que será somado, com valor `5`.
- `b`: segundo número que será somado, com valor `10`.
- `expectedResult`: resultado que esperamos receber, com valor `15`.

A variável `expectedResult` merece atenção especial.

Ela representa a nossa expectativa sobre o comportamento da função. Não estamos calculando o resultado esperado chamando a própria função que queremos testar, pois isso poderia reproduzir o mesmo erro da implementação.

Em vez disso, definimos previamente qual deve ser o resultado correto.

**O objetivo do Arrange é deixar tudo preparado para que o comportamento que queremos verificar possa ser executado.**

Em testes mais complexos, essa etapa pode envolver a criação de objetos, a preparação de dados e outras configurações necessárias.

### 5.2. Act — Agir

```js
const result = sum(a, b);
```

Agora executamos a ação que queremos testar.

Chamamos a função `sum()` passando os valores preparados anteriormente.

Como `a` vale `5` e `b` vale `10`, a função executa a operação:

```js
5 + 10;
```

O resultado retornado é `15`, que armazenamos na variável `result`.

É importante perceber a diferença entre `result` e `expectedResult`:

- `expectedResult` representa aquilo que esperamos obter.
- `result` representa aquilo que realmente obtivemos ao executar a função.

Essa distinção é fundamental para entender como os testes automatizados funcionam.

**O objetivo do Act é executar o comportamento que queremos verificar.**

### 5.3. Assert — Verificar

```js
expect(result).toBe(expectedResult);
```

Por fim, precisamos verificar se o resultado obtido corresponde ao resultado esperado.

É nesta etapa que entra a asserção: uma verificação que determina se uma condição foi satisfeita.

Vamos entender os dois elementos dessa linha.

#### `expect()`: indicando o valor observado

```js
expect(result);
```

A função `expect()` recebe o valor que queremos verificar.

No nosso exemplo, esse valor é o conteúdo da variável `result`, que armazena o retorno de `sum(a, b)`.

Entretanto, `expect()` sozinho não define qual condição precisa ser satisfeita. Para isso, utilizamos um matcher.

#### `.toBe()`: verificando o resultado

```js
.toBe(expectedResult)
```

O método `.toBe()` é um _matcher_ do Jest.

Um matcher define a condição que o valor observado precisa satisfazer para que a asserção passe.

Nesse caso, verificamos se o valor de `result` corresponde ao valor de `expectedResult`.

Como ambos valem `15`, a verificação passa.

Tecnicamente, `toBe()` utiliza a comparação `Object.is()`. Para valores primitivos, como números, strings e booleanos, é uma escolha comum.

Se a função retornar um valor diferente de `15`, a asserção falhará e o Jest apresentará informações que ajudam a identificar a diferença entre o resultado esperado e o resultado recebido.

**O objetivo do Assert é verificar se o comportamento observado corresponde à expectativa definida no teste.**

## 6. O que acontece quando executamos o teste?

Agora que conhecemos cada parte, vamos observar o fluxo completo.

Quando executamos o comando de testes configurado no `package.json`, o Jest procura arquivos de teste de acordo com suas regras de descoberta e executa os testes encontrados.

No nosso exemplo, o fluxo é:

1. O Jest encontra o arquivo de teste.
2. O arquivo importa a função `sum()`.
3. O Jest executa o teste definido por `it()`.
4. O Arrange prepara os valores `5`, `10` e `15`.
5. O Act executa `sum(5, 10)`, que retorna `15`.
6. O Assert verifica se o resultado obtido corresponde ao esperado.
7. Como ambos os valores são iguais, o teste passa.

Se a asserção falhar, o Jest informa a falha e apresenta detalhes que ajudam a investigar o que aconteceu.

Vale lembrar que **um teste aprovado confirma apenas que as verificações executadas passaram**. Isso não prova que a função está livre de todos os bugs possíveis.

Nosso teste verifica um cenário específico: a soma de `5` e `10`. Outros valores e comportamentos exigiriam verificações adicionais.

## 7. Vamos provocar uma falha?

Uma boa maneira de entender os testes automatizados é observar o que acontece quando uma expectativa não é atendida.

Vamos fazer um pequeno experimento.

No teste original, temos:

```js
const expectedResult = 15;
```

Altere temporariamente o valor para:

```js
const expectedResult = 20;
```

Agora, execute os testes novamente.

A função continuará retornando `15`, mas o teste estará esperando `20`.

Consequentemente, a asserção falhará.

Isso acontece porque:

```js
result === 15;
expectedResult === 20;
```

Os valores não correspondem à expectativa definida, portanto o Jest indica que o teste falhou.

Depois do experimento, restaure o valor original:

```js
const expectedResult = 15;
```

Esse exercício demonstra um ponto fundamental dos testes automatizados: **não basta executar uma função; precisamos definir uma condição que permita avaliar o comportamento observado**.

Também é importante lembrar que um teste que falha não significa necessariamente que a implementação está errada. A expectativa definida no teste também pode estar incorreta.

Cabe a nós investigar o motivo da falha.

## 8. Um teste verifica um cenário

Até agora, verificamos apenas a soma de `5` e `10`.

Mas será que a função também funciona com outros valores?

Podemos escrever testes adicionais para investigar:

```js
const { sum } = require("./sum");

describe("testes da função sum.js", () => {
  it("should sum two numbers and return the correct result", () => {
    const a = 5;
    const b = 10;
    const expectedResult = 15;

    const result = sum(a, b);

    expect(result).toBe(expectedResult);
  });

  it("should return zero when summing zero and zero", () => {
    const result = sum(0, 0);

    expect(result).toBe(0);
  });

  it("should correctly sum negative numbers", () => {
    const result = sum(-5, -10);

    expect(result).toBe(-15);
  });
});
```

Agora temos três testes, cada um verificando um cenário diferente.

O primeiro verifica a soma de dois números positivos.

O segundo verifica a soma de dois zeros.

O terceiro verifica a soma de dois números negativos.

Se um desses testes falhar, poderemos identificar qual cenário precisa ser investigado.

Observe também que os testes adicionais utilizam o mesmo padrão AAA, mesmo sem comentários explícitos para cada etapa.

Isso demonstra que os comentários são recursos didáticos. Em projetos reais, normalmente buscamos escrever testes cuja estrutura e cujos nomes sejam suficientemente claros sem precisar explicar cada linha com comentários.

**Quanto mais relevantes forem os cenários cobertos pelos testes, mais comportamentos conseguiremos verificar automaticamente.**

Isso não significa que precisamos testar todas as combinações possíveis de valores. Precisamos identificar os comportamentos relevantes para a funcionalidade e definir testes que ajudem a verificar se eles estão corretos.

## 9. Resumo dos principais elementos

| Elemento     | Responsabilidade                                                       |
| ------------ | ---------------------------------------------------------------------- |
| `require()`  | Importa um módulo para que possamos utilizar suas funcionalidades.     |
| `describe()` | Agrupa testes relacionados.                                            |
| `it()`       | Define um teste individual com uma descrição e uma função de execução. |
| Arrange      | Prepara os dados necessários e o resultado esperado.                   |
| Act          | Executa a ação que queremos verificar.                                 |
| Assert       | Verifica se o resultado corresponde à expectativa.                     |
| `expect()`   | Recebe o valor que será verificado.                                    |
| `toBe()`     | Compara o valor observado com o esperado usando `Object.is()`.         |

## Próximo passo

Agora que você conhece a estrutura básica de um teste com Jest, execute o teste no projeto da oficina e observe o resultado.

Em seguida, experimente alterar temporariamente o resultado esperado para provocar uma falha e veja como o Jest apresenta as informações.

O objetivo é se familiarizar com a estrutura dos testes antes de avançar para outros cenários e técnicas de teste.
