import Utils from './utils'
import SetupHandleClassnames from './handle-classnames'

export default (theme) => {
  return {
    tw: new Utils(theme),
    handleClassnames: SetupHandleClassnames(tw),
  }
}
