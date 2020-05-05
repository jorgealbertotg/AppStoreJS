const buildProducts = ((html, lb, productsBag) => {
  let itemsCount = 0

  const filterData = (data, f) => {
    const filters = f.getFilters()
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
        if (item.isOffer) {
          return true
        }
      } else {
        return true
      }
    }).filter(item => {
      if (filters.includes('isSoldOut') || filters.includes('isForSale')) {
        if (filters.includes('isSoldOut') && !item.isActive) {
          return true
        }
        if (filters.includes('isForSale') && item.isActive) {
          return true
        }
      } else {
        return true
      }
    })
  }
  const getMin = (v1, v2) => {
    return Math.min(html.currencyToNumber(v1), html.currencyToNumber(v2))
  }
  const getMax = (v1, v2) => {
    return Math.max(html.currencyToNumber(v1), html.currencyToNumber(v2))
  }
  const getSoldOutObject = (item, index) => {
    return {
      tag: 'div',
      classList: ['mdl-card', 'mdl-shadow--8dp', 'soldout-product'],
      attributes: {
        name: index
      },
      children: [
        {
          tag: 'div',
          classList: ['mdl-card__title', 'mdl-card--expand'],
          children: [
            {
              tag: 'p',
              child: { data: 'No disponible' }
            },
            {
              tag: 'p',
              children: [
                {
                  tag: 'span',
                  child: { data: getCurrentPrice(item) }
                },
                {
                  tag: 'span',
                  child: { data: getLastPrice(item) }
                }
              ]
            }
          ]
        },
        {
          tag: 'div',
          classList: ['mdl-card__actions'],
          child: {
            tag: 'span',
            child: { data: item.name }
          }
        }
      ]
    }
  }
  const getOfferObject = (item, index) => {
    return {
      tag: 'div',
      classList: ['mdl-card', 'mdl-shadow--8dp', 'offer-product'],
      attributes: {
        name: index
      },
      children: [
        {
          tag: 'div',
          classList: ['mdl-card__title', 'mdl-card--expand'],
          child: {
            tag: 'p',
            children: [
              {
                tag: 'span',
                child: { data: getCurrentPrice(item) }
              },
              {
                tag: 'span',
                child: { data: getLastPrice(item) }
              }
            ]
          }
        },
        {
          tag: 'div',
          classList: ['mdl-card__actions'],
          child: {
            tag: 'span',
            child: { data: item.name }
          }
        }
      ]
    }
  }
  const getNormalObject = (item, index) => {
    return {
      tag: 'div',
      classList: ['mdl-card', 'mdl-shadow--8dp', 'normal-product'],
      attributes: {
        name: index
      },
      children: [
        {
          tag: 'div',
          classList: ['mdl-card__title', 'mdl-card--expand'],
          child: {
            tag: 'p',
            children: [
              {
                tag: 'span',
                child: { data: getCurrentPrice(item) }
              },
              {
                tag: 'span',
                child: { data: getLastPrice(item) }
              }
            ]
          }
        },
        {
          tag: 'div',
          classList: ['mdl-card__actions'],
          child: {
            tag: 'span',
            child: { data: item.name }
          }
        }
      ]
    }
  }
  const getProductObject = (type, item, index) => {
    let productObject
    switch (type) {
      case 'offer':
        productObject = getOfferObject(item, index)
        break
      case 'normal':
        productObject = getNormalObject(item, index)
        break
      case 'soldout':
        productObject = getSoldOutObject(item, index)
        break
    }
    return productObject
  }
  const getCurrentPrice = item => {
    return html.numberToCurrency(getMax(item.price, item.comparativePrice))
  }
  const getLastPrice = item => {
    return html.numberToCurrency(getMin(item.price, item.comparativePrice))
  }
  const build = (data, filters, container) => {
    const filteredData = filterData(data, filters)
    itemsCount = filteredData.length
    filteredData.forEach((item, index) => {
      const type = item.isActive ? item.isOffer ? 'offer' : 'normal' : 'soldout'
      const productHTML = html.JSONToHTML(getProductObject(type, item, index))
      productHTML.addEventListener('click', () => {
        const header = {
          tag: 'p',
          children: [
            { data: item.name },
            {
              tag: 'span',
              child: { data: ` ${getLastPrice(item)} antes` }
            },
            {
              tag: 'span',
              child: { data: getCurrentPrice(item) }
            }
          ]
        }
        const content = {
          tag: 'div',
          children: [
            {
              tag: 'h3',
              child: { data: 'Acerca del producto' }
            },
            {
              tag: 'p',
              child: { data: item.about }
            }
          ]
        }
        const footer = {
          tag: 'div',
          children: [
            {
              tag: 'button',
              classList: ['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--colored', 'mdl-close'],
              child: { data: 'Cerrar' }
            },
            {
              tag: 'button',
              classList: ['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--accent', 'mdl-accept'],
              attributes: isDisabled(item.guid),
              child: { data: 'Comprar' }
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
          document.querySelector('.mdl-badge').setAttribute('data-badge', productsBag.getProductsCount())
        })
      })
      container.appendChild(productHTML)
    })
  }
  const isDisabled = (productId) => {
    if (productExist(productId)) {
      return { disabled: true }
    }
    return {}
  }
  const productExist = productId => {
    if (productsBag.getProducts().length) {
      for (let i = 0; i < productsBag.getProducts().length; i++) {
        if (productsBag.getProducts()[i].guid === productId) {
          return true
        }
      }
    }
    return false
  }
  const getItemsCount = () => {
    return itemsCount
  }
  return {
    build: build,
    getItemsCount: getItemsCount,
    getLastPrice: getLastPrice,
    getCurrentPrice: getCurrentPrice
  }
})(HTML, lightBox, productsBag)
