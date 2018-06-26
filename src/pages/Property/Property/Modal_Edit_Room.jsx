import React from 'react'
import { Modal, Select, Form, Upload, Button, Row, Col, Switch, Input, Icon } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Modal_Edit_Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
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
    const { roomName } = this.props.options


    return (
      <Modal title="房间" visible={this.state.visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)} >
        <Form className="form-shim">
          <FormItem label="房间名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('roomName', {
                rules: [{
                  required: true,
                  message: '必须填写房间名称'
                }],
                initialValue: roomName
              })(
                <Input placeholder="请输入房间名称" className="w-100" />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modal_Edit_Room)