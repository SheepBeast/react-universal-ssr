import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Highcharts from 'highcharts'
import { Row, Col, Table, Card, Avatar, Layout } from 'antd'

const { Content, Sider } = Layout

import './index.less'

class Statistic extends Component {
  componentDidMount() {
    var chart1, chart2,
      chartConfig1 = {
        chart: {
          spacing: [40, 0, 40, 0],
          animation: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        title: {
          floating: true,
          text: '出租统计',
          style: {
            fontSize: 14
          }
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            animation: false,
            showInLegend: true,
            point: {
              events: {
                mouseOver: function (e) {
                  chart1.setTitle({
                    text: e.target.name + '\t' + e.target.y + ' 套'
                  });
                }
              }
            },
          }
        },
        legend: {
          useHTML: true,
          labelFormatter: function () {
            return `<span><span style="color: #999;">${this.name}</span><br />${this.y}套&nbsp;&nbsp;&nbsp;<span style="color: #999;">${((this.y / this.all) * 100).toFixed(1) + '%'}</span></span>`;
          }
        },
        series: [{
          type: 'pie',
          innerSize: '80%',
          name: '出租统计',
          data: [
            {
              name: '已租',
              y: 200,
              color: '#0084E3',
              all: 240
            },
            {
              name: '闲置',
              y: 40,
              color: '#ddd',
              all: 240
            }
          ]
        }]
      },

      chartConfig2 = {
        chart: {
          spacing: [40, 0, 40, 0],
          animation: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        title: {
          floating: true,
          text: '设备统计',
          style: {
            fontSize: 14
          }
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            animation: false,
            showInLegend: true,
            point: {
              events: {
                mouseOver: function (e) {
                  chart2.setTitle({
                    text: e.target.name + '\t' + e.target.y + ' 台'
                  });
                }
              }
            },
          }
        },
        legend: {
          useHTML: true,
          labelFormatter: function () {
            return `<span><span style="color: #999;">${this.name}</span><br />${this.y}套&nbsp;&nbsp;&nbsp;<span style="color: #999;">${((this.y / this.all) * 100).toFixed(1) + '%'}</span></span>`;
          }
        },
        series: [{
          type: 'pie',
          innerSize: '80%',
          name: '设备统计',
          data: [
            {
              name: '正常',
              y: 1918,
              color: '#0084E3',
              all: 1922
            },
            {
              name: '故障',
              y: 4,
              color: '#e800e8',
              all: 1922
            }
          ]
        }]
      },

      renderred = function (c) {
        var centerY = c.series[0].center[1],
          titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
          y: centerY + titleHeight / 2
        });
      }

    var chart1 = Highcharts.chart('chart1-wrapper', chartConfig1, renderred),
      chart2 = Highcharts.chart('chart2-wrapper', chartConfig2, renderred)

  }

  render() {
    var self = this
    const dataSource = [{
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
    }
    ];

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

    const chartDimeter = 290


    return (
      <Layout style={{ justifyContent: 'flex-end' }}>
        <Content id="MainStatistic" style={{ marginLeft: 20, marginRight: 20 }}>
          <Row style={{ borderBottom: '1px solid #e8e8e8' }}>
            <Col span={12} style={{ backgroundColor: '#fff', borderRight: '1px solid #e8e8e8' }}>
              <Row>
                <Col span={12} className="pb-30" style={{ borderRight: '1px solid #e8e8e8', paddingTop: 50, paddingLeft: 60, height: chartDimeter }}>
                  <h3 className="fs-18"><b>出租统计</b></h3>
                  <h4 className="fs-16">总共：240套</h4>
                  <h4 className="fs-16">已租：200套</h4>
                  <h4 className="fs-16">闲置：40套</h4>
                  <h4 className="fs-16">今日出租：3套</h4>
                </Col>
                <Col span={12}>
                  <div id="chart1-wrapper" style={{ width: chartDimeter, height: chartDimeter }}></div>
                </Col>
              </Row>
            </Col>
            <Col span={12} style={{ backgroundColor: '#fff' }}>
              <Row>
                <Col span={12} className="pb-30" style={{ borderRight: '1px solid #e8e8e8', paddingTop: 50, paddingLeft: 60, height: chartDimeter }}>
                  <h3 className="fs-18"><b>设备状态统计</b></h3>
                  <h4 className="fs-16">总共：1922台</h4>
                  <h4 className="fs-16">1918台设备正常运行365天</h4>
                  <h4 className="fs-16">4台设备存在异常</h4>
                </Col>
                <Col span={12}>
                  <div id="chart2-wrapper" style={{ width: chartDimeter, height: chartDimeter }}></div>
                </Col>
              </Row>
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
            overflow: 'scroll',
            padding: 30,
            borderLeft: '1px solid #e8e8e8'
          }}>



          <h3 style={{ marginBottom: 20 }} className="fs-18"><b>消息提醒</b></h3>

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

export default connect()(Statistic)