import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Modal, DatePicker, Breadcrumb } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList';

import { fetchRoomList } from '../../../actions/property'
import isRequestSuccess from '../../../utils/isRequestSuccess'

const FormItem = Form.Item
const Option = Select.Option
const BreadcrumbItem = Breadcrumb.Item
const Description = DescriptionList.Description

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
      var roomList = isRequestSuccess(ret) && ret.data.data.list || []
      this.setState({
        roomList
      })
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

    var { tenantName, endTime, houseName, buildingName, floorName, roomName } = options

    var { roomList } = this.state

    const { getFieldDecorator } = form

    return (
      <Modal title="换房" visible={this.state.visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <h3>
          <b>{tenantName}</b>
        </h3>
        <DescriptionList size="large" title="当前" col="1">
          <Description term="居住房间">{`${houseName}-${buildingName}-${floorName}-${roomName}`}</Description>
          <Description term="合约到期">{endTime}</Description>
        </DescriptionList>

        <br />

        <DescriptionList size="large" title="更换" col="1" />

        <Form>
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
        </Form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRoomList: params => dispatch(fetchRoomList(params))
})

export default connect(null, mapDispatchToProps)(Form.create()(ModalChangeRoom))