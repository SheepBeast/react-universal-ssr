import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Select } from 'antd'

import { fetchLockList } from '../../../actions/device';
import isRequestSuccess from '../../../utils/isRequestSuccess';

const FormItem = Form.Item
const Option = Select.Option

class Modal_Bind_Device extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      lockList: []
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



  onOk(e) {
    this.props.form.validateFields((err, val) => {
      if (!err) {
        this.props.onOk(val)
        this.hide()
      }
    })
  }

  componentWillMount() {
    this.props.fetchLockList({
      getNum: 100
    }).then(ret => {
      console.log('modif bind device lock list -->', ret)
      if (isRequestSuccess(ret)) {
        this.setState({
          lockList: ret.data.data.list || []
        })
      }
    })
  }

  componentDidMount() {
    this.props.onInit(this)
  }

  render() {
    let { getFieldDecorator } = this.props.form

    return (
      <Modal title="绑定设备" visible={this.state.visible} destroyOnClose={true} okText="完成" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form className="form-shim">
          <FormItem label="门锁" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
            {
              getFieldDecorator('deviceId')(
                <Select placeholder="请选择门锁MAC">
                  {
                    this.state.lockList.map(({ deviceId, mac }) =>
                      <Option value={deviceId} key={deviceId}>{mac}</Option>
                    )
                  }
                </Select>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLockList: params => dispatch(fetchLockList(params))
})

export default connect(null, mapDispatchToProps)(Form.create()(Modal_Bind_Device))