import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Form, Select, Button, Table, Divider, Modal, Radio, Input, Icon, Checkbox } from 'antd'
import { fetchLockListData, fetchLockStatisticsData } from '../../actions/device';

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

class Lock extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }

  componentWillMount() {
    this.props.fetchLocStatistics()
    this.props.fetchLockList()
  }

  toggleModal() {
    this.setState({
      visible: !this.state.visible
    })
  }


  render() {
    let lockStatistics = this.props.lockStatistics

    const columns = [{
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    }, {
      title: '设备mac',
      dataIndex: 'mac',
      key: 'mac'
    }, {
      title: '关联安装位置',
      key: 'installationSite',
      dataIndex: 'installationSite'
    },
    {
      title: '设备类型',
      dataIndex: 'lockType',
      key: 'lockType'
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (state) => {
        return <span style={state === 1 ? {} : { color: 'red' }}>{stateRefers[state]}</span>
      }
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: (lockId) => {
        const url = `/device-lockDetail?lockId=${encodeURIComponent(lockId)}`
        return (
          <span>
            <Link to={url}>
              <Icon type="file-text" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
            </Link>
            <Icon type="paper-clip" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
            <Icon type="shop" className="fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
          </span>
        )
      }
    }];

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
    const dataSource = this.props.lockList.map(({ deviceId, deviceName, mac, lockType, state, roomName, floorName, buildingName, houseName }) => {
      let installationSite = `${houseName || ''}${buildingName ? buildingName + '栋' : ''}${floorName ? floorName + '层' : ''}${roomName || ''}`
      let _lockType = lockTypeRefers[lockType]

      return {
        key: deviceId,
        mac,
        installationSite,
        lockType: _lockType,
        deviceName: deviceName || `${installationSite}：${_lockType}`,
        state,
        actions: deviceId
      }
    })

    const rowSelection = {};


    return (
      <div id="Lock">
        <div className="container">
          <Row className="tc">
            <Col span={12} style={{ borderRight: '1px solid #eee' }} >
              <span className="fs-14">在线门锁</span>
              <br />
              <span className="fs-24">
                <b>{lockStatistics.onlineNum}</b>
              </span>
            </Col>
            <Col span={12}>
              <span className="fs-14">异常门锁</span>
              <br />
              <span className="fs-24" style={{ color: 'red' }}>
                <b>{lockStatistics.exceptionNum}</b>
              </span>
            </Col>
          </Row>
        </div>

        <div className="container">
          <Form>
            <FormItem label="房产" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
              <Row gutter={20}>
                <Col span={2}>
                  <Select defaultValue="0">
                    <Option value="0">全部房产</Option>
                  </Select>
                </Col>
                <Col span={2}>

                  <Select defaultValue="0">
                    <Option value="0">全部楼栋</Option>
                  </Select>
                </Col>
                <Col span={2}>
                  <Select defaultValue="0">
                    <Option value="0">全部楼层</Option>
                  </Select>

                </Col>
                <Col span={2}>

                  <Select defaultValue="0">
                    <Option value="0">全部房间</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>

            <FormItem label="设备状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
              <RadioGroup className="custom-radio-button-group" defaultValue="0">
                <RadioButton value="0">全部</RadioButton>
                <RadioButton value="1">正常</RadioButton>
                <RadioButton value="2">异常</RadioButton>
              </RadioGroup>
            </FormItem>

            <FormItem wrapperCol={{ span: 8 }}>
              <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备MAC/安装关联位置"></Search>
            </FormItem>
          </Form>

          <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false}></Table>

        </div>


        <Modal
          title={
            <h3 className="tc" style={{ marginBottom: 0, position: 'relative' }}>
              <span>设备关联房间</span>
              <div className="pos-a" style={{ width: 55, height: 55, top: -16, right: -24 }} onClick={this.toggleModal.bind(this)} >
                <Icon type="close-circle-o" style={{ lineHeight: '55px', color: '#adadad' }} />
              </div>
            </h3>
          }
          visible={false}
          destroyOnClose={true}
          closable={false}
          footer={null}
        >
          <Form>
            <Row>
              <Col span={10} style={{
                height: 188,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around'
              }}>
                <FormItem label="设备名称" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
                  <span>门锁1</span>
                </FormItem>
                <FormItem label="设备MAC" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
                  123: 423:321:121
              </FormItem>
              </Col>
              <Col span={6} className="tc">
                <Icon type="paper-clip" className="fs-30" style={{
                  height: 188,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }} />
              </Col>
              <Col span={8}>
                <Select defaultValue="0" className="mb-20">
                  <Option value="0">全部房产</Option>
                </Select>

                <Select defaultValue="0" className="mb-20">
                  <Option value="0">全部楼栋</Option>
                </Select>

                <Select defaultValue="0" className="mb-20">
                  <Option value="0">全部楼层</Option>
                </Select>

                <Select defaultValue="0">
                  <Option value="0">全部房间</Option>
                </Select>
              </Col>
            </Row>

            <FormItem wrapperCol={{ span: 24 }}>
              <Checkbox defaultChecked>自动重命名设备</Checkbox>
              <br />
              <Input placeholder="请先选择房间"></Input>
              <br />
              <p style={{ color: 'red' }}>与已有设备名称重复，请修改</p>
            </FormItem>
          </Form>

          <br />
          <div className="tc">
            <Button className="mr-30" style={{ width: 84 }}>取消</Button>
            <Button type="primary" style={{ width: 84 }}>确定</Button>
          </div>
        </Modal>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  lockStatistics: state.lockStatistics || {
    onlineNum: 0,
    exceptionNum: 0
  },
  lockList: state.lockList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchLockList: params => dispatch(fetchLockListData(params)),
    fetchLocStatistics: params => dispatch(fetchLockStatisticsData(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lock)