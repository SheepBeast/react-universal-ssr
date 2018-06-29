import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Divider, Form, Input, DatePicker, Switch, Select, Row, Col, Checkbox, Alert, Button, Radio, message } from 'antd'
import qs from 'querystring'

import { isMobile, isIdentityNo } from '../../../constants/regexp'
import { addTenant } from '../../../actions/tenant';
import isRequestSuccess from '../../../utils/isRequestSuccess';
import parseQueryToParams from '../../../utils/parseQueryToParams'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

class AddTenant extends Component {
  onSubmit() {
    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log('val -->', val)

        var query = parseQueryToParams(this.props.location.search)

        var params = {...val, ...query}

        console.log('params -->', params)

        this.props.addTenant(params).then(ret => {
          if (isRequestSuccess(ret)) {
            message.success('添加租客成功')
            this.goBack()
          } else {
            message.error(`添加租客失败，${ret.data.reason}`)
          }
        })
      }
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div id="AddTenant" className="container">
        <Row className="mb-20">
          <Col span={12}>
            <h3>
              <b>添加租客</b>
            </h3>
          </Col>
          <Col className="tr" span={12}>
            <Button type="primary" onClick={this.goBack.bind(this)}>返回</Button>
          </Col>
        </Row>


        <div className="container" style={{ border: '1px solid #eee' }} >
          <Form style={{ width: 620 }} className="form-shim">
            <h3>
              <b>基本信息</b>
            </h3>
            <Divider />
            <FormItem label="租客姓名" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
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

            <FormItem label="手机号码" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
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

            <FormItem label="身份证号" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
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

            <FormItem label="性别" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} className="mb-0" >
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
          </Form>
        </div>

        <div className="container" style={{ border: '1px solid #eee' }}>
          <h3>
            <b>备注信息</b>
          </h3>
          <Divider />
          <Form style={{ width: 620 }} className="form-shim">
            <FormItem label="备注" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} className="mb-0">
              {
                getFieldDecorator('remark')(
                  <TextArea autosize={{ minRows: 6, maxRows: 6 }} />
                )
              }
            </FormItem>
          </Form>
        </div>

        <Row style={{ width: 620 }}>
          <Col offset={5}>
            <Button className="mr-20" tonClick={this.goBack.bind(this)}>取消</Button>
            <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
          </Col>
        </Row>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addTenant: params => dispatch(addTenant(params))
})

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(AddTenant)))