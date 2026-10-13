function createProductService(productRepository) {
  async function getProductById(id) {
    if (!id) {
      throw new Error("O ID do produto é obrigatório");
    }

    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }

  return { getProductById };
}

module.exports = { createProductService };
