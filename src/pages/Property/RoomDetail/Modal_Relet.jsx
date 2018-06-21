import React from 'react'
import { Divider, Form, Input, Select, Row, Col, Button, Modal, InputNumber } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const InputGroup = Input.Group

class Relet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,

      visible: false,

      oldEndDate: null,
      newEndDate: null,
      time: 0,
      unit: 'd'
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

  componentWillReceiveProps(props) {
    if (props.oldEndDate) {
      this.setState({
        oldEndDate: props.oldEndDate
      }, () => {
        this.compute()
      })
    }
  }

  onOk(e) {
    this.props.onOk({
      newEndDate: this.state.newEndDate
    })
    this.hide()
  }

  onTimeChange(time) {
    this.setState({
      time
    }, this.compute)
  }

  onUnitChange(unit) {
    this.setState({
      unit
    }, this.compute)
  }

  compute() {
    let { time, unit, oldEndDate } = this.state
    let newEndDate = moment(oldEndDate, 'YYYY-MM-DD').add(time, unit).format('YYYY-MM-DD')

    this.setState({
      newEndDate
    })
  }

  render() {
    return (
      <Modal title="续租" visible={this.state.visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)} >
        <Form className="form-shim">
          <FormItem label="当前 合约到期日" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
            <Input value={this.props.oldEndDate} disabled />
          </FormItem>

          <FormItem label="调整 续约时长" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
            <InputGroup compact>
              <InputNumber min="0" style={{width: '80%'}} onChange={this.onTimeChange.bind(this)} />
              <Select defaultValue="d" style={{width: '20%'}} onChange={this.onUnitChange.bind(this)}>
                <Option value="d">日</Option>
                <Option value="M">月</Option>
                <Option value="y">年</Option>
              </Select>
            </InputGroup>
          </FormItem>

          <FormItem label="调整后 合约到租日" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
            <Input value={this.state.newEndDate} disabled />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Relet