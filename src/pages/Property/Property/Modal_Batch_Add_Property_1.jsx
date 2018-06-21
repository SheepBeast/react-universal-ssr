import React from 'react'
import { Modal, Form, Input, InputNumber, Upload, Icon, Switch, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Modal_Batch_Add_Property_1 extends React.Component {
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
      <Modal title="批量添加房产1" visible={this.state.visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form className="form-shim">
          <FormItem label="房产名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('houseName', {
                rules: [{
                  required: true,
                  message: '房产名称不能为空'
                }]
              })(
                <Input className="w-100" />
              )
            }
          </FormItem>

          <FormItem label="房产类型" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
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
          </FormItem>

          <FormItem label="楼栋数量" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('buildingNum', {
                rules: [{
                  required: true,
                  message: '楼栋数量不能为空'
                }, {
                  validator: (rule, value, callback) => {
                    if (!value || !(value > 1 && value <= 50)) {
                      callback('楼栋数量必须大于1且小于50')
                    }
                    callback()
                  }
                }],
                validateFirst: true
              })(
                <InputNumber className="w-100" />
              )
            }
          </FormItem>

          <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            <Upload>
              <div className="pt-19 pr-19 pb-19 pl-19 tc bg-w" style={{ border: '1px dashed #ddd', borderRadius: 4 }} >
                <Icon type={this.state.loading ? 'loading' : 'plus'} style={{
                  fontSize: 30,
                  color: '#ddd',
                  fontWeight: 100
                }} />
              </div>
            </Upload>
          </FormItem>

          <FormItem label="批量添加" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('batch', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Switch style={{ marginTop: 4 }} disabled />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modal_Batch_Add_Property_1)