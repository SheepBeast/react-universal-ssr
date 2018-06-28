import React from 'react'
import { Modal, Select, Form, Input } from 'antd'

const FormItem = Form.Item

class Modal_Modify_Password extends React.Component {
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
        var { oldPassword, newPassword } = val

        this.props.onOk({ oldPassword, newPassword })
        this.hide()
      }
    })

  }

  render() {
    var { visible } = this.state
    const { getFieldDecorator, getFieldValue } = this.props.form


    return (
      <Modal title="修改性别" visible={visible} destroyOnClose={true} okText="确定" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form className="form-shim">
          <FormItem label="原密码" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {
              getFieldDecorator('oldPassword', {
                rules: [{
                  required: true,
                  message: '密码不能为空'
                }, {
                  min: 6,
                  max: 16,
                  message: '密码长度为6到16位'
                }],
                validateFirst: true
              })(
                <Input type="password" autoComplete="false" placeholder="输入原密码" />
              )
            }
          </FormItem>
          <FormItem label="新密码" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {
              getFieldDecorator('newPassword', {
                rules: [{
                  required: true,
                  message: '密码不能为空'
                }, {
                  min: 6,
                  max: 16,
                  message: '密码长度为6到16位'
                }],
                validateFirst: true
              })(
                <Input type="password" autoComplete="false" placeholder="输入新密码" />
              )
            }
          </FormItem>
          <FormItem label="确认新密码" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {
              getFieldDecorator('rePassword', {
                rules: [{
                  required:true,
                  message: '密码不能为空'
                },{
                  validator: (rule, value, callback) => {
                    if (!value || value !== getFieldValue('newPassword')) {
                      callback('两次输入的密码不一致')
                    }
                    callback()
                  }
                }]
              })(
                <Input type="password" autoComplete="false" placeholder="输入确认密码" />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modal_Modify_Password)