export default class Utils {
  constructor(theme) {
    this.theme = theme
  }

  validateSpacingVals = (val) => {
    const spacingKeys = Object.keys(this.theme.spacing)

    if (!spacingKeys.includes(val) || !val) {
      ThrowDevError(
        `${val} doesn't exist in theme.spacing. See: tailwind config`
      )
    }
  }

  padding = (val, side) => {
    this.validateSpacingVals(val)

    switch (side) {
      case 'y':
        return {
          paddingTop: this.theme.spacing[val],
          paddingBottom: this.theme.spacing[val],
        }
      case 'x':
        return {
          paddingLeft: this.theme.spacing[val],
          paddingRight: this.theme.spacing[val],
        }
      case 't':
        return { paddingTop: this.theme.spacing[val] }

      case 'r':
        return { paddingRight: this.theme.spacing[val] }

      case 'b':
        return { paddingBottom: this.theme.spacing[val] }

      case 'l':
        return { paddingLeft: this.theme.spacing[val] }

      default:
        return { padding: this.theme.spacing[val] }
    }
  }

  /**
   * Padding utils:
   * - Only accepts keys in tailwind config (spacing)
   *
   * eg.
   *
   * p(8)
   * py(8)
   */
  p = (val) => this.padding(val)
  py = (val) => this.padding(val, 'y')
  px = (val) => this.padding(val, 'x')
  pt = (val) => this.padding(val, 't')
  pr = (val) => this.padding(val, 'r')
  pb = (val) => this.padding(val, 'b')
  pl = (val) => this.padding(val, 'l')

  margin = (val, side) => {
    this.validateSpacingVals(val)

    switch (side) {
      case 'y':
        return {
          marginTop: this.theme.spacing[val],
          marginBottom: this.theme.spacing[val],
        }
      case 'x':
        return {
          marginLeft: this.theme.spacing[val],
          marginRight: this.theme.spacing[val],
        }
      case 't':
        return { marginTop: this.theme.spacing[val] }

      case 'r':
        return { marginRight: this.theme.spacing[val] }

      case 'b':
        return { marginBottom: this.theme.spacing[val] }

      case 'l':
        return { marginLeft: this.theme.spacing[val] }

      default:
        return { margin: this.theme.spacing[val] }
    }
  }

  /**
   * Margin utils:
   * - Only accepts keys in tailwind config (spacing)
   *
   * eg.
   *
   * m(8)
   * my(8)
   */
  m = (val) => this.margin(val)
  my = (val) => this.margin(val, 'y')
  mx = (val) => this.margin(val, 'x')
  mt = (val) => this.margin(val, 't')
  mr = (val) => this.margin(val, 'r')
  mb = (val) => this.margin(val, 'b')
  ml = (val) => this.margin(val, 'l')

  /**
   * Width/Height utils:
   * - Only accepts keys in tailwind config (spacing)
   *
   * eg.
   *
   * w(8)
   * h(8)
   */
  w = (val) => {
    this.validateSpacingVals(val)

    return { width: this.theme.spacing[val] }
  }

  h = (val) => {
    this.validateSpacingVals(val)

    return { height: this.theme.spacing[val] }
  }

  /**
   * Width x Height utils:
   * - Only accepts keys in tailwind config (spacing)
   *
   * eg.
   *
   * rect(8) // height defaults to the same as width
   * rect(8, 8) // specify height as second param
   */
  rect = (width, optionalHeight) => {
    const height = optionalHeight || width

    return Object.assign({}, w(width), h(height))
  }

  /**
   * Font util:
   * - Set font-weight or font-family
   * - Only accepts keys in tailwind config (fontWeight or fontFamily)
   *
   * eg.
   *
   * font('normal')
   * font('sans')
   */
  font = (val) => {
    const weightKeys = Object.keys(this.theme.fontWeight)
    const familyKeys = Object.keys(this.theme.fontFamily)

    if (typeof val !== 'string') {
      ThrowDevError(
        `font() takes a string as it's only parameter. Got ${typeof val}`
      )
    } else if (weightKeys.includes(val)) {
      return { fontWeight: this.theme.fontWeight[val] }
    } else if (familyKeys.includes(val)) {
      return { fontFamily: this.theme.fontFamily[val] }
    } else {
      ThrowDevError(
        `${val} doesn't exist in theme.fontWeight or theme.fontFamily. See: tailwind config`
      )
    }
  }

  /**
   * Text util:
   * - Set fontSize, color, or textAlign
   * - Only accepts keys in tailwind config (colors, fontSize, and 'center')
   *
   * eg.
   *
   * text(14)
   * text('gray-900')
   * text('center')
   */
  text = (val) => {
    const sizeKeys = Object.keys(this.theme.fontSize)
    const colorKeys = Object.keys(this.theme.colors)

    if (typeof val !== 'string') {
      ThrowDevError(
        `text() takes a string as it's only parameter. Got ${typeof val}`
      )
    } else if (sizeKeys.includes(val)) {
      return { fontSize: this.theme.fontSize[val] }
    } else if (colorKeys.includes(val)) {
      return { color: this.theme.colors[val] }
    } else if (['center'].includes(val)) {
      return { textAlign: val }
    } else {
      ThrowDevError(
        `${val} doesn't exist in theme.fontSize or theme.colors. See: tailwind config`
      )
    }
  }

  /**
   * Text transforms, align, and styles utils:
   * - Set text-trasnform or text-style
   *
   * eg.
   *
   * uppercase()
   */
  uppercase = () => ({ textTransform: 'uppercase' })
  lowercase = () => ({ textTransform: 'lowercase' })
  capitalize = () => ({ textTransform: 'capitalize' })
  normalCase = () => ({ textTransform: 'none' })
  underline = () => ({ textDecorationLine: 'underline' })

  /**
   * Background util:
   * - Set background color
   * - Only accepts keys in tailwind config (colors)
   *
   * eg.
   * bg('gray-900')
   */
  bg = (val) => {
    const colorKeys = Object.keys(this.theme.colors)

    if (colorKeys.includes(val)) {
      return { backgroundColor: this.theme.colors[val] }
    } else {
      ThrowDevError(`${val} doesn't exist in theme.colors. See: tailwind config`)
    }
  }

  /**
   * Position
   *
   * eg.
   * relative()
   */
  relative = () => ({ position: 'relative' })
  absolute = () => ({ position: 'absolute ' })

  /**
   * Insets
   * - Set top, botom, left, and right
   * - Only accepts keys in tailwind config (insets)
   *
   * eg.
   * top('full') // equivalent to: inset('full', 'top')
   * inset('full') // sets all 4 sides
   */
  inset = (val, side) => {
    const insetKeys = Object.keys(this.theme.inset)

    if (!insetKeys.includes(val)) {
      ThrowDevError(`${val} doesn't exist in inset. See: tailwind config`)
    }

    switch (side) {
      case 'top':
        return {
          top: this.theme.inset[val],
        }
      case 'right':
        return {
          right: this.theme.inset[val],
        }
      case 'bottom':
        return {
          bottom: this.theme.inset[val],
        }
      case 'left':
        return {
          left: this.theme.inset[val],
        }
      default:
        return {
          top: this.theme.inset[val],
          right: this.theme.inset[val],
          bottom: this.theme.inset[val],
          left: this.theme.inset[val],
        }
    }
  }

  top = (val) => this.inset(val, 'top')
  right = (val) => this.inset(val, 'right')
  bottom = (val) => this.inset(val, 'bottom')
  left = (val) => this.inset(val, 'left')

  /**
   * Overflow
   *
   * eg.
   * overflow('hidden')
   */
  overflow = (val) => {
    switch (val) {
      case 'hidden':
        return { overflow: 'hidden' }
      case 'visible':
        return { overflow: 'visible' }
      default:
        ThrowDevError(`${val} isn't a valid overflow value`)
    }
  }

  /**
   * Flex
   * - Set flex properties
   *
   * eg.
   * flex() // equivalent to flex('1') or flex(1)
   * flex('row')
   */
  flex = (val) => {
    if (val === 'row') {
      return { flexDirection: 'row' }
    } else if (val === 'col') {
      return { flexDirection: 'column' }
    } else if (val === 'wrap') {
      return { flexWrap: 'wrap' }
    }

    const intVal = parseInt(val, 10)

    if (typeof intVal === 'number' && !isNaN(intVal)) {
      return { flex: intVal }
    } else {
      return { flex: 1 }
    }
  }

  /**
   * Justify
   *
   * eg.
   * justify('center')
   */
  justify = (val) => {
    switch (val) {
      case 'center':
        return { justifyContent: 'center' }
      case 'between':
        return { justifyContent: 'space-between' }
      case 'start':
        return { justifyContent: 'flex-start' }
      case 'end':
        return { justifyContent: 'flex-end' }
      default:
        ThrowDevError(`${val} isn't a valid justifyContent value`)
    }
  }

  /**
   * Align Items
   *
   * eg.
   * items('center')
   */
  items = (val) => {
    switch (val) {
      case 'center':
        return { alignItems: 'center' }
      case 'start':
        return { alignItems: 'flex-start' }
      case 'end':
        return { alignItems: 'flex-end' }
      default:
        ThrowDevError(`${val} isn't a valid alignItems value`)
    }
  }

  /**
   * Align Slef
   *
   * eg.
   * items('center')
   */
  self = (val) => {
    switch (val) {
      case 'start':
        return { alignSelf: 'flex-start' }
      case 'end':
        return { alignSelf: 'flex-end' }
      default:
        ThrowDevError(`${val} isn't a valid alignSelf value`)
    }
  }

  /**
   * Border Radius
   * - Set all, top, or botom
   * - Only accepts keys in tailwind config (borderRadius)
   *
   * eg.
   * rounded('full')
   * rounded('b-full') // sets bottom borderRadius to 'full'
   */
  rounded = (val) => {
    const borderRadiusKeys = Object.keys(this.theme.borderRadius)
    const parts = val.split('-')

    if (parts.length === 1) {
      if (!borderRadiusKeys.includes(val)) {
        ThrowDevError(
          `${val} doesn't exist in theme.borderRadius. See: tailwind config`
        )
      }

      return { borderRadius: this.theme.borderRadius[val] }
    }

    if (!borderRadiusKeys.includes(parts[1])) {
      ThrowDevError(
        `${parts[1]} doesn't exist in theme.borderRadius. See: tailwind config`
      )
    }

    const side = parts[0]
    const sideVal = parts[1]

    if (side === 'b') {
      return {
        borderBottomLeftRadius: this.theme.borderRadius[sideVal],
        borderBottomRightRadius: this.theme.borderRadius[sideVal],
      }
    } else if (side === 't') {
      return {
        borderTopLeftRadius: this.theme.borderRadius[sideVal],
        borderTopRightRadius: this.theme.borderRadius[sideVal],
      }
    }
  }

  /**
   * Borders
   * - Set all, top, right, botom, or left
   * - Only accepts keys in tailwind config (borderWidth and borderColor)
   *
   * eg.
   * border() // sets border on all sides
   * border('b') // sets border on bottom
   * border('blue-500') // sets border color
   */
  border = (val) => {
    if (!val) {
      return {
        borderWidth: 1,
        borderStyle: 'solid',
      }
    }

    const colorKeys = Object.keys(this.theme.colors)
    const borderWidthKeys = Object.keys(this.theme.borderWidth)

    if (colorKeys.includes(val)) {
      return {
        borderColor: this.theme.colors[val],
      }
    } else if (borderWidthKeys.includes(val)) {
      return {
        borderWidth: this.theme.borderWidth[val],
        borderStyle: 'solid',
      }
    }

    const parts = val.split('-')
    const side = parts[0]
    const sideWidth = borderWidthKeys.includes(parts[1])
      ? this.theme.borderWidth[parts[1]]
      : 1

    switch (side) {
      case 't':
        return {
          borderTopWidth: sideWidth,
          borderStyle: 'solid',
        }
      case 'r':
        return {
          borderRightWidth: sideWidth,
          borderStyle: 'solid',
        }
      case 'b':
        return {
          borderBottomWidth: sideWidth,
          borderStyle: 'solid',
        }
      case 'l':
        return {
          borderLeftWidth: sideWidth,
          borderStyle: 'solid',
        }
      default:
        ThrowDevError(
          `${val}: No borderColor or borderWidth found. See: tailwind config`
        )
    }
  }

  /**
   * Opacity
   * - Only accepts keys in tailwind config (opacity)
   *
   * eg.
   * opacity('60')
   */
  opacity = (val) => {
    const opacityKeys = Object.keys(this.theme.opacity)

    if (opacityKeys.includes(val)) {
      return { opacity: this.theme.opacity[val] }
    }

    ThrowDevError(`${val} doesn't exist in theme.opacity. See: tailwind config`)
  }

  /**
   * Box Shadoes
   * - Only accepts keys in tailwind config (boxShadow, Elevation)
   * - note: both boxShadow and Elevation are required
   *
   * eg.
   * shadow('md')
   */
  shadow = (val) => {
    const boxShadowKeys = Object.keys(this.theme.boxShadow)

    if (boxShadowKeys.includes(val)) {
      return Object.assign(
        {},
        {
          boxShadow: this.theme.boxShadow[val],
        },
        this.elevation(val)
      )
    }

    ThrowDevError(`${val} doesn't exist in theme.boxShadow. See: tailwind config`)
  }

  elevation = (val) => {
    const elevationKeys = Object.keys(this.theme.elevation)

    if (elevationKeys.includes(val)) {
      return {
        elevation: this.theme.elevation[val],
      }
    }

    ThrowDevError(`${val} doesn't exist in theme.elevation. See: tailwind config`)
  }

  /**
   * ZIndex
   */
  z = (val) => {
    const zIndexKeys = Object.keys(this.theme.zIndex)

    if (!zIndexKeys.includes(val) || !val) {
      ThrowDevError(
        `${val} doesn't exist in theme.zIndex. See: tailwind.config.js`
      )
    }

    return {
      zIndex: this.theme.zIndex[val],
    }
  }
}
