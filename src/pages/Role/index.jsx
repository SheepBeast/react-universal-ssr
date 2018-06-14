import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Row, Col, Icon, Tooltip } from 'antd'

import { fetchRoleListData, deleteRoleData } from '../../actions/role'

const stateRefers = {
  0: '停用', 1: '正常', 2: '删除'
}

class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
  }

  componentWillMount() {
    this.props.fetchRoleList({ flag: 'role-list' })
  }

  enableRole() {

  }

  deleteRole(params) {
    this.props.deleteRole(params)
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
      render: ({ roleId, state }) => {
        if (state == 2) {
          return null
        } else {
          let opposite = state == 1 ? { text: '禁用', state: 0 } : { text: '启用', state: 1 }

          const url = `/role-edit?roleId=${encodeURIComponent(roleId)}`
          return (
            <span>
              <a className="mr-20" onClick={this.enableRole.bind(this, { roleId, state: opposite.state })}>
                <Tooltip title={opposite.text}>
                  <Icon type="file-text" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                </Tooltip>
              </a>

              <Link to={url} className="mr-20">
                <Tooltip title="编辑">
                  <Icon type="paper-clip" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                </Tooltip>
              </Link>

              <a className="mr-20" onClick={this.deleteRole.bind(this, { roleId: [roleId] })}>
                <Tooltip title="删除">
                  <Icon type="shop" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                </Tooltip>
              </a>
            </span>
          )
        }


      }
    }]

    let dataSource = this.props.roleList.map(({
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
        state
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
        <Row>
          <Col span={12}>
            <h3>
              <b>角色管理</b>
            </h3>
          </Col>
          <Col span={12} className="tr">
            <Link to="/role-add" className="mr-20">
              <Button icon="plus" type="primary">添加</Button>
            </Link>
            <Button type="primary" onClick={this.batchDelete.bind(this)}>批量删除</Button>
          </Col>
        </Row>

        <br />
        <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false}></Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  roleList: state.roleList || []
})
const mapDispatchToProps = dispatch => ({
  fetchRoleList: params => dispatch(fetchRoleListData(params)),
  deleteRole: params => dispatch(deleteRoleData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Role)