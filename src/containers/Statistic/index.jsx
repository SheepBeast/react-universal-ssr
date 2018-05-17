import { Component } from 'react'
import { Row, Col, Table, Card, Avatar, Layout } from 'antd'

const { Content, Sider } = Layout

import './index.less'

export default class Statistic extends Component {
  render() {
    const dataSource = [{
      key: '1',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    }, {
      key: '2',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    }, {
      key: '3',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    }, {
      key: '4',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    },
    {
      key: '5',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    }, {
      key: '6',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    }, {
      key: '7',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    }, {
      key: '8',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    }, {
      key: '9',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    },
    {
      key: '10',
      info: '致远大功于1栋16楼ABC2406房',
      deviceType: '蓝牙锁',
      exceptionType: '离线',
      battery: '60%',
      roomNo: '致远公寓ABC2406',
      gateway: '29.34.56.98.AB.FG'
    }];

    const columns = [
      {
        title: '房间信息',
        dataIndex: 'info',
        key: 'info'
      },
      {
        title: '设备类型',
        dataIndex: 'deviceType',
        key: 'deviceType'
      },
      {
        title: '异常类型',
        dataIndex: 'exceptionType',
        key: 'exceptionType'
      },
      {
        title: '电池电量',
        dataIndex: 'battery',
        key: 'battery'
      },
      {
        title: '公寓房间号',
        dataIndex: 'roomNo',
        key: 'roomNo'
      },
      {
        title: '网关',
        dataIndex: 'gateway',
        key: 'gateway'
      }
    ];

    return (
      <Layout style={{ justifyContent: 'flex-end' }}>
        <Content id="MainStatistic" style={{ padding: '30px 20px' }}>
          <Row style={{ marginBottom: 20 }}>
            <Col span={12} style={{ backgroundColor: '#fff' }}>
              <Card></Card>
            </Col>
            <Col span={12} style={{ backgroundColor: '#fff' }}>
              <Card></Card>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ backgroundColor: '#fff', padding: '30px 20px' }}>
              <h3 style={{ marginBottom: 20 }}><b>异常设备信息统计</b></h3>
              <Table dataSource={dataSource} columns={columns} />
            </Col>
          </Row>
        </Content>
        <Sider id="MessageContainer"
          width={400}
          style={{
            backgroundColor: '#fff',
            overflow: scroll, height: '100%',
            float: 'right',
            padding: 30
          }}>

            <h3 style={{ marginBottom: 20 }}><b>消息提醒</b></h3>
            <Card title={<span><Avatar icon="shop" size="small" style={{ backgroundColor: '#0084E3' }} />  <small>&nbsp;&nbsp;租赁消息</small></span>}>
              <h4>租户“林晓”租赁了“远洋公寓”&nbsp;&nbsp;&nbsp;6栋ABC2406房</h4>
              <br />
              <h4>租赁时间：<span className="message-detail">2018年5月16日</span></h4>
              <h4>租赁周期：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
              <h4>租赁负责人：<span className="message-detail">王大川</span></h4>
            </Card>

            <Card title={<span><Avatar icon="shop" size="small" style={{ backgroundColor: 'orangered' }} />  <small>&nbsp;&nbsp;门锁报警</small></span>}>
              <h4>租户“林晓”租赁了“远洋公寓”&nbsp;&nbsp;&nbsp;6栋ABC2406房</h4>
              <br />
              <h4>租赁时间：<span className="message-detail">2018年5月16日</span></h4>
              <h4>租赁周期：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
              <h4>租赁负责人：<span className="message-detail">王大川</span></h4>
            </Card>

            <Card title={<span><Avatar icon="shop" size="small" style={{ backgroundColor: 'greenyellow' }} />  <small>&nbsp;&nbsp;租客反馈</small></span>}>
              <h4>租户“林晓”租赁了“远洋公寓”&nbsp;&nbsp;&nbsp;6栋ABC2406房</h4>
              <br />
              <h4>租赁时间：<span className="message-detail">2018年5月16日</span></h4>
              <h4>租赁周期：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
              <h4>租赁负责人：<span className="message-detail">王大川</span></h4>
            </Card>
        </Sider>
      </Layout>
    )
  }
}