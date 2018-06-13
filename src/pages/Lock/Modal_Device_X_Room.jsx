import React from 'react'
import { connect } from 'react-redux'
import { Modal, Row, Col, Form, Select, Button, Input, Icon, Checkbox } from 'antd'

import { fetchHouseListData, fetchBuildingListData, fetchFloorListData, fetchRoomListData } from '../../actions/property'

import pipe from './pipe'

const FormItem = Form.Item



class Modal_Device_X_Room extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: props.visible || false,
      disabled: true,

      houseName: null,
      buildingName: null,
      floorName: null,
      roomName: null
    }

    pipe.closeModal = this.closeModal.bind(this)
    pipe.openModal = this.openModal.bind(this)

  }

  closeModal() {
    console.log('close modal')
    this.setState({
      visible: false
    })

  }

  openModal() {
    this.setState({
      visible: true
    })
  }

  onAutoRenameChange(e) {
    console.log('e -->', e)
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

  componentWillMount() {
    var params = {
      state: 1
    }
    this.props.fetchHouseList(params)
    this.props.fetchBuildingList(params)
    this.props.fetchFloorList(params)
    this.props.fetchRoomList(params)
  }

  render() {
    let { getFieldDecorator } = this.props.form

    const { houseList, buildingList, floorList, roomList } = this.props

    const { visible, disabled } = this.state
    const { deviceName, mac } = this.props

    return (
      <Modal
        title="设备关联房间"
        visible={visible}
        destroyOnClose={true}
        okText="确定"
        cancelText="取消"
        onOk={this.closeModal.bind(this)}
        onCancel={this.closeModal.bind(this)}
      >
        <Form>
          <Row>
            <Col span={10} style={{
              height: 188,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}>
              <FormItem label="设备名称" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
                <span>{deviceName}</span>
              </FormItem>
              <FormItem label="设备MAC" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
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
              <Select defaultValue="0" className="mb-20" onChange={this.onHouseListChange.bind(this)}>


                <Option value="0">全部房产</Option>
                {
                  houseList.map(({ houseId, houseName }) => <Option key={houseId} value={`${houseId}|${houseName}`}>{houseName}</Option>)
                }
              </Select>

              <Select defaultValue="0" className="mb-20" onChange={this.onBuildingListChange.bind(this)}>
                <Option value="0">全部楼栋</Option>
                {
                  buildingList.map(({ buildingId, buildingName }) =>
                    <Option key={buildingId} value={`${buildingId}|${buildingName}`}>{buildingName}</Option>)
                }
              </Select>

              <Select defaultValue="0" className="mb-20" onChange={this.onFloorListChange.bind(this)}>
                <Option value="0">全部楼层</Option>
                {
                  floorList.map(({ floorId, floorName }) => <Option value={`${floorId}|${floorName}`} key={floorId}>{floorName}</Option>)
                }
              </Select>

              <Select defaultValue="0" onChange={this.onRoomListChange.bind(this)}>
                <Option value="0">全部房间</Option>
                {
                  roomList.map(({ roomId, roomName }) => <Option value={`${roomId}|${roomName}`} key={roomId}>{roomName}</Option>)
                }
              </Select>
            </Col>
          </Row>

          <FormItem wrapperCol={{ span: 24 }}>
            {
              <Checkbox onChange={this.onAutoRenameChange.bind(this)} defaultChecked>自动重命名设备</Checkbox>
            }
            <br />
            {
              getFieldDecorator('rename')(
                <Input placeholder="请先选择房间" disabled={disabled} />
              )
            }
            <p className="danger">与已有设备名称重复，请修改</p>
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
    fetchHouseList: params => dispatch(fetchHouseListData(params)),
    fetchBuildingList: params => dispatch(fetchBuildingListData(params)),
    fetchFloorList: params => dispatch(fetchFloorListData(params)),
    fetchRoomList: params => dispatch(fetchRoomListData(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Modal_Device_X_Room))