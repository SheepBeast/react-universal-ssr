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
import { fetchStaffListData } from '../../actions/staff';

class Staff extends Component {
  componentWillMount() {
    this.props.fetchStaffList().then(r => {
      console.log('staff list -->', r)
    })
  }

  render() {
    var columns = [{
      title: '姓名',
      key: 'name',
      dataIndex: 'name'
    }, {
      title: '角色',
      key: 'role',
      dataIndex: 'role'
    }, {
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
          <Icon type="file-text" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
          <Icon type="paper-clip" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
          <Icon type="shop" className="fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
        </span>
      )
    }]

    var dataSource = Array(4).fill(1).map((val, idx) => ({
      key: idx,
      name: '罗京夫',
      role: '管理者',
      userName: 'tenant_001',
      mobile: '无',
      email: '314739189@qq.com',
      registerTime: '2012-23-53 21:20:32',
      status: '正常',
      actions: ''
    }))

    return (
      <div id="Staff" className="container">

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

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  fetchStaffList: params => dispatch(fetchStaffListData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Staff)