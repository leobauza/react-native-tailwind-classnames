## Installation

```
yarn add react-native-tailwind-classnames
```

> 'react-native-tailwind-classnames` depends on [styled components](https://styled-components.com/docs/basics#installation), you will need to install that separately

## Usage

```js
import {theme} from '../../tailwind.config'
import setup from 'react-native-tailwind-classnames'

export const {tw, handleClassnames} = setup(theme)
```

`react-native-tailwind-classnames` is used together with [Styled Components](https://styled-components.com/docs/basics#react-native)

```jsx
import React from 'react'
import styled from 'styled-components/native'
import {handleClassNames} from 'FROM-THE-OTHER-FILE'

export const Section = styled.View`
  ${handleClassNames}
`
```

Then the styled component will handle any (supported) tailwind class. 

```jsx
<Section className="absolute inset-0 w-full h-full">
  {/* etc */}
</Section>
```

> Note: `react-native-tailwind-classnames` uses the `tailwind.config.js` file at the root of your project.

## Why?

TODO


```js
/**
 * Write classes in tailwindcss format:
 *
 * eg.
 * 
 * import `handleClassNames` and pass it to any styled-component
 * 
 * ```js
 * import styled from 'styled-components/native'
 * import handleClassNames from '../../styles/handle-classnames'

 * export const Section = styled.View`
 *  ${handleClassNames}
 * `
 * ```
 *
 * That component can then be styled via classNames
 * 
 * ```js
 * <Section className="mb-8">
 *    // ...etc
 * </Section>
 * ```
 * 
 * Behind the scenes the classname is convered to `tw.mb(8)` and produces `marginBottom: 8`
 *
 * See tailwind.config.js to check what is available
 */
```