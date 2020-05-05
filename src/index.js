import { setUpUtils } from './set-up-utils'
import { setUpHandleClassNames } from './set-up-handle-classnames'

export default (theme) => {
  const utils = setUpUtils(theme)

  return {
    handleClassnames: setUpHandleClassNames(utils),
  }
}
