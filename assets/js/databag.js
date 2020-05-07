const dataBag = () => {
  let products = []

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

  const setProducts = p => {
    products = p
  }

  return {
    add: addProduct,
    remove: removeProduct,
    getProducts: getProducts,
    getProductsCount: getProductsCount,
    setProducts: setProducts
  }
}
const productsBag = dataBag()
const storedProductsBag = dataBag()
