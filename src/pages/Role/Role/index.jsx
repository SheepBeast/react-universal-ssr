import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Form, Radio, Row, Col, Icon, message } from 'antd'

import { fetchRoleList, deleteRole, enableRole } from '../../../actions/role'
import isRequestSuccess from '../../../utils/isRequestSuccess';


const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const stateRefers = {
  0: '停用',
  1: '启用',
  2: '删除'
}

class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      roleList: [],
      state: null
    }
  }

  componentWillMount() {
    this.fetchRoleList()
  }

  enableRole(params) {
    this.props.enableRole(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success(`${stateRefers[params.enableType]}角色成功`)
        this.fetchRoleList()
      } else {
        message.error(`${stateRefers[params.enableType]}角色失败，${ret.data.reason}`)
      }
    })
  }

  deleteRole(params) {
    this.props.deleteRole(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('删除角色成功')
        this.fetchRoleList()
      } else {
        message.error(`删除角色失败，${ret.data.reason}`)
      }
    })
  }

  batchDelete() {
    console.log('batch delete')
    let keys = this.state.selectedRowKeys

    console.log('keys -->', keys)

    if (keys.length == 0) {
      return
    }

    this.deleteRole({
      roleId: keys
    })
  }

  onRadioGroupChange(e) {
    let { value } = e.target

    var params = {}

    if (value != -1) {
      params.state = value
    }

    this.setState({
      state: value != -1 ? value : null,
      selectedRowKeys: []
    }, () => {
      this.fetchRoleList()
    })

  }

  fetchRoleList(params) {
    params = Object.assign({ state: this.state.state }, params)

    this.props.fetchRoleList(params).then(ret => {
      if (isRequestSuccess(ret)) {
        this.setState({
          roleList: ret.data.data.list || []
        })
      }
    })
  }

  render() {
    var columns = [{
      title: '角色名称',
      key: 'roleName',
      dataIndex: 'roleName'
    }, {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark'
    }, {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      render: state => {
        return <span className={state == 1 ? 'health' : 'danger'}>{stateRefers[state]}</span>
      }
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: ({ roleId, state, roleName, remark }) => {
        if (state == 2) {
          return null
        } else {
          let opposite = state == 1 ? { text: '停用', state: 0 } : { text: '启用', state: 1 }
          const url = `/role-edit?roleId=${encodeURIComponent(roleId)}`

          return (
            <span>
              <a className="mr-20" onClick={this.enableRole.bind(this, { roleId: [roleId], enableType: opposite.state })}>{opposite.text}</a>

              <Link to={url} className="mr-20">编辑</Link>

              <a onClick={this.deleteRole.bind(this, { roleId: [roleId] })}>删除</a>
            </span>
          )
        }
      }
    }]

    let dataSource = this.state.roleList.map(({
      roleId,
      roleName,
      state,
      remark
    }) => ({
      key: roleId,
      roleName,
      state,
      remark,
      actions: {
        roleId,
        state,
        remark,
        roleName
      }
    }))

    const rowSelection = {
      onChange: selectedRowKeys => {
        console.log('selected -->', selectedRowKeys)
        this.setState({
          selectedRowKeys
        })
      }
    }
    return (
      <div id="Role" className="container">
        <h3>
          <b>角色管理</b>
        </h3>
        <Row>
          <Col span={8}>
            <Form>
              <FormItem label="状态" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                <RadioGroup className="custom-radio-button-group" defaultValue="-1" onChange={this.onRadioGroupChange.bind(this)}>
                  <RadioButton value="-1">全部</RadioButton>
                  <RadioButton value="1">启用</RadioButton>
                  <RadioButton value="0">停用</RadioButton>
                  <RadioButton value="2">删除</RadioButton>
                </RadioGroup>
              </FormItem>
            </Form>
          </Col>
          <Col offset={4} span={12} className="tr">
            <Link to="/role-add" className="mr-20">
              <Button icon="plus" type="primary">添加</Button>
            </Link>
            <Button type="primary" onClick={this.batchDelete.bind(this)}>批量删除</Button>
          </Col>
        </Row >

        <br />
        <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false} />
      </div >
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  fetchRoleList: params => dispatch(fetchRoleList(params)),
  deleteRole: params => dispatch(deleteRole(params)),
  enableRole: params => dispatch(enableRole(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Role)