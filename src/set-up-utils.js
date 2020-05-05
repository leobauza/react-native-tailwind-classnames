export const setUpUtils = (theme) => {
  const util = {}

  const validateSpacingVals = (val) => {
    const spacingKeys = Object.keys(theme.spacing)

    if (!spacingKeys.includes(val) || !val) {
      ThrowDevError(
        `${val} doesn't exist in theme.spacing. See: tailwind config`
      )
    }
  }

  const padding = (val, side) => {
    validateSpacingVals(val)

    switch (side) {
      case 'y':
        return {
          paddingTop: theme.spacing[val],
          paddingBottom: theme.spacing[val],
        }
      case 'x':
        return {
          paddingLeft: theme.spacing[val],
          paddingRight: theme.spacing[val],
        }
      case 't':
        return { paddingTop: theme.spacing[val] }

      case 'r':
        return { paddingRight: theme.spacing[val] }

      case 'b':
        return { paddingBottom: theme.spacing[val] }

      case 'l':
        return { paddingLeft: theme.spacing[val] }

      default:
        return { padding: theme.spacing[val] }
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
  util.p = (val) => padding(val)
  util.py = (val) => padding(val, 'y')
  util.px = (val) => padding(val, 'x')
  util.pt = (val) => padding(val, 't')
  util.pr = (val) => padding(val, 'r')
  util.pb = (val) => padding(val, 'b')
  util.pl = (val) => padding(val, 'l')

  const margin = (val, side) => {
    validateSpacingVals(val)

    switch (side) {
      case 'y':
        return {
          marginTop: theme.spacing[val],
          marginBottom: theme.spacing[val],
        }
      case 'x':
        return {
          marginLeft: theme.spacing[val],
          marginRight: theme.spacing[val],
        }
      case 't':
        return { marginTop: theme.spacing[val] }

      case 'r':
        return { marginRight: theme.spacing[val] }

      case 'b':
        return { marginBottom: theme.spacing[val] }

      case 'l':
        return { marginLeft: theme.spacing[val] }

      default:
        return { margin: theme.spacing[val] }
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
  util.m = (val) => margin(val)
  util.my = (val) => margin(val, 'y')
  util.mx = (val) => margin(val, 'x')
  util.mt = (val) => margin(val, 't')
  util.mr = (val) => margin(val, 'r')
  util.mb = (val) => margin(val, 'b')
  util.ml = (val) => margin(val, 'l')

  /**
   * Width/Height utils:
   * - Only accepts keys in tailwind config (spacing)
   *
   * eg.
   *
   * w(8)
   * h(8)
   */
  util.w = (val) => {
    validateSpacingVals(val)

    return { width: theme.spacing[val] }
  }

  util.h = (val) => {
    validateSpacingVals(val)

    return { height: theme.spacing[val] }
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
  util.rect = (width, optionalHeight) => {
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
  util.font = (val) => {
    const weightKeys = Object.keys(theme.fontWeight)
    const familyKeys = Object.keys(theme.fontFamily)

    if (typeof val !== 'string') {
      ThrowDevError(
        `font() takes a string as it's only parameter. Got ${typeof val}`
      )
    } else if (weightKeys.includes(val)) {
      return { fontWeight: theme.fontWeight[val] }
    } else if (familyKeys.includes(val)) {
      return { fontFamily: theme.fontFamily[val] }
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
  util.text = (val) => {
    const sizeKeys = Object.keys(theme.fontSize)
    const colorKeys = Object.keys(theme.colors)

    if (typeof val !== 'string') {
      ThrowDevError(
        `text() takes a string as it's only parameter. Got ${typeof val}`
      )
    } else if (sizeKeys.includes(val)) {
      return { fontSize: theme.fontSize[val] }
    } else if (colorKeys.includes(val)) {
      return { color: theme.colors[val] }
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
  util.uppercase = () => ({ textTransform: 'uppercase' })
  util.lowercase = () => ({ textTransform: 'lowercase' })
  util.capitalize = () => ({ textTransform: 'capitalize' })
  util.normalCase = () => ({ textTransform: 'none' })
  util.underline = () => ({ textDecorationLine: 'underline' })

  /**
   * Background util:
   * - Set background color
   * - Only accepts keys in tailwind config (colors)
   *
   * eg.
   * bg('gray-900')
   */
  util.bg = (val) => {
    const colorKeys = Object.keys(theme.colors)

    if (colorKeys.includes(val)) {
      return { backgroundColor: theme.colors[val] }
    } else {
      ThrowDevError(
        `${val} doesn't exist in theme.colors. See: tailwind config`
      )
    }
  }

  /**
   * Position
   *
   * eg.
   * relative()
   */
  util.relative = () => ({ position: 'relative' })
  util.absolute = () => ({ position: 'absolute ' })

  /**
   * Insets
   * - Set top, botom, left, and right
   * - Only accepts keys in tailwind config (insets)
   *
   * eg.
   * top('full') // equivalent to: inset('full', 'top')
   * inset('full') // sets all 4 sides
   */
  util.inset = (val, side) => {
    const insetKeys = Object.keys(theme.inset)

    if (!insetKeys.includes(val)) {
      ThrowDevError(`${val} doesn't exist in inset. See: tailwind config`)
    }

    switch (side) {
      case 'top':
        return {
          top: theme.inset[val],
        }
      case 'right':
        return {
          right: theme.inset[val],
        }
      case 'bottom':
        return {
          bottom: theme.inset[val],
        }
      case 'left':
        return {
          left: theme.inset[val],
        }
      default:
        return {
          top: theme.inset[val],
          right: theme.inset[val],
          bottom: theme.inset[val],
          left: theme.inset[val],
        }
    }
  }

  util.top = (val) => inset(val, 'top')
  util.right = (val) => inset(val, 'right')
  util.bottom = (val) => inset(val, 'bottom')
  util.left = (val) => inset(val, 'left')

  /**
   * Overflow
   *
   * eg.
   * overflow('hidden')
   */
  util.overflow = (val) => {
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
  util.flex = (val) => {
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
  util.justify = (val) => {
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
  util.items = (val) => {
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
  util.self = (val) => {
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
  util.rounded = (val) => {
    const borderRadiusKeys = Object.keys(theme.borderRadius)
    const parts = val.split('-')

    if (parts.length === 1) {
      if (!borderRadiusKeys.includes(val)) {
        ThrowDevError(
          `${val} doesn't exist in theme.borderRadius. See: tailwind config`
        )
      }

      return { borderRadius: theme.borderRadius[val] }
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
        borderBottomLeftRadius: theme.borderRadius[sideVal],
        borderBottomRightRadius: theme.borderRadius[sideVal],
      }
    } else if (side === 't') {
      return {
        borderTopLeftRadius: theme.borderRadius[sideVal],
        borderTopRightRadius: theme.borderRadius[sideVal],
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
  util.border = (val) => {
    if (!val) {
      return {
        borderWidth: 1,
        borderStyle: 'solid',
      }
    }

    const colorKeys = Object.keys(theme.colors)
    const borderWidthKeys = Object.keys(theme.borderWidth)

    if (colorKeys.includes(val)) {
      return {
        borderColor: theme.colors[val],
      }
    } else if (borderWidthKeys.includes(val)) {
      return {
        borderWidth: theme.borderWidth[val],
        borderStyle: 'solid',
      }
    }

    const parts = val.split('-')
    const side = parts[0]
    const sideWidth = borderWidthKeys.includes(parts[1])
      ? theme.borderWidth[parts[1]]
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
  util.opacity = (val) => {
    const opacityKeys = Object.keys(theme.opacity)

    if (opacityKeys.includes(val)) {
      return { opacity: theme.opacity[val] }
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
  util.shadow = (val) => {
    const boxShadowKeys = Object.keys(theme.boxShadow)

    if (boxShadowKeys.includes(val)) {
      return Object.assign(
        {},
        {
          boxShadow: theme.boxShadow[val],
        },
        elevation(val)
      )
    }

    ThrowDevError(
      `${val} doesn't exist in theme.boxShadow. See: tailwind config`
    )
  }

  util.elevation = (val) => {
    const elevationKeys = Object.keys(theme.elevation)

    if (elevationKeys.includes(val)) {
      return {
        elevation: theme.elevation[val],
      }
    }

    ThrowDevError(
      `${val} doesn't exist in theme.elevation. See: tailwind config`
    )
  }

  /**
   * ZIndex
   */
  util.z = (val) => {
    const zIndexKeys = Object.keys(theme.zIndex)

    if (!zIndexKeys.includes(val) || !val) {
      ThrowDevError(
        `${val} doesn't exist in theme.zIndex. See: tailwind.config.js`
      )
    }

    return {
      zIndex: theme.zIndex[val],
    }
  }

  return util
}
