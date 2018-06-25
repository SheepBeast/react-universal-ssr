import React from 'react'
import { connect } from 'react-redux'
import { Modal, Row, Col, Form, Select, Button, Input, Icon, Checkbox } from 'antd'

import { fetchHouseList, fetchBuildingList, fetchFloorList, fetchRoomList } from '../../../actions/property'
import isRequestSuccess from '../../../utils/isRequestSuccess'

const FormItem = Form.Item

const deviceTypeRefers = {
  0: '网关',
  1: '摄像头',
  2: '门锁',
  3: '猫眼',
  4: '水表'
}

class ModalBindDeviceWithRoom extends React.Component {
  constructor(props) {
    console.log('ctor -->', props)
    super(props)

    this.state = {
      visible: false,
      disabled: true,

      selectedHouseId: null,
      selectedBuildingId: null,
      selectedFloorId: null,
      selectedRoomId: null,

      selectedHouseName: null,
      selectedBuildingName: null,
      selectedFloorName: null,
      selectedRoomName: null,

      houseList: [],
      buildingList: [],
      floorList: [],
      roomList: [],

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
    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log('val -->', val)

        let { selectedHouseId, selectedBuildingId, selectedFloorId, selectedRoomId } = this.state
        let { rename } = val

        var form = {
          ...this.state.options,
          houseId: selectedHouseId,
          buildingId: selectedBuildingId,
          floorId: selectedFloorId,
          roomId: selectedRoomId,
          rename
        }

        this.props.onOk(form)
        this.hide()
      }
    })
  }

  componentWillMount() {
    let p1 = this.props.fetchHouseList({ state: 1 }),
      p2 = this.props.fetchBuildingList({ state: 1 }),
      p3 = this.props.fetchFloorList({ state: 1 }),
      p4 = this.props.fetchRoomList({ state: [1, 2, 3, 4, 5] })

    Promise.all([p1, p2, p3, p4]).then(ret => {
      if (isRequestSuccess(ret[0]) && isRequestSuccess(ret[1]) && isRequestSuccess(ret[2]) && isRequestSuccess(ret[3])) {
        let houseList = ret[0].data.data.list || [],
          buildingList = ret[1].data.data.list || [],
          floorList = ret[2].data.data.list || [],
          roomList = ret[3].data.data.list || []

        this.setState({
          houseList,
          buildingList,
          floorList,
          roomList
        })
      }
    })
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


  setRenameText() {
    if (!this.state.disabled) {
      return
    }

    let { selectedHouseName, selectedBuildingName, selectedFloorName, selectedRoomName, options } = this.state


    let installationSite = `${selectedHouseName || ''}${selectedBuildingName || ''}${selectedFloorName || ''}${selectedRoomName || ''}：${deviceTypeRefers[options.deviceType]}`

    this.props.form.setFieldsValue({
      rename: installationSite
    })
  }

  /*********************************/
  onHouseListChange(e) {
    var [selectedHouseId, selectedHouseName] = e.split('|')

    this.setState({
      selectedHouseId,
      selectedHouseName
    }, () => {
      this.setRenameText()
      var params = {
        houseId: selectedHouseId,
        state: 1
      }

      this.linkedFetchBuildingList(params)
    })
  }


  onBuildingListChange(e) {
    var [selectedBuildingId, selectedBuildingName] = e.split('|')

    this.setState({
      selectedBuildingId,
      selectedBuildingName
    }, () => {
      this.setRenameText()
      var params = {
        buildingId: selectedBuildingId,
        state: 1
      }

      this.linkedFetchFloorList(params)
    })
  }

  onFloorListChange(e) {
    var [selectedFloorId, selectedFloorName] = e.split('|')

    this.setState({
      selectedFloorId,
      selectedFloorName
    }, () => {
      this.setRenameText()
      var params = {
        floorId: selectedFloorId,
        state: [1, 2, 3, 4, 5]
      }

      this.linkedFetchRoomList(params)
    })
  }

  onRoomListChange(e) {
    var [selectedRoomId, selectedRoomName] = e.split('|')

    this.setState({
      selectedRoomId,
      selectedRoomName
    }, this.setRenameText)
  }

  ///////////////////////////////////


  linkedFetchBuildingList(params) {
    this.props.fetchBuildingList(params).then(ret => {
      var buildingList = isRequestSuccess(ret) && ret.data.data.list || []

      var first = buildingList[0]

      var { buildingId, buildingName } = first

      this.setState({
        buildingList
      }, () => {
        var params = {
          buildingId,
          state: 1
        }

        this.linkedFetchFloorList(params)
      })
    })
  }

  linkedFetchFloorList(params) {
    this.props.fetchFloorList(params).then(ret => {
      var floorList = isRequestSuccess(ret) && ret.data.data.list || []

      var first = floorList[0]

      var { floorId, floorName } = first

      this.setState({
        floorList
      }, () => {
        var params = {
          floorId,
          state: [1, 2, 3, 4, 5]
        }

        this.linkedFetchRoomList(params)
      })
    })
  }

  linkedFetchRoomList(params) {
    this.props.fetchRoomList(params).then(ret => {
      var roomList = isRequestSuccess(ret) && ret.data.data.list || []

      this.setState({
        roomList
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    let {
      houseList, buildingList, floorList, roomList,
      visible, disabled
    } = this.state


    let { deviceId, deviceName, mac, deviceType } = this.props.options

    return (
      <Modal title="设备关联房间" visible={visible} destroyOnClose={true} okText="保存" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
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
              {
                getFieldDecorator('houseId')(
                  <Select placeholder="全部房产" className="mb-20" onChange={this.onHouseListChange.bind(this)} onChange={this.onHouseListChange.bind(this)}>
                    {
                      houseList.map(({ houseId, houseName }) => <Option key={houseId} value={`${houseId}|${houseName}`}>{houseName}</Option>)
                    }
                  </Select>
                )
              }

              {
                getFieldDecorator('buildingId')(
                  <Select placeholder="全部楼栋" className="mb-20" onChange={this.onBuildingListChange.bind(this)} onChange={this.onBuildingListChange.bind(this)}>
                    {
                      buildingList.map(({ buildingId, buildingName }) =>
                        <Option key={buildingId} value={`${buildingId}|${buildingName}`}>{buildingName}</Option>)
                    }
                  </Select>
                )
              }

              {
                getFieldDecorator('floorId')(
                  <Select placeholder="全部楼层" className="mb-20" onChange={this.onFloorListChange.bind(this)} onChange={this.onFloorListChange.bind(this)} >
                    {
                      floorList.map(({ floorId, floorName }) => <Option value={`${floorId}|${floorName}`} key={floorId}>{floorName}</Option>)
                    }
                  </Select>
                )
              }

              {
                getFieldDecorator('roomId')(
                  <Select placeholder="全部房间" onChange={this.onRoomListChange.bind(this)} onChange={this.onRoomListChange.bind(this)} >
                    {
                      roomList.map(({ roomId, roomName }) => <Option value={`${roomId}|${roomName}`} key={roomId}>{roomName}</Option>)
                    }
                  </Select>
                )
              }

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

const mapDispatchToProps = dispatch => ({
  fetchHouseList: params => dispatch(fetchHouseList(params)),
  fetchBuildingList: params => dispatch(fetchBuildingList(params)),
  fetchFloorList: params => dispatch(fetchFloorList(params)),
  fetchRoomList: params => dispatch(fetchRoomList(params))
})

export default connect(null, mapDispatchToProps)(Form.create()(ModalBindDeviceWithRoom))