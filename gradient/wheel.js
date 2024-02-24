class Color {
  constructor(coordinates) {
    this.calculateColor(coordinates)
  }

  static getHue({ x, y }) {
    const angleRad = Math.atan2(y, x)
    let angleDeg = (angleRad * 180) / Math.PI

    if (angleDeg < 0) {
      angleDeg += 360
    }

    angleDeg = (360 - angleDeg + 90) % 360
    return angleDeg
  }

  static getSaturation({ x, y }) {
    const saturation = Math.sqrt(x * x + y * y)
    return saturation * 100
  }

  static coordinatesToHsl(picker, lightness) {
    const hue = this.getHue(picker.coordinates)
    const saturation = this.getSaturation(picker.coordinates)
    return [hue, saturation, ((1 - lightness.coordinates.y) / 2) * 100]
  }
}

class Picker {
  constructor(element) {
    this.wheel = element
    this.initPicker()
    this._position = { left: 50, top: 50 }
    this._coordinates = { x: 0, y: 0 }
  }

  initPicker() {
    this.wheel.style.pointerEvents = 'none'
    this.wheel.style.touchAction = 'none'
  }

  set position(position) {
    this.wheel.style.top = `${position.top}%`
    this.wheel.style.left = `${position.left}%`
    this._position = {
      left: position.left,
      top: position.top,
    }
  }
  get position() {
    return this._position
  }

  set coordinates(coordinates) {
    this._coordinates = coordinates
  }

  get coordinates() {
    return this._coordinates
  }

  reset() {
    if (this.coordinates.x < 0) {
      this.position = { left: 0, top: 50 }
      this.coordinates = { x: -1, y: 0 }
      return
    }
    this.position = { left: 100, top: 50 }
    this.coordinates = { x: 1, y: 0 }
  }
}

class Wheel {
  wheel = null
  picker = null
  lightness = null
  lightnessPicker = null
  body = null
  color = null
  combinaisonElements = []
  isDragging = false
  mode = undefined
  isDraggingLightness = false
  sizes = undefined

  constructor(containerElementId) {
    this.container = document.getElementById(containerElementId)
    this.combinaisonType = 'complementary'

    this.addStyle()
    this.createElements()
    this.createCombinaisonElements()
    this.combinaisonElementsCoordinates =
      this.getCombinaisonElementsCoordinates()
    this.updateCombinaisonPosition()
    this.createControl()

    this.createPalette()

    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleAction = this.handleAction.bind(this)

    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInput = this.handleInput.bind(this)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)

    this.init()
  }

  get isDraggingLightness() {
    return this.isDraggingLightness
  }

  /**
   * @param {boolean} value
   */
  set isDraggingLightness(value) {
    this.isDraggingLightness = value
  }

  getWheelBg() {
    return `radial-gradient(
			circle at 50% 0%,
			hsla(10, 100%, 50%, 0.7) 0%,
			hsla(10, 0%, 50%, 0) 43%
		),
		radial-gradient(circle at 69.1% 3.8%, hsla(32.5, 100%, 50%, 0.7) 0%, hsla(32.5, 0%, 50%, 0) 43%),
		radial-gradient(circle at 85.4% 14.6%, hsla(55, 100%, 50%, 0.7) 0%, hsla(55, 0%, 50%, 0) 43%),
		radial-gradient(
			circle at 96.2% 30.9%,
			hsla(77.5, 100%, 50%, 0.7) 0%,
			hsla(77.5, 0%, 50%, 0) 43%
		),
		radial-gradient(circle at 100% 50%, hsla(100, 100%, 50%, 0.7) 0%, hsla(100, 0%, 50%, 0) 43%),
		radial-gradient(
			circle at 96.2% 69.1%,
			hsla(122.5, 100%, 50%, 0.7) 0%,
			hsla(122.5, 0%, 50%, 0) 43%
		),
		radial-gradient(circle at 85.4% 85.4%, hsla(145, 100%, 50%, 0.7) 0%, hsla(145, 0%, 50%, 0) 43%),
		radial-gradient(
			circle at 69.1% 96.2%,
			hsla(167.5, 100%, 50%, 0.7) 0%,
			hsla(167.5, 0%, 50%, 0) 43%
		),
		radial-gradient(circle at 50% 100%, hsla(190, 100%, 50%, 0.7) 0%, hsla(190, 0%, 50%, 0) 43%),
		radial-gradient(
			circle at 30.9% 96.2%,
			hsla(212.5, 100%, 50%, 0.7) 0%,
			hsla(212.5, 0%, 50%, 0) 43%
		),
		radial-gradient(circle at 14.6% 85.4%, hsla(235, 100%, 50%, 0.7) 0%, hsla(235, 0%, 50%, 0) 43%),
		radial-gradient(
			circle at 3.8% 69.1%,
			hsla(257.5, 100%, 50%, 0.7) 0%,
			hsla(257.5, 0%, 50%, 0) 43%
		),
		radial-gradient(circle at 0% 50%, hsla(280, 100%, 50%, 0.7) 0%, hsla(280, 0%, 50%, 0) 43%),
		radial-gradient(
			circle at 3.8% 30.9%,
			hsla(302.5, 100%, 50%, 0.7) 0%,
			hsla(302.5, 0%, 50%, 0) 43%
		),
		radial-gradient(circle at 14.6% 14.6%, hsla(325, 100%, 50%, 0.7) 0%, hsla(325, 0%, 50%, 0) 43%),
		radial-gradient(
			circle at 30.9% 3.8%,
			hsla(347.5, 100%, 50%, 0.7) 0%,
			hsla(347.5, 0%, 50%, 0) 43%
		),
		hsla(0, 0%, 50%, 1)`
  }

  addStyle() {
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.textContent = `
		#combinaison{
			margin: 1rem 0;
		}
		#select{
			width: 100%;
			height: 100%;
			padding: 0 .5rem;
		}
		.select-div{
			width: 100%;
			border: 1px solid #00000020;
			height: 2.75rem;
			border-radius: 5px;
			overflow: hidden;
		}
		#color{
			width: 100%;
			height: 100%;
			text-align: center;
			border: 1px solid #00000020;
			border-radius: 5px;
		}
		#color-div{
			flex: 1 1 0%;
			padding: .25rem 1rem 0.25rem 1rem;
		}
		#show{
			display: block;
			width: 3rem;
			height: 3rem;
			border-radius: 100%;
			background-color: cyan;
			flex-shrink: 0;
			flex-grow: 0;
		}
		.control-row{
			display: flex;
			flex-direction: row;
			gap: .5rem;
			margin: 1rem 0;
		}
		.label{
			display: block;
			font-size: 0.75rem/* 12px */;
			line-height: 1rem/* 16px */;
			color: rgb(209, 213, 219)
		}
		#display{

		}
		#control{
			max-width: 20rem;
			margin: auto;
			--tw-space-y-reverse: 0;
			margin-top: calc(2rem/* 32px */ * calc(1 - var(--tw-space-y-reverse)));
			margin-bottom: calc(2rem/* 32px */ * var(--tw-space-y-reverse));
		}
		#lightness{
			position: relative;
			max-width: 20rem;
			width: 100%;
			padding: 0.75rem;
			margin: auto;
			border-radius: 100%;
			cursor: pointer;
			background-image: linear-gradient(to bottom, black, yellow, hsl(100, 98%, 100%));
		}
		#lightnesspicker{
			position: absolute;
			width: 1rem;
			transform: translate(-50%, -50%);
			background-color: white;
			border-radius: 100%;
			pointer-events: none;
			box-shadow: 1px 1px 2px 1px #00000040;
			top: 50%;
			left: 100%;
			aspect-ratio: 1 / 1;
			touch-action: none;
		}
		#wheelcontainer{
			width: 100%;
			padding: 0.5rem;
			margin: auto;
			background-color: white;
			border-radius: 100%;
			pointer-events: auto;
		}
		#wheel{
			position: relative;
			height: 100%;
			width: 100%;
			cursor: pointer;
			max-width: 20rem;
			aspect-ratio: 1 / 1;
			border-radius: 100%;
			margin: auto;
		}
		#picker{
			height: 1.25rem;
			width: 1.25rem;
			position: absolute;
			transform: translate(-50%, -50%);
			background: transparent;
			top: 50%;
			left: 50%;
			border-radius: 100%;
			border: 5px solid white;
			touch-action: none;
			box-shadow: 2px 2px 4px 2px #00000040;
		}
		.combinaisonpicker{
			display: block;
			height: 8px;
			width: 8px;
			background-color: transparent;
			border-radius: 100%;
			position: absolute;
			border: 2px solid white;
			pointer-events: none;
			touch-action: none;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 20%;
		}

    #pallette{
      display: flex;
      border-radius: 0.5rem;
      overflow: hidden;
      flex-direction: row;
      max-width: 20rem;
      margin: auto
    }
    #pallette > div{
      flex-shrink: 0;
      flex-grow: 0;
    }
		`

    document.head.appendChild(style)
  }

  createElements() {
    // wheel
    const wheel = document.createElement('div')
    wheel.id = 'wheel'
    wheel.style.background = this.getWheelBg()

    // picker
    const picker = document.createElement('button')
    picker.id = 'picker'
    wheel.appendChild(picker)

    // wheel container
    const wheelContainer = document.createElement('div')
    wheelContainer.id = 'wheelcontainer'
    wheelContainer.appendChild(wheel)

    // lightness
    const lightness = document.createElement('div')
    lightness.id = 'lightness'

    // lightnessPicker
    const lightnesspicker = document.createElement('button')
    lightnesspicker.id = 'lightnesspicker'

    lightness.appendChild(lightnesspicker)
    lightness.appendChild(wheelContainer)

    this.container.appendChild(lightness)

    this.wheel = wheel
    this.lightness = lightness
    this.picker = new Picker(picker)
    this.picker.coordinates = { x: 0, y: -1 }
    this.picker.position = { letf: 50, top: 100 }
    this.lightnessPicker = new Picker(lightnesspicker)
    this.body = document.body
    this.color = chroma('00ffff')
  }

  createCombinaisonElements() {
    let i = 0
    while (i < 3) {
      i++
      const div = document.createElement('div')
      div.classList.add('combinaisonpicker')
      i === 1 ? this.wheel.appendChild(div) : null
      this.combinaisonElements.push(div)
    }
  }

  getCombinaisonElementsCoordinates() {
    const [hue, saturation, lightness] = this.color.hsl()
    const hueRadian = Math.atan2(
      this.picker.coordinates.y,
      this.picker.coordinates.x
    )

    if (this.combinaisonType === 'complementary') {
      const coordinates = this.getOppositeCoordinates(this.picker.coordinates)
      const position = this.getPositionFromCoordinates(coordinates)

      return [
        {
          coordinates,
          position,
          hsl: [(hue + 180) % 360, saturation, lightness],
        },
      ]
    }

    if (this.combinaisonType === 'monochromatic') {
      let newSaturation
      if (saturation < 0.5) newSaturation = Math.min(saturation * 2, 1)
      else if (saturation > 0.5) newSaturation = saturation / 2
      else newSaturation = 0.98

      const x = newSaturation * Math.cos(hueRadian)
      const y = newSaturation * Math.sin(hueRadian)

      const position = this.getPositionFromCoordinates({ x, y })

      return [
        {
          coordinates: { x, y },
          position,
          hsl: [hue, newSaturation, lightness],
        },
      ]
    }

    if (this.combinaisonType === 'analogous') {
      const offset = (30 * Math.PI) / 180

      const analogousHue1 = hueRadian + offset
      const analogousHue2 = hueRadian - offset

      const analogousCoordinates1 = {
        x: Math.cos(analogousHue1) * saturation,
        y: Math.sin(analogousHue1) * saturation,
      }

      const analogousCoordinates2 = {
        x: Math.cos(analogousHue2) * saturation,
        y: Math.sin(analogousHue2) * saturation,
      }

      const analogousPosition1 = this.getPositionFromCoordinates(
        analogousCoordinates1
      )
      const analogousPosition2 = this.getPositionFromCoordinates(
        analogousCoordinates2
      )

      return [
        {
          coordinates: analogousCoordinates1,
          position: analogousPosition1,
          hsl: [(hue + 30) % 360, saturation, lightness],
        },
        {
          coordinates: analogousCoordinates2,
          position: analogousPosition2,
          hsl: [(hue - 30) % 360, saturation, lightness],
        },
      ]
    }

    const steps = this.combinaisonType === 'triadic' ? 3 : 4
    const rtn = []
    const offset = ((360 / steps) * Math.PI) / 180
    for (let i = 1; i < steps; i++) {
      const x = saturation * Math.cos(hueRadian + i * offset)
      const y = saturation * Math.sin(hueRadian + i * offset)

      const position = this.getPositionFromCoordinates({
        x,
        y,
      })

      rtn.push({
        coordinates: { x, y },
        position,
        hsl: [(hue + i * (360 / steps)) % 360, saturation, lightness],
      })
    }

    return rtn
  }

  upadteColor() {
    const color = Color.coordinatesToHsl(this.picker, this.lightnessPicker)
    this.lightness.style.backgroundImage = `linear-gradient(hsl(0, 0%, 0%), hsl(${color[0]}, ${color[1]}%, 50%), hsl(${color[0]}, ${color[1]}%, 95%))`

    this.color = chroma(color[0], color[1] / 100, color[2] / 100, 'hsl')

    const hex = this.color.hex()

    this.show.style.backgroundColor = hex
    this.input.value = hex
  }

  appendCombinaisonElement(count) {
    for (let i = 0; i < this.combinaisonElements.length; i++) {
      const current = this.combinaisonElements[i]

      const isInDom = this.wheel.contains(current)
      if (i < count && !isInDom) {
        this.wheel.appendChild(current)
      } else if (isInDom && i >= count) {
        current.remove()
      }
    }
  }

  getRelativeMousePositionToWheel(clientX, clientY) {
    const x = clientX - this.sizes.left
    const y = clientY - this.sizes.top

    return { x, y }
  }

  getNormalizedCoordinates(position) {
    /*
     * Repere: pour obtenir les position
     * dans le repere ou le centre
     * le centre du cercle chromatique est le centre
     * du repere il faut: x = x - w/2, y = h/2 - y
     */
    return {
      x: (position.x - this.sizes.width / 2) / (this.sizes.width / 2),
      y: (this.sizes.height / 2 - position.y) / (this.sizes.height / 2),
    }
  }

  getLeftAndTop(mousePosition) {
    const left = (mousePosition.x * 100) / this.sizes.width
    const top = (mousePosition.y * 100) / this.sizes.height
    return { left, top }
  }

  getPositionFromCoordinates(coordinates) {
    const normalizedTop =
      coordinates.y > 0 ? 1 - coordinates.y : 1 + -coordinates.y
    const normalizedLeft =
      coordinates.x > 0 ? 1 + coordinates.x : 1 - -coordinates.x

    const top = (normalizedTop * 100) / 2
    const left = (normalizedLeft * 100) / 2

    return { top, left }
  }

  getOppositeCoordinates({ x, y }) {
    return { x: -x, y: -y }
  }

  pointIsInCercle(coordinates) {
    // distance to center
    // normalized coordinates
    const d = Math.sqrt(
      coordinates.x * coordinates.x + coordinates.y * coordinates.y
    )

    return d <= 1
  }

  getIntersectionPoint(coordinates) {
    // distance to center
    const d = Math.sqrt(
      coordinates.x * coordinates.x + coordinates.y * coordinates.y
    )

    const x = coordinates.x / d
    const y = coordinates.y / d

    return { x, y }
  }

  getSizes() {
    if (this.isDraggingLightness)
      this.sizes = this.lightness.getBoundingClientRect()
    else this.sizes = this.wheel.getBoundingClientRect()
  }

  updateCombinaisonPosition() {
    for (let i = 0; i < this.combinaisonElementsCoordinates.length; i++) {
      this.combinaisonElements[
        i
      ].style.top = `${this.combinaisonElementsCoordinates[i].position.top}%`
      this.combinaisonElements[
        i
      ].style.left = `${this.combinaisonElementsCoordinates[i].position.left}%`
    }
  }

  updatePicker(event) {
    this.getSizes()

    if (this.isDragging) {
      const client = {
        x: this.mode === 'mouse' ? event.clientX : event.touches[0].clientX,
        y: this.mode === 'mouse' ? event.clientY : event.touches[0].clientY,
      }

      let mousePosition = this.getRelativeMousePositionToWheel(
        client.x,
        client.y
      )

      let coordinates = this.getNormalizedCoordinates(mousePosition)
      let position = this.getLeftAndTop(mousePosition)

      if (!this.pointIsInCercle(coordinates) || this.isDraggingLightness) {
        coordinates = this.getIntersectionPoint(coordinates)
        position = this.getPositionFromCoordinates(coordinates)
      }

      if (this.isDraggingLightness) {
        this.lightnessPicker.position = position
        this.lightnessPicker.coordinates = coordinates
      } else {
        this.picker.position = position
        this.picker.coordinates = coordinates
      }
    }

    return
  }

  handleMouseUp(event) {
    this.isDragging = false
    this.isDraggingLightness = false
    this.wheel.style.cursor = 'pointer'
    this.lightness.style.cursor = 'pointer'

    this.body.removeEventListener('mousemove', this.handleAction)
    this.body.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleTouchEnd(event) {
    event.preventDefault()

    this.isDragging = false
    this.isDraggingLightness = false
    this.wheel.style.cursor = 'pointer'
    this.lightness.style.cursor = 'pointer'
  }

  handleAction(event, isDraggingLightness) {
    event.stopPropagation()
    event.preventDefault()
    this.isDragging = true

    if (event.touches) {
      this.mode = 'touch'
    } else {
      this.mode = 'mouse'
      this.body.addEventListener('mousemove', this.handleAction)
      this.body.addEventListener('mouseup', this.handleMouseUp)
    }

    if (isDraggingLightness) {
      this.isDraggingLightness = true
      this.lightness.style.cursor = 'none'
    } else {
      this.wheel.style.cursor = 'none'
      this.lightnessPicker.reset()
    }

    this.updatePicker(event)
    this.upadteColor()
    if (!this.isDraggingLightness) {
      this.combinaisonElementsCoordinates =
        this.getCombinaisonElementsCoordinates()
      this.updateCombinaisonPosition()
    }
    this.createPalette()
  }
  createControl() {
    const display = document.createElement('div')
    display.id = 'display'
    const label = document.createElement('span')
    label.classList.add('label')
    label.textContent = '1.Choisissez une couleur'
    display.appendChild(label)

    const div = document.createElement('div')
    div.classList.add('control-row')

    const show = document.createElement('span')
    show.id = 'show'
    this.show = show

    div.append(show)

    const colorDiv = document.createElement('div')
    colorDiv.id = 'color-div'

    const input = document.createElement('input')
    input.id = 'color'
    input.name = 'color'
    input.value = '#00ffff'
    colorDiv.append(input)
    div.appendChild(colorDiv)
    display.append(div)
    this.input = input

    const combinaison = document.createElement('div')
    combinaison.id = 'combinaison'
    const combinaisonLabel = document.createElement('span')
    combinaisonLabel.classList.add('label')
    combinaisonLabel.textContent = '2.Choisissez une combinaison'
    combinaison.appendChild(combinaisonLabel)
    const select = document.createElement('select')
    select.id = 'select'
    const options = [
      { value: 'complementary', text: 'Complémentaire' },
      { value: 'monochromatic', text: 'Monochrome' },
      { value: 'analogous', text: 'Analogue' },
      { value: 'triadic', text: 'Triadrique' },
      { value: 'tetradic', text: 'Tétraédrique' },
    ]

    options.forEach((option) => {
      const optionElement = document.createElement('option')
      optionElement.value = option.value
      optionElement.textContent = option.text
      select.appendChild(optionElement)
    })

    this.select = select

    const selectDiv = document.createElement('div')
    selectDiv.classList.add('select-div')
    selectDiv.appendChild(select)
    combinaison.appendChild(selectDiv)

    const control = document.createElement('div')
    control.id = 'control'
    control.appendChild(display)
    control.appendChild(combinaison)

    this.container.appendChild(control)

    const palletteDiv = document.createElement('div')
    palletteDiv.id = 'pallette'

    this.container.appendChild(palletteDiv)
    this.palletteDiv = palletteDiv
  }

  createPalette() {
    const width = 100 / (1 + this.combinaisonElementsCoordinates.length)
    let html = `<div style="width:${width}%; height:50px;">
    <span className="" style="background-color:${this.color}; display: block; width:100%; height: 100%;"></span>
    </div>`
    for (let el of this.combinaisonElementsCoordinates) {
      const hsl = Color.coordinatesToHsl(el, this.lightnessPicker)
      html += `<div style="width:${width}%; height:50px;">
    <span className="block h-10" style="background-color:hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%); display: block; width:100%; height: 100%;"></span>
    </div>`
    }
    this.palletteDiv.innerHTML = html
  }

  handleSelectChange(event) {
    this.combinaisonType = event.target.value

    switch (this.combinaisonType) {
      case 'complementary':
      case 'monochromatic':
        this.appendCombinaisonElement(1)
        break
      case 'analogous':
      case 'triadic':
        this.appendCombinaisonElement(2)
        break
      case 'tetradic':
        this.appendCombinaisonElement(3)
        break
      default:
        return
    }

    this.combinaisonElementsCoordinates =
      this.getCombinaisonElementsCoordinates()
    this.updateCombinaisonPosition()
    this.createPalette()
  }

  handleInput(event) {
    let value = this.input.value

    // Ensure the first character is always '#'
    if (!value.startsWith('#')) {
      value = '#' + value.replace(/#/g, '')
    } else {
      value = '#' + value.slice(1).replace(/#/g, '')
    }

    // Allow only hex characters after the '#'
    value = value.replace(/[^#a-fA-F0-9]/g, '')

    // Limit length to 7 characters (1 '#' + 6 hex digits)
    if (value.length > 7) {
      value = value.substring(0, 7)
    }

    this.input.value = value
  }

  handleKeyDown(event) {
    if (event.key === 'Backspace' && this.input.value === '#') {
      event.preventDefault()
    }
  }

  handleFocus(event) {
    if (this.input.value === '') {
      this.input.value = '#'
    }
  }

  handleBlur(event) {
    // Ensure '#' is present when the field loses focus
    if (this.input.value === '') {
      this.input.value = '#'
    }
  }

  init() {
    if (this.wheel) {
      this.wheel.addEventListener('mousedown', (event) =>
        this.handleAction(event, false)
      )

      this.wheel.addEventListener('touchstart', (event) => {
        this.handleAction(event, false)
      })
      this.wheel.addEventListener('touchmove', this.handleAction)
      this.wheel.addEventListener('touchend', this.handleTouchEnd)
    }

    if (this.lightness) {
      this.lightness.addEventListener('mousedown', (event) => {
        this.handleAction(event, true)
      })

      this.lightness.addEventListener('touchstart', (event) => {
        this.handleAction(event, true)
      })
      this.lightness.addEventListener('touchmove', this.handleAction)
      this.lightness.addEventListener('touchend', this.handleTouchEnd)
    }

    if (this.input) {
      this.input.addEventListener('keydown', this.handleKeyDown)
      this.input.addEventListener('blur', this.handleBlur)
      this.input.addEventListener('focus', this.handleFocus)
      this.input.addEventListener('input', this.handleInput)
    }

    if (this.select) {
      this.select.addEventListener('change', this.handleSelectChange)
    }
  }
}

window.onload = () => {
  const wheel = new Wheel('wrapper')
}
