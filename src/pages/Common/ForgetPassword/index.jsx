import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select, message } from 'antd'
import CountDown from 'ant-design-pro/lib/CountDown'
import { forgetPassword, fetchCaptcha, setCommonPage } from '../../../actions/common'
import isRequestSuccess from '../../../utils/isRequestSuccess';
import { isMobile } from '../../../constants/regexp'

import './index.less'


const FormItem = Form.Item
const InputGroup = Input.Group
const Option = Select.Option

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      captcha: null,
      targetTime: null
    }
  }

  fetchCaptcha() {
    if (this.state.targetTime) {
      return
    }
    this.props.form.validateFields(['accountName', 'password', 'rePassword', 'phoneNo'], (err, val) => {
      if (!err) {
        this.props.fetchCaptcha({
          flag: 7,
          phoneNo: val.phoneNo
        }).then(ret => {
          if (isRequestSuccess(ret)) {
            message.success('验证码已发送')
            this.setState({
              targetTime: Date.now() + 60000
            })
          } else {
            message.error(`验证码发送失败，${ret.data.reason}`)
          }
        })
      }
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.form.validateFields((err, val) => {
      if (!err) {
        let { accountName, password, phoneNo, captcha } = val
        this.props.forgetPassword({
          accountName,
          password,
          phoneNo,
          code: captcha
        }).then(ret => {
          if (isRequestSuccess(ret)) {
            // this.props.history.push('/login')
            message.success('重置密码成功')
            this.props.setCommonPage('Login')
          } else {
            message.error(`重置密码失败，${ret.data.reason}`)
          }
        })
      }
    })
  }

  timeFormat(time) {
    return parseInt(time / 1000) + 's'
  }

  onCountDownEnd(type) {
    this.setState({
      targetTime: null
    })
  }

  render() {
    let { getFieldDecorator, getFieldValue, validateFields } = this.props.form
    var { targetTime } = this.state

    return (
      <div id="ForgetPassword">
        <div style={{ width: 430, backgroundColor: 'rgba(255,255,255,0.2)', padding: 30, borderRadius: 4, margin: 'auto' }}>
          <div className="tc mb-20">
            <img src="" alt="" style={{ width: 200, height: 40 }} />
          </div>
          <p>
            <b>忘记密码</b>
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
                      if (!value || value !== getFieldValue('password')) {
                        callback('两次输入的密码不一致')
                      }

                      callback()
                    }
                  }]
                })(
                  <Input type="password" placeholder="确认新密码" />
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
                  <Button className="w-100" onClick={this.fetchCaptcha.bind(this)}>
                    {targetTime ? <CountDown format={this.timeFormat} onEnd={this.onCountDownEnd.bind(this)} target={targetTime} /> : <span>获取验证码</span>}
                  </Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('result')(
                  <Button type="primary" className="w-100" htmlType="submit">确认</Button>
                )
              }

            </FormItem>
          </Form>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCaptcha: params => dispatch(fetchCaptcha(params)),
  forgetPassword: params => dispatch(forgetPassword(params)),
  setCommonPage: params => dispatch(setCommonPage(params))
})

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(ForgetPassword)))