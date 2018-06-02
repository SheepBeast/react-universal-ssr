import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Table, Button, Modal, Form, Input, Row, Col, Icon } from 'antd'

const FormItem = Form.Item
const TextArea = Input.TextArea

class Role extends Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  toggleModal() {
    this.setState({
      visible: !this.state.visible
    })
  }
  render() {
    var columns = [{
      title: '角色名称',
      key: 'roleName',
      dataIndex: 'roleName'
    }, {
      title: '备注',
      key: 'memo',
      dataIndex: 'memo'
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: () => (
        <span>
          <Icon type="file-text" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
          <Icon type="paper-clip" className="fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
        </span>
      )
    }]
    var dataSource = [{
      key: '1',
      roleName: '二级管理员',
      memo: '二级管理员'
    }, {
      key: '2',
      roleName: '一级管理员',
      memo: '一级管理员'
    }]
    return (
      <div id="Role" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>角色管理</b>
            </h3>
          </Col>
          <Col span={12} className="tr">
            <Button icon="plus" type="primary" className="mr-20">添加</Button>
            <Button type="primary" >批量删除</Button>
          </Col>
        </Row>

        <br />
        <Table dataSource={dataSource} columns={columns} rowSelection={{}}></Table>
      </div>
    )
  }
}

export default connect()(Role)