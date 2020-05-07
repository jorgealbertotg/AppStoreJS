const slider = ((cp = 1) => {
  let currentPanel = cp

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

  return {
    boot: boot,
    show: show,
    showPanel: showPanel
  }
})()
