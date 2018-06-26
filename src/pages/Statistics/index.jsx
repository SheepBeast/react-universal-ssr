import React, { Component } from 'react'
import { connect } from 'react-redux'
import Highcharts from 'highcharts'
import { Row, Col, Avatar, Divider, List } from 'antd'


import { fetchRentStatistics, fetchDeviceStatistics } from '../../actions/statistics'
import './index.less'
import isRequestSuccess from '../../utils/isRequestSuccess';


const ListItem = List.Item
const ListItemMeta = ListItem.Meta

class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rentStatistics: {},
      deviceStatistics: {}
    }
  }

  componentWillMount() {
    let p1 = this.props.fetchRentStatistics(),
      p2 = this.props.fetchDeviceStatistics()

    Promise.all([p1, p2]).then(ret => {
      if (isRequestSuccess(ret[0]) && isRequestSuccess(ret[1])) {
        let rentStatistics = ret[0].data.data || {},
          deviceStatistics = ret[1].data.data || {}

        this.setState({ rentStatistics, deviceStatistics })
      }
    })
  }

  componentDidMount() {

  }


  render() {

    const { rentStatistics, deviceStatistics } = this.state
    const {accountName , roleName} = this.props.userInfo

    const data = [{ title: `欢迎回来，${accountName}，祝你开心每一天！`, description: roleName }];

    const options = [
      {
        title: (
          <span>
            <a>周星星</a>对<a>慧享公寓B栋3层303办理了退租</a>
          </span>),
        description: '1天前'
      },
      {
        title: (
          <span>
            <a>周星星</a>为租客<a>张三</a>办理换房<a>慧享公寓B栋3层303</a>
          </span>),
        description: '3天前'
      },
      {
        title: (
          <span>
            <a>周星星</a>对<a>慧享公寓B栋3层303</a>办理了退租
          </span>),
        description: '4天前'
      },
      {
        title: (
          <span>
            <a>周星星</a>对<a>慧享公寓B栋3层303</a>办理了退租
          </span>),
        description: '4天前'
      },
      {
        title: (
          <span>
            <a>周星星</a>对<a>慧享公寓B栋3层303</a>办理了退租
          </span>),
        description: '5天前'
      },
      {
        title: (
          <span>
            <a>周星星</a>对<a>慧享公寓B栋3层303</a>办理了退租
          </span>),
        description: '6天前'
      }
    ]

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
          <Col span={16}>
            <div className="container">
              <h3>
                <b>租客统计</b>
              </h3>
              <Divider />
            </div>


            <div className="container">
              <h3>
                <b>房源统计</b>
              </h3>
              <Divider />
              <Row className="tc">
                <Col span={8}>
                  <span className="gray">总数</span>
                  <br />
                  <h3>
                    <b>{rentStatistics.total}</b>
                  </h3>
                </Col>
                <Col span={8}>
                  <span className="gray">入住</span>
                  <br />
                  <h3>
                    <b>{rentStatistics.hasRentNum}</b>
                  </h3>
                </Col>
                <Col span={8}>
                  <span className="gray">闲置</span>
                  <br />
                  <h3>
                    <b>{rentStatistics.total - rentStatistics.hasRentNum}</b>
                  </h3>
                </Col>
              </Row>
            </div>

            <div className="container">
              <h3>
                <b>设备统计</b>
              </h3>
              <Divider />
              <Row className="tc">
                <Col span={8}>
                  <span className="gray">总数</span>
                  <br />
                  <h3>
                    <b>{deviceStatistics.total}</b>
                  </h3>
                </Col>
                <Col span={8}>
                  <span className="gray">正常</span>
                  <br />
                  <h3>
                    <b>{deviceStatistics.normalNum}</b>
                  </h3>
                </Col>
                <Col span={8}>
                  <span className="gray">异常</span>
                  <br />
                  <h3>
                    <b>{deviceStatistics.faultNum}</b>
                  </h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={8}>
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
                      title={<span className="fs-16"><b>{item.title}</b></span>}
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
  fetchRentStatistics: params => dispatch(fetchRentStatistics(params)),
  fetchDeviceStatistics: params => dispatch(fetchDeviceStatistics(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)