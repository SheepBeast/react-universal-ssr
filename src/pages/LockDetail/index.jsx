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
import { fetchLockDetailData, fetchLockKeyListData, fetchLockAppKeyListData, updateLockFunctionConfig } from '../../actions/device';

class LockDetail extends React.Component {
  componentWillMount() {
    let params = this.parseQueryToParams()

    this.props.fetchLockDetail(params)
    // this.props.fetchLockKeyList(params)
    // this.props.fetchLockAppKeyList(params)
    this.props.updateLockFunction(params)
  }

  parseQueryToParams() {
    let search = this.props.location.search.replace('?', ''), k, params = {}
    search = qs.parse(search)

    for(k in search) {
      params[k] = decodeURIComponent(search[k])
    }

    return params
  }

  render() {
    console.log('lock detail -->', this.props.lockDetail)
    let {
      lockState,
      electricNum,
      // 门锁信号
      // 网关信号
      lockMac,
      lockType,
      lockName,
      gatewayMAC,
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




    const lockCols = [{
      title: '门锁MAC',
      dataIndex: 'lockMac',
      key: 'lockMac'
    }, {
      title: '门锁类型',
      dataIndex: 'lockType',
      key: 'lockType'
    }];

    const lockData = [{
      key: 1,
      lockMac,
      lockType: lockTypeRefers[lockType]
    }]



    const gatewayCols = [{
      title: '网关MAC',
      dataIndex: 'gatewayMAC',
      key: 'gatewayMAC'
    }, {
      title: '网关类型',
      dataIndex: 'gatewayType',
      key: 'gatewayType'
    }]




    const gatewayData = [{
      key: 2,
      gatewayMAC,
      gatewayType: gatewayTypeRefers[gatewayType]
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

    const roomData = [{
      key: roomId,
      houseName: houseName || '--',
      buildingName: buildingName || '--',
      floorName: floorName || '--',
      roomName: roomName || '--',
      renter: '--',
      actions: null
    }]

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

    const keysData = [{
      key: '0',
      keyID: 11,
      owner: '张三',
      keyType: '指纹钥匙',
      expires: '2014-11-21至2019-03-02'
    },
    {
      key: '1',
      keyID: 12,
      owner: '里斯',
      keyType: '指纹钥匙',
      expires: '2014-11-21至2019-03-02'
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

    const authData = [{
      key: '0',
      APPID: 899,
      owner: '张三',
      expires: '2014-11-21至2019-03-02'
    },
    {
      key: '1',
      APPID: 900,
      owner: '里斯',
      expires: '2014-11-21至2019-03-02'
    }]

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
                <span className="fs-24" className={lockState === 1 ? '' : 'danger'}>{stateRefers[lockState]}</span>
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
                  <Col span={12} style={{ textAlign: 'left' }}>
                    <b>关联房间</b>
                  </Col>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="primary">解除关联</Button>
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
                    Array(3).fill(1).map((val, idx) => (
                      <TimelineItem key={idx}
                        dot={
                          <Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526969661280&di=a5aebf85080548c16ed57e49ea9cac17&imgtype=0&src=http%3A%2F%2Fimg.1ting.com%2Fimages%2Fspecial%2F99%2Fs300_d7d69fb2354557be5178919fe6562688.jpg"></Avatar>
                        }
                      >
                        <div className="ml-20 tooltip-inner">
                          <div className="tooltip-arrow" />
                          <div>
                            <h4>
                              <b>今天 {14 - idx}:00</b>
                            </h4>
                            <span className="gray">妈妈使用了指纹打开了门锁</span>
                          </div>

                        </div>
                      </TimelineItem>
                    ))
                  }
                  <TimelineItem
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
                  </TimelineItem>
                </Timeline>
              </div>

            </TabPane>
            <TabPane tab="钥匙列表" key="2">
              <Table style={{ width: 500 }} pagination={false} dataSource={keysData} columns={keysCols}></Table>
            </TabPane>
            <TabPane tab="APP用户授权" key="3">
              <Table style={{ width: 500 }} pagination={false} dataSource={authData} columns={authCols}></Table>
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
  lockAppKeyList: state.lockAppKeyList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchLockDetail: params => dispatch(fetchLockDetailData(params)),
    fetchLockKeyList: params => dispatch(fetchLockKeyListData(params)),
    fetchLockAppKeyList: params => dispatch(fetchLockAppKeyListData(params)),
    updateLockFunction:params=> dispatch(updateLockFunctionConfig(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LockDetail))