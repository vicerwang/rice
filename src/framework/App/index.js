import LLPage from './LLPage'
import renderSync from '../__internal__/renderSync'
import * as DEFAULT_CONFIG from '../__internal__/constants'
import EventBus from '../EventBus'

class App extends LLPage {
  constructor(props) {
    super(props)
    const { _eventBus, _viewHandlers } = this.props

    this.$eventbus = _eventBus
    this.$viewHandlers = _viewHandlers
  }

  $pageFactory(View) {
    if (!View.isRiceView) throw new Error('View must be Rice.View')
    return (data, ...args) => new View(this, data, ...args)
  }

  $useView(name) {
    if (!this.$viewHandlers[name]) throw new Error('No such view handler')
    return this.$viewHandlers[name]
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    this.$eventbus.close()
  }

  $mountWidget(Widget, container, props) {
    return renderSync(
      <Widget
        {...props}
        _app={this}
        _eventBus={new EventBus(DEFAULT_CONFIG.ROOT_CHANNEL_NAME)}
      />,
      container
    )
  }
}

App.isRiceApp = true

export default App
