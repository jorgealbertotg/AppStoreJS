const store = ((html, productsBag) => {
  const headerObject = {
    tag: 'header',
    children: [
      {
        tag: 'div',
        children: [
          {
            tag: 'h1',
            child: { data: 'Tienda de Tolentino' }
          },
          {
            tag: 'h2',
            child: { data: 'Productos que ofrecemos' }
          }
        ]
      },
      {
        tag: 'nav',
        classList: ['slider-link1'],
        children: [
          {
            tag: 'h2',
            child: { data: 'Seleccione las categorias que buscas' }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'category'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: { data: 'Hombre' },
              attributes: { name: 'hombre' }
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'category'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: { data: 'Mujer' },
              attributes: { name: 'mujer' }
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'category'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: { data: 'Jovenes' },
              attributes: { name: 'joven' }
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'isOffer'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: { data: 'Oferta' },
              attributes: { name: 'isOffer' }
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'isActive'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: { data: 'Agotado' },
              attributes: { name: 'isSoldOut' }
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'isActive'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: { data: 'Disponible' },
              attributes: { name: 'isForSale' }
            }
          }
        ]
      }
    ]
  }
  const mainObject = {
    tag: 'main',
    children: [
      {
        tag: 'nav',
        classList: ['tabs'],
        children: [
          {
            tag: 'a',
            classList: ['slider-link', 'slide-products', 'active'],
            child: { data: 'Productos' }
          },
          {
            tag: 'a',
            classList: ['slider-link', 'slide-stored-products'],
            child: {
              tag: 'span',
              classList: ['mdl-badge'],
              attributes: {
                'data-badge': productsBag.getProductsCount()
              },
              child: { data: 'Productos comprados' }
            }
          },
          {
            tag: 'a',
            classList: ['slider-link', 'slide-statistic'],
            child: { data: 'Detalle de cuenta' }
          }
        ]
      },
      {
        tag: 'section',
        classList: ['slider-container'],
        child: {
          tag: 'div',
          classList: ['slider-theater'],
          children: [
            {
              tag: 'article',
              classList: ['slider-panel'],
              children: [
                {
                  tag: 'header',
                  child: {
                    tag: 'p',
                    children: [
                      { data: 'Productos: ' },
                      { tag: 'span', data: '0' }
                    ]
                  }
                },
                {
                  tag: 'div'
                }
              ]
            },
            {
              tag: 'article',
              classList: ['slider-panel'],
              children: [
                {
                  tag: 'header',
                  child: {
                    tag: 'p',
                    children: [
                      { data: 'Productos: ' },
                      { tag: 'span', data: '0' }
                    ]
                  }
                },
                {
                  tag: 'div'
                }
              ]
            },
            {
              tag: 'article',
              classList: ['slider-panel'],
              children: [
                {
                  tag: 'header',
                  child: {
                    tag: 'p',
                    children: [
                      { data: 'Productos: ' },
                      { tag: 'span', data: '0' }
                    ]
                  }
                },
                {
                  tag: 'div'
                }
              ]
            }
          ]
        }
      }
    ]
  }
  const build = () => {
    const headerHTML = html.JSONToHTML(headerObject)
    const mainHTML = html.JSONToHTML(mainObject)
    html.addToRoot(headerHTML)
    html.addToRoot(mainHTML)
  }
  return {
    build: build
  }
})(HTML, productsBag)

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

const BagData = (() => {
  let data = []
  return {
    setData: d => { data = d },
    getData: () => data
  }
})()

const boot = () => {
  loader.show()
  fetch('http://slowwly.robertomurray.co.uk/delay/3000/url/http://demo6292426.mockable.io/products')
    .then(response => response.json())
    .then(data => {
      loader.hide()
      BagData.setData(data)
      store.build()
      slider.boot()
      chips.boot(mainFilters, drawProducts)
      bootMenu()
      drawProducts()
    })
}
const bootMenu = () => {
  document.querySelector('a.slide-stored-products').addEventListener('click', async e => {
    const response = await resolveStoredProductsTab(e)
    if (response) {
      activeTab(document.querySelector('a.slide-stored-products'), 2, drawBagProducts)
    }
  })
  document.querySelector('a.slide-products').addEventListener('click', async e => {
    const response = await resolveProductsTab(e)
    if (response) {
      activeTab(document.querySelector('a.slide-products'), 1, drawProducts)
    }
  })
  document.querySelector('a.slide-statistic').addEventListener('click', async e => {
    const response = await resolveStatisticsTab(e)
    if (response) {
      activeTab(document.querySelector('a.slide-statistic'), 3, drawStatistics)
    }
  })
}
const activeTab = (target, panel, cb) => {
  setTabAnchorActive(target)
  slider.show(panel)
  cb()
  chips.updateChipStatus()
}
const resolveStoredProductsTab = (e) => {
  return new Promise(resolve => {
    //if (productsBag.getProducts().length) {
      if (!e.target.classList.contains('active')) {
        resolve(true)
      }
    //}
  })
}
const resolveProductsTab = (e) => {
  return new Promise(resolve => {
    if (!e.target.classList.contains('active')) {
      resolve(true)
    }
  })
}
const resolveStatisticsTab = (e) => {
  return new Promise(resolve => {
    if (!e.target.classList.contains('active')) {
      resolve(true)
    }
  })
}
const setTabAnchorActive = (target) => {
  document.querySelector('a.active').classList.remove('active')
  target.classList.add('active')
}
const mainFilters = (() => {
  return filters()
})()

const storeFilters = (() => {
  return filters()
})()

const detailFilters = (() => {
  return filters()
})()

const drawProducts = () => {
  chips.reboot(mainFilters, drawProducts)
  const data = buildProducts.build(BagData.getData(), mainFilters)
  restartPanel(1, data)
  setProductsCount(1, buildProducts.getItemsCount())
}

const drawBagProducts = () => {
  chips.reboot(storeFilters, drawBagProducts)
  const data = buildProducts.build(productsBag.getProducts(), storeFilters)
  if (productsBag.getProductsCount() > 0) {
    restartPanel(2, data)
  } else {
    const content = {
      tag: 'p',
      children: [
        { data: 'No hay productos para mostrar' }
      ]
    }
    restartPanel(2, HTML.JSONToHTML(content))
  }
  setProductsCount(2, buildProducts.getItemsCount())
  if (document.querySelector('article:nth-child(2) .mdl-card .mdl-chip__action')) {
    bootCloseButtons()
  }
}
const bootCloseButtons = () => {
  document.querySelectorAll('article:nth-child(2) .mdl-card .mdl-chip__action').forEach(button => {
    button.addEventListener('click', e => {
      e.cancelBubble = true
      const position = e.target.parentElement.parentElement.getAttribute('name')
      productsBag.remove(position)
      document.querySelector('.mdl-badge').setAttribute('data-badge', productsBag.getProductsCount())
      drawBagProducts()
    })
  })
}

const drawStatistics = () => {
  chips.reboot(detailFilters, drawStatistics)
  const data = buildProducts.filterData(productsBag.getProducts(), detailFilters)
  const dataObj = []
  const total = data.reduce((total, product) => {
    const amount = buildProducts.getLastPrice(product)
    const productDetailObject = {
      tag: 'tr',
      children: [
        {
          tag: 'td',
          child: { data: product.name }
        },
        {
          tag: 'td',
          child: { data: amount }
        }
      ]
    }
    dataObj.push(productDetailObject)
    total += parseFloat(HTML.currencyToNumber(amount))
    return total
  }, 0)
  const totalObject = {
    tag: 'tr',
    children: [
      {
        tag: 'td',
        child: { data: `Total a pagar por ${data.length} ${data.length === 1 ? 'producto' : 'productos'}:` }
      },
      {
        tag: 'td',
        child: { data: `${HTML.numberToCurrency(total)}` }
      }
    ]
  }
  dataObj.push(totalObject)
  const statisticContainerObject = {
    tag: 'table',
    classList: ['mdl-data-table', 'mdl-js-data-table', 'mdl-data-table--selectable', 'mdl-shadow--2dp'],
    children: dataObj
  }
  restartPanel(3, HTML.JSONToHTML(statisticContainerObject))
  setProductsCount(3, productsBag.getProductsCount())
}
const restartPanel = (panelNumber, content) => {
  const parent = document.querySelector(`article.slider-panel:nth-child(${panelNumber})`)
  const container = document.createElement('div')
  parent.removeChild(parent.children.item(1))
  container.appendChild(content)
  parent.appendChild(container)
}
const setProductsCount = (panelNumber, productsCount) => {
  document.querySelector(`article.slider-panel:nth-child(${panelNumber}) header p span`).textContent = productsCount
}
