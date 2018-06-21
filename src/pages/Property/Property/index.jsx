import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Radio, Form, Icon, Button, Avatar, Row, Col,    Card, Divider, Tooltip } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

import { fetchHouseList, fetchBuildingList, fetchFloorList, fetchRoomList, addHouse, addBuilding, delRoom, roomAddDevice, updateRoomInfo } from '../../../actions/property';
import Modal_Add_Property from './Modal_Add_Property'
import Modal_Batch_Add_Property_1 from './Modal_Batch_Add_Property_1'
import Modal_Batch_Add_Property_2 from './Modal_Batch_Add_Property_2'
import Modal_Batch_Add_Property_3 from './Modal_Batch_Add_Property_3'
import Modal_Bind_Device from './Modal_Bind_Device'
import Modal_Modify_Property from './Modal_Modify_Property'
import isRequestSuccess from '../../../utils/isRequestSuccess';
import './index.less'

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
  constructor() {
    super()
    this.state = {
      houseId: null,
      buildingId: null,
      floorId: null,
      roomId: null,

      currentHouseName: null,

      addingHouseId: null,
      buildingNum: 0,
      count: 0,

      floorList: [],

      bindingRoomId: null,
      modifingRoomId: null
    }

    this.modal = {}

  }

  componentWillMount() {
    this.props.fetchHouseList({ state: 1 }).then(ret => {
      if (isRequestSuccess(ret)) {
        let { houseId, houseName } = ret.data.data.list[0]
        this.setState({
          houseId,
          currentHouseName: houseName
        })
      }
    })
    this.props.fetchBuildingList({ state: 1 })
    this.props.fetchFloorList({ state: 1 })
    this.props.fetchRoomList({ state: [1, 2, 3, 4, 5] })
  }

  linkedFetchBuildingList(params) {
    this.props.fetchBuildingList(params).then(ret => {
      console.log('building list -->', ret)

      var buildingList = ret.data.data && ret.data.data.list

      if (!buildingList || buildingList.length == 0) {
        return
      }

      var params = {
        buildingId: buildingList[0].buildingId,
        state: 1
      }

      this.linkedFetchFloorList(params)
    })
  }

  linkedFetchFloorList(params) {
    this.props.fetchFloorList(params).then(ret => {
      console.log('floor list -->', ret)

      var floorList = ret.data.data && ret.data.data.list

      if (!floorList || floorList.length) {
        return
      }

      var params = {
        floorId: floorList[0].floorId,
        state: [1, 2, 3, 4, 5]
      }

      this.setState({
        floorId: params.floorId
      })

      this.linkedFetchRoomList(params)
    })
  }

  linkedFetchRoomList(params) {
    this.setState({
      roomId: params.roomId
    })

    this.props.fetchRoomList(params).then(ret => {
      console.log('room list -->', ret)
    })
  }
  /*********************************/
  onHouseListChange(e) {
    e.stopPropagation()

    var params = {
      houseId: e.target.value,
      state: 1
    }

    this.setState({
      houseId: params.houseId
    })

    this.linkedFetchBuildingList(params)
  }


  onBuildingListChange(e) {
    e.stopPropagation()

    var params = {
      buildingId: e.target.value,
      state: 1
    }

    this.setState({
      buildingId: params.buildingId
    })

    this.linkedFetchFloorList(params)
  }

  onFloorListChange(e) {
    e.stopPropagation()

    var params = {
      floorId: e.target.value,
      state: [1, 2, 3, 4, 5]
    }

    this.setState({
      floorId: params.floorId
    })

    this.linkedFetchRoomList(params)
  }

  onRadioButtonClick(houseName) {
    console.log('house name -->', houseName)

    this.setState({
      currentHouseName: houseName
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
    }
  }

  // modal

  // add property
  onModalAddPropertyInit(modal) {
    this.modal.addProperty = modal
  }

  onModalAddPropertyOk(form) {

    console.log('form -->', form)

    this.props.addHouse(form)
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
    // ...
    console.log('batch 1 form -->', form)

    this.props.addHouse(form).then(ret => {
      console.log('batch add property 1 ok ret -->', ret)

      if (isRequestSuccess(ret)) {
        let { buildingNum } = form
        let params = Object.assign({ buildingNum }, ret.data.data)
        this.startAddBuilding(params)
      }
    })
  }

  // batch add property 2
  onModalBatchAddProperty2Init(modal) {
    this.modal.batchAddProperty2 = modal
  }

  onModalBatchAddProperty2Ok(form) {
    let params = {
      houseId: this.state.addingHouseId,
      buildingName: form.buildingName,
      batch: form.batch ? 1 : 0,
      area: form.address
    }

    if (form.district) {
      let district = form.district

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

    if (form.floorNum) {
      params.floorNum = form.floorNum
    }

    if (form.roomNum) {
      params.roomNum = form.roomNum
    }

    if (form.roomNamePrefix) {
      params.roomNamePrefix = form.roomNamePrefix
    }

    console.log('add building params -->', params)

    this.props.addBuilding(params).then(ret => {
      if (isRequestSuccess(ret)) {
        this.setState({
          floorList: ret.data.data.floorList
        }, () => {
          this.modal.batchAddProperty3.show()
        })

      }
    })
  }


  // batch add property 3
  onModalBatchAddProperty3Init(modal) {
    this.modal.batchAddProperty3 = modal
  }

  onModalBatchAddProperty3Ok(form) {
    form.level = 4
    this.props.delRoom(form).then(ret => {
      if (isRequestSuccess(ret)) {
        this.setState({
          count: ++this.state.count
        }, () => {
          this.loopAddBuilding()
        })
      }
    })
  }

  // bind device

  onModalBindDeviceInit(modal) {
    this.modal.bindDevice = modal
  }

  onModalBindDeviceOk(form) {
    if(!form.deviceId) {
      return
    }
    var params = Object.assign({
      id: this.state.bindingRoomId,
      level: 4,
      deviceType: 2
    }, form)

    this.props.bindDevice(params)
  }

  // modify property

  onModalModifyPropertyInit(modal) {
    this.modal.modifyProperty = modal
  }

  onModalModifyPropertyOk(form) {
    var params = Object.assign({
      roomId: this.state.modifingRoomId
    }, form)

    this.props.modifyProperty(params)
  }

  ////////////////////////////

  delHouse() {
    this.props.delRoom({
      id: [this.state.houseId],
      level: 1
    })
  }

  callModalModifyPropery(params) {
    this.setState({
      modifingRoomId: params.roomId
    },()=>{
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
    const { houseList, buildingList, floorList, roomList } = this.props


    let { houseId, buildingId, floorId, roomId } = this.state


    return (
      <div id="Property">
        <div className="mb-20 container">
          <Form>
            {
              houseList.length > 0 ?
                <FormItem label="公寓名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                  <RadioGroup className="custom-radio-button-group" defaultValue={houseList[0].houseId} value={houseId || houseList[0].houseId} onChange={this.onHouseListChange.bind(this)}>
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
                  <RadioGroup className="custom-radio-button-group" defaultValue={buildingList[0].buildingId} value={buildingId || buildingList[0].buildingId} onChange={this.onBuildingListChange.bind(this)}>
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
                  <RadioGroup className="custom-radio-button-group" defaultValue={floorList[0].floorId} value={floorId || floorList[0].floorId} onChange={this.onFloorListChange.bind(this)}>
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
                <b>{this.state.currentHouseName || '--'}</b>
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

                        <a onClick={this.callModalModifyPropery.bind(this,{roomId})}>
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
                        <Avatar style={{ width: 100, height: 100, borderRadius: '50%' }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" className="mb-20"></Avatar>
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

        <Modal_Batch_Add_Property_3 onInit={this.onModalBatchAddProperty3Init.bind(this)} onOk={this.onModalBatchAddProperty3Ok.bind(this)} floorList={this.state.floorList} subTitle={`楼栋${this.state.count + 1}`} />

        <Modal_Bind_Device onInit={this.onModalBindDeviceInit.bind(this)} onOk={this.onModalBindDeviceOk.bind(this)} />

        <Modal_Add_Property onInit={this.onModalAddPropertyInit.bind(this)} onOk={this.onModalAddPropertyOk.bind(this)} onSwitchChange={this.onModalAddPropertySwitchChange.bind(this)} />

        <Modal_Modify_Property onInit={this.onModalModifyPropertyInit.bind(this)} onOk={this.onModalModifyPropertyOk.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  houseList: state.houseList || [],
  buildingList: state.buildingList || [],
  floorList: state.floorList || [],
  roomList: state.roomList || []
})
const mapDispatchToProps = dispatch => ({
  fetchHouseList: params => dispatch(fetchHouseList(params)),
  fetchBuildingList: params => dispatch(fetchBuildingList(params)),
  fetchFloorList: params => dispatch(fetchFloorList(params)),
  fetchRoomList: params => dispatch(fetchRoomList(params)),
  addHouse: params => dispatch(addHouse(params)),
  addBuilding: params => dispatch(addBuilding(params)),
  delRoom: params => dispatch(delRoom(params)),
  bindDevice: params => dispatch(roomAddDevice(params)),
  modifyProperty: params=>dispatch(updateRoomInfo(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Property)