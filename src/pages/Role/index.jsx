import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Row, Col, Icon } from 'antd'

import { fetchRoleListData } from '../../actions/role'

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

  componentWillMount() {
    if (!this.props.roleList) {
      this.props.fetchRoleList()
    }
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
      dataIndex: 'state'
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: (roleId) => (
        <span>
          <Icon type="file-text" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
          <Icon type="paper-clip" className="fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
        </span>
      )
    }]


    let { listSum, totalPages, list } = this.props.roleList

    let dataSource = listSum > 0 ? list.map(({ roleId, roleName, state, remark }) => ({
      roleName,
      state,
      actions: roleId,
      remark
    })) : []

    console.log('this role -->', this.props)
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
            <Button type="primary" >批量删除</Button>
          </Col>
        </Row>

        <br />
        <Table dataSource={dataSource} columns={columns} rowSelection={{}}></Table>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => {
  return {
    fetchRoleList(params) {
      return dispatch(fetchRoleListData(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)