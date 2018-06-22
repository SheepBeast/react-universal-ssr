import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Radio, Form, Icon, Button, Avatar, Row, Col, Card, Divider, Tooltip, message } from 'antd'
import { fetchHouseList, fetchBuildingList, fetchFloorList, fetchRoomList, addHouse, addBuilding, delRoom, roomAddDevice, updateRoomInfo } from '../../../actions/property';
import Modal_Add_Property from './Modal_Add_Property'
import Modal_Batch_Add_Property_1 from './Modal_Batch_Add_Property_1'
import Modal_Batch_Add_Property_2 from './Modal_Batch_Add_Property_2'
import Modal_Batch_Add_Property_3 from './Modal_Batch_Add_Property_3'
import Modal_Bind_Device from './Modal_Bind_Device'
import Modal_Modify_Property from './Modal_Modify_Property'
import isRequestSuccess from '../../../utils/isRequestSuccess';
import './index.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button


const roomStateRefers = {
  0: '失效',
  1: '空净',
  2: '入住',
  3: '空脏',
  4: '故障、无入住',
  5: '故障、有人入住',
  6: '未启用'
}


class Property extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedHouseId: null,
      selectedBuildingId: null,
      selectedFloorId: null,
      selectedRoomId: null,

      selectedHouseName: null,

      addingHouseId: null,
      buildingNum: 0,
      count: 0,

      addingFloorList: [],

      bindingRoomId: null,
      modifingRoomId: null,

      houseList: [],
      buildingList: [],
      floorList: [],
      roomList: []
    }

    this.modal = {}

  }

  componentWillMount() {
    let p1 = this.props.fetchHouseList({ state: 1 }),
      p2 = this.props.fetchBuildingList({ state: 1 }),
      p3 = this.props.fetchFloorList({ state: 1 }),
      p4 = this.props.fetchRoomList({ state: [1, 2, 3, 4, 5] })

    let p = Promise.all([p1, p2, p3, p4]).then(ret => {
      console.log('ret -->', ret)
      if (isRequestSuccess(ret[0]) && isRequestSuccess(ret[1]) && isRequestSuccess(ret[2]) && isRequestSuccess(ret[3])) {
        let houseList = ret[0].data.data.list,
          buildingList = ret[1].data.data.list,
          floorList = ret[2].data.data.list,
          roomList = ret[3].data.data.list

        this.setState({
          houseList,
          buildingList,
          floorList,
          roomList,

          selectedHouseId: houseList[0].houseId,
          selectedBuildingId: buildingList[0].buildingId,
          selectedFloorId: floorList[0].floorId,
          selectedRoomId: roomList[0].roomId,

          selectedHouseName: houseList[0].houseName
        })
      }
    })
  }


  /*********************************/
  onHouseListChange(e) {
    e.stopPropagation()

    var houseId = e.target.value

    this.setState({
      selectedHouseId: houseId
    }, () => {
      var params = {
        houseId,
        state: 1
      }

      this.linkedFetchBuildingList(params)
    })
  }


  onBuildingListChange(e) {
    e.stopPropagation()

    var buildingId = e.target.value
    this.setState({
      selectedBuildingId: buildingId
    }, () => {

      var params = {
        buildingId,
        state: 1
      }

      this.linkedFetchFloorList(params)
    })
  }

  onFloorListChange(e) {
    e.stopPropagation()

    var floorId = e.target.value

    this.setState({
      selectedFloorId: floorId
    }, () => {
      var params = {
        floorId,
        state: [1, 2, 3, 4, 5]
      }

      this.linkedFetchRoomList(params)
    })
  }

  ///////////////////////////////////
  linkedFetchBuildingList(params) {
    this.props.fetchBuildingList(params).then(ret => {
      var buildingList = isRequestSuccess(ret) && ret.data.data.list || []

      var firstId = buildingList[0] && buildingList[0].buildingId || null

      this.setState({
        buildingList,
        selectedBuildingId: firstId
      }, () => {
        if (firstId) {
          var params = {
            buildingId: firstId,
            state: 1
          }

          this.linkedFetchFloorList(params)
        }
      })
    })
  }

  linkedFetchFloorList(params) {
    this.props.fetchFloorList(params).then(ret => {
      var floorList = isRequestSuccess(ret) && ret.data.data.list || []

      var firstId = floorList[0] && floorList[0].floorId || []

      this.setState({
        floorList,
        selectedFloorId: firstId
      }, () => {
        if (firstId) {
          var params = {
            floorId: firstId,
            state: [1, 2, 3, 4, 5]
          }

          this.linkedFetchRoomList(params)
        }
      })
    })
  }

  linkedFetchRoomList(params) {
    this.props.fetchRoomList(params).then(ret => {
      var roomList = isRequestSuccess(ret) && ret.data.data.list || []

      var firstId = roomList[0] && roomList[0].roomId || null

      this.setState({
        roomList,
        selectedRoomId: firstId
      })
    })
  }

  /////////////////////////////////////////
  onRadioButtonClick(houseName) {
    this.setState({
      selectedHouseName: houseName
    })
  }

  // loop
  startAddBuilding(params) {
    let { houseId, buildingNum } = params

    this.setState({
      addingHouseId: houseId,
      count: 0,
      buildingNum
    }, this.loopAddBuilding)
  }

  loopAddBuilding() {
    let { count, buildingNum } = this.state
    if (count < buildingNum) {
      this.modal.batchAddProperty2.show()
    } else {
      message.success('批量添加房产成功')
    }
  }

  // modal

  // add property
  onModalAddPropertyInit(modal) {
    this.modal.addProperty = modal
  }

  onModalAddPropertyOk(form) {
    this.props.addHouse(form).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('添加房产成功')
      } else {
        message.error(`添加房产失败，${ret.data.reason}`)
      }
    })
  }

  onModalAddPropertySwitchChange(checked) {
    if (checked) {
      this.modal.addProperty.hide()
      this.modal.batchAddProperty1.show()
    }
  }

  // batch add property 1
  onModalBatchAddProperty1Init(modal) {
    this.modal.batchAddProperty1 = modal
  }

  onModalBatchAddProperty1Ok(form) {
    this.props.addHouse(form).then(ret => {
      if (isRequestSuccess(ret)) {
        let { buildingNum } = form
        let { houseId } = ret.data.data

        this.startAddBuilding({ buildingNum, houseId })
      } else {
        message.error(`批量添加房产失败，${ret.data.reason}`)
      }
    })
  }

  // batch add property 2
  onModalBatchAddProperty2Init(modal) {
    this.modal.batchAddProperty2 = modal
  }

  onModalBatchAddProperty2Ok(form) {
    let { buildingName, batch, address, district, floorNum, roomNum, roomNamePrefix } = form

    let params = {
      houseId: this.state.addingHouseId,
      buildingName,
      batch: batch ? 1 : 0,
      area: address
    }

    if (district) {
      if (district[0]) {
        params.provinceId = district[0]
      }

      if (district[1]) {
        params.cityId = district[1]
      }

      if (district[2]) {
        params.areaId = district[2]
      }
    }

    if (floorNum) {
      params.floorNum = floorNum
    }

    if (roomNum) {
      params.roomNum = roomNum
    }

    if (roomNamePrefix) {
      params.roomNamePrefix = roomNamePrefix
    }

    console.log('add building params -->', params)

    this.props.addBuilding(params).then(ret => {
      if (isRequestSuccess(ret)) {
        this.setState({
          addingFloorList: ret.data.data.floorList
        }, () => {
          this.modal.batchAddProperty3.show()
        })
      } else {
        message.error(`批量添加房产失败，${ret.data.reason}`)
      }
    })
  }


  // batch add property 3
  onModalBatchAddProperty3Init(modal) {
    this.modal.batchAddProperty3 = modal
  }

  onModalBatchAddProperty3Ok(form) {
    let params = { level: 4, ...form }

    this.props.delRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        this.setState({
          count: ++this.state.count
        }, this.loopAddBuilding)
      } else {
        message.error(`批量添加房产失败，${ret.data.reason}`)
      }
    })
  }

  // bind device

  onModalBindDeviceInit(modal) {
    this.modal.bindDevice = modal
  }

  onModalBindDeviceOk(form) {
    let { deviceId } = form

    if (!deviceId) {
      return
    }

    var params = {
      id: this.state.bindingRoomId,
      level: 4,
      deviceType: 2,
      ...form
    }

    this.props.bindDevice(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.error(`关联设备成功`)
      } else {
        message.error(`关联设备失败，${ret.data.reason}`)
      }
    })
  }

  // modify property

  onModalModifyPropertyInit(modal) {
    this.modal.modifyProperty = modal
  }

  onModalModifyPropertyOk(form) {
    var params = {
      roomId: this.state.modifingRoomId,
      ...form
    }

    this.props.modifyProperty(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.error(`修改房产信息成功`)
      } else {
        message.error(`修改房产信息失败，${ret.data.reason}`)
      }
    })
  }

  ////////////////////////////

  delHouse() {
    var params = {
      id: [this.state.selectedHouseId],
      level: 1
    }

    this.props.delRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.error(`删除房产成功`)
      } else {
        message.error(`删除房产失败，${ret.data.reason}`)
      }
    })
  }

  callModalModifyPropery(params) {
    this.setState({
      modifingRoomId: params.roomId
    }, () => {
      this.modal.modifyProperty.show()
    })
  }

  callModalBindDevice(params) {
    this.setState({
      bindingRoomId: params.roomId
    }, () => {
      this.modal.bindDevice.show()
    })
  }

  render() {
    let {
      houseList, buildingList, floorList, roomList,
      selectedHouseId, selectedBuildingId, selectedFloorId, selectedRoomId
    } = this.state

    return (
      <div id="Property">
        <div className="mb-20 container">
          <Form>
            {
              houseList.length > 0 ?
                <FormItem label="公寓名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                  <RadioGroup className="custom-radio-button-group" defaultValue={selectedHouseId} value={selectedHouseId} onChange={this.onHouseListChange.bind(this)}>
                    {
                      houseList.map(({ houseId, houseName }) =>
                        <RadioButton key={houseId} value={houseId} onClick={this.onRadioButtonClick.bind(this, houseName)}>{houseName}</RadioButton>
                      )
                    }
                  </RadioGroup>
                </FormItem> : null
            }
            {
              buildingList.length > 0 ?
                <FormItem label="楼栋名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                  <RadioGroup className="custom-radio-button-group" defaultValue={selectedBuildingId} value={selectedBuildingId} onChange={this.onBuildingListChange.bind(this)}>
                    {
                      buildingList.map(({ buildingId, buildingName }) =>
                        <RadioButton value={buildingId} key={buildingId}>{buildingName}</RadioButton>
                      )
                    }
                  </RadioGroup>
                </FormItem> : null
            }

            {
              floorList.length > 0 ?
                <FormItem label="楼层名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                  <RadioGroup className="custom-radio-button-group" defaultValue={selectedFloorId} value={selectedFloorId} onChange={this.onFloorListChange.bind(this)}>
                    {
                      floorList.map(({ floorId, floorName }) =>
                        <RadioButton value={floorId} key={floorId}>{floorName}</RadioButton>
                      )
                    }
                  </RadioGroup>
                </FormItem> : null
            }
          </Form>
        </div>


        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 100, height: 100 }} className="mr-30">
              <Avatar className="br-50" style={{ width: 100, height: 100 }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" />
            </div>
            <div style={{ flexGrow: 1 }}>
              <h3>
                <b>{this.state.selectedHouseName || '--'}</b>
              </h3>
              <span className="gray">已租--套&nbsp;&nbsp;闲置--套</span>
            </div>
            <div style={{ width: 210 }} >
              <Button type="primary" className="mr-30" onClick={() => { this.modal.addProperty.show() }}>添加房产</Button>
              <Button type="primary" onClick={this.delHouse.bind(this)}>删除房产</Button>
            </div>
          </div>

          <Divider />

          <Row gutter={8}>
            {
              roomList.map(({ roomId, roomName, state }) => {
                var url = `/property-room-detail?roomId=${encodeURIComponent(roomId)}`
                return (
                  <Col key={roomId} span={4} className="mb-20" >
                    <Card actions={
                      [
                        <Link to={url}>
                          <Tooltip title="房间详情">
                            <Icon type="file-text" />
                          </Tooltip>
                        </Link>,

                        <a onClick={this.callModalModifyPropery.bind(this, { roomId })}>
                          <Tooltip title="修改">
                            <Icon type="form" />
                          </Tooltip>
                        </a>,

                        <a onClick={this.callModalBindDevice.bind(this, { roomId })}>
                          <Tooltip title="关联设备">
                            <Icon type="select" />
                          </Tooltip>
                        </a>,

                        // <Link to={url}>
                        //   <Tooltip title="标记">
                        //     <Icon type="tag-o" />
                        //   </Tooltip>
                        // </Link>
                      ]
                    }>
                      <div className="tc">
                        <Avatar style={{ width: 100, height: 100, borderRadius: '50%' }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" className="mb-20" />
                        <h3 className="mb-20">{roomName}</h3>
                        <h3 className={state === 1 ? 'health' : 'danger'}>{roomStateRefers[state]}</h3>
                      </div>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </div>

        <Modal_Add_Property onInit={this.onModalAddPropertyInit.bind(this)} onOk={this.onModalAddPropertyOk.bind(this)} onSwitchChange={this.onModalAddPropertySwitchChange.bind(this)} />

        <Modal_Batch_Add_Property_1 onInit={this.onModalBatchAddProperty1Init.bind(this)} onOk={this.onModalBatchAddProperty1Ok.bind(this)} />

        <Modal_Batch_Add_Property_2 onInit={this.onModalBatchAddProperty2Init.bind(this)} onOk={this.onModalBatchAddProperty2Ok.bind(this)} subTitle={`楼栋${this.state.count + 1}`} />

        <Modal_Batch_Add_Property_3 onInit={this.onModalBatchAddProperty3Init.bind(this)} onOk={this.onModalBatchAddProperty3Ok.bind(this)} floorList={this.state.addingFloorList} subTitle={`楼栋${this.state.count + 1}`} />

        <Modal_Bind_Device onInit={this.onModalBindDeviceInit.bind(this)} onOk={this.onModalBindDeviceOk.bind(this)} />

        <Modal_Add_Property onInit={this.onModalAddPropertyInit.bind(this)} onOk={this.onModalAddPropertyOk.bind(this)} onSwitchChange={this.onModalAddPropertySwitchChange.bind(this)} />

        <Modal_Modify_Property onInit={this.onModalModifyPropertyInit.bind(this)} onOk={this.onModalModifyPropertyOk.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  fetchHouseList: params => dispatch(fetchHouseList(params)),
  fetchBuildingList: params => dispatch(fetchBuildingList(params)),
  fetchFloorList: params => dispatch(fetchFloorList(params)),
  fetchRoomList: params => dispatch(fetchRoomList(params)),
  addHouse: params => dispatch(addHouse(params)),
  addBuilding: params => dispatch(addBuilding(params)),
  delRoom: params => dispatch(delRoom(params)),
  bindDevice: params => dispatch(roomAddDevice(params)),
  modifyProperty: params => dispatch(updateRoomInfo(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Property)