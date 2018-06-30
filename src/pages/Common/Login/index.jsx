import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from 'antd';
import PropTypes from 'prop-types'

import { login, setCommonPage } from '../../../actions/common'
import isRequestSuccess from '../../../utils/isRequestSuccess';

const FormItem = Form.Item;


class Login extends React.Component {
  componentWillMount() {
    var remember = localStorage.getItem('hsj_remember')
    if (remember == 1) {
      var accountName = localStorage.getItem('hsj_accountName'),
        password = localStorage.getItem('hsj_password')

      this.login({ accountName, password })
    }
  }

  login(params, callback) {
    this.props.login(params).then((ret) => {
      console.log('ret -->', ret)
      if (isRequestSuccess(ret)) {

        callback && callback()

        this.props.history.push('/')

      } else {
        message.error(`登陆失败，${ret.data.reason}`)
      }
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log('received val of form: ', val)

        this.login(val, () => {
          if (val.remember) {
            localStorage.setItem('hsj_remember', 1)
            localStorage.setItem('hsj_accountName', val.accountName)
            localStorage.setItem('hsj_password', val.password)
          }
        })
      }
    })
  }

  setCommonPage(page) {
    this.props.setCommonPage(page)
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div id="Login">
        <div className="pt-30 pr-30 pb-30 pl-30" style={{ width: 430, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, margin: 'auto' }}>
          <div className="tc mb-20">
            <img src="" alt="" style={{ width: 200, height: 40 }} />
          </div>
          <br />
          <Form onSubmit={this.onSubmit.bind(this)}>
            <FormItem>
              {
                getFieldDecorator('accountName', {
                  rules: [{
                    required: true,
                    message: '账号不能为空'
                  }]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账户" style={{ height: 32 }} />
                )
              }

            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '密码不能为空'
                  }, {
                    min: 6,
                    max: 16,
                    message: '密码为6-16位'
                  }]
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" autoComplete="false" placeholder="密码" style={{ height: 32 }} />
                )
              }
            </FormItem>

            <FormItem>
              <Row>
                <Col span={12}>
                  {
                    getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: localStorage.getItem('hsj_remember') == 1 ? true : false
                    })(
                      <Checkbox>自动登陆</Checkbox>
                    )
                  }

                </Col>
                <Col span={12} className="tr">
                  {/* <Link to="/register" className="mr-20">注册账户</Link>
                  <Link to="/forget-password" style={{ color: '#333' }}>忘记密码</Link> */}
                  <a className="mr-20" onClick={this.setCommonPage.bind(this, 'Register')}>注册账户</a>
                  <a style={{ color: '#333' }} onClick={this.setCommonPage.bind(this, 'ForgetPassword')} > 忘记密码</a>
                </Col>
              </Row>

            </FormItem>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} >登陆</Button>
          </Form>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: params => dispatch(login(params)),
    setCommonPage: params => dispatch(setCommonPage(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(Login)))