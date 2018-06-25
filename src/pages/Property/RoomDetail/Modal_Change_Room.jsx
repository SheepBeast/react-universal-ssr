import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal, DatePicker, Breadcrumb } from 'antd'
import { fetchRoomList } from '../../../actions/property'
import isRequestSuccess from '../../../utils/isRequestSuccess'

const FormItem = Form.Item
const Option = Select.Option
const BreadcrumbItem = Breadcrumb.Item

class ModalChangeRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      roomList: []
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

  componentWillMount() {
    this.props.fetchRoomList({
      state: [1, 2, 3, 4, 5]
    }).then(ret => {
      if (isRequestSuccess(ret)) {
        this.setState({
          roomList: ret.data.data.list
        })
      }
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


    var { options, form } = this.props

    var { tenantName, endDate, houseName, buildingName, floorName, roomName } = options

    var { roomList } = this.state

    const { getFieldDecorator } = form

    return (
      <Modal title="换房" visible={this.state.visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form>
          <h3>
            <b>{tenantName}</b>
          </h3>
          <br />
          <h3 className="gray">
            <b>当前</b>
          </h3>
          <FormItem label="居住房间" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} style={{ marginBottom: 2 }} >
            <b style={{ lineHeight: '32px' }}>{`${houseName}-${buildingName}-${floorName}-${roomName}`}</b>
          </FormItem>

          <FormItem label="合约到期" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}  >
            <b style={{ lineHeight: '32px' }}>{endDate}</b>
          </FormItem>

          <h3 className="gray">
            <b>更换</b>
          </h3>
          <FormItem label="更换房间" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {
              getFieldDecorator('roomId', {
                rules: [{
                  required: true,
                  message: '必须选择新房间'
                }]
              })(
                <Select>
                  {
                    roomList.map(room => {
                      let { houseName, buildingName, floorName, roomName, roomId } = room

                      return (
                        <Option key={roomId} value={roomId}>{`${houseName}-${buildingName}-${floorName}-${roomName}`}</Option>
                      )
                    })
                  }
                </Select>
              )
            }
          </FormItem>
          {/* <FormItem label="更换时间" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <DatePicker className="w-100" />
          </FormItem> */}
        </Form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRoomList: params => dispatch(fetchRoomList(params))
})

export default connect(null, mapDispatchToProps)(Form.create()(ModalChangeRoom))