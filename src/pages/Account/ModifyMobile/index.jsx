import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Divider, Steps, Form, Input, Select, Row, Col, message, Icon, Button } from 'antd'
import CountDown from 'ant-design-pro/lib/CountDown'
import { fetchCaptcha, setUserInfo } from '../../../actions/common';
import { validateMobile } from '../../../actions/account'
import isRequestSuccess from '../../../utils/isRequestSuccess';

import './index.less'

const Step = Steps.Step
const FormItem = Form.Item
const InputGroup = Input.Group
const Option = Select.Option

class ModifyMobile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,

      oldtargetTime: null,
      newTargetTime: null,

      validatedMobile: null
    }
  }

  fetchCaptcha(type = 'old') {
    if(this.state[`${type}TargetTime`]) {
      return
    }

    var fieldMobile = `${type}Mobile`

    this.props.form.validateFields([fieldMobile], (err, val) => {

      if (!err) {
        this.props.fetchCaptcha({
          flag: type == 'old' ? 5 : 6,
          phoneNo: val[fieldMobile]
        }).then(ret => {
          if (isRequestSuccess(ret)) {
            message.success('验证码发送成功')
            this.setState({
              [`${type}TargetTime`]: Date.now() + 60000
            })
          } else {
            message.error(`验证码发送失败，${ret.data.reason}`)
          }
        })
      }
    })
  }

  onCountDownEnd(type) {
    this.setState({
      [`${type}TargetTime`]: null
    })
  }

  validateMobile(type) {
    var { validateFields, setFields } = this.props.form

    var fieldMobile = `${type}Mobile`,
      fieldCaptcha = `${type}Captcha`

    var fields = [fieldMobile, fieldCaptcha]

    console.log('validate mobile -->', fields)

    validateFields(fields, (err, val) => {
      if (!err) {
        var params = {
          phoneNo: val[fieldMobile],
          code: val[fieldCaptcha],
          type: type == 'old' ? 1 : 2
        }

        console.log('params -->', params)

        this.props.validateMobile(params).then(ret => {
          var _type = type == 'old' ? '旧' : '新'
          if (isRequestSuccess(ret)) {
            message.success(`验证${_type}手机成功`)

            this.setState({
              current: ++this.state.current,
              validatedMobile: params.phoneNo
            })
          } else {
            message.error(`验证${_type}手机成功，${ret.data.reason}`)
          }
        })
      }
    })
  }

  timeFormat(time) {
    return parseInt(time / 1000) + 's'
  }

  backToAccount() {
    var userInfo = this.props.userInfo
    userInfo.phoneNo = this.state.validatedMobile
    this.props.setUserInfo(userInfo)
    this.forceUpdate(() => {
      this.props.push('/account')
    })
  }

  render() {
    var { current, oldTargetTime, newTargetTime } = this.state

    const { getFieldDecorator } = this.props.form

    const oldMobile = this.props.userInfo.phoneNo

    return (
      <div id="ModifyMobile">
        <div className="container" style={{ minHeight: 600 }}>
          <h3>
            <b>更换手机</b>
          </h3>
          <Divider />

          <div style={{ width: 500, margin: 'auto' }}>
            <Steps className="mb-30" current={current}>
              <Step title="验证旧手机" />
              <Step title="验证新手机" />
              <Step title="修改完成" />
            </Steps>

            <br />
            {
              current == 0 ?
                <Form tag="validate-old-mobile" className="stepping-form">
                  <FormItem>
                    <InputGroup compact>
                      <Select defaultValue="86" defaultActiveFirstOption style={{ width: '20%' }}>
                        <Option value="86">+86</Option>
                      </Select>
                      {
                        getFieldDecorator('oldMobile', {
                          rules: [{
                            required: true,
                            message: '手机号不能为空'
                          }],
                          initialValue: oldMobile
                        })(
                          <Input style={{ width: '80%' }} placeholder="11位手机号" />

                        )
                      }
                    </InputGroup>
                  </FormItem>

                  <FormItem>
                    <Row gutter={8}>
                      <Col span={17}>
                        {
                          getFieldDecorator('oldCaptcha', {
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
                        <Button className="w-100" onClick={this.fetchCaptcha.bind(this, 'old')}>
                          {
                            oldTargetTime ? <CountDown format={this.timeFormat} target={oldTargetTime} onEnd={this.onCountDownEnd.bind(this, 'old')} /> : <span>获取验证码</span>
                          }
                        </Button>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator('oldResult')(
                        <Button type="primary" className="w-100" onClick={this.validateMobile.bind(this, 'old')}>下一步</Button>
                      )
                    }
                  </FormItem>
                </Form>
                :
                current == 1 ?
                  <Form tag="validate-new-mobile" className="stepping-form">
                    <FormItem>
                      <InputGroup compact>
                        <Select defaultActiveFirstOption style={{ width: '10%' }}>
                          <Option value="86">+86</Option>
                        </Select>
                        {
                          getFieldDecorator('newMobile', {
                            rules: [{
                              required: true,
                              message: '手机号不能为空'
                            }]
                          })(
                            <Input style={{ width: '90%' }} placeholder="11位手机号" />
                          )
                        }
                      </InputGroup>
                    </FormItem>

                    <FormItem>
                      <Row gutter={8}>
                        <Col span={17}>
                          {
                            getFieldDecorator('newCaptcha', {
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
                          <Button className="w-100" onClick={this.fetchCaptcha.bind(this, 'new')}>
                            {
                              newTargetTime ? <CountDown format={this.timeFormat} target={newTargetTime} onEnd={this.onCountDownEnd.bind(this, 'new')} /> : <span>获取验证码</span>
                            }
                          </Button>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem>
                      {
                        getFieldDecorator('newResult')(
                          <Button type="primary" className="w-100" onClick={this.validateMobile.bind(this, 'new')}>下一步</Button>
                        )
                      }
                    </FormItem>
                  </Form>
                  :
                  <div tag="finished" className="stepping-form tc">
                    <h3>
                      <Icon style={{ color: '#07DC4A', verticalAlign: 'middle' }} className="fs-24 mr-10" type="check-circle-o" />
                      <b style={{ display: 'inline-block', verticalAlign: 'middle' }}>手机号码修改完成！</b>
                    </h3>
                    <br />

                    <Button type="primary" onClick={this.backToAccount.bind(this)}>返回</Button>
                  </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo || {}
})
const mapDispatchToProps = dispatch => ({
  fetchCaptcha: params => dispatch(fetchCaptcha(params)),
  validateMobile: params => dispatch(validateMobile(params)),
  setUserInfo: params => dispatch(setUserInfo(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ModifyMobile)))