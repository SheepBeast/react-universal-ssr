import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select } from 'antd'

import { fetchCaptchaData, register, login } from '../../../actions/common';
import isRequestSuccess from '../../../utils/isRequestSuccess';
import { isMobile } from '../../../constants/regexp'
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
            // this.setState({
            //   captcha: ret.data.data.code
            // })
          } else {
            this.props.form.setFields({
              captcha: {
                value: '',
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
            console.log('submit ret -->', ret)
            console.log('login form -->', accountName, password)
            this.props.autoLogin({
              accountName,
              password
            }).then(res => {
              console.log('submit res -->', res)
              if (isRequestSuccess(res)) {
                this.props.history.push('/')
              } else {
                console.log('auto login fail -->', res.data.reason)
              }
            })
          } else {
            this.props.form.setFields({
              result: {
                // value: '',
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
                  <Input placeholder="账号"></Input>
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
                  <Input placeholder="6 - 16 位密码，区分大小写"></Input>
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
                  }],
                  initialValue: 'asd751011568'
                })(
                  <Input placeholder="确认密码"></Input>
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
                    <Input style={{ width: '80%' }} placeholder="11位手机号"></Input>
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
                      <Input placeholder="输入验证码"></Input>
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
                  <Link to="/login">使用已有账户登录</Link>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    fetchCaptcha: params => dispatch(fetchCaptcha(params)),
    register: params => dispatch(register(params)),
    autoLogin: params => dispatch(login(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Register)))