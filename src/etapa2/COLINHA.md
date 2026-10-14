# 1. Criar e persistir um produto

```javascript
it("should create and persist a product", async () => {
  const productData = {
    name: "Teclado mecânico",
    price: 249.9,
  };

  const createdProduct = await productService.createProduct(productData);

  expect(createdProduct).toEqual({
    id: expect.any(Number),
    name: productData.name,
    price: productData.price,
  });

  const persistedProduct = database
    .prepare("SELECT id, name, price FROM products WHERE id = ?")
    .get(createdProduct.id);

  expect(persistedProduct).toEqual(createdProduct);
});
```

# 2. Buscar um produto existente

```javascript
it("should return an existing product", async () => {
  const result = database
    .prepare("INSERT INTO products (name, price) VALUES (?, ?)")
    .run("Mouse sem fio", 89.9);

  const productId = Number(result.lastInsertRowid);

  const product = await productService.findProductById(productId);

  expect(product).toEqual({
    id: productId,
    name: "Mouse sem fio",
    price: 89.9,
  });
});
```

# 3. Lançar erro ao buscar um produto inexistente

```javascript
it("should throw when the product does not exist", async () => {
  await expect(productService.findProductById(-1)).rejects.toThrow(
    "Produto não encontrado",
  );
});
```

# 4. Rejeitar um produto com preço inválido

```javascript
it("should reject a product with an invalid price", async () => {
  const productData = {
    name: "Produto Inválido",
    price: 0,
  };

  await expect(productService.createProduct(productData)).rejects.toThrow(
    "O preço do produto precisa ser maior do que zero",
  );
});
```
