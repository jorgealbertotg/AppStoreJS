const slider = (currentPanel = 1) => {

  const getPanelOffsetTop = () => {
    return document.querySelector(`.slider-panel:nth-child(${currentPanel})`).offsetTop
  }

  const setContainerOffsetTop = offsetTop => {
    document.querySelector('.slider-theater').style.top = `-${offsetTop}px`
  }

  const showPanel = () => {
    setContainerOffsetTop(getPanelOffsetTop())
  }
  const setBoxSizeView = () => {
    
  }
  const boot = () => {
    Array.from(document.querySelectorAll('.slider-link')).forEach((button, index) => {
      button.addEventListener('click', () => {
        currentPanel = index + 1
        showPanel()
      })
    })
    window.addEventListener('resize', showPanel)
  }

  boot()
}

const HTML = (() => {
  const JSONToHTML = (object) => {
    if (!object.tag) {
      return document.createTextNode(object.data)
    } else {
      const element = document.createElement(object.tag)
      if (object.classList) {
        object.classList.forEach( classItem => {
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
  return {
    JSONToHTML: JSONToHTML,
    addToRoot: addToRoot,
    remove: remove,
    append: append
  }
})()

const loader = ((HTML) => {
  const loaderObject = {
    tag: 'main', 
    classList: ['loaderContainer'],
    child: {data: 'Cargando...'}
  }
  const loaderHTML = HTML.JSONToHTML(loaderObject)

  const show = () => {
    HTML.addToRoot(loaderHTML)
  }

  const hide = () => {
    HTML.remove(loaderHTML)
  }

  return {
    show: show,
    hide: hide
  }
})(HTML)

const store = ((html) => {
  const headerObject = {
    tag: 'header',
    children: [
      {
        tag: 'div',
        children: [
          {
            tag: 'h1',
            child: {data: 'Tienda de Tolentino'}
          },
          {
            tag: 'h2',
            child: {data: 'Productos que ofrecemos'}
          }
        ]
      },
      {
        tag: 'div',
        child: {
          tag: 'a',
          child: {data: 'Productos seleccionados'}
        }
      },
      {
        tag: 'nav',
        children: [
          {
            tag: 'h2',
            child: {data: 'Seleccione las categorias que buscas'}
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'category'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: {data: 'Hombre'},
              attributes: {name: 'hombre'}
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'category'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: {data: 'Mujer'},
              attributes: {name: 'mujer'}
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'category'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: {data: 'Jovenes'},
              attributes: {name: 'joven'}
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'isOffer'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: {data: 'Oferta'},
              attributes: {name: 'isOffer'}
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'isActive'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: {data: 'Agotado'},
              attributes: {name: 'isSoldOut'}
            }
          },
          {
            tag: 'span',
            classList: ['mdl-chip', 'isActive'],
            child: {
              tag: 'span',
              classList: ['mdl-chip__text'],
              child: {data: 'Disponible'},
              attributes: {name: 'isForSale'}
            }
          }
        ]
      }
    ]
  }
  const mainObject = {
    tag: 'main',
    child: {
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
                    {data: 'Productos: '},
                    {tag: 'span', data: '0'}
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
            classList: ['slider-panel']
          },
          {
            tag: 'article',
            classList: ['slider-panel']
          }
        ]
      }
    }
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
})(HTML)

const chips = () => {
  document.querySelectorAll('.mdl-chip__text').forEach(chip => {
    chip.addEventListener('click', () => {
      const buttonJSON = {
        tag: 'button',
        classList: ['mdl-chip__action'],
        attributes: {
          type: 'button'
        },
        child: {
          tag: 'i',
          classList: ['material-icons'],
          child: {data: 'cancel'}
        }
      }
      if (!chip.nextElementSibling) {
        chip.parentElement.classList.toggle('active')
        filters.addElementByName(chip.getAttribute('name'))
        drawProducts()
        const buttonHTML = HTML.JSONToHTML(buttonJSON)
        buttonHTML.addEventListener('click', () => {
          buttonHTML.remove()
          chip.parentElement.classList.toggle('active')
          filters.removeElement(chip.getAttribute('name'))
          drawProducts()
        })
        chip.parentElement.appendChild(buttonHTML)
      }
    })
  })
}

const lightBox = ((html) => {
  let lightBoxHTML
  const lightBoxObject = (headerContent, content, footerContent) => {
    return {
      tag: 'div',
      classList: ['lightbox-theater'],
      child: {
        tag: 'section',
        classList: ['lightbox-container'],
        children: [
          {
            tag: 'header',
            classList: ['lightbox-header'],
            child: headerContent
          },
          {
            tag: 'div',
            classList: ['lightbox-content'],
            child: content
          },
          {
            tag: 'footer',
            classList: ['lightbox-footer'],
            child: footerContent
          }
        ]
      }
    }
  }
  const show = (header, content, footer) => {
    lightBoxHTML = html.JSONToHTML(lightBoxObject(header,content,footer))
    html.addToRoot(lightBoxHTML)
    document.querySelector('body').style.overflow = 'hidden'
  }
  const close = () => {
    lightBoxHTML.remove()
    document.querySelector('body').style.overflow = 'auto'
  }
  return {
    show: show,
    close: close
  }
})(HTML)

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
  return {
    add: addProduct,
    remove: removeProduct,
    getProducts: getProducts
  }
})()
const buildProducts = ((html, lb) => {
  let itemsCount = 0;

  const filterData = (data, filters) => {
    return data.filter(item => {
      if (filters.includes('hombre') ||
      filters.includes('mujer') ||
      filters.includes('joven')) {
        if (filters.includes(item.category)) {
          return true
        }
      } else {
        return true
      }
    }).filter(item => {
      if (filters.includes('isOffer')) {
        if(item.isOffer) {
          return true
        }
      }
      else {
        return true
      }
    }).filter(item => {
      if (filters.includes('isSoldOut') || filters.includes('isForSale')) {
        if(filters.includes('isSoldOut') && !item.isActive) {
          return true
        }
        if(filters.includes('isForSale') && item.isActive) {
          return true
        }
      } else {
        return true
      }
    })
  }

  const build = (data, filters,container) => {
    const filteredData = filterData(data, filters)
    itemsCount = filteredData.length
    filteredData.forEach((item, index) => {
      const productObject = {
        tag: 'div',
        classList: ['mdl-card', 'mdl-shadow--8dp'],
        attributes: {
          name: index
        },
        children: [
          {
            tag: 'div',
            classList: ['mdl-card__title', 'mdl-card--expand']
          },
          {
            tag: 'div',
            classList: ['mdl-card__actions'],
            child: {
              tag: 'span',
              child: {data: item.name}
            }
          }
        ]
      }
      const productHTML = html.JSONToHTML(productObject)
      productHTML.addEventListener('click', () => {
        const header = {
          tag: 'p',
          children: [
            {data: item.name},
            {
              tag: 'span',
              child: {data: item.price}
            }
          ]
        }
        const content = {
          tag: 'div',
          children: [
            {
              tag: 'h3',
              child: {data: 'Acerca del producto'}
            },
            {
              tag: 'p',
              child: {data: item.about}
            }
          ]
        }
        const footer = {
          tag: 'div',
          children: [
            {
              tag: 'button',
              classList: ['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--colored', 'mdl-close'],
              child: {data: 'button1'}
            },
            {
              tag: 'button',
              classList: ['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--accent', 'mdl-accept'],
              child: {data: 'button2'}
            }
          ]
        }
        lb.show(header, content, footer)
        document.querySelector('.mdl-close').addEventListener('click', () => {
          lb.close()
        })
        document.querySelector('.mdl-accept').addEventListener('click', () => {
          lb.close()
          productsBag.add(filteredData[index])
          console.log(productsBag.getProducts())
        })
      })
      container.appendChild(productHTML)
    })
  }
  const getItemsCount = () => {
    return itemsCount;
  }
  return {
    build: build,
    getItemsCount: getItemsCount
  }
})(HTML, lightBox)

const filters = (() => {
  const filters = []
  const addElement = elementName => {
    filters.push(elementName)
  }
  const removeElement = elementName => {
    filters.splice(filters.indexOf(elementName),1)
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
})()

const BagData = (() => {
  let data = []
  return {
    setData: d => {data = d},
    getData: () => data
  }
})()

const slide = () => {
  loader.show()
  setTimeout(()=>{
    loader.hide()
    store.build()
    slider()
    chips()
  const data = fetch('http://demo6292426.mockable.io/products')
  .then(response => response.json())
  .then(data => {
    BagData.setData(data)
    drawProducts()
  });
  
  },1000)
}

const drawProducts = () => {
  document.querySelector('article.slider-panel:nth-child(1) div').innerHTML = ''
  buildProducts.build(BagData.getData(), 
    filters.getFilters(), 
    document.querySelector('article.slider-panel:nth-child(1) div'))
  document.querySelector('article.slider-panel:nth-child(1) header p span').innerText = buildProducts.getItemsCount()
}
