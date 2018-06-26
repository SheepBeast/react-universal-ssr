import React from 'react'
import { Modal, Select, Form, Upload, Button, Row, Col, Switch, Input, InputNumber, Icon } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Modal_Add_Floor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      batch: false
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
        var { floorStartNum, floorEndNum } = val

        var subtract = floorEndNum - floorStartNum, errorMsg

        if (subtract > 50) {
          errorMsg = '一次最多只能添加50个楼层'
        } else if (subtract < 1) {
          errorMsg = '至少添加1个楼层'
        }

        console.log('errorMsg', errorMsg)

        if (errorMsg) {
          this.props.form.setFields({
            floorEndNum: {
              errors: [new Error(errorMsg)]
            }
          })
        } else {
          this.props.onOk(val)
          this.hide()
        }
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
    const { batch } = this.state

    return (
      <Modal title="添加楼层" visible={this.state.visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)} >
        <Form className="form-shim">
          <FormItem label="批量添加" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('batch', {
                valuePropName: 'checked'
              })(
                <Switch onChange={this.onBatchChange.bind(this)} defaultChecked={batch} />
              )
            }
          </FormItem>

          {
            batch ?
              <div>
                <FormItem label="名称前缀" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                  {
                    getFieldDecorator('floorNamePrefix', {
                      rules: [{
                        required: true,
                        message: '名称前缀不能为空'
                      }]
                    })(
                      <Input />
                    )
                  }
                </FormItem>

                <FormItem label="名称后缀" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                  {
                    getFieldDecorator('floorNameSuffix', {
                      rules: [{
                        required: true,
                        message: '名称后缀不能为空'
                      }]
                    })(
                      <Input />
                    )
                  }
                </FormItem>

                <FormItem label="起始编号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                  {
                    getFieldDecorator('floorStartNum', {
                      rules: [{
                        required: true,
                        message: '起始编号不能为空'
                      }]
                    })(
                      <InputNumber min="0" />
                    )
                  }
                </FormItem>

                <FormItem label="结束编号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                  {
                    getFieldDecorator('floorEndNum', {
                      rules: [{
                        required: true,
                        message: '结束编号不能为空'
                      }]
                    })(
                      <InputNumber min="0" />
                    )
                  }
                </FormItem>

              </div>

              :
              // ------------------------------
              <FormItem label="楼层名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                {
                  getFieldDecorator('floorName', {
                    rules: [{
                      required: true,
                      message: '楼层名称不能为空'
                    }]
                  })(
                    <Input />
                  )
                }
              </FormItem>
          }


        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modal_Add_Floor)