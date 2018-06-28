import React from 'react'
import { Modal, Select, Form } from 'antd'

const Option = Select.Option
const FormItem = Form.Item

const userSexRefers = {
  1: '男',
  2: '女'
}


export default class Modal_Sex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      userSex: userSexRefers[this.props.options.userSex || '1']
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
    this.props.onOk({
      userSex: this.state.userSex
    })
    this.hide()
  }

  onSexChange(e){
    console.log('e -->', e)
    this.setState({
      userSex: e
    })
  }

  render() {
    var { userSex, visible } = this.state

    return (
      <Modal title="修改性别" visible={visible} destroyOnClose={true} okText="确定" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form>
          <FormItem label="性别" labelCol={2}>
            <Select value={userSex} onChange={this.onSexChange.bind(this)}>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}