import React from 'react'
import { Modal, Select, Form, Upload, Button, Row, Col, Switch, Input, Icon } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Modal_Edit_House extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  show() {
    this.setState({
      visible: true
    })
  }

  hide() {
    this.setState({
      visible: false
    })
  }

  componentDidMount() {
    this.props.onInit(this)
  }

  onOk(e) {
    this.props.form.validateFields((err, val) => {
      if (!err) {
        this.props.onOk(val)
        this.hide()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const { houseName, houseType } = this.props.options

    return (
      <Modal title="编辑房产" visible={this.state.visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)} >
        <Form className="form-shim">
          <FormItem label="房产" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('houseName', {
                rules: [{
                  required: true,
                  message: '房产名称不能为空'
                }],
                initialValue: houseName
              })(
                <Input placeholder="请输入房产名称" className="w-100" />
              )
            }
          </FormItem>

          <FormItem label="房产类型" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('houseType', {
                rules: [{
                  required: true,
                  message: '必须选择房产类型'
                }],
                initialValue: houseType
              })(
                <Select placeholder="请选择房产类型" className="w-100">
                  <Option value="1">公寓/小区/住宅</Option>
                  <Option value="2">酒店/旅社</Option>
                  <Option value="3">写字楼/办公室</Option>
                  <Option value="4">商铺/门市房</Option>
                  <Option value="5">厂房/车间</Option>
                </Select>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modal_Edit_House)