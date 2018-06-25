import React from 'react'
import { connect } from 'react-redux'

import Login from '../Login/index'
import Register from '../Register/index'
import ForgetPassword from '../ForgetPassword/index'

const pages = {
  Login,
  Register,
  ForgetPassword
}

class Common extends React.Component {
  render() {
    let Page = pages[this.props.page]

    return <Page />
  }
}

const mapStateToProps = state => ({
  page: state.page || 'Login'
})

export default connect(mapStateToProps)(Common)