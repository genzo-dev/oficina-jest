const { isAdult } = require("./isAdult");

// ATENÇÃO: Os comentários nos testes abaixo servem apenas como
// recurso didático, não costumam ser utilizados em projetos reais.

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
