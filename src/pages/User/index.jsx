import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Divider, Table, Button, Modal, Form, Radio, Select, Row, Col, Icon } from 'antd'

const confirm = Modal.confirm
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option

function showConfirm() {
  confirm({
    title: '信息',
    content: '您确定要禁用该用户吗？'
  });
}

import './index.less'
import { fetchUserListData } from '../../actions/user';

class User extends Component {
  componentWillMount() {
    this.props.fetchUserList()
  }

  render() {
    var columns = [{
      title: '姓名',
      key: 'userName',
      dataIndex: 'userName'
    }, {
      title: '角色',
      key: 'roleName',
      dataIndex: 'roleName'
    }, {
      title: '用户账号',
      key: 'userAccount',
      dataIndex: 'userAccount'
    }, {
      title: '手机号',
      key: 'phoneNo',
      dataIndex: 'phoneNo'
    }, {
      title: '注册时间',
      key: 'createTime',
      dataIndex: 'createTime'
    }, {
      title: '状态',
      key: 'state',
      dataIndex: 'state'
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: () => (
        <span>
          <Icon type="file-text" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
          <Icon type="paper-clip" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
          <Icon type="shop" className="fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
        </span>
      )
    }]

    const userStateRefer = {
      0: '停用',
      1: '启用',
      2: '删除'
    }

    var dataSource = this.props.userList.map(({ userId, userAccount, userName, state, phoneNo, roleName, createTime }) => ({
      key: userId,
      userName,
      roleName,
      userAccount,
      phoneNo,
      createTime,
      state: userStateRefer[state],
      actions: ''
    }))

    return (
      <div id="User" className="container">

        <Row>
          <Col span={20}>
            <Form className="form-shim">
              <Row>
                <Col span={8}>
                  <FormItem label="状态" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
                    <RadioGroup defaultValue="0">
                      <RadioButton value="0">全部</RadioButton>
                      <RadioButton value="1">启用</RadioButton>
                      <RadioButton value="2">禁用</RadioButton>
                    </RadioGroup>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="角色" labelCol={{ span: 3 }} wrapperCol={{ span: 10 }}>
                    <Select defaultValue="0">
                      <Option value="0">全部角色</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>

            </Form>
          </Col>
          <Col style={{ textAlign: 'right' }} span={4}>
            <Button type="primary">添加用户</Button>
          </Col>
        </Row >

        <Table dataSource={dataSource} columns={columns}></Table>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  userList: state.userList || []
})
const mapDispatchToProps = dispatch => ({
  fetchUserList: params => dispatch(fetchUserListData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)