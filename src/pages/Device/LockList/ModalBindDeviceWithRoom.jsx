import React from 'react'
import { connect } from 'react-redux'
import { Modal, Row, Col, Form, Select, Button, Input, Icon, Checkbox } from 'antd'

import { fetchHouseList, fetchBuildingList, fetchFloorList, fetchRoomList } from '../../../actions/property'

const FormItem = Form.Item

class Modal_Device_X_Room extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      disabled: true,

      houseName: null,
      buildingName: null,
      floorName: null,
      roomName: null,

      options: {}
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


  onOk() {
    var form = {}

    this.props.onOk(form)
    this.hide()
  }

  componentWillMount() {
    this.props.fetchHouseList({ state: 1 })
    this.props.fetchBuildingList({ state: 1 })
    this.props.fetchFloorList({ state: 1 })
    this.props.fetchRoomList({ state: [1, 2, 3, 4, 5] })
  }

  componentDidMount() {
    this.props.onInit(this)
  }

  onAutoRenameChange(e) {
    e.stopPropagation()

    let checked = e.target.checked

    this.setState({
      disabled: checked
    }, () => {
      if (checked) {
        this.setRenameText()
      }
    })
  }

  onHouseListChange(e) {
    this.setState({
      houseName: e.split('|')[1]
    }, this.setRenameText)
  }


  onBuildingListChange(e) {
    this.setState({
      buildingName: e.split('|')[1]
    }, this.setRenameText)
  }

  onFloorListChange(e) {
    this.setState({
      floorName: e.split('|')[1]
    }, this.setRenameText)
  }

  onRoomListChange(e) {
    this.setState({
      roomName: e.split('|')[1]
    }, this.setRenameText)
  }

  setRenameText() {
    if (!this.state.disabled) {
      return
    }
    let { houseName, buildingName, floorName, roomName } = this.state

    let installationSite = `${houseName || ''}${buildingName ? buildingName + '栋' : ''}${floorName ? floorName + '层' : ''}${roomName || ''}`

    this.props.form.setFieldsValue({
      rename: installationSite
    })
  }



  render() {
    const { getFieldDecorator } = this.props.form

    let { houseList, buildingList, floorList, roomList } = this.props

    let { visible, disabled, options } = this.state

    let { deviceName, mac } = options

    return (
      <Modal
        title="设备关联房间"
        visible={visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form>
          <Row>
            <Col span={10} style={{
              height: 188,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}>
              <FormItem label="设备名称" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className="mb-20">
                <span>{deviceName}</span>
              </FormItem>
              <FormItem label="设备MAC" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className="mb-20">
                {mac}
              </FormItem>
            </Col>
            <Col span={6} className="tc">
              <Icon type="paper-clip" className="fs-30" style={{
                height: 188,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }} />
            </Col>
            <Col span={8}>
              <Select placeholder="全部房产" className="mb-20" onChange={this.onHouseListChange.bind(this)}>
                {
                  houseList.map(({ houseId, houseName }) =>
                    <Option key={houseId} value={`${houseId}|${houseName}`}>{houseName}</Option>
                  )
                }
              </Select>

              <Select placeholder="全部楼栋" className="mb-20" onChange={this.onBuildingListChange.bind(this)}>
                {
                  buildingList.map(({ buildingId, buildingName }) =>
                    <Option key={buildingId} value={`${buildingId}|${buildingName}`}>{buildingName}</Option>)
                }
              </Select>

              <Select placeholder="全部楼层" className="mb-20" onChange={this.onFloorListChange.bind(this)}>
                {
                  floorList.map(({ floorId, floorName }) => <Option value={`${floorId}|${floorName}`} key={floorId}>{floorName}</Option>)
                }
              </Select>

              <Select placeholder="全部房间" onChange={this.onRoomListChange.bind(this)}>
                {
                  roomList.map(({ roomId, roomName }) => <Option value={`${roomId}|${roomName}`} key={roomId}>{roomName}</Option>)
                }
              </Select>
            </Col>
          </Row>

          <Checkbox onChange={this.onAutoRenameChange.bind(this)} defaultChecked>自动重命名设备</Checkbox>
          <br />

          <FormItem wrapperCol={{ span: 24 }}>
            {
              getFieldDecorator('rename')(
                <Input placeholder="请先选择房间" disabled={disabled} />
              )
            }
            {/* <p className="danger">与已有设备名称重复，请修改</p> */}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  houseList: state.houseList || [],
  buildingList: state.buildingList || [],
  floorList: state.floorList || [],
  roomList: state.roomList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchHouseList: params => dispatch(fetchHouseList(params)),
    fetchBuildingList: params => dispatch(fetchBuildingList(params)),
    fetchFloorList: params => dispatch(fetchFloorList(params)),
    fetchRoomList: params => dispatch(fetchRoomList(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Modal_Device_X_Room))