import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'querystring'
import { Tooltip, Row, Col, Button, Divider, Table, Tabs, Timeline, Popconfirm, Avatar, Icon, Form, Switch, Slider } from 'antd'

const TabPane = Tabs.TabPane
const TimelineItem = Timeline.Item
const FormItem = Form.Item
const ButtonGroup = Button.Group

import './index.less'
import { fetchLockDetailData, fetchLockKeyListData, fetchLockAppKeyListData, updateLockFunctionConfig, fetchLockLogListData, unbindDevice } from '../../actions/device';

const lockTypeRefers = {
  1: '网关锁',
  2: 'WIFI锁',
  3: '蓝牙锁 ',
  4: 'NB锁'
}

const gatewayTypeRefers = {
  1: '有线网关',
  2: '无线网关'
}

const stateRefers = {
  0: '异常',
  1: '正常',
  2: '低电量',
  3: '挟持告警',
  4: '离线'
}

const keyRefers = {
  1: '指纹', 2: '密码', 4: '卡片', 8: '遥控器', 32: '机械钥匙', 128: 'APP远程', 129: '微信授权'
}




const lockCols = [{
  title: '门锁MAC',
  dataIndex: 'lockMac',
  key: 'lockMac',
  render: mac => {
    return <div style={{ width: 200 }}>{mac}</div>
  }
}, {
  title: '门锁类型',
  dataIndex: 'lockType',
  key: 'lockType'
}];


const gatewayCols = [{
  title: '网关MAC',
  dataIndex: 'gatewayMac',
  key: 'gatewayMac',
  render: mac => {
    return <div style={{ width: 200 }}>{mac}</div>
  }
}, {
  title: '网关类型',
  dataIndex: 'gatewayType',
  key: 'gatewayType'
}]

const roomCols = [{
  title: '房产',
  dataIndex: 'houseName',
  key: 'houseName'
}, {
  title: '楼栋',
  dataIndex: 'buildingName',
  key: 'buildingName'
}, {
  title: '楼层',
  dataIndex: 'floorName',
  key: 'floorName'
}, {
  title: '房间',
  dataIndex: 'roomName',
  key: 'roomName'
}, {
  title: '当前租客',
  dataIndex: 'renter',
  key: 'renter'
}, {
  title: '操作',
  dataIndex: 'actions',
  key: 'actions',
  render: () => {
    return (
      <Link to="/RoomDetail">详情</Link>
    )
  }
}];


const keysCols = [{
  title: '钥匙ID',
  dataIndex: 'keyID',
  key: 'keyID'
}, {
  title: '所属人',
  dataIndex: 'owner',
  key: 'owner'
}, {
  title: '钥匙类型',
  dataIndex: 'keyType',
  key: 'keyType'
}, {
  title: '有效周期',
  dataIndex: 'expires',
  key: 'expires'
}]

const authCols = [{
  title: 'APPID',
  dataIndex: 'APPID',
  key: 'APPID'
}, {
  title: '所属人',
  dataIndex: 'owner',
  key: 'owner'
}, {
  title: '有效周期',
  dataIndex: 'expires',
  key: 'expires'
}]

class LockDetail extends React.Component {
  componentWillMount() {
    let params = this.parseQueryToParams()

    this.props.fetchLockDetail(params)
    this.props.fetchLockKeyList(params)
    this.props.fetchLockAppKeyList(params)
    // this.props.updateLockFunction(params)
    this.props.fetchLockLogList(params)
  }

  parseQueryToParams() {
    let search = this.props.location.search.replace('?', ''), k, params = {}
    search = qs.parse(search)

    for (k in search) {
      params[k] = decodeURIComponent(search[k])
    }

    return params
  }

  unbindDevice(params) {
    console.log('unbind device -->', params)
    this.props.unbindDevice(params)
  }

  render() {
    console.log('lock detail -->', this.props.lockDetail)
    let {
      lockState,
      electricNum,
      // 门锁信号
      // 网关信号
      lockId,
      lockMac,
      lockType,
      lockName,
      gatewayMac,
      gatewayType,
      roomId,
      roomName, floorName, buildingName, houseName,
      // 当前租客
      maxVolume,

      comName,
      projectLogo,
      // 门锁型号
      // 公司型号
    } = this.props.lockDetail




    const lockData = [{
      key: 1,
      lockMac,
      lockType: lockTypeRefers[lockType]
    }]






    const gatewayData = [{
      key: 2,
      gatewayMac,
      gatewayType: gatewayTypeRefers[gatewayType]
    }]



    const roomData = [{
      key: roomId,
      houseName: houseName || '--',
      buildingName: buildingName || '--',
      floorName: floorName || '--',
      roomName: roomName || '--',
      renter: '--',
      actions: null
    }]


    const keysData = this.props.lockKeyList.map(({
      lockKeyId,
      userName,
      keyType,
      beginTime,
      endTime
    }) => {
      let _keyType = keyRefers[keyType]

      return {
        keyID: lockKeyId,
        owner: userName,
        keyType: _keyType,
        expires: `${new Date(beginTime).toLocaleString()}至${new Date(endTime).toLocaleString()}`
      }
    })

    const authData = this.props.lockAppKeyList.map(({
      lockKeyId,
      userName,
      beginTime,
      endTime
    }) => {
      return {
        APPID: lockKeyId,
        owner: userName,
        expires: `${new Date(beginTime).toLocaleString()}至${new Date(endTime).toLocaleString()}`
      }
    })

    console.log('log list -->', this.props.lockLogList)

    return (
      <div id="LockDetail">
        <div className="container">
          <Row>
            <Col span={12}>
              <h3>
                <b>{lockName}</b>
              </h3>
            </Col>
            <Col span={12}>
              <div className="fr">
                <ButtonGroup className="mr-20">
                  <Button type="primary" ghost>解除报警</Button>
                  <Button type="primary" ghost>解除关联</Button>
                </ButtonGroup>

                <Button type="primary">返回</Button>
              </div>
            </Col>
          </Row>

          <div className="container tc">
            <Row>
              <Col span={6}>
                <span className="fs-14 gray">当前状态</span>
                <br />
                <span className={`fs-24 ${lockState == 1 ? '' : 'danger'}`}>{stateRefers[lockState]}</span>
              </Col>
              <Col span={6}>
                <span className="fs-14 gray">电量</span>
                <br />
                <span className="fs-24">{electricNum}%</span>
              </Col>
              <Col span={6}>
                <span className="fs-14 gray">门锁信号</span>
                <br />
                <span className="fs-24">--</span>
              </Col>
              <Col span={6}>
                <span className="fs-14 gray">网关信号</span>
                <br />
                <span className="fs-24">--</span>
              </Col>
            </Row>
          </div>
        </div>

        <div className="container">
          <h3>
            <b>门锁信息</b>
          </h3>
          <Table dataSource={lockData} columns={lockCols} pagination={false}></Table>
          <Table dataSource={gatewayData} columns={gatewayCols} pagination={false}></Table>
        </div>

        {
          roomId ?
            <div className="container">
              <h3>
                <Row>
                  <Col span={12}>
                    <b>关联房间</b>
                  </Col>
                  <Col span={12} className="tr">
                    <Button type="primary" onClick={
                      this.unbindDevice.bind(this, {
                        deviceType: 2,
                        deviceId: [lockId]
                      })
                    }>解除关联</Button>
                  </Col>
                </Row>
              </h3>
              <Table dataSource={roomData} columns={roomCols} pagination={false}></Table>
            </div> :
            <div className="container">
              <h3>
                <b>关联房间</b>
              </h3>
              <div className="tc">
                <p className="gray">未关联房间，请进行关联操作</p>
                <Button type="primary">关联房间</Button>
              </div>
            </div>
        }


        <div className="container" style={{ minHeight: 500 }}>
          <Tabs type="card" defaultActiveKey="1">

            <TabPane tab="操作记录" key="1">
              <div className="container">
                <Timeline>
                  {
                    this.props.lockLogList.map(({
                      logId,
                      createTime,
                      lockType,
                      relatedOperation

                    }) => (
                        <TimelineItem key={logId}
                          dot={
                            <Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526969661280&di=a5aebf85080548c16ed57e49ea9cac17&imgtype=0&src=http%3A%2F%2Fimg.1ting.com%2Fimages%2Fspecial%2F99%2Fs300_d7d69fb2354557be5178919fe6562688.jpg"></Avatar>
                          }
                        >
                          <div className="ml-20 tooltip-inner">
                            <div className="tooltip-arrow" />
                            <div>
                              <h4>
                                <b>{createTime}</b>
                              </h4>
                              <span className="gray">{relatedOperation
                              }：--使用了--打开了{lockTypeRefers[lockType]}</span>
                            </div>

                          </div>
                        </TimelineItem>
                      ))
                  }
                  {/* <TimelineItem
                    dot={
                      <Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526969661280&di=a5aebf85080548c16ed57e49ea9cac17&imgtype=0&src=http%3A%2F%2Fimg.1ting.com%2Fimages%2Fspecial%2F99%2Fs300_d7d69fb2354557be5178919fe6562688.jpg"></Avatar>
                    }
                  >
                    <div className="ml-20 tooltip-inner">
                      <div className="tooltip-arrow" />
                      <div>
                        <h4>
                          <b>今天 9:00</b>
                        </h4>
                        <span className="danger">非法操作报警</span>
                      </div>
                    </div>
                  </TimelineItem> */}
                </Timeline>
              </div>

            </TabPane>
            <TabPane tab="钥匙列表" key="2">
              <Table style={{ width: 1000 }} pagination={false} dataSource={keysData} columns={keysCols}></Table>
            </TabPane>
            <TabPane tab="APP用户授权" key="3">
              <Table style={{ width: 1000 }} pagination={false} dataSource={authData} columns={authCols}></Table>
            </TabPane>
            <TabPane tab="高级功能设置" key="4">
              <Form className="form-shim" style={{ width: 400 }}>
                <Row>
                  <Col span={12}>
                    <FormItem label="组合开锁" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                      <Switch defaultChecked></Switch>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="锁芯报警" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                      <Switch defaultChecked></Switch>
                    </FormItem>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <FormItem label="常开模式" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                      <Switch defaultChecked></Switch>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="反锁功能" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                      <Switch defaultChecked></Switch>
                    </FormItem>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <FormItem label="开门语音" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                      <Switch defaultChecked></Switch>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="防撬报警" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                      <Switch defaultChecked></Switch>
                    </FormItem>
                  </Col>
                </Row>

                <FormItem label="门锁音量" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                  <Slider defaultValue={30} />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="门锁资料与售后" key="5">
              <div className="mb-20">
                <Button className="mr-20" type="primary" ghost>厂家信息</Button>
                <Button>使用说明</Button>
              </div>
              <Row>
                <Col span={12}>
                  <p>公司名称：{comName}</p>
                  <p>售后电话：</p>
                  <p>门锁型号：</p>
                  <p>公司简介：</p>
                </Col>
                <Col className="tr" span={12}>
                  <img src={projectLogo} alt="LOGO" />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lockDetail: state.lockDetail || {},
  lockKeyList: state.lockKeyList || [],
  lockAppKeyList: state.lockAppKeyList || [],
  lockLogList: state.lockLogList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchLockDetail: params => dispatch(fetchLockDetailData(params)),
    fetchLockKeyList: params => dispatch(fetchLockKeyListData(params)),
    fetchLockAppKeyList: params => dispatch(fetchLockAppKeyListData(params)),
    updateLockFunction: params => dispatch(updateLockFunctionConfig(params)),
    fetchLockLogList: params => dispatch(fetchLockLogListData(params)),
    unbindDevice: params => dispatch(unbindDevice(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LockDetail))