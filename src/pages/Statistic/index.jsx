import React, { Component } from 'react'
import { connect } from 'react-redux'
import Highcharts from 'highcharts'
import { Row, Col, Table, Card, Avatar, Layout, Divider, Icon } from 'antd'

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
          // enabled: false,
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
          // enabled: false,
          useHTML: true,
          labelFormatter: function () {
            return `
            <span class="fs-14">
              <span style="color: #999;">${this.name}</span>
              <br />
              ${this.y}套
              <span style="color: #999;">${((this.y / this.all) * 100).toFixed(1) + '%'}</span>
            </span>`;
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

    var count = 0

    var dataSource = []

    for (var i = 0; i < 9; i++) {
      dataSource.push({
        key: count++,
        info: '致远大功于1栋16楼ABC2406房',
        deviceType: '蓝牙锁',
        exceptionType: '离线',
        battery: '60%',
        roomNo: '致远公寓ABC2406',
        gateway: '29.34.56.98.AB.FG'
      })
    }

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
        key: 'exceptionType',
        render: () => {
          return (
            <span>
              <Icon type="close-circle-o" style={{ color: 'red' }} />
              &nbsp;
              离线
            </span>

          )
        }
      },
      {
        title: '电池电量',
        dataIndex: 'battery',
        key: 'battery',
        render: (text) => {
          return (
            <span>
              <Icon type="wallet" style={{ color: 'green' }} />
              &nbsp;
              {text}
            </span>
          )
        }
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

    const col_height = 280,
      chart_dimeter = 280


    return (
      <Layout id="MainStatistic">
        <Content className="mr-30">
          <div style={{ marginBottom: 20 }}>
            <div className="bg-w" style={{ width: 508, marginRight: 15, overflow: 'hidden', display: 'inline-block' }} >
              <Row>
                <Col span={11} className="pt-20 pb-30 pl-30 pos-r" style={{ height: col_height }}>
                  <h3 className="fs-18 mb-20"><b>出租统计</b></h3>
                  <h4 className="fs-14 mb-20">总共：240套</h4>
                  <h4 className="fs-14 mb-20">已租：200套</h4>
                  <h4 className="fs-14 mb-20">闲置：40套</h4>
                  <h4 className="fs-14 mb-20">今日出租：3套</h4>
                  <Divider type="vertical" className="pos-a" style={{ width: 2, height: 240, top: 20, right: -8 }} ></Divider>
                </Col>
                <Col span={13}>
                  <div id="chart1-wrapper" style={{ width: chart_dimeter, height: chart_dimeter }}></div>
                  {/* <div id="chart2-wrapper" style={{ width: chart_dimeter, height: chart_dimeter }}></div> */}
                </Col>
              </Row>
            </div>
            <div className="bg-w" style={{ width: 508, marginLeft: 15, overflow: 'hidden', display: 'inline-block' }}>
              <Row>
                <Col span={11} className="pt-20 pb-30 pl-30 pos-r" style={{ height: col_height }}>
                  <h3 className="fs-18 mb-20"><b>设备状态统计</b></h3>
                  <h4 className="fs-14 mb-20">总共：1922台</h4>
                  <h4 className="fs-14 mb-20">1918台设备正常运行365天</h4>
                  <h4 className="fs-14 mb-20">4台设备存在异常</h4>
                  <Divider type="vertical" className="pos-a" style={{ width: 2, height: 240, top: 20, right: -8 }} ></Divider>
                </Col>
                <Col span={13}>
                  <div id="chart2-wrapper" style={{ width: chart_dimeter, height: chart_dimeter }}></div>
                </Col>
              </Row>
            </div>
          </div>

          <div className="bg-w pt-30 pr-30 pb-30 pl-30">
            <h3 className="mb-20"><b>异常设备信息统计</b></h3>
            <Table id="exception-devices-info-statistic" dataSource={dataSource} columns={columns} pagination={false} />
          </div>
        </Content>

        <Sider id="message-box"
          width={480}
          style={{
            backgroundColor: '#fff',
            overflow: 'scroll',
            padding: 30,
            borderLeft: '1px solid #e8e8e8',
            height: 907
          }}>



          <h3 style={{ marginBottom: 20 }} className="fs-18"><b>消息提醒</b></h3>

          <div className="message-cards">
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

            <Card title={<span><Avatar icon="shop" size="small" style={{ backgroundColor: 'greenyellow' }} />  <small>&nbsp;&nbsp;租客反馈</small></span>}>
              <h4>租户“林晓”租赁了“远洋公寓”&nbsp;&nbsp;&nbsp;6栋ABC2406房</h4>
              <br />
              <h4>租赁时间：<span className="message-detail">2018年5月16日</span></h4>
              <h4>租赁周期：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
              <h4>租赁负责人：<span className="message-detail">王大川</span></h4>
            </Card>
          </div>


        </Sider>


      </Layout>
    )
  }
}

export default connect()(Statistic)