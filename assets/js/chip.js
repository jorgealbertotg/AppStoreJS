const chips = (() => {
  let filters
  let callback
  const boot = (f, cb) => {
    filters = f
    callback = cb
    console.log(document.querySelectorAll('.mdl-chip__text'))
    document.querySelectorAll('.mdl-chip__text').forEach(chip => {
      chip.addEventListener('click', () => {
        if (!chip.nextElementSibling) {
          chip.parentElement.classList.toggle('active')
          console.log(filters)
          filters.addElementByName(chip.getAttribute('name'))
          callback()
          addCloseButton(chip)
          slider.showPanel()
        }
      })
    })
  }
  const updateChipStatus = () => {
    document.querySelectorAll('.mdl-chip__text').forEach(chip => {
      if (filters.getFilters().includes(chip.getAttribute('name'))) {
        if (!chip.nextElementSibling) {
          addCloseButton(chip)
          chip.parentElement.classList.add('active')
        }
      } else {
        if (chip.nextElementSibling) {
          chip.nextElementSibling.remove()
          chip.parentElement.classList.remove('active')
        }
      }
    })
  }
  const addCloseButton = (chip) => {
    chip.parentElement.appendChild(getCloseButton(chip))
  }
  const getCloseButton = chip => {
    const buttonJSON = {
      tag: 'button',
      classList: ['mdl-chip__action'],
      attributes: {
        type: 'button'
      },
      child: {
        tag: 'i',
        classList: ['material-icons'],
        child: { data: 'cancel' }
      }
    }
    const buttonHTML = HTML.JSONToHTML(buttonJSON)
    buttonHTML.addEventListener('click', () => {
      buttonHTML.remove()
      chip.parentElement.classList.toggle('active')
      filters.removeElement(chip.getAttribute('name'))
      callback()
    })
    return buttonHTML
  }
  const reboot = (f, cb) => {
    filters = f
    callback = cb
  }
  return {
    boot: boot,
    reboot: reboot,
    updateChipStatus: updateChipStatus
  }
})()
