import React, { Component } from 'react'
import { connect } from 'react-redux'
import Highcharts from 'highcharts'
import { Row, Col, Avatar, Divider, List } from 'antd'
import { Pie } from 'ant-design-pro/lib/Charts'

import { fetchRentStatistics, fetchDeviceStatistics, fetchDynamicInfoList, fetchTenantStatistics } from '../../actions/statistics'
import isRequestSuccess from '../../utils/isRequestSuccess';
import './index.less'


const ListItem = List.Item
const ListItemMeta = ListItem.Meta

const eventTypeRefers = {
  1: '退租',
  2: '换房',
  3: '续租',
  4: '入住',
  5: '新建租客',
  6: '修改租客',
  7: '删除租客',
  8: '新建房源',
  9: '修改房源',
  10: '删除房源',
  11: '批量添加房源',
  12: '批量删除房源'
}

const eventSponsorTypeRefers = {
  3: '公寓管理方',
  4: '公寓普通管理员'
}

const eventObjTypeRefers = {
  5: '租客',
  6: '房产',
  7: '楼栋',
  8: '楼层',
  9: '房间'
}

const elementTypeRefers = {
  6: '房产',
  7: '楼栋',
  8: '楼层',
  9: '房间'
}


class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rentStatistics: {},
      deviceStatistics: {},
      tanantStatistics: {},
      dynamicInfoList: []
    }
  }

  componentWillMount() {
    let p1 = this.props.fetchRentStatistics(),
      p2 = this.props.fetchDeviceStatistics(),
      p3 = this.props.fetchDynamicInfoList(),
      p4 = this.props.fetchTenantStatistics()

    Promise.all([p1, p2, p3, p4]).then(ret => {
      let rentStatistics = isRequestSuccess(ret[0]) && ret[0].data.data || {},
        deviceStatistics = isRequestSuccess(ret[1]) && ret[1].data.data || {},
        tanantStatistics = isRequestSuccess(ret[2]) && ret[3].data.data || {},
        dynamicInfoList = isRequestSuccess(ret[3]) && ret[2].data.data.list || []

      this.setState({ rentStatistics, deviceStatistics, tanantStatistics, dynamicInfoList })

    })
  }

  componentDidMount() {

  }


  render() {

    const { rentStatistics, deviceStatistics, tanantStatistics, dynamicInfoList } = this.state
    const { accountName, roleName } = this.props.userInfo

    const data = [{ title: `欢迎回来，${accountName}，祝你开心每一天！`, description: roleName }];

    var options = dynamicInfoList.map(({
      eventType,
      eventSponsorType,
      eventSponsorId,
      eventSponsorName,
      eventObjType,
      eventObjId,
      eventObjName,
      elementType,
      elementId,
      elementName,
      createTime
    }) => {
      var title = '', description = createTime

      if (eventType == 2 || eventType == 4) {
        title = (
          <span>
            <a>{eventSponsorName}</a>&nbsp;
            <span>为{eventObjTypeRefers[eventObjType]}</span>&nbsp;
            <a>{eventObjName}</a>&nbsp;
            <span>办理{eventTypeRefers[eventType]}</span>&nbsp;
            <a>{elementName}</a>
          </span>
        )
      } else if (eventType == 1 || eventType == 3) {
        title = (
          <span>
            <a>{eventSponsorName}</a>&nbsp;
            <span>对<a>{eventObjName}</a></span>&nbsp;
            <span>办理{eventTypeRefers[eventType]}</span>
          </span>
        )
      }
      else if (eventType >= 5 && eventType <= 7) {
        title = (
          <span>
            <a>{eventSponsorName}</a>&nbsp;
            <span>{eventTypeRefers[eventType]}</span>&nbsp;
            <a>{eventObjName}</a>
          </span>
        )
      } else {
        title = (
          <span>
            <a>{eventSponsorName}</a>&nbsp;
            <span>{eventTypeRefers[eventType]}</span>&nbsp;
            <a>{elementName}</a>
          </span>
        )
      }

      return { title, description }
    })

    const { expireNum = 0, faultNum = 0, inRentNum = 0, notRentNum = 0, total = 0 } = tanantStatistics

    const tenantData = [
      {
        x: '未租',
        y: notRentNum
      },
      {
        x: '在租',
        y: inRentNum
      },
      {
        x: '到期',
        y: expireNum
      },
      {
        x: '异常',
        y: faultNum
      }
    ];

    return (
      <div id="Statistics">
        <div className="container">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <ListItem>
                <ListItemMeta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<span className="fs-16"><b>{item.title}</b></span>}
                  description={item.description}
                />
              </ListItem>
            )}
          />
        </div>

        <Row gutter={30}>
          <Col span={14}>
            <div className="container">
              <h3>
                <b>租客统计</b>
              </h3>
              <Divider />
              <div>
                <Pie
                  hasLegend
                  title={<b className="fs-20" style={{ color: '#333' }}>租客总数</b>}
                  subTitle={<b className="fs-20" style={{ color: '#333' }}>租客总数</b>}
                  total={() => (<span dangerouslySetInnerHTML={{ __html: total }} />)}
                  data={tenantData}
                  valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
                  height={240}
                />
              </div>
            </div>


            <div className="container">
              <b className="fs-18">房源统计</b>
              <Divider />
              <Row className="tc">
                <Col span={8}>
                  <span className="gray">总数</span>
                  <br />
                  <b className="fs-30">{rentStatistics.total}</b>
                </Col>
                <Col span={8}>
                  <span className="gray">入住</span>
                  <br />
                  <b className="fs-30">{rentStatistics.hasRentNum}</b>
                </Col>
                <Col span={8}>
                  <span className="gray">闲置</span>
                  <br />
                  <b className="fs-30">{(rentStatistics.total - rentStatistics.hasRentNum) || 0}</b>
                </Col>
              </Row>
            </div>

            <div className="container">
              <b className="fs-18">设备统计</b>

              <Divider />
              <Row className="tc">
                <Col span={8}>
                  <span className="gray">总数</span>
                  <br />
                  <b className="fs-30">{deviceStatistics.total}</b>
                </Col>
                <Col span={8}>
                  <span className="gray">正常</span>
                  <br />
                  <b className="fs-30">{deviceStatistics.normalNum}</b>
                </Col>
                <Col span={8}>
                  <span className="gray">异常</span>
                  <br />
                  <b className="fs-30">{deviceStatistics.faultNum}</b>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={10}>
            <div className="container">
              <h3>
                <b>动态</b>
              </h3>
              <Divider />
              <List
                itemLayout="horizontal"
                dataSource={options}
                renderItem={item => (
                  <ListItem>
                    <ListItemMeta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<span className="fs-14">{item.title}</span>}
                      description={item.description}
                    />
                  </ListItem>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo || {}
})

const mapDispatchToProps = dispatch => ({
  fetchTenantStatistics: params => dispatch(fetchTenantStatistics(params)),
  fetchRentStatistics: params => dispatch(fetchRentStatistics(params)),
  fetchDeviceStatistics: params => dispatch(fetchDeviceStatistics(params)),
  fetchDynamicInfoList: params => dispatch(fetchDynamicInfoList(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)