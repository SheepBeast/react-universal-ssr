import { Component } from 'react'
import { Divider, Table, Button, Modal, Form, Input } from 'antd'

const FormItem = Form.Item
const TextArea = Input.TextArea

export default class Role extends Component {
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
          <a onClick={this.toggleModal.bind(this)}>编辑</a>
          <Divider type="vertical"></Divider>
          <a href="javascript:;">详情</a>
          <Divider type="vertical"></Divider>
          <a href="javascript:;">删除</a>
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
        <h3>
          <b>角色管理</b>
        </h3>
        <Divider></Divider>
        <div style={{ marginBottom: 30, display: 'inline-block', float: 'right', clear: 'both' }}>
          <Button style={{ marginRight: 20 }}>批量删除</Button>
          <Button>创建角色</Button>
        </div>
        <Table dataSource={dataSource} columns={columns} rowSelection={{}}></Table>

        <Modal title="创建角色" visible={this.state.visible} onCancel={this.toggleModal.bind(this)} onCancel={this.toggleModal.bind(this)}>
          <Form>
            <FormItem label="角色名称" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              <Input placeholder="请输入角色名称"></Input>
            </FormItem>
            <FormItem label="备注" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              <TextArea placeholder="请输入备注信息" autosize={{ minRows: 3, maxRows: 6 }} />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}