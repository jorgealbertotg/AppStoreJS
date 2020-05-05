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
  /*
  fetch('http://slowwly.robertomurray.co.uk/delay/3000/url/http://demo6292426.mockable.io/products')
  */
  fetch('http://demo6292426.mockable.io/products').then(response => response.json())
    .then(data => {
      BagData.setData(data)
      loader.hide()
      store.build()
      drawProducts()
      chips.boot(mainFilters, drawProducts)
      document.querySelector('a.slide-stored-products').addEventListener('click', async e => {
        const response = await resolveStoredProductsTab(e)
        if (response) {
          activeTab(document.querySelector('a.slide-stored-products'), 2, drawBagProducts)
          chips.updateChipStatus()
        }
      })
      document.querySelector('a.slide-products').addEventListener('click', async e => {
        const response = await resolveProductsTab(e)
        if (response) {
          activeTab(document.querySelector('a.slide-products'), 1, drawProducts)
          chips.updateChipStatus()
        }
      })
      document.querySelector('a.slide-statistic').addEventListener('click', async e => {
        const response = await resolveStatisticsTab(e)
        if (response) {
          activeTab(document.querySelector('a.slide-statistic'), 3, drawStatistics)
        }
      })
    })
}
const activeTab = (target, panel, cb) => {
  setTabAnchorActive(target)
  cb()
  slider.show(panel)
}
const resolveStoredProductsTab = (e) => {
  return new Promise(resolve => {
    if (productsBag.getProducts().length) {
      if (!e.target.classList.contains('active')) {
        resolve(true)
      }
    }
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

const drawProducts = () => {
  document.querySelector('article.slider-panel:nth-child(1) div').innerHTML = ''
  chips.reboot(mainFilters, drawProducts)
  buildProducts.build(BagData.getData(),
    mainFilters,
    document.querySelector('article.slider-panel:nth-child(1) div'))
  document.querySelector('article.slider-panel:nth-child(1) header p span').innerText = buildProducts.getItemsCount()
}

const drawBagProducts = () => {
  document.querySelector('article.slider-panel:nth-child(2) div').innerHTML = ''
  chips.reboot(storeFilters, drawBagProducts)
  buildProducts.build(productsBag.getProducts(),
    storeFilters,
    document.querySelector('article.slider-panel:nth-child(2) div'))
  document.querySelector('article.slider-panel:nth-child(2) header p span').innerText = buildProducts.getItemsCount()
}

const showProducts = (panelNumber, products, filters, cb) => {
  const panel = `article.slider-panel:nth-child(${panelNumber})`
  document.querySelector(`${panel} div`).innerHTML = ''
  chips.reboot(filters, cb)
  buildProducts.build(products, filters, document.querySelector(`${panel} div`))
  document.querySelector(`${panel} header p span`).innerText = buildProducts.getItemsCount()
}

const drawStatistics = () => {
  document.querySelector('article.slider-panel:nth-child(3) div').innerHTML = ''
  const total = productsBag.getProducts().reduce((total, product) => {
    total += HTML.currencyToNumber(buildProducts.getLastPrice(product))
    return total
  }, 0)
  const statisticContainerObject = {
    tag: 'p',
    child: { data: `Total a pagar: ${HTML.numberToCurrency(total)}` }
  }
  const statisticContainerObjectHTML = HTML.JSONToHTML(statisticContainerObject)
  document.querySelector('article.slider-panel:nth-child(3) div').appendChild(statisticContainerObjectHTML)
  document.querySelector('article.slider-panel:nth-child(3) header p span').innerText = productsBag.getProductsCount()
}
