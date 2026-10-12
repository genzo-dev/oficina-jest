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
