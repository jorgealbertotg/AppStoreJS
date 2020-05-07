import { HTML } from './html.js'

export const Loader = ((HTML) => {
  let loaderHTML
  const loaderObject = {
    tag: 'main',
    classList: ['loaderContainer'],
    child: {
      tag: 'div',
      classList: ['loader']
    }
  }

  const show = () => {
    loaderHTML = HTML.JSONToHTML(loaderObject)
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
