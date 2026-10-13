# 1. Retorna um produto quanto encontrado

```javascript
it("should return a product when found", async () => {
  // Arrange
  const id = 1;

  // Act
  const result = await productService.getProductById(id);

  // Assert
  expect(result).toEqual({
    id: 1,
    name: "Teclado",
    price: 150,
  });
  expect(productRepository.findById).toHaveBeenCalledWith(id);
});
```

# 2. Lançar um erro quando o ID não for informado

```javascript
it("should throw an error when the ID is not provided", async () => {
  // Arrange
  const id = undefined;

  // Act e Assert
  await expect(productService.getProductById(id)).rejects.toThrow(
    "O ID do produto é obrigatório",
  );
  expect(productRepository.findById).not.toHaveBeenCalled();
});
```

# 3. Lançar um erro quando o produto não for encontrado

```javascript
it("should throw an error when the product is not found", async () => {
  // Arrange
  const id = 999;
  productRepository.findById.mockResolvedValue(null);

  // Act e Assert
  await expect(productService.getProductById(id)).rejects.toThrow(
    "Produto não encontrado",
  );
  expect(productRepository.findById).toHaveBeenCalledWith(id);
});
```
