export default function setUpHandleClassNames(tw) {
  return function handleClassNames({ className }) {
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
}
