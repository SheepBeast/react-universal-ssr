import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Radio, Form, Icon, Button, Avatar, Row, Col, Card, Divider, Tooltip, message } from 'antd'
import { fetchHouseList, fetchBuildingList, fetchFloorList, fetchRoomList, addHouse, addBuilding, addFloor, addRoom, delRoom, roomAddDevice, updateRoomInfo, updateHouseInfo, updateBuildingInfo, updateFloorInfo } from '../../../actions/property';


import Modal_Add_House from './Modal_Add_House'
import Modal_Edit_House from './Modal_Edit_House'

import Modal_Add_Building from './Modal_Add_Building'
import Modal_Edit_Building from './Modal_Edit_Building'

import Modal_Add_Floor from './Modal_Add_Floor'
import Modal_Edit_Floor from './Modal_Edit_Floor'

import Modal_Add_Room from './Modal_Add_Room'
import Modal_Edit_Room from './Modal_Edit_Room'




import Modal_Batch_Add_Property_1 from './Modal_Batch_Add_Property_1'
import Modal_Batch_Add_Property_2 from './Modal_Batch_Add_Property_2'
import Modal_Batch_Add_Property_3 from './Modal_Batch_Add_Property_3'
import Modal_Bind_Device from './Modal_Bind_Device'
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
      selectedBuildingName: null,
      selectedFloorName: null,

      addingHouseId: null,
      buildingNum: 0,
      count: 0,

      addingFloorList: [],

      bindingRoomId: null,
      selectedRoomId: null,

      houseList: [],
      buildingList: [],
      floorList: [],
      roomList: [],

      selectedHouseIndex: 0,
      selectedBuildingIndex: 0
    }

    this.modal = {}

  }

  componentWillMount() {
    this.linkedFetchHouseList({ state: 1 })
  }

  /////////////////////////////////////////
  onHouseChange({ houseId, houseName, index }) {
    this.setState({
      selectedHouseId: houseId,
      selectedHouseName: houseName,
      selectedHouseIndex: index
    }, () => {
      var params = {
        houseId,
        state: 1
      }

      this.linkedFetchBuildingList(params)
    })
  }

  onBuildingChange({ buildingId, buildingName }) {
    this.setState({
      selectedBuildingId: buildingId,
      selectedBuildingName: buildingName
    }, () => {

      var params = {
        buildingId,
        state: 1
      }

      this.linkedFetchFloorList(params)
    })
  }

  onFloorChange({ floorId, floorName }) {
    this.setState({
      selectedFloorId: floorId,
      selectedFloorName: floorName
    }, () => {
      var params = {
        floorId,
        state: [1, 2, 3, 4, 5]
      }

      this.linkedFetchRoomList(params)
    })
  }

  ///////////////////////////////////
  linkedFetchHouseList(params) {
    this.props.fetchHouseList(params).then(ret => {
      if (isRequestSuccess(ret)) {
        let houseList = ret.data.data.list || []

        var first = houseList[0] || {}
        var { houseId, houseName } = first

        this.setState({
          houseList,
          selectedHouseId: houseId,
          selectedHouseName: houseName
        }, () => {
          if (houseId) {
            var params = {
              houseId,
              state: 1
            }
            this.linkedFetchBuildingList(params)
          }
        })
      }
    })
  }


  linkedFetchBuildingList(params) {
    this.props.fetchBuildingList(params).then(ret => {
      var buildingList = isRequestSuccess(ret) && ret.data.data.list || []

      var first = buildingList[0] || {}
      var { buildingId, buildingName } = first

      this.setState({
        buildingList,
        selectedBuildingId: buildingId,
        selectedBuildingName: buildingName
      }, () => {
        if (buildingId) {
          var params = {
            buildingId,
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

      var first = floorList[0] || {}
      var { floorId, floorName } = first

      this.setState({
        floorList,
        selectedFloorId: floorId,
        selectedFloorName: floorName
      }, () => {
        if (floorId) {
          var params = {
            floorId,
            state: [1, 2, 3, 4, 5]
          }

          this.linkedFetchRoomList(params)
        }
      })
    })
  }

  linkedFetchRoomList(params, callback) {
    this.props.fetchRoomList(params).then(ret => {
      var roomList = isRequestSuccess(ret) && ret.data.data.list || []

      var first = roomList[0] || {}
      var { roomId, roomName } = first

      this.setState({
        roomList,
        selectedRoomId: roomId,
        selectedRoomName: roomName
      }, callback)
    })
  }


  // modal

  // 房产
  // 添加
  onModalAddHouseInit(modal) {
    this.modal.addHouse = modal
  }

  onModalAddHouseOk(form) {
    console.log('add property form -->', form)
    this.props.addHouse(form).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('添加房产成功')
        this.linkedFetchHouseList({ state: 1 })
      } else {
        message.error(`添加房产失败，${ret.data.reason}`)
      }
    })
  }

  // 编辑
  onModalEditHouseInit(modal) {
    this.modal.editHouse = modal
  }

  onModalEditHouseOk(form) {
    console.log('edit property form -->', form)
    form.houseId = this.state.selectedHouseId

    this.props.editHouse(form).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('修改房产成功')
        var houseList = [].concat(this.state.houseList)

        houseList.splice(this.state.selectedHouseIndex, 1, { houseId: this.state.selectedHouseId, houseName: form.houseName })

        this.setState({ houseList })

      } else {
        message.error(`修改房产失败，${ret.data.reason}`)
      }
    })
  }

  // 楼栋
  // 添加
  onModalAddBuildingInit(modal) {
    this.modal.addBuilding = modal
  }

  onModalAddBuildingOk(form) {
    console.log('add building form -->', form)
    var { buildingName, district = [], address } = form
    var params = {
      houseId: this.state.selectedHouseId,
      buildingName,
      provinceId: district[0],
      cityId: district[1],
      areaId: district[2],
      area: address
    }

    this.props.addBuilding(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('添加楼栋成功')

        var params = {
          houseId: this.state.selectedHouseId,
          state: 1
        }
        this.linkedFetchBuildingList(params)
      } else {
        message.error(`添加楼栋失败，${ret.data.reason}`)
      }
    })
  }

  // 编辑
  onModalEditBuildingInit(modal) {
    this.modal.editBuilding = modal
  }

  onModalEditBuildingOk(form) {
    console.log('edit building form -->', form)
    var { buildingName, district = [], address } = form
    var params = {
      buildingId: this.state.selectedBuildingId,
      buildingName,
      provinceId: district[0],
      cityId: district[1],
      areaId: district[2],
      area: address
    }

    this.props.editBuilding(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('修改楼栋成功')
        var buildingList = [].concat(this.state.buildingList)

        buildingList.splice(this.state.selectedBuildingIndex, 1, { buildingId: this.state.selectedBuildingId, buildingName: form.buildingName })

        this.setState({ buildingList })
      } else {
        message.error(`修改楼栋失败，${ret.data.reason}`)
      }
    })
  }

  // 楼层
  // 添加
  onModalAddFloorInit(modal) {
    this.modal.addFloor = modal
  }

  onModalAddFloorOk(form) {
    console.log('add floor form -->', form)

    var { batch, floorNamePrefix, floorNameSuffix, floorStartNum, floorEndNum, floorName } = form

    var params = {
      buildingId: this.state.selectedBuildingId
    }

    if (batch) {
      params.batch = 1
      params.floorNamePrefix = floorNamePrefix
      params.floorNameSuffix = floorNameSuffix
      params.floorStartNum = floorStartNum
      params.floorNum = floorEndNum - floorStartNum
    } else {
      params.batch = 0
      params.floorName = floorName
    }

    this.props.addFloor(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('添加楼层成功')
        var params = {
          buildingId: this.state.selectedBuildingId,
          state: 1
        }
        this.linkedFetchFloorList(params)
      } else {
        message.error(`添加楼层失败，${ret.data.reason}`)
      }
    })
  }

  // 编辑
  onModalEditFloorInit(modal) {
    this.modal.editFloor = modal
  }

  onModalEditFloorOk(form) {
    console.log('edit floor form -->', form)
    var { floorName } = form

    var params = {
      floorId: this.state.selectedFloorId,
      floorName
    }

    this.props.editFloor(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('修改楼层成功')
        var floorList = [].concat(this.state.floorList)

        floorList.splice(this.state.selectedFloorIndex, 1, { floorId: this.state.selectedFloorId, floorName: form.floorName })

        this.setState({ floorList })
      } else {
        message.error(`修改楼层失败，${ret.data.reason}`)
      }
    })
  }

  // 房间
  // 添加
  onModalAddRoomInit(modal) {
    this.modal.addRoom = modal
  }

  onModalAddRoomOk(form) {
    console.log('add floor form -->', form)

    var { batch, roomNamePrefix, roomNameSuffix, roomStartNum, roomEndNum, roomName } = form

    var params = {
      floorId: this.state.selectedFloorId
    }

    if (batch) {
      params.batch = 1
      params.roomNamePrefix = roomNamePrefix
      params.roomNameSuffix = roomNameSuffix
      params.roomStartNum = roomStartNum
      params.roomNum = roomEndNum - roomStartNum
    } else {
      params.batch = 0
      params.roomName = roomName
    }

    this.props.addRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('添加房间成功')
        var params = {
          floorId: this.state.selectedFloorId,
          state: 1
        }
        this.linkedFetchRoomList(params)
      } else {
        message.error(`添加房间失败，${ret.data.reason}`)
      }
    })
  }

  // 编辑
  onModalEditRoomInit(modal) {
    this.modal.editRoom = modal
  }

  onModalEditRoomOk(form) {
    var params = {
      roomId: this.state.selectedRoomId,
      ...form
    }

    this.props.editRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success(`修改房间成功`)

        var idx = this.state.selectedIndex
        var roomList = [].concat(this.state.roomList)
        var room = { ...this.state.roomList[idx] }
        room.roomName = form.roomName

        roomList.splice(idx, 1, room)

        this.setState({
          roomList
        })

      } else {
        message.error(`修改房间失败，${ret.data.reason}`)
      }
    })
  }

  callModalEditRoom({ roomId, roomName, index }) {
    this.setState({
      selectedRoomId: roomId,
      selectedIndex: index,
      selectedRoomName: roomName
    }, () => {
      this.modal.editRoom.show()
    })
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
        message.success(`关联设备成功`)
      } else {
        message.error(`关联设备失败，${ret.data.reason}`)
      }
    })
  }

  callModalBindDevice(params) {
    this.setState({
      bindingRoomId: params.roomId
    }, () => {
      this.modal.bindDevice.show()
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
        message.success(`删除房产成功`)
        this.linkedFetchHouseList({ state: 1 })
      } else {
        message.error(`删除房产失败，${ret.data.reason}`)
      }
    })
  }

  delBuilding() {
    var params = {
      id: [this.state.selectedBuildingId],
      level: 2
    }

    this.props.delRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success(`删除楼栋成功`)
        this.linkedFetchBuildingList({ houseId: this.state.selectedHouseId, state: 1 })
      } else {
        message.error(`删除楼栋失败，${ret.data.reason}`)
      }
    })
  }

  delFloor() {
    var params = {
      id: [this.state.selectedFloorId],
      level: 3
    }

    this.props.delRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success(`删除楼层成功`)
        this.linkedFetchFloorList({ buildingId: this.state.selectedBuildingId, state: 1 })
      } else {
        message.error(`删除楼层失败，${ret.data.reason}`)
      }
    })
  }

  delRoom() {
    var params = {
      id: [this.state.selectedRoomId],
      level: 4
    }

    this.props.delRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success(`删除房间成功`)
        this.linkedFetchRoomList({ floorId: this.state.selectedFloorId, state: [1, 2, 3, 4, 5] })
      } else {
        message.error(`删除房间失败，${ret.data.reason}`)
      }
    })
  }

  render() {
    let {
      houseList, buildingList, floorList, roomList,
      selectedHouseId, selectedBuildingId, selectedFloorId, selectedRoomId,
      selectedHouseName, selectedBuildingName, selectedFloorName, selectedRoomName
    } = this.state

    return (
      <div id="Property">
        <div className="mb-20 container">
          <Row>
            <Col span={20}>
              <Form>
                {
                  houseList.length > 0 ?
                    <FormItem label="公寓名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                      <RadioGroup className="custom-radio-button-group" defaultValue={selectedHouseId}>
                        {
                          houseList.map(({ houseId, houseName }, idx) =>
                            <RadioButton key={houseId} value={houseId} onClick={this.onHouseChange.bind(this, { houseId, houseName, index: idx })}>{houseName}</RadioButton>
                          )
                        }
                      </RadioGroup>
                    </FormItem> : null
                }
                {
                  buildingList.length > 0 ?
                    <FormItem label="楼栋名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                      <RadioGroup className="custom-radio-button-group" defaultValue={selectedBuildingId} value={selectedBuildingId}>
                        {
                          buildingList.map(({ buildingId, buildingName }, idx) =>
                            <RadioButton value={buildingId} key={buildingId} onClick={this.onBuildingChange.bind(this, { buildingId, buildingName, index: idx })}>{buildingName}</RadioButton>
                          )
                        }
                      </RadioGroup>
                    </FormItem> : null
                }

                {
                  floorList.length > 0 ?
                    <FormItem label="楼层名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                      <RadioGroup className="custom-radio-button-group" defaultValue={selectedFloorId} value={selectedFloorId}>
                        {
                          floorList.map(({ floorId, floorName }, idx) =>
                            <RadioButton value={floorId} key={floorId} onClick={this.onFloorChange.bind(this, { floorId, floorName, index: idx })}>{floorName}</RadioButton>
                          )
                        }
                      </RadioGroup>
                    </FormItem> : null
                }
              </Form>
            </Col>
            <Col span={4}>
              <Form className="tr">
                <FormItem>
                  <a className="mr-20" onClick={() => { this.modal.addHouse.show() }}>添加</a>
                  <a className="mr-20" onClick={() => { this.modal.editHouse.show() }}>编辑</a>
                  <a onClick={this.delHouse.bind(this)}>删除</a>
                </FormItem>
                <FormItem>
                  <a className="mr-20" onClick={() => { this.modal.addBuilding.show() }}>添加</a>
                  <a className="mr-20" onClick={() => { this.modal.editBuilding.show() }}>编辑</a>
                  <a onClick={this.delBuilding.bind(this)}>删除</a>
                </FormItem>
                <FormItem>
                  <a className="mr-20" onClick={() => { this.modal.addFloor.show() }}>添加</a>
                  <a className="mr-20" onClick={() => { this.modal.editFloor.show() }}>编辑</a>
                  <a onClick={this.delFloor.bind(this)}>删除</a>
                </FormItem>
              </Form>
            </Col>
          </Row>

        </div>


        <div className="container">
          <Row >
            <Col className="tc" span={2}>
              <Avatar className="br-50" style={{ width: 80, height: 80 }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" />
            </Col>
            <Col span={8}>
              <h3>
                <b className="mr-20">{this.state.selectedHouseName || '--'}</b>
                <small className="gray">已租--套&nbsp;&nbsp;闲置--套</small>
              </h3>
              <Button size="small" icon="plus" type="primary" onClick={() => { this.modal.addRoom.show() }}>添加房间</Button>
            </Col>
          </Row>

          <Divider />

          <Row gutter={8}>
            {
              roomList.map(({ roomId, roomName, state }, idx) => {
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

                        <a onClick={this.callModalEditRoom.bind(this, { roomId, roomName, index: idx })}>
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

        {/* <Modal_Add_House onInit={this.onModalAddHouseInit.bind(this)} onOk={this.onModalAddHouseOk.bind(this)} /> */}
        {/* <Modal_Edit_House onInit={this.onModalEditHouseInit.bind(this)} onOk={this.onModalEditHouseOk.bind(this)} options={{ houseName: selectedHouseName }} /> */}

        {/* <Modal_Add_Building onInit={this.onModalAddBuildingInit.bind(this)} onOk={this.onModalAddBuildingOk.bind(this)} /> */}
        {/* <Modal_Edit_Building onInit={this.onModalEditBuildingInit.bind(this)} onOk={this.onModalEditBuildingOk.bind(this)} options={{ buildingName: selectedBuildingName }} /> */}

        {/* <Modal_Add_Floor onInit={this.onModalAddFloorInit.bind(this)} onOk={this.onModalAddFloorOk.bind(this)} />
        <Modal_Edit_Floor onInit={this.onModalEditFloorInit.bind(this)} onOk={this.onModalEditFloorOk.bind(this)} options={{ floorName: selectedFloorName }} /> */}

        <Modal_Add_Room onInit={this.onModalAddRoomInit.bind(this)} onOk={this.onModalAddRoomOk.bind(this)} />
        <Modal_Edit_Room onInit={this.onModalEditRoomInit.bind(this)} onOk={this.onModalEditRoomOk.bind(this)} options={{ roomName: this.state.selectedRoomName }} />

        {/* <Modal_Batch_Add_Property_1 onInit={this.onModalBatchAddProperty1Init.bind(this)} onOk={this.onModalBatchAddProperty1Ok.bind(this)} />

        <Modal_Batch_Add_Property_2 onInit={this.onModalBatchAddProperty2Init.bind(this)} onOk={this.onModalBatchAddProperty2Ok.bind(this)} subTitle={`楼栋${this.state.count + 1}`} />

        <Modal_Batch_Add_Property_3 onInit={this.onModalBatchAddProperty3Init.bind(this)} onOk={this.onModalBatchAddProperty3Ok.bind(this)} floorList={this.state.addingFloorList} subTitle={`楼栋${this.state.count + 1}`} /> */}

        <Modal_Bind_Device onInit={this.onModalBindDeviceInit.bind(this)} onOk={this.onModalBindDeviceOk.bind(this)} />


      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  fetchHouseList: params => dispatch(fetchHouseList(params)),
  fetchBuildingList: params => dispatch(fetchBuildingList(params)),
  fetchFloorList: params => dispatch(fetchFloorList(params)),
  fetchRoomList: params => dispatch(fetchRoomList(params)),
  addHouse: params => dispatch(addHouse(params)),
  addBuilding: params => dispatch(addBuilding(params)),
  addFloor: params => dispatch(addFloor(params)),
  addRoom: params => dispatch(addRoom(params)),
  editHouse: params => dispatch(updateHouseInfo(params)),
  editBuilding: params => dispatch(updateBuildingInfo(params)),
  editFloor: params => dispatch(updateFloorInfo(params)),
  editRoom: params => dispatch(updateRoomInfo(params)),
  delRoom: params => dispatch(delRoom(params)),
  bindDevice: params => dispatch(roomAddDevice(params))
})

export default connect(null, mapDispatchToProps)(Property)