Use Tailwind in React Native projects the same way you would in a React project.

eg.

```jsx
<Section className="bg-black">
  <Paragraph className="text-white">
    Write code like this in React Native...
  </Paragraph>
</Section>
```

> Note: this package is in its early stages and is experimental. PR's, issues, and thoughts welcome. As always, proceed with caution.

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
      <Paragraph>My section!</Paragraph>
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