import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Button, Divider, Table, Tabs, Timeline, Popconfirm, Avatar, Icon, Form, Switch, Slider } from 'antd'

const TabPane = Tabs.TabPane
const TimelineItem = Timeline.Item
const FormItem = Form.Item

import './LockDetail.less'

class LockDetail extends Component {
  render() {
    const columns = [{
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    }, {
      title: '设备mac',
      dataIndex: 'deviceMac',
      key: 'deviceMac'
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions'
    }];

    const dataSource = [{
      key: '5',
      deviceMac: '11-22-33-44-55-66',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: '操作'
    },
    {
      key: '1',
      deviceMac: '11-22-33-44-55-66',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: '操作'
    },
    {
      key: '2',
      deviceMac: '11-22-33-44-55-66',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: '操作'
    }];


    return (
      <div id="LockDetail" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>门锁详情</b>
            </h3>
            <small>当前租客：共<span style={{ color: 'red' }}>4</span>位租客</small>
            <br />
            <small>关联房间：慧享公寓 -> 西塔 -> 1楼 -> BCV10 <span style={{ color: 'red' }}>解除关联</span></small>
          </Col>
          <Col span={12} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', right: 20, bottom: 20 }}>
              <Button style={{ marginRight: 20 }}>返回</Button>
              <Button type="danger">还原出厂设置</Button>
            </div>
          </Col>
        </Row>
        <Divider></Divider>
        <h4>门锁详情：</h4>
        <Table dataSource={dataSource} columns={columns} pagination={false}></Table>

        <br />
        <h4>关联网关：</h4>
        <Table dataSource={dataSource} columns={columns} pagination={false}></Table>

        <br />

        <h3>
          <b>门锁管理</b>
        </h3>
        <Divider></Divider>

        <Tabs defaultActiveKey="1">
          <TabPane tab="操作记录" key="1">
            <div className="container" style={{ backgroundColor: '#eee' }}>
              <Timeline>
                <TimelineItem color="blue">
                  <div className="timeline-message">
                    <Avatar className="timeline-message-avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526969661280&di=a5aebf85080548c16ed57e49ea9cac17&imgtype=0&src=http%3A%2F%2Fimg.1ting.com%2Fimages%2Fspecial%2F99%2Fs300_d7d69fb2354557be5178919fe6562688.jpg"></Avatar>
                    <div className="grumble">
                      妈妈使用指纹打开了锁
                        <Divider></Divider>
                      <a href="javascript:;">
                        <small>点击查看回家视频照片</small>
                        <Icon type="right" className="timeline-message-action-link-arrow"></Icon>
                      </a>
                    </div>
                  </div>
                </TimelineItem>

                <TimelineItem dot={<Icon type="clock-circle-o" style={{ fontSize: '16px', backgroundColor: 'transparent' }} />} color="red">
                  <div className="timeline-message">
                    <Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526969661280&di=a5aebf85080548c16ed57e49ea9cac17&imgtype=0&src=http%3A%2F%2Fimg.1ting.com%2Fimages%2Fspecial%2F99%2Fs300_d7d69fb2354557be5178919fe6562688.jpg"></Avatar>
                    <div className="grumble">妈妈使用指纹打开了锁</div>
                  </div>
                </TimelineItem>

                <TimelineItem color="blue">
                  <div className="timeline-message">
                    <Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526969661280&di=a5aebf85080548c16ed57e49ea9cac17&imgtype=0&src=http%3A%2F%2Fimg.1ting.com%2Fimages%2Fspecial%2F99%2Fs300_d7d69fb2354557be5178919fe6562688.jpg"></Avatar>
                    <div className="grumble">妈妈使用指纹打开了锁</div>
                  </div>
                </TimelineItem>

                <TimelineItem color="blue">
                  <div className="timeline-message">
                    <Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526969661280&di=a5aebf85080548c16ed57e49ea9cac17&imgtype=0&src=http%3A%2F%2Fimg.1ting.com%2Fimages%2Fspecial%2F99%2Fs300_d7d69fb2354557be5178919fe6562688.jpg"></Avatar>
                    <div className="grumble">妈妈使用指纹打开了锁</div>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </TabPane>
          <TabPane tab="钥匙列表" key="2">
            <Table dataSource={dataSource} columns={columns}></Table>
          </TabPane>
          <TabPane tab="APP用户授权" key="3">
            <Table dataSource={dataSource} columns={columns}></Table>
          </TabPane>
          <TabPane tab="高级功能设置" key="4">
            <Form style={{ width: 600 }}>
              <FormItem>
                <Row gutter={16}>
                  <Col span={12}>
                    <Row>
                      <Col span={12}>组合开锁：</Col>
                      <Col span={12}>
                        <Switch defaultChecked></Switch>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={12}>锁芯报警：</Col>
                      <Col span={12}>
                        <Switch defaultChecked></Switch>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormItem>

              <FormItem>
                <Row gutter={16}>
                  <Col span={12}>
                    <Row>
                      <Col span={12}>常开模式：</Col>
                      <Col span={12}>
                        <Switch defaultChecked></Switch>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={12}>反锁功能：</Col>
                      <Col span={12}>
                        <Switch defaultChecked></Switch>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormItem>

              <FormItem>
                <Row gutter={16}>
                  <Col span={12}>
                    <Row>
                      <Col span={12}>开门语音：</Col>
                      <Col span={12}>
                        <Switch defaultChecked></Switch>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={12}>防撬报警：</Col>
                      <Col span={12}>
                        <Switch defaultChecked></Switch>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormItem>

              <FormItem>
                <Row gutter={16}>
                  <Col span={6}>
                    门锁音量：
                  </Col>
                  <Col span={14}>
                    <Slider defaultValue={30} />
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="门锁资料与售后" key="5">
            <Button style={{ marginRight: 20 }}>厂家信息</Button>
            <Button>使用说明</Button>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect()(LockDetail)