import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Divider, Table, Button, Modal } from 'antd'

const confirm = Modal.confirm

function showConfirm() {
  confirm({
    title: '信息',
    content: '您确定要禁用该用户吗？'
  });
}

class Staff extends Component {
  render() {
    var columns = [{
      title: '用户账号',
      key: 'userName',
      dataIndex: 'userName'
    }, {
      title: '手机号',
      key: 'mobile',
      dataIndex: 'mobile'
    }, {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email'
    }, {
      title: '注册时间',
      key: 'registerTime',
      dataIndex: 'registerTime'
    }, {
      title: '状态',
      key: 'status',
      dataIndex: 'status'
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: () => (
        <span>
          <a onClick={showConfirm}>禁用</a>
          <Divider type="vertical"></Divider>
          <Link to="/EditUser">编辑</Link>
          <Divider type="vertical"></Divider>
          <a href="javascript:;">删除</a>
        </span>
      )
    }]

    var dataSource = [{
      key: '1',
      userName: 'tenant_001',
      mobile: '无',
      email: '314739189@qq.com',
      registerTime: '2012-23-53 21:20:32',
      status: '正常',
      actions: ''
    }]

    return (
      <div id="Staff" className="container">
        <h3>
          <b>用户列表</b>
        </h3>
        <Divider></Divider>
        <div style={{ marginBottom: 30, display: 'inline-block', float: 'right', clear: 'both' }}>
          <Button type="primary">添加用户</Button>
        </div>

        <Table dataSource={dataSource} columns={columns}></Table>
      </div>
    )
  }
}

export default connect()(Staff)