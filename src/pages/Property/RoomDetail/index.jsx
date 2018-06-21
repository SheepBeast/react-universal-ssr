import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'querystring'
import { Button, Avatar, Row, Col, Breadcrumb, Card, Divider, Table, Icon, Modal, Form, Select, Input, DatePicker } from 'antd'

import './index.less'
import { fetchRoomDetailData, fetchRoomTenantListData, fetchRoomDeviceListData, fetchRoomListData } from '../../../actions/property';
import { fetchTenantDetail, updateTenancy, delTenant, tenantChangeRoom } from '../../../actions/tenant';

import Modal_Relet from './Modal_Relet'
import Modal_Change_Room from './Modal_Change_Room'
import isRequestSuccess from '../../../utils/isRequestSuccess';

const FormItem = Form.Item
const Option = Select.Option
const BreadcrumbItem = Breadcrumb.Item
const confirm = Modal.confirm

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
  0: '异常',
  1: '正常',
  2: '低电量',
  3: '挟持告警',
  4: '离线'
}

class RoomDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,

      currentRoomId: null,

      oldEndDate: null,

      changeRoomOptions: null,

      roomList: []
    }

    this.modal = {}
  }

  componentWillMount() {
    var params = this.parseQueryToParams()

    this.setState({
      currentRoomId: params.roomId
    })

    this.props.fetchRoomDetail(params)

    this.props.fetchRoomTenantList(params)

    this.props.fetchRoomDeviceList(params)

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

  parseQueryToParams() {
    let search = this.props.location.search.replace('?', ''), k, params = {}
    search = qs.parse(search)

    for (k in search) {
      params[k] = decodeURIComponent(search[k])
    }

    return params
  }

  delTenant(params) {
    confirm({
      title: '退租确认',
      content: '退租后对应租客的门锁相关联的APP/卡片/密码权限会消失',
      // onOk: this.delTenantSuccess,
      onOk: () => {
        params.roomId = this.state.currentRoomId
        this.props.delTenant(params).then(ret => {
          if (isRequestSuccess(ret)) {
            this.delTenantSuccess()
          } else {
            this.delTenantFail()
          }
        })
      },
      onCancel: this.delTenantFail,
      okText: '确定',
      cancelText: '取消'
    })
  }

  delTenantSuccess() {
    Modal.info({
      title: '提示',
      content: '退租成功'
    })
  }

  delTenantFail() {
    Modal.info({
      title: '提示',
      content: '退租失败'
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

    this.props.updateTenancy(params)
  }

  callModalRelet(params) {
    let { endDate, tenantId } = params
    this.setState({
      oldEndDate: endDate,
      updatingRetantId: tenantId
    }, () => {
      this.modal.relet.show()
    })
  }

  // change room
  onModalChangeRoomInit(modal) {
    this.modal.changeRoom = modal;
  }

  onModalChangeRoomOk(form) {
    var params = {
      tenantId: this.state.changingTenantId,
      roomId: form.roomId,
      priorRoomId: this.state.currentRoomId
    }

    this.props.changeRoom(params)
  }

  callModalChangeRoom(params) {
    let { houseName, buildingName, floorName, roomName } = this.props.roomDetail
    let { tenantId, tenantName, endDate } = params
    let { roomList } = this.state

    this.setState({
      changingTenantId: tenantId,
      changeRoomOptions: {
        tenantName,
        endDate,
        roomList,
        houseName,
        buildingName,
        floorName,
        roomName
      }
    }, () => {
      this.modal.changeRoom.show()
    })
  }



  render() {
    let {
      lockId,
      lockMac,
      lockType,
      electricNum,
      // 信号强度
      lockState
    } = this.props.roomDeviceList

    var dataSource = lockId ? [{
      key: lockId,
      lockMac,
      lockType: lockTypeRefers[lockType],
      electricNum,
      lockSignalIntensity: '--',
      state: stateRefers[lockState],
      actions: {
        lockId
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
      render: ({ lockId }) => {
        return (
          <span>
            <Link to={`/device-lockDetail?lockId=${encodeURIComponent(lockId)}`} className="mr-20">详情</Link>
            <a>关联</a>
          </span>
        )
      }
    }]


    let { houseName, buildingName, floorName, roomName } = this.props.roomDetail

    let roomTenantList = this.props.roomTenantList

    return (
      <div id="RoomDetail">
        <div id="room-list" className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="mb-20" >
            <div>
              <h3>
                <b>房间详情</b>
              </h3>
              <Breadcrumb className="mr-20" style={{ display: 'inline-block' }} separator=">" >
                <BreadcrumbItem>{houseName}</BreadcrumbItem>
                <BreadcrumbItem>{buildingName}</BreadcrumbItem>
                <BreadcrumbItem>{floorName}</BreadcrumbItem>
                <BreadcrumbItem>{roomName}</BreadcrumbItem>
              </Breadcrumb>

              共<span className="danger">{roomTenantList.length}</span>位租客

            </div>
            <div>
              <div className="fr mr-20">
                <Button type="primary" className="fs-12 mr-10" onClick={() => { this.props.history.goBack() }}>返回</Button>

                <Link to={`/property-add-renter?roomId=${encodeURIComponent(this.state.currentRoomId)}`}>
                  <Button type="primary" className="fs-12" >添加租客</Button>
                </Link>
              </div>
            </div>
          </div>

          <Divider />
          {
            roomTenantList.length > 0 ?
              <Row gutter={24}>
                {
                  roomTenantList.map(({
                    tenantId,
                    tenantName,
                    phoneNo,
                    beginDate,
                    endDate,
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
                          }
                          extra={
                            <Icon type="exclamation-circle-o" className="fs-21" style={{ color: '#0084E3' }} />
                          }>
                          <h4>联系电话：{phoneNo}</h4>
                          <h4>租期时间：{beginDate} 至 {endDate}</h4>
                          <h4>授权方式：{credentialTypeRefers[credentialType]}</h4>

                          <div className="pos-r" style={{ bottom: -10 }} >
                            <Divider className="mt-20 mb-20" ></Divider>

                            <Row className="tc btn-cols" >
                              <Col span={6} className="btn-col">
                                <a onClick={this.callModalRelet.bind(this, { tenantId, endDate })}>续租</a>
                              </Col>

                              <Col span={6} className="btn-col">
                                <a onClick={this.delTenant.bind(this, { tenantId })}>退租</a>
                              </Col>

                              <Col span={6} className="btn-col">
                                <a onClick={this.callModalChangeRoom.bind(this, { tenantId, tenantName, endDate })}>换房</a>
                              </Col>

                              <Col span={6} className="btn-col">
                                <Link to="/RoomDetailInfo">查看</Link>
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
          <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
        </div>


        <Modal_Relet onInit={this.onModalReletInit.bind(this)} onOk={this.onModalReletOk.bind(this)} oldEndDate={this.state.oldEndDate} />

        <Modal_Change_Room onInit={this.onModalChangeRoomInit.bind(this)} onOk={this.onModalChangeRoomOk.bind(this)} options={this.state.changeRoomOptions} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  roomDetail: state.roomDetail || {},
  roomTenantList: state.roomTenantList || [],
  roomDeviceList: state.roomDeviceList || {}
})
const mapDispatchToProps = dispatch => ({
  fetchRoomDetail: params => dispatch(fetchRoomDetailData(params)),
  fetchRoomTenantList: params => dispatch(fetchRoomTenantListData(params)),
  fetchRoomDeviceList: params => dispatch(fetchRoomDeviceListData(params)),
  fetchTenantDetail: params => dispatch(fetchTenantDetail(params)),
  updateTenancy: params => dispatch(updateTenancy(params)),
  delTenant: params => dispatch(delTenant(params)),
  changeRoom: params => dispatch(tenantChangeRoom(params)),
  fetchRoomList: params => dispatch(fetchRoomListData(params)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomDetail))