Use Tailwind in React Native projects the same way you would in a React project.

eg.

```jsx
<Section className="bg-black">
  <Paragraph className="text-white">
    Write code like this in React Native...
  </Paragraph>
</Section>
```

> This package is in its early stages and is experimental. PR's, issues, and thoughts welcome. As always, proceed with caution.

## Installation

```
yarn add react-native-tailwind-classnames
```

> 'react-native-tailwind-classnames` depends on [styled components](https://styled-components.com/docs/basics#installation), you will need to install it separately

## Usage

This package depends on styled components and a `tailwind.config.js` file in your project. The first step is seting up a helper function (`handleClassnames`):

```js
import setUpTailwind from 'react-native-tailwind-classnames'
import {theme} from './tailwind.config'

const {handleClassnames} = setUpTailwind(theme)
```

Passing the tailwind configuration into `setUpTailwind` returns a function that we will use on a styled component to handle the `className` prop:


```js
const Section = styled.View`
  ${handleClassnames}
`
```

Our styled component (`<Section>`) now has support for Tailwind classes derived from the projects `tailwind.config.js` file.


```jsx
<Section className="p-12 bg-gray-500">
  {/* etc */}
</Section>
```

All together, this is the simplest example of usage:

```jsx
import React from 'react';
import styled from 'styled-components/native';
import setUpTailwind from 'react-native-tailwind-classnames';
import {theme} from './tailwind.config';

const {handleClassnames} = setUpTailwind(theme);

const Paragraph = styled.Text`
  ${handleClassnames}
`

const Section = styled.View`
  ${handleClassnames}
`;

const App = () => {
  return (
    <Section className="p-12 bg-gray-500">
      <Paragraph className="text-white">My section!</Paragraph>
    </Section>
  )
}

export default App;
```

## Alternatives:

There are many alternatives out there, if this package doesn't serve your needs I encourage you to try these out:

- [tailwind-rn](https://github.com/vadimdemedes/tailwind-rn)
- [react-native-tailwind](https://github.com/MythicalFish/react-native-tailwind)
- [react-native-tailwindcss](https://github.com/TVke/react-native-tailwindcss)

## VSCode Intellisense:

One of the main reasons for this particular way of approaching Tailwind in RN is to get the nice developer experience that the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) package provides. The only additional step to get this package to work is installing the `tailwindcss` package:

```
npm install tailwindcss
```

or 

```
yarn add tailwindcss
```

## Sample `tailwind.config.js` with all working properties

<details>
  <summary>Click to `tailwind.config.js`!</summary>

  ```js
  module.exports = {
    theme: {
      colors: {
        white: 'white',
        'gray-500': '#a4a0ac',
        black: 'black',

        // blues
        'blue-500': '#1d54ef',

        // purples
        'purple-500': '#4b3e8c',

        // greens
        'green-500': '#12795e',

        // oranges
        'orange-500': '#cf4a20',

        // reds
        'red-500': '#d64040',

        transparent: 'rgba(255, 255, 255, 0)',
      },
      spacing: {
        px: 1,
        0: 0,
        4: 4,
        8: 8,
        12: 12,
        16: 16,
        24: 24,
        32: 32,
        40: 40,
        48: 48,
        '1/2': '50%',
        '3/4': '75%',
        '2/3': '66%',
        full: '100%',
        auto: 'auto',
      },
      fontFamily: {
        sans: 'MuseoSans-300',
        sansSemiBold: 'MuseoSans-500',
        sansBold: 'MuseoSans-700',
        sansExtraBold: 'MuseoSans-900',
      },
      fontSize: {
        jb: 40,
        xl: 24,
        lg: 20,
        md: 18,
        sm: 16,
        xs: 14,
      },
      height: theme => ({
        ...theme('spacing'),
      }),
      lineHeight: {
        xs: 1.3,
        sm: 1.42,
        md: 1.55,
        lg: 1.6,
        xl: 1.15,
        jb: 1.15,
      },
      margin: (theme, {negative}) => ({
        ...theme('spacing'),
      }),
      padding: theme => theme('spacing'),
      width: theme => ({
        ...theme('spacing'),
      }),
      borderRadius: {
        full: '9999px',
        sm: '4px',
        md: '5px',
        lg: '8px',
      },
      borderColor: theme => ({
        ...theme('colors'),
      }),
      borderWidth: {
        default: '1px',
        '2': '2px',
        '6': '6px',
      },
      opacity: {
        '0': '0',
        '20': '0.2',
        '40': '0.4',
        '60': '0.6',
        '100': '1',
      },
      inset: {
        '0': '0',
        full: '100%',
        auto: 'auto',
      },
      boxShadow: {
        sm: '0px 7px 7px rgba(0, 0, 0, 0.14);',
        md: '0px 4px 44px rgba(5, 5, 6, 0.36);',
      },
      // elevation keys must match boxShadow keys! the `shadow-<value>` class will automatically set elevation
      elevation: {
        // @TODO figure out shadows
        sm: 0,
        md: 0,
        card: 0,
      },
      zIndex: {
        under: -1,
        bottom: 0,
        low: 1,
        middle: 10,
        top: 100,
      },
    },
    variants: {
      alignItems: [],
      alignSelf: [],
      backgroundColor: [],
      borderRadius: [],
      borderColor: [],
      borderStyle: [],
      borderWidth: [],
      boxShadow: [],
      display: [],
      flex: [],
      flexDirection: [],
      fontFamily: [],
      fontStyle: [],
      fontSize: [],
      height: [],
      inset: [],
      justifyContent: [],
      margin: [],
      overflow: [],
      opacity: [],
      padding: [],
      position: [],
      textAlign: [],
      textColor: [],
      textDecoration: [],
      textTransform: [],
      width: [],
      zIndex: [],
    },
    corePlugins: {
      alignContent: false,
      appearance: false,
      backgroundAttachment: false,
      backgroundPosition: false,
      backgroundRepeat: false,
      backgroundSize: false,
      borderCollapse: false,
      cursor: false,
      fill: false,
      flexGrow: false,
      flexShrink: false,
      flexWrap: false,
      float: false,
      fontSmoothing: false,
      fontWeight: false,
      letterSpacing: false,
      lineHeight: false,
      listStylePosition: false,
      listStyleType: false,
      maxHeight: false,
      maxWidth: false,
      minHeight: false,
      minWidth: false,
      objectFit: false,
      objectPosition: false,
      order: false,
      outline: false,
      placeholderColor: false,
      pointerEvents: false,
      resize: false,
      stroke: false,
      tableLayout: false,
      userSelect: false,
      verticalAlign: false,
      visibility: false,
      whitespace: false,
      wordBreak: false,
      preflight: false,
      accessibility: false,
      container: false,
      transformOrigin: false,
      transitionDuration: false,
      transitionTimingFunction: false,
      transitionProperty: false,
      translate: false,
      rotate: false,
      scale: false,
    },
  }
  ```  
</details>


## TODO

- Custom padding, margin, width, height, etc..
- Negatives
- Clean up README
