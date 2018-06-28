import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Divider, Avatar, Row, Col, message } from 'antd'
import PropTypes from 'prop-types'
import { updateUserInfo, updatePassowrd } from '../../../actions/account';

import Modal_Sex from './Modal_Sex'
import Modal_Avatar from './Modal_Avatar'
import Modal_Modify_Password from './Modal_Modify_Password'

import isRequestSuccess from '../../../utils/isRequestSuccess';
import { setUserInfo } from '../../../actions/common';

const userSexRefers = {
  1: '男',
  2: '女'
}


class Account extends React.Component {
  constructor(props) {
    super(props)

    this.modal = {}
  }

  // sex
  onModalSexInit(modal) {
    this.modal.sex = modal
  }

  onModalSexOk(form) {
    var userInfo = this.props.userInfo

    if (userInfo.userSex == form.userSex) {
      message.success('修改性别成功')
      return
    }

    this.props.updateUserInfo(form).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('修改性别成功')
        var { userSex } = form
        var userInfo = { ...this.props.userInfo, userSex: +userSex }
        this.props.setUserInfo(userInfo)
      } else {
        message.error(`修改性别失败，${ret.data.reason}`)
      }
    })
  }

  // avatar
  onModalAvatarInit(modal) {
    this.modal.avatar = modal
  }

  onModalAvatarOk(form) {
    console.log('avatar form -->', form)

    this.props.updateUserInfo(form).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('更换头像成功')
        var { userPhoto } = form
        var userInfo = { ...this.props.userInfo, userPhoto }
        this.props.setUserInfo(userInfo)
      } else {
        message.error(`更换头像失败，${ret.data.reason}`)
      }
    })
  }


  // modify password
  onModalModifyPasswordInit(modal) {
    this.modal.modifyPassword = modal
  }

  onModalModifyPasswordOk(form) {
    this.props.updatePassword(form).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('修改密码成功')
      } else {
        message.error(`修改密码失败，${ret.data.reason}`)
      }
    })
  }

  render() {
    var { userPhoto, accountName, userSex, phoneNo } = this.props.userInfo

    return (
      <div id="Account">
        <div className="container">
          <h3>
            <b>个人信息</b>
          </h3>
          <Divider />

          <div className="fs-16 mb-20">
            <b>头像：</b>
            <Avatar className="mr-20 br-50" src={userPhoto} style={{ width: 100, height: 100 }} />
            <a onClick={() => { this.modal.avatar.show() }}>修改</a>
          </div>

          <div className="fs-16 mb-20">
            <b>账号：{accountName}</b>
          </div>

          <div className="fs-16">
            <b>性别：</b>
            <span className="mr-20">{userSexRefers[userSex]}</span>
            <a onClick={() => { this.modal.sex.show() }}>修改</a>
          </div>
        </div>

        <div className="container">
          <h3>
            <b>账户安全</b>
          </h3>
          <Divider />
          <div className="fs-16">
            <b>安全验证手机号：</b>
            <span className="mr-20">{phoneNo}</span>
            <Link to="/account-modify-mobile" className="mr-20">修改手机号</Link>
            {/* <Link to="/account-modify-password">修改密码</Link> */}
            <a onClick={() => this.modal.modifyPassword.show()}>修改密码</a>
          </div>
        </div>

        <Modal_Sex onInit={this.onModalSexInit.bind(this)} onOk={this.onModalSexOk.bind(this)} options={{ userSex }} />

        <Modal_Avatar onInit={this.onModalAvatarInit.bind(this)} onOk={this.onModalAvatarOk.bind(this)} options={{ userSex }} />

        <Modal_Modify_Password onInit={this.onModalModifyPasswordInit.bind(this)} onOk={this.onModalModifyPasswordOk.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo || {}
})
const mapDispatchToProps = dispatch => ({
  updateUserInfo: params => dispatch(updateUserInfo(params)),
  updatePassword: params => dispatch(updatePassowrd(params)),
  setUserInfo: params => dispatch(setUserInfo(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)