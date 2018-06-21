import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Table, Button, Input, Radio, Icon } from 'antd'

import { fetchTenantList } from '../../../actions/tenant';

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

class Tenant extends React.Component {
  componentWillMount() {
    this.props.fetchTenantList()
  }

  onSearch(e) {

  }

  render() {
    const dataSource = this.props.tenantList.map(({ tenantId, tenantName, phoneNo, expires, renting,  roomName, floorName, buildingName, houseName }) => {
      let installationSite = `${houseName || ''}${buildingName ? buildingName + '栋' : ''}${floorName ? floorName + '层' : ''}${roomName || ''}`

      return {
        key: tenantId,
        phoneNo,
        installationSite,
        expires,
        tenantName,
        renting,
        actions: ''
      }
    })

    const rentingRefers = {
      0: '未入住',
      1: '已入住',
      2: '已到期'
    }


    const columns = [{
      title: '姓名',
      dataIndex: 'tenantName',
      key: 'tenantName'
    }, {
      title: '手机',
      dataIndex: 'phoneNo',
      key: 'phoneNo'
    }, {
      title: '房间',
      dataIndex: 'installationSite',
      key: 'installationSite'
    },
    {
      title: '到期时间',
      dataIndex: 'expires',
      key: 'expires'
    },
    {
      title: '状态',
      dataIndex: 'renting',
      key: 'renting',
      render: (renting) => {
        return <span>{rentingRefers[renting]}</span>
      }
    },
    {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: () => {
        return (
          <span>
            <a href="javascript:void(0)" className="mr-20">查看</a>
            <a href="javascript:void(0)" className="mr-20">编辑</a>
            <a href="javascript:void(0)" className="mr-20">续租</a>
            <a href="javascript:void(0)" className="mr-20">退租</a>
            <a href="javascript:void(0)" className="mr-20">换房</a>
          </span>
        )
      }
    }]

    return (
      <div id="Tenant" className="container">
        <Form className="mb-20">
          <FormItem label="房间状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            <RadioGroup className="custom-radio-button-group" defaultValue="0">
              <RadioButton value="0">全部</RadioButton>
              <RadioButton value="1">已入住</RadioButton>
              <RadioButton value="2">已到期</RadioButton>
              <RadioButton value="3">未入住</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem wrapperCol={{ span: 8 }}>
            <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备phoneNo/安装关联位置" onSearch={this.onSearch.bind(this)}></Search>
          </FormItem>
        </Form>

        <div className="tr mb-20">
          <Button type="primary">添加</Button>
        </div>

        <Table dataSource={dataSource} columns={columns} rowSelection={{}}></Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tenantList: state.tenantList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchTenantList: params => dispatch(fetchTenantList(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tenant)