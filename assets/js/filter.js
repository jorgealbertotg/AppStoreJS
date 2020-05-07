const filters = () => {
  const filters = []

  const addElement = elementName => {
    filters.push(elementName)
  }

  const removeElement = elementName => {
    filters.splice(filters.indexOf(elementName), 1)
  }

  const addElementByName = (elementName) => {
    if (!filters.includes(elementName)) {
      addElement(elementName)
    }
  }

  return {
    addElementByName: addElementByName,
    removeElement: removeElement,
    getFilters: () => filters
  }
}

export const MainFilters = (() => {
  return filters()
})()

export const StoreFilters = (() => {
  return filters()
})()

export const DetailFilters = (() => {
  return filters()
})()
