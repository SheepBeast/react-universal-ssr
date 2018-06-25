import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select, message } from 'antd'

import { fetchCaptcha, register, login, setCommonPage, setUserInfo, setTokenID } from '../../../actions/common';
import isRequestSuccess from '../../../utils/isRequestSuccess';
import { isMobile } from '../../../constants/regexp'
import { api } from '../../../api'
import './index.less'

const FormItem = Form.Item
const InputGroup = Input.Group
const Option = Select.Option




class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      captcha: null
    }
  }



  fetchCaptcha() {
    this.props.form.validateFields(['accountName', 'password', 'rePassword', 'phoneNo'], (err, val) => {

      if (!err) {
        this.props.fetchCaptcha({
          flag: 4,
          phoneNo: val.phoneNo
        }).then(ret => {
          if (isRequestSuccess(ret)) {
            console.log('register ret -->', ret)
            // this.setState({
            //   captcha: ret.data.data.code
            // })
          } else {
            this.props.form.setFields({
              captcha: {
                errors: [
                  new Error(ret.data.reason)
                ]
              }
            })
          }

        })
      }
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.form.validateFields((err, val) => {
      console.log('submit err -->', err)
      console.log('submit val -->', val)

      if (!err) {
        let { accountName, password, phoneNo, captcha } = val
        this.props.register({
          accountName,
          password,
          phoneNo,
          code: captcha
        }).then(ret => {
          if (isRequestSuccess(ret)) {
            this.props.login({
              accountName,
              password
            }).then(res => {
              if (isRequestSuccess(res)) {
                const { businessUserInfo, tokenId } = res.data.data

                console.log('register ret -->', res)

                message.success('注册成功')

                this.props.setUserInfo(businessUserInfo)
                this.props.setTokenID(tokenId)


                api.tokenId = tokenId

                this.props.history.push('/')
              } else {
                console.log('auto login fail -->', res.data.reason)
              }
            })
          } else {
            this.props.form.setFields({
              result: {
                errors: [
                  new Error(ret.data.reason)
                ]
              }
            })
          }

        })
      }
    })
  }

  setCommonPage(page) {
    this.props.setCommonPage(page)
  }

  render() {
    let { getFieldDecorator, getFieldValue, validateFields } = this.props.form

    return (
      <div id="Register">
        <div style={{ width: 430, backgroundColor: 'rgba(255,255,255,0.2)', padding: 30, borderRadius: 4, margin: 'auto' }}>
          <div className="tc mb-20">
            <img src="" alt="" style={{ width: 200, height: 40 }} />
          </div>
          <p>
            <b>注册</b>
          </p>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <FormItem>
              {
                getFieldDecorator('accountName', {
                  rules: [{
                    required: true,
                    message: '账号不能为空'
                  }]
                })(
                  <Input placeholder="账号" />
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
                  }],
                  validateFirst: true
                })(
                  <Input type="password" placeholder="6 - 16 位密码，区分大小写" />
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('rePassword', {
                  rules: [{
                    validator: (rule, value, callback) => {
                      console.log('re password -->', rule, value)

                      if (!value || value !== getFieldValue('password')) {
                        callback('两次输入的密码不一致')
                      }

                      callback()
                    }
                  }]
                })(
                  <Input type="password" placeholder="确认密码" />
                )
              }
            </FormItem>
            <FormItem>
              <InputGroup compact>
                <Select defaultValue="0" style={{ width: '20%' }}>
                  <Option value="0">+86</Option>
                </Select>
                {
                  getFieldDecorator('phoneNo', {
                    rules: [{
                      required: true,
                      message: '手机不能为空'
                    }, {
                      validator: (rule, value, callback) => {
                        if (!isMobile.test(value)) {
                          callback('手机格式错误')
                        }

                        callback()
                      }
                    }],
                    validateFirst: true
                  })(
                    <Input style={{ width: '80%' }} placeholder="11位手机号" />
                  )
                }
              </InputGroup>
            </FormItem>

            <FormItem className="my-captcha-form-item">
              <Row gutter={8}>
                <Col span={17}>
                  {
                    getFieldDecorator('captcha', {
                      rules: [{
                        required: true,
                        max: 6,
                        message: '验证码错误'
                      }]
                    })(
                      <Input placeholder="输入验证码" />
                    )
                  }

                </Col>
                <Col span={7}>
                  <Button onClick={this.fetchCaptcha.bind(this)}>获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span={12}>
                  {
                    getFieldDecorator('result')(
                      <Button type="primary" style={{ width: 176 }} htmlType="submit">注 册</Button>
                    )
                  }

                </Col>
                <Col span={12} className="tr">
                  {/* <Link to="/login">使用已有账户登录</Link> */}
                  <a onClick={this.setCommonPage.bind(this, 'Login')}>使用已有账户登录</a>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCaptcha: params => dispatch(fetchCaptcha(params)),
  register: params => dispatch(register(params)),
  login: params => dispatch(login(params)),
  setCommonPage: params => dispatch(setCommonPage(params)),
  setUserInfo: params => dispatch(setUserInfo(params)),
  setTokenID: params => dispatch(setTokenID(params))
})

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(Register)))