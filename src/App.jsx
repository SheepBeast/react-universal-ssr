import React from 'react'
import { connect } from 'react-redux'

import Index from './pages/Index/index'
import Login from './pages/Common/Login/index'

class App extends React.Component {
  render() {
    let page = this.props.tokenID ? <Index /> : <Login />
    // let page = <Index />
    return (
      <div>
        {page}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tokenID: state.tokenID
})

export default connect(mapStateToProps, null, null, { pure: false })(App)