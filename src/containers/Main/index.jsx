import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Layout, message, Avatar, Popover, Divider } from 'antd'

import getRoutes from '../../router'
import isRequestSuccess from '../../utils/isRequestSuccess';
import { logout, setCommonPage, setTokenID, setUserInfo } from '../../actions/common';

const Content = Layout.Content

class Main extends React.Component {
  logout() {
    this.props.logout().then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('退出成功')
        // this.props.history.push('/login')


        localStorage.setItem('hsj_remember', 0)
        localStorage.setItem('hsj_accountName', "")
        localStorage.setItem('hsj_password', "")

        this.props.setCommonPage('Login')
        this.props.setTokenID("")
        this.props.setUserInfo({})
      } else {
        message.error(`退出成功，${ret.data.reason}`)
      }
    })
  }

  render() {
    let { userPhoto, accountName } = this.props.userInfo

    return (
      <Content id="Main" >
        <div className="pr-30 tr bg-w" style={{ height: 64, borderBottom: '1px solid #eee', lineHeight: '64px', fontSize: 14 }}>
          <Popover
            content={
              <div className="tc">
                <Link to="/Account">个人中心</Link>
                <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                <a onClick={this.logout.bind(this)}>
                  <b>退出</b>
                </a>
              </div>
            }
          >
            <a>
              <Avatar src={userPhoto} className="mr-10" />
              <span>{accountName}</span>
            </a>
          </Popover>
        </div>
        <div className="pt-30 pr-30 pl-30">
          {getRoutes()}
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo || {},
  tokenID: state.tokenID || ''
})
const mapDispatchToProps = dispatch => ({
  logout: params => dispatch(logout(params)),
  setCommonPage: params => dispatch(setCommonPage(params)),
  setUserInfo: params => dispatch(setUserInfo(params)),
  setTokenID: params => dispatch(setTokenID(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))