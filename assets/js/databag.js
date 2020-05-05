const productsBag = (() => {
  const products = []
  const addProduct = product => {
    products.push(product)
  }
  const removeProduct = productPosition => {
    products.splice(productPosition, 1)
  }
  const getProducts = () => {
    return products
  }
  const getProductsCount = () => {
    return products.length
  }
  return {
    add: addProduct,
    remove: removeProduct,
    getProducts: getProducts,
    getProductsCount: getProductsCount
  }
})()
