const HTML = (() => {
  const JSONToHTML = (object) => {
    if (!object.tag) {
      return document.createTextNode(object.data)
    } else {
      const element = document.createElement(object.tag)
      if (object.classList) {
        object.classList.forEach(classItem => {
          element.classList.add(classItem)
        })
      }
      if (object.child) {
        element.appendChild(JSONToHTML(object.child))
      }
      if (object.children) {
        object.children.forEach(child => {
          element.appendChild(JSONToHTML(child))
        })
      }
      if (object.attributes) {
        Object.keys(object.attributes).forEach(attribute => {
          element.setAttribute(attribute, object.attributes[attribute])
        })
      }
      return element
    }
  }
  const addToRoot = (html) => {
    document.querySelector('body').appendChild(html)
  }
  const remove = (html) => {
    html.remove()
  }
  const append = (parent, JSONChild) => {
    parent.appendChild(JSONToHTML(JSONChild))
  }
  const currencyToNumber = (stringCurrency) => {
    return parseFloat(stringCurrency.slice(1).replace(',', '')).toFixed(2)
  }
  const numberToCurrency = (numberCurrency) => {
    let num = parseFloat(numberCurrency).toFixed(2).toString()
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1,')
    num = num.split('').reverse().join('').replace(/^[\.]/, '')
    return `$${num}`
  }
  return {
    JSONToHTML: JSONToHTML,
    addToRoot: addToRoot,
    remove: remove,
    append: append,
    currencyToNumber: currencyToNumber,
    numberToCurrency: numberToCurrency
  }
})()
