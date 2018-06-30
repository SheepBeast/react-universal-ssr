import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Button, Form, Radio, Select, Row, Col, message } from 'antd'

import { fetchUserList, enableUser, deleteUser } from '../../../actions/user';
import { fetchRoleList } from '../../../actions/role';
import isRequestSuccess from '../../../utils/isRequestSuccess';

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option

const userStateRefer = {
  0: '停用',
  1: '启用',
  2: '删除'
}


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],

      selectedRoleId: -1,
      selectedState: -1,

      userList: [],
      roleList: []
    }
  }

  componentWillMount() {
    let p1 = this.props.fetchUserList(),
      p2 = this.props.fetchRoleList()

    Promise.all([p1, p2]).then(ret => {
      let userList = isRequestSuccess(ret[0]) && ret[0].data.data.list || [],
        roleList = isRequestSuccess(ret[1]) && ret[1].data.data.list || []

      this.setState({
        userList,
        roleList
      })

    })
  }

  enableUser(params) {
    this.props.enableUser(params).then(ret => {
      let action = userStateRefer[params.state]

      if (isRequestSuccess(ret)) {
        message.success(`${action}用户成功`)
        this.filteredFetchUserList()
      } else {
        message.error(`${action}用户失败，${ret.data.reason}`)
      }
    })
  }

  deleteUser(params) {
    this.props.deleteUser(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success(`删除用户成功`)
        this.filteredFetchUserList()
      } else {
        message.error(`删除用户失败，${ret.data.reason}`)
      }
    })
  }

  batchDelete() {
    let keys = this.state.selectedRowKeys

    if (keys.length == 0) {
      return
    }

    this.deleteUser({ userId: keys })
  }

  onRadioGroupChange(e) {
    this.setState({
      selectedState: e.target.value
    }, this.filteredFetchUserList)
  }

  onSelectChange(roleId) {
    this.setState({
      selectedRoleId: roleId
    }, this.filteredFetchUserList)
  }

  filteredFetchUserList() {
    let { selectedRoleId, selectedState } = this.state

    var params = {}

    if (selectedState != -1) {
      params.state = selectedState
    }

    if (selectedRoleId != -1) {
      params.roleId = selectedRoleId
    }

    this.props.fetchUserList(params).then(ret => {
      let userList = isRequestSuccess(ret) && ret.data.data.list || []

      this.setState({ userList })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const { roleList, userList } = this.state

    var pageRolesRefer = this.props.pageRolesRefer

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
      render: ({ userId, roleId, state, userName, userType }) => {
        if (state == 2 || userType == 3) {
          return null
        } else {

          var enableBtn = null
          if (pageRolesRefer['staffManage-enable']) {
            let opposite = state == 1 ? { text: '停用', state: 0 } : { text: '启用', state: 1 }
            enableBtn = <a className="mr-20" onClick={this.enableUser.bind(this, { userId: [userId], state: opposite.state })}>{opposite.text}</a>
          }

          var editBtn = null
          if (pageRolesRefer['staffManage-modify']) {
            var url = `/user-edit?userId=${encodeURIComponent(userId)}&roleId=${encodeURIComponent(roleId)}`
            editBtn = <Link to={url} className="mr-20">编辑</Link>
          }

          var delBtn = pageRolesRefer['staffManage-delete'] ? <a onClick={this.deleteUser.bind(this, { userId: [userId] })}>删除</a> : null

          return (
            <span>
              {enableBtn}
              {editBtn}
              {delBtn}
            </span>
          )
        }
      }
    }]


    var dataSource = userList.map(({ userId, roleId, userAccount, userName, state, phoneNo, roleName, userType, createTime }) => ({
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
        userName,
        userType
      }
    }))

    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedRowKeys
        })
      }
    }



    return (
      <div id="User" className="container">

        <Row>
          <Col span={20}>
            <Form>
              <Row>
                <Col span={8}>
                  <FormItem label="状态" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
                    {
                      getFieldDecorator('state', {
                        initialValue: '-1'
                      })(
                        <RadioGroup className="custom-radio-button-group" defaultValue="-1" onChange={this.onRadioGroupChange.bind(this)}>
                          <RadioButton value="-1">全部</RadioButton>
                          <RadioButton value="1">启用</RadioButton>
                          <RadioButton value="0">停用</RadioButton>
                        </RadioGroup>
                      )
                    }

                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem className="form-shim" label="角色" labelCol={{ span: 3 }} wrapperCol={{ span: 10 }}>
                    {
                      getFieldDecorator('roleId', {
                        initialValue: '-1'
                      })(
                        <Select onChange={this.onSelectChange.bind(this)}>
                          <Option value="-1">全部</Option>
                          {
                            roleList.map(({ roleId, roleName }) => (
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
          <Col className="tr" span={4}>
            {
              pageRolesRefer['staffManage-add'] ? <Link to="/user-add">
                <Button type="primary">添加用户</Button>
              </Link> : null
            }

          </Col>
        </Row >

        <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false} />
      </div >
    )
  }
}

const mapStateToProps = state => ({
  pageRolesRefer: state.pageRolesRefer || {}
})
const mapDispatchToProps = dispatch => ({
  fetchUserList: params => dispatch(fetchUserList(params)),
  enableUser: params => dispatch(enableUser(params)),
  deleteUser: params => dispatch(deleteUser(params)),
  fetchRoleList: params => dispatch(fetchRoleList(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(User))