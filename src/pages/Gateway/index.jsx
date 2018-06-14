import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Table, Button, Input, Radio, Icon, Row, Col, Tooltip } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

import './index.less'
import { fetchGatewayListData, deleteGateway } from '../../actions/device';

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




class Gateway extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startNum: 0,
      selectedRowKeys: []
    }
  }

  componentWillMount() {
    this.props.fetchGatewayList()
  }

  fetch(state, search) {
    var options = {}

    if (!state) {
      state = this.props.form.getFieldValue('state')
    }

    if (state != '-1') {
      options.state = parseInt(state)
    }

    if (search) {
      options.findName = search
    }

    console.log('options -->', options)

    this.props.fetchGatewayList(options)
  }

  onSearch(e) {
    this.fetch(null, e)
  }

  onChange(e) {
    this.fetch(e.target.value)
  }

  deleteGateway(params) {
    this.props.deleteGateway(params)
  }

  batchDelete() {
    let keys = this.state.selectedRowKeys

    if (keys.length == 0) {
      return
    }

    this.deleteGateway({
      gatewayId: keys
    })
  }

  render() {
    console.log('device list -->', this.props.deviceList)

    const dataSource = this.props.gatewayList.map(({ gatewayId, gatewayType, gatewayName, hardwareVersion, mac, roomName, floorName, buildingName, houseName, state, softwareVersion }) => {
      let installationSite = `${houseName || ''}${buildingName ? buildingName + '栋' : ''}${floorName ? floorName + '层' : ''}${roomName || ''}`

      if (installationSite) {
        installationSite += '：'
      }

      let _gatewayType = gatewayTypeRefers[gatewayType]

      return {
        key: gatewayId,
        mac,
        installationSite,
        gatewayType: _gatewayType,
        gatewayName,
        state,
        actions: {
          gatewayId
        },
        hardwareVersion,
        softwareVersion
      }
    })

    const columns = [{
      title: '设备名称',
      dataIndex: 'gatewayName',
      key: 'gatewayName'
    }, {
      title: '设备mac',
      dataIndex: 'mac',
      key: 'mac'
    }, {
      title: '硬件版本',
      dataIndex: 'hardwareVersion',
      key: 'hardwareVersion'
    },
    {
      title: '固件',
      dataIndex: 'softwareVersion',
      key: 'softwareVersion'
    }, {
      title: '关联安装位置',
      dataIndex: 'installationSite',
      key: 'installationSite'
    },
    {
      title: '设备类型',
      dataIndex: 'gatewayType',
      key: 'gatewayType'
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (state) => {
        return <span style={state === 1 ? {} : { color: 'red' }}>{stateRefers[state]}</span>
      }
    },
    {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: ({ gatewayId }) => {
        const url = `/device-lockDetail?lockId=${encodeURIComponent(gatewayId)}`
        return (
          <a className="mr-20" onClick={this.deleteGateway.bind(this, { gatewayId: [gatewayId] })}>
            <Tooltip title="删除">
              <Icon type="shop" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
            </Tooltip>
          </a>
        )
      }
    }]

    const { getFieldDecorator } = this.props.form
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        // console.log('selected row keys -->' , selectedRowKeys)
        this.setState({
          selectedRowKeys
        })
      }
    }

    return (
      <div id="Gateway" className="container">
        <Form className="mb-20">
          <FormItem label="房间状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            {
              getFieldDecorator('state', {
                initialValue: "-1",
              })(
                <RadioGroup className="custom-radio-button-group" onChange={this.onChange.bind(this)}>
                  <RadioButton value="-1">全部</RadioButton>
                  <RadioButton value="1">正常</RadioButton>
                  <RadioButton value="0">异常</RadioButton>
                </RadioGroup>
              )
            }
          </FormItem>

          <FormItem>
            <Row>
              <Col span={8}>
                {
                  getFieldDecorator('search')(
                    <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备MAC/安装关联位置" onSearch={this.onSearch.bind(this)}></Search>
                  )
                }
              </Col>
              <Col className="tr">
                <Button type="primary" onClick={this.batchDelete.bind(this)}>批量删除</Button>
              </Col>
            </Row>

          </FormItem>
        </Form>

        <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false}></Table>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  gatewayList: state.gatewayList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchGatewayList: params => dispatch(fetchGatewayListData(params)),
    deleteGateway: params => dispatch(deleteGateway(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Gateway))