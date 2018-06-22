import React from 'react'
import { Modal, Select, Form, Upload, Button, Row, Col, Switch, Input, Icon } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Modal_Modify_Property extends React.Component {
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
                initialValue: this.props.roomName
              })(
                <Input placeholder="请输入房间名称" className="w-100" />
              )
            }
          </FormItem>

          {/* <FormItem label="房产类型" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('houseType', {
                rules: [{
                  required: true,
                  message: '必须选择房产类型'
                }]
              })(
                <Select placeholder="请选择房产类型" className="w-100">
                  <Option value="1">经济型酒店</Option>
                  <Option value="2">主题酒店</Option>
                  <Option value="3">商务酒店</Option>
                  <Option value="4">公寓豪华酒店</Option>
                  <Option value="5">客栈</Option>
                  <Option value="6">青年旅社</Option>
                </Select>
              )
            }
          </FormItem> */}

          {/* <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            <Upload>
              <div className="pt-19 pr-19 pb-19 pl-19 tc bg-w" style={{ border: '1px dashed #ddd', borderRadius: 4 }} >
                <Icon type={this.state.loading ? 'loading' : 'plus'} style={{
                  fontSize: 30,
                  color: '#ddd',
                  fontWeight: 100
                }} />
              </div>
            </Upload>
          </FormItem> */}
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modal_Modify_Property)