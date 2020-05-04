const tw = require('./utils')

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

module.exports = ({ className }) => {
  if (!className) {
    return
  }

  const classes = className.trim().split(' ')

  const result = classes.map((cssClass) => {
    const [func, ...rest] = cssClass.split('-')
    const val = rest.join('-')

    // try any no-value utilities
    if (!val) {
      try {
        return tw[func]()
      } catch (error) {
        console.log(`${cssClass} doesn't exist`, error)
      }
    }

    // try function(val) utitlies
    if (func && val) {
      try {
        return tw[func](val)
      } catch (error) {
        console.log(`${cssClass} doesn't exist`, error)
      }
    }
  })

  return result
}
