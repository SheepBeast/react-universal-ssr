import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select } from 'antd'

import './index.less'
import { forgetPassword, fetchCaptcha } from '../../../actions/common'
import isRequestSuccess from '../../../utils/isRequestSuccess';
import { isMobile } from '../../../constants/regexp'

const FormItem = Form.Item
const InputGroup = Input.Group
const Option = Select.Option

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      captcha: null
    }
  }

  fetchCaptcha() {
    this.props.form.validateFields(['accountName', 'password', 'rePassword', 'phoneNo'], (err, val) => {
      console.log('captcha err -->', err)
      console.log('captcha val -->', val)

      if (!err) {
        this.props.fetchCaptcha({
          flag: 7,
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
        this.props.forgetPassword({
          accountName,
          password,
          phoneNo,
          code: captcha
        }).then(ret => {
          if (isRequestSuccess(ret)) {
            this.props.history.push('/login')
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
                  <Input placeholder="确认新密码"></Input>
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

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    fetchCaptcha: params => dispatch(fetchCaptcha(params)),
    forgetPassword: params => dispatch(forgetPassword(params)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ForgetPassword)))