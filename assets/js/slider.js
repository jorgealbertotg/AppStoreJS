const slider = ((cp = 1) => {
  let currentPanel = cp
  const getPanelOffsetTop = () => {
    console.log(document.querySelector(`.slider-panel:nth-child(${currentPanel})`))
    return document.querySelector(`.slider-panel:nth-child(${currentPanel})`).offsetTop
  }

  const setContainerOffsetTop = offsetTop => {
    document.querySelector('.slider-theater').style.top = `-${offsetTop}px`
    const heightVP = document.querySelector(`.slider-panel:nth-child(${currentPanel})`).clientHeight
    const heightParentVP = document.querySelector(`.slider-panel:nth-child(${currentPanel})`).parentElement.clientHeight

    document.querySelector('.slider-theater').parentElement.style.height = `${heightVP}px`
    if (heightVP < heightParentVP) {
      const heightVPq = document.querySelector('.slider-container').clientHeight
      if (heightVP < heightVPq) {
        document.querySelector(`.slider-panel:nth-child(${currentPanel})`).style.height = `${heightVPq}px`
      } else {
        document.querySelector(`.slider-panel:nth-child(${currentPanel})`).style.height = '100%'
      }
    } else {
      document.querySelector(`.slider-panel:nth-child(${currentPanel})`).style.height = 'auto'
      const heightVP = document.querySelector(`.slider-panel:nth-child(${currentPanel})`).clientHeight
      document.querySelector('.slider-theater').parentElement.style.height = `${heightVP}px`
    }
  }

  const showPanel = () => {
    Array.from(document.querySelectorAll('.slider-panel')).forEach(panel => { panel.style.display = 'none' })
    document.querySelector(`.slider-panel:nth-child(${currentPanel})`).style.display = 'block'
  }
  const boot = () => {
    window.addEventListener('resize', showPanel)
  }
  const show = numberPanel => {
    currentPanel = numberPanel
    showPanel()
  }
  boot()
  return {
    show: show,
    showPanel: showPanel
  }
})()
