import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Avatar, Row, Col, Breadcrumb, Card, Divider, Table, Icon, Modal, message } from 'antd'
import { fetchRoomDetail, fetchRoomTenantList, fetchRoomDeviceList, checkoutRoom } from '../../../actions/property';
import { fetchTenantDetail, updateTenancy, tenantChangeRoom } from '../../../actions/tenant';

import ModalRelet from './Modal_Relet'
import ModalChangeRoom from './Modal_Change_Room'
import isRequestSuccess from '../../../utils/isRequestSuccess';
import parseQueryToParams from '../../../utils/parseQueryToParams'
import { unbindDevice } from '../../../actions/device';
import './index.less'

const BreadcrumbItem = Breadcrumb.Item
const confirm = Modal.confirm
const ButtonGroup = Button.Group

const credentialTypeRefers = {
  0: '其他',
  1: '身份证',
  2: '学生证',
  3: '护照',
  4: '军官证'
}

const lockTypeRefers = {
  1: '网关锁',
  2: 'WIFI锁',
  3: '蓝牙锁 ',
  4: 'NB锁'
}

const stateRefers = {
  3: '在线',
  4: '离线'
}

class RoomDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,

      currentRoomId: null,

      oldEndDate: null,

      changeRoomOptions: {},

      roomDetail: {},
      roomTenantList: [],
      roomDeviceList: {}
    }

    this.modal = {}
  }

  componentWillMount() {
    var params = parseQueryToParams(this.props.location.search)

    let p1 = this.props.fetchRoomDetail(params),
      p2 = this.props.fetchRoomTenantList(params),
      p3 = this.props.fetchRoomDeviceList(params)

    Promise.all([p1, p2, p3]).then(ret => {
      let roomDetail = isRequestSuccess(ret[0]) && ret[0].data.data || {},
        roomTenantList = isRequestSuccess(ret[1]) && ret[1].data.data.tenantList || [],
        roomDeviceList = isRequestSuccess(ret[2]) && ret[2].data.data.lockInfo || {}

      this.setState({
        roomDetail,
        roomTenantList,
        roomDeviceList,

        currentRoomId: params.roomId
      })
    })
  }

  goBack() {
    this.props.history.goBack()
  }


  checkoutRoom(params) {
    var params = {
      roomId: this.state.currentRoomId
    }

    this.props.checkoutRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('退租成功')
        this.goBack()
      } else {
        message.error(`退租失败，${ret.data.reason}`)
      }
    })
  }

  // modal
  // relet
  onModalReletInit(modal) {
    this.modal.relet = modal;
  }

  onModalReletOk(form) {
    let params = {
      roomId: this.state.currentRoomId,
      endDate: form.newEndDate
    }

    this.props.updateTenancy(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('续租成功')
        var params = {
          roomId: this.state.currentRoomId
        }
        this.props.fetchRoomDetail(params).then(ret => {
          let roomDetail = isRequestSuccess(ret) && ret.data.data || {}
          this.setState({ roomDetail })
        })
      } else {
        message.error(`续租失败，${ret.data.reason}`)
      }
    })
  }

  // change room
  onModalChangeRoomInit(modal) {
    this.modal.changeRoom = modal;
  }

  onModalChangeRoomOk(form) {
    if (form.roomId == this.state.currentRoomId) {
      message.success('换房成功')
      return
    }

    var params = {
      tenantId: this.state.changingTenantId,
      roomId: form.roomId,
      priorRoomId: this.state.currentRoomId
    }


    this.props.changeRoom(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('换房成功')

        var params = {
          roomId: this.state.currentRoomId
        }
        this.fetchRoomTenantList()
      } else {
        message.error(`换房失败，${ret.data.reason}`)
      }
    })
  }

  fetchRoomTenantList() {
    var params = {
      roomId: this.state.currentRoomId
    }

    this.props.fetchRoomTenantList(params).then(ret => {
      let roomTenantList = isRequestSuccess(ret) && ret.data.data.tenantList || []
      this.setState({ roomTenantList })
    })
  }

  callModalChangeRoom(params) {
    let { houseName, buildingName, floorName, roomName } = this.state.roomDetail
    let { tenantId, tenantName, endTime } = params

    this.setState({
      changingTenantId: tenantId,
      changeRoomOptions: {
        tenantName,
        endTime,
        houseName,
        buildingName,
        floorName,
        roomName
      }
    }, () => {
      this.modal.changeRoom.show()
    })
  }

  unbindDevice(params) {
    this.props.unbindDevice(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('解绑成功')

        var params = {
          roomId: currentRoomId
        }

        this.props.fetchRoomDeviceList(params).then(ret => {
          let roomDeviceList = isRequestSuccess(ret) && ret.data.data.lockInfo || {}

          this.setState({ roomDeviceList })

        })
      }
    })
  }

  render() {
    let { roomDetail, roomTenantList, roomDeviceList } = this.state

    let { houseName, buildingName, floorName, roomName, createTime, beginTime, endTime } = roomDetail
    let { lockId, lockMac, lockType, electricNum, lockState } = roomDeviceList

    var dataSource = lockId ? [{
      key: lockId,
      lockMac,
      lockType: lockTypeRefers[lockType],
      electricNum,
      lockSignalIntensity: '--',
      state: stateRefers[lockState],
      actions: {
        lockId,
        lockType
      }
    }] : []

    var columns = [{
      title: '门锁MAC',
      dataIndex: 'lockMac',
      key: 'lockMac'
    },
    {
      title: '门锁类型',
      dataIndex: 'lockType',
      key: 'lockType'
    },
    {
      title: '门锁电量',
      dataIndex: 'electricNum',
      key: 'electricNum',
      render: electricNum => {
        return <span>{electricNum || '--'}%</span>
      }
    },
    {
      title: '门锁信号强度',
      dataIndex: 'lockSignalIntensity',
      key: 'lockSignalIntensity'
    },
    {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state'
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render: ({ lockId, lockType }) => {
        return (
          <span>
            <Link to={`/device-lock-detail?lockId=${encodeURIComponent(lockId)}`} className="mr-20">详情</Link>
            <a onClick={this.unbindDevice.bind(this, { deviceId: [lockId], deviceType: lockType })}>解绑</a>
          </span>
        )
      }
    }]

    return (
      <div id="RoomDetail">
        <div id="room-list" className="container">
          <Row className="mb-20">
            <Col span={12}>
              <h3>
                <b>房间详情</b>
              </h3>
              <Breadcrumb className="mr-20" style={{ display: 'inline-block' }} separator=">" >
                <BreadcrumbItem>{houseName}</BreadcrumbItem>
                <BreadcrumbItem>{buildingName}</BreadcrumbItem>
                <BreadcrumbItem>{floorName}</BreadcrumbItem>
                <BreadcrumbItem>{roomName}</BreadcrumbItem>
              </Breadcrumb>

              <span className="mr-20">共<span className="danger">{roomTenantList.length}</span>位租客</span>
              {
                beginTime && endTime ? <span>租期时间：{beginTime} 至 {endTime}</span> : null
              }
            </Col>
            <Col className="tr" span={12}>
              {
                roomTenantList.length > 0 ?
                  <ButtonGroup className="mr-20">
                    <Button type="primary" ghost onClick={() => { this.modal.relet.show() }}>续租</Button>
                    <Button type="primary" ghost onClick={this.checkoutRoom.bind(this)}>退租</Button>
                  </ButtonGroup> : null
              }

              <Link className="mr-20" to={`/property-add-tenant?roomId=${encodeURIComponent(this.state.currentRoomId)}`}>
                <Button type="primary" className="fs-12">添加租客</Button>
              </Link>

              <Button type="primary" className="fs-12 mr-10" onClick={this.goBack.bind(this)}>返回</Button>
            </Col>
          </Row>

          <Divider />

          {
            roomTenantList.length > 0 ?
              <Row gutter={24}>
                {
                  roomTenantList.map(({
                    tenantId,
                    tenantName,
                    phoneNo,
                    credentialNum,
                    credentialType
                  }) => (
                      <Col key={tenantId} span={6}>
                        <Card
                          style={{
                            overflow: 'hidden',
                            borderRadius: 8
                          }}
                          title={
                            <span>
                              <Avatar icon="user" size="middle" className="mr-20 w-text bg-w" style={{ color: "#D4EDFF" }} />
                              <span className="fs-16" style={{ lineHeight: '21px' }}>{tenantName}</span>
                            </span>
                          }>
                          <h4>联系电话：{phoneNo}</h4>
                          <h4>授权方式：{credentialTypeRefers[credentialType]}</h4>

                          <div className="pos-r" style={{ bottom: -10 }} >
                            <Divider className="mt-20 mb-20" />

                            <Row gutter={10}>
                              <Col span={12} />
                              <Col span={6}>
                                <Button onClick={this.callModalChangeRoom.bind(this, { tenantId, tenantName, endTime })} className="w-100" type="primary" ghost>换房</Button>
                              </Col>

                              <Col span={6}>
                                <Link to="/property-room-info">
                                  <Button className="w-100" type="primary" ghost>查看</Button>
                                </Link>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      </Col>
                    ))}

              </Row> :

              <div className="tc pt-30 pb-30">
                <Avatar className="br-50" style={{ width: 150, height: 150 }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" />
                <br />
                <h2 className="mt-30">暂无租客居住</h2>
              </div>
          }
        </div>

        <div id="devices-manegement" className="container">
          <h3>
            <b>设备管理</b>
          </h3>

          <h4 className="mt-20">关联门锁</h4>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>

        <ModalChangeRoom onInit={this.onModalChangeRoomInit.bind(this)} onOk={this.onModalChangeRoomOk.bind(this)} options={this.state.changeRoomOptions} />
        <ModalRelet onInit={this.onModalReletInit.bind(this)} onOk={this.onModalReletOk.bind(this)} oldEndDate={endTime} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRoomDetail: params => dispatch(fetchRoomDetail(params)),
  fetchRoomTenantList: params => dispatch(fetchRoomTenantList(params)),
  fetchRoomDeviceList: params => dispatch(fetchRoomDeviceList(params)),
  updateTenancy: params => dispatch(updateTenancy(params)),
  checkoutRoom: params => dispatch(checkoutRoom(params)),
  changeRoom: params => dispatch(tenantChangeRoom(params)),
  unbindDevice: params => dispatch(unbindDevice(params))
})

export default withRouter(connect(null, mapDispatchToProps)(RoomDetail))