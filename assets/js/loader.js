const loader = ((HTML) => {
  const loaderObject = {
    tag: 'main',
    classList: ['loaderContainer'],
    child: {
      tag: 'div',
      classList: ['loader']
    }
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
