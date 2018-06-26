import React from 'react'
import { Modal, Select, Form, Upload, Button, Row, Col, Switch, Input, InputNumber, Icon } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Modal_Edit_Floor extends React.Component {
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

  onBatchChange() {
    this.setState({
      batch: !this.state.batch
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const { floorName } = this.props.options

    return (
      <Modal title="添加楼层" visible={this.state.visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)} >
        <Form className="form-shim">
          <FormItem label="楼层名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('floorName', {
                rules: [{
                  required: true,
                  message: '楼层名称不能为空'
                }],
                initialValue: floorName
              })(
                <Input />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modal_Edit_Floor)