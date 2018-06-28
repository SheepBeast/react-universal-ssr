import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Divider, Form, Input, DatePicker, Switch, Select, Row, Col, Checkbox, Alert, Button, Radio } from 'antd'
import qs from 'querystring'

import { isMobile, isIdentityNo } from '../../../constants/regexp'
import { addTenant } from '../../../actions/tenant';

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

class AddTenant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input_password_disabled: true,

      beginDate: null,
      endDate: null
    }
  }

  onCheckBoxChange(e) {
    let { checked } = e.target

    this.setState({
      input_password_disabled: !checked
    })
  }

  onBeginDateChange(_, dateString) {
    console.log('date string -->', dateString)
    this.setState({
      beginDate: dateString
    })
  }

  onEndDateChange(_, dateString) {
    this.setState({
      endDate: dateString
    })
  }

  parseQueryToParams() {
    let search = this.props.location.search.replace('?', ''), k, params = {}
    search = qs.parse(search)

    for (k in search) {
      params[k] = decodeURIComponent(search[k])
    }

    return params
  }

  onSubmit() {
    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log('val -->', val)

        let { keyType1, password, keyType2, cardNo } = val

        var list = []

        if (keyType1) {
          var item = {
            keyType: 2
          }
          if (!this.state.input_password_disabled && password) {
            item.password = password
          }

          list.push(item)
        }

        if (keyType2) {
          var item = {
            keyType: 4
          }
          if (cardNo) {
            item.password = cardNo
          }

          list.push(item)
        }

        var query = this.parseQueryToParams()

        var params = { list, ...query, ...val }

        let { beginDate, endDate } = this.state

        console.log('date -->', beginDate, endDate)

        if (beginDate) {
          params.beginDate = beginDate
        }

        if (endDate) {
          params.endDate = endDate
        }

        console.log('params -->', params)

        this.props.addRenter(params)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div id="AddTenant" className="container">
        <Row className="mb-20">
          <Col span={12}>
            <h3>
              <b>增加租客</b>
            </h3>
          </Col>
          <Col className="tr" span={12}>
            <Button type="primary" onClick={() => { this.props.history.goBack() }}>返回</Button>
          </Col>
        </Row>


        <div className="container" style={{ border: '1px solid #eee' }} >
          <Form className="form-shim">
            <Row>
              <Col span={10}>
                <h3>
                  <b>基本信息</b>
                </h3>
                <Divider />
                <FormItem label="租客姓名" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
                  {
                    getFieldDecorator('tenantName', {
                      rules: [{
                        required: true,
                        message: '租客姓名不能为空'
                      }]
                    })(
                      <Input />
                    )
                  }

                </FormItem>

                <FormItem label="手机号码" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
                  {
                    getFieldDecorator('phoneNo', {
                      rules: [{
                        required: true,
                        message: '手机号码不能为空'
                      }, {
                        validator: (rule, value, callback) => {
                          if (!isMobile.test(value)) {
                            callback('手机号码格式错误')
                          }
                          callback()
                        }
                      }],
                      validateFirst: true
                    })(
                      <Input />
                    )
                  }
                </FormItem>

                <FormItem label="身份证号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
                  {
                    getFieldDecorator('credentialNum', {
                      rules: [{
                        required: true,
                        message: '身份证号不能为空'
                      }, {
                        validator: (rule, value, callback) => {
                          if (!isIdentityNo.test(value)) {
                            callback('身份证号格式错误')
                          }
                          callback()
                        }
                      }],
                      validateFirst: true
                    })(
                      <Input />
                    )
                  }
                  {
                    getFieldDecorator('credentialType', {
                      initialValue: 1
                    })(
                      <Input style={{ display: 'none' }} />
                    )
                  }

                </FormItem>

                <FormItem label="性别" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} className="mb-0" >
                  {
                    getFieldDecorator('sex', {
                      rules: [{
                        required: true,
                        message: '必须选择性别'
                      }]
                    })(
                      <RadioGroup style={{ marginTop: 4 }}>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                      </RadioGroup>
                    )
                  }
                </FormItem>
              </Col>

              <Col span={10} offset={1} >
                <h3>
                  <b>租期信息</b>
                </h3>
                <Divider />
                <FormItem label="起租日期" labelCol={{ span: 3 }} wrapperCol={{ span: 11 }} >
                  <DatePicker className="w-100" onChange={this.onBeginDateChange.bind(this)} placeholder="起始时间" />
                </FormItem>

                <FormItem label="到租日期" labelCol={{ span: 3 }} wrapperCol={{ span: 11 }} >
                  <DatePicker className="w-100" onChange={this.onEndDateChange.bind(this)} placeholder="结束时间" />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="container" style={{ border: '1px solid #eee' }}>
          <h3>
            <b>授权信息</b>
          </h3>
          <Divider />
          <Form className="form-shim">
            <FormItem label="授权密码" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} >
              <Row>
                <Col span={1}>
                  {
                    getFieldDecorator('keyType1', {
                      valuePropName: 'checked',
                      initialValue: true
                    })(
                      <Switch style={{ marginTop: 4 }} />
                    )
                  }
                </Col>
                <Col span={4}>
                  {
                    getFieldDecorator('password')(
                      <Input type="password" disabled={this.state.input_password_disabled} />
                    )
                  }
                </Col>
                <Col span={4}>
                  <Checkbox onChange={this.onCheckBoxChange.bind(this)} className="ml-20" style={{ height: 32, lineHeight: '32px' }} >自定义</Checkbox>
                </Col>
              </Row>
            </FormItem>

            <FormItem label="授权卡号" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} className="mb-0" >
              <Row >
                <Col span={1}>
                  {
                    getFieldDecorator('keyType2', {
                      valuePropName: 'checked',
                      initialValue: true
                    })(
                      <Switch style={{ marginTop: 4 }} />
                    )
                  }
                </Col>
                <Col span={4}>
                  {
                    getFieldDecorator('cardNo')(<Input />)
                  }
                </Col>
              </Row>
            </FormItem>
          </Form>

        </div>

        <div className="container" style={{ border: '1px solid #eee' }}>
          <h3>
            <b>备注信息</b>
          </h3>
          <Divider />
          <Form className="form-shim">
            <FormItem label="备注" labelCol={{ span: 1 }} wrapperCol={{ span: 12 }} className="mb-0">
              {
                getFieldDecorator('remark')(
                  <TextArea autosize={{ minRows: 6, maxRows: 6 }} />
                )
              }
            </FormItem>
          </Form>
        </div>

        <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addRenter: params => dispatch(addTenant(params))
})

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(AddTenant)))