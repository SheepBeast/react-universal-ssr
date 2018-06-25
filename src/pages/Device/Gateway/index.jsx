import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Table, Button, Input, Radio, Icon, Row, Col, Tooltip, message } from 'antd'

import { fetchGatewayList, deleteGateway } from '../../../actions/device';
import isRequestSuccess from '../../../utils/isRequestSuccess'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

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
      selectedRowKeys: [],

      gatewayList: [],

      state: -1
    }
  }

  componentWillMount() {
    this.props.fetchGatewayList().then(ret => {
      if (isRequestSuccess(ret)) {
        let gatewayList = ret.data.data.list || []

        this.setState({ gatewayList })
      }
    })
  }

  filteredFetchGatewayList() {
    var params = {}

    var { state } = this.state

    if (state && state != '-1') {
      params.state = state
    }

    let findName = this.props.form.getFieldValue('findName')
    if (findName) {
      params.findName = findName
    }

    console.log('params -->', params)

    this.props.fetchGatewayList(params).then(ret => {
      if (isRequestSuccess(ret)) {
        let gatewayList = ret.data.data.list || []

        this.setState({
          gatewayList
        })
      }
    })
  }

  onSearch(e) {
    this.setState({
      findName: e
    }, this.filteredFetchGatewayList)
  }

  onRadioGroupChange(e) {
    this.setState({
      state: e.target.value
    }, this.filteredFetchGatewayList)
  }

  deleteGateway(params) {
    this.props.deleteGateway(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('删除网关成功')
        this.filteredFetchGatewayList()
      } else {
        message.error(`删除网关失败，${ret.data.reason}`)
      }
    })
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

    const dataSource = this.state.gatewayList.map(({ gatewayId, gatewayType, gatewayName, hardwareVersion, mac, roomName, floorName, buildingName, houseName, state, softwareVersion }) => {
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
        return (
          <a className="mr-20" onClick={this.deleteGateway.bind(this, { gatewayId: [gatewayId] })}>删除</a>
        )
      }
    }]

    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedRowKeys
        })
      }
    }

    const { getFieldDecorator } = this.props.form

    return (
      <div id="Gateway" className="container">
        <Form className="mb-20">
          <FormItem label="房间状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            <RadioGroup defaultValue="-1" className="custom-radio-button-group" onChange={this.onRadioGroupChange.bind(this)}>
              <RadioButton value="-1">全部</RadioButton>
              <RadioButton value="1">正常</RadioButton>
              <RadioButton value="0">异常</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem>
            <Row>
              <Col span={8}>
                <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备MAC/安装关联位置" onSearch={this.filteredFetchGatewayList.bind(this)} />
              </Col>
              <Col className="tr">
                <Button type="primary" onClick={this.batchDelete.bind(this)}>批量删除</Button>
              </Col>
            </Row>

          </FormItem>
        </Form>

        <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false} />
      </div >
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  fetchGatewayList: params => dispatch(fetchGatewayList(params)),
  deleteGateway: params => dispatch(deleteGateway(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Gateway))