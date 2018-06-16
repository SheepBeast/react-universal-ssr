import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Button, Modal, Form, Radio, Select, Row, Col, Icon, Tooltip } from 'antd'

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
import { fetchUserListData, enableUser, deleteUserData } from '../../actions/user';
import { fetchRoleListData } from '../../actions/role';

const userStateRefer = {
  0: '停用',
  1: '启用',
  2: '删除'
}


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
  }

  componentWillMount() {
    this.props.fetchUserList()
    this.props.fetchRoleList({
      state: 1,
      flag: 'role-list'
    })
  }

  enableUser(params) {
    this.props.enableUser(params)
  }

  deleteUser(params) {
    this.props.deleteUser(params)
  }

  batchDelete() {
    console.log('batch delete')
    let keys = this.state.selectedRowKeys

    console.log('keys -->', keys)

    if (keys.length == 0) {
      return
    }

    this.deleteUser({
      userId: keys
    })
  }

  onChangeTofetchUserList(e) {
    console.log('e -->', e)


    let options = {
      flag: 'user-list',
    }

    let { getFieldsValue } = this.props.form

    let state, roleId

    if (e.target) {
      state = e.target.value
      roleId = getFieldsValue(['roleId']).roleId
    } else {
      roleId = e
      state = getFieldsValue(['state']).state
    }

    if (state != -1) {
      options.state = state
    }

    if (roleId != -1) {
      options.roleId = roleId
    }

    console.log('options -->', options)

    this.props.fetchUserList(options)
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
      dataIndex: 'state',
      render: state => {
        return <span className={state == 1 ? 'health' : 'danger'}>{userStateRefer[state]}</span>
      }
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: ({ userId, roleId, state, userName }) => {
        if (state == 2) {
          return null
        } else {
          let opposite = state == 1 ? { text: '禁用', state: 0 } : { text: '启用', state: 1 }

          const url = `/user-edit?userId=${encodeURIComponent(userId)}&roleId=${encodeURIComponent(roleId)}`
          return (
            <span>
              <a className="mr-20" onClick={this.enableUser.bind(this, { userId: [userId], state: opposite.state })}>
                <Tooltip title={opposite.text}>
                  <Icon type="file-text" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                </Tooltip>
              </a>

              <Link to={url} className="mr-20">
                <Tooltip title="编辑">
                  <Icon type="paper-clip" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                </Tooltip>
              </Link>

              <a className="mr-20" onClick={this.deleteUser.bind(this, { userId: [userId] })}>
                <Tooltip title="删除">
                  <Icon type="shop" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                </Tooltip>
              </a>
            </span>
          )
        }
      }
    }]


    var dataSource = this.props.userList.map(({ userId, roleId, userAccount, userName, state, phoneNo, roleName, createTime }) => ({
      key: userId,
      roleName,
      userName,
      userAccount,
      phoneNo,
      createTime,
      state,
      actions: {
        userId,
        roleId,
        state,
        userName

      }
    }))

    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedRowKeys
        })
      }
    }

    const { getFieldDecorator } = this.props.form

    return (
      <div id="User" className="container">

        <Row>
          <Col span={20}>
            <Form className="form-shim">
              <Row>
                <Col span={8}>
                  <FormItem label="状态" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
                    {
                      getFieldDecorator('state', {
                        initialValue: '-1'
                      })(
                        <RadioGroup defaultValue="-1" onChange={this.onChangeTofetchUserList.bind(this)}>
                          <RadioButton value="-1">全部</RadioButton>
                          <RadioButton value="1">启用</RadioButton>
                          <RadioButton value="0">禁用</RadioButton>
                        </RadioGroup>
                      )
                    }

                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="角色" labelCol={{ span: 3 }} wrapperCol={{ span: 10 }}>
                    {
                      getFieldDecorator('roleId', {
                        initialValue: '-1'
                      })(
                        <Select onChange={this.onChangeTofetchUserList.bind(this)}>
                          <Option value="-1">全部角色</Option>
                          {
                            this.props.roleList.map(({ roleId, roleName }) => (
                              <Option key={roleId} value={roleId}>{roleName}</Option>
                            ))
                          }
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>

            </Form>
          </Col>
          <Col style={{ textAlign: 'right' }} span={4}>
            <Link to="/user-add">
              <Button type="primary">添加用户</Button>
            </Link>
          </Col>
        </Row >

        <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false}></Table>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  userList: state.userList || [],
  roleList: state.roleList || []
})
const mapDispatchToProps = dispatch => ({
  fetchUserList: params => dispatch(fetchUserListData(params)),
  enableUser: params => dispatch(enableUser(params)),
  deleteUser: params => dispatch(deleteUserData(params)),
  fetchRoleList: params => dispatch(fetchRoleListData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(User))