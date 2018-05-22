import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Radio, Select, Input, Button, Table, Divider, DatePicker } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Option = Select.Option
const Search = Input.Search
const RangePicker = DatePicker.RangePicker

export default class CheckMessage extends Component {
  render() {
    const dataSource = [{
      key: '5',
      title: '党的光辉照耀我',
      sender: '噔噔噔噔',
      sendingEnd: 'APP',
      status: '审核中',
      validator: '',
      reply: '',
      creator: '项目推广测试',
      createTime: '2018-03-23 17:57:32',
      actions: ''
    }]

    var columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '发送对象',
      dataIndex: 'sender',
      key: 'sender'
    },
    {
      title: '发送端',
      dataIndex: 'sendingEnd',
      key: 'sendingEnd'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        var style = {}
        style.color = text == '审核中' ? 'orange' : 'blue'

        return (
          <span style={style}>{text}</span>
        )
      }
    },
    {
      title: '审核单位',
      dataIndex: 'validator',
      key: 'validator'
    },
    {
      title: '审核回复',
      dataIndex: 'reply',
      key: 'reply'
    },
    {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: (text, record) => (<span>
        <Link to="/MessageDetail">详情</Link>
        <Divider type="vertical"></Divider>
        <a href="javascript:;">审核</a>
      </span>)
    }]

    return (
      <div id="CheckMessage" className="container">
        <h3>
          <b>消息审核</b>
          <Button type="primary" icon="plus" style={{ float: 'right' }}>新建消息</Button>
        </h3>
        <Divider></Divider>
        <Form>
          <FormItem label="状态" labelCol={{ span: 1 }} wrapperCol={{ span: 8 }}>
            <RadioGroup>
              <RadioButton value="0">全部</RadioButton>
              <RadioButton value="1">未审核</RadioButton>
              <RadioButton value="2">已审核</RadioButton>
              <RadioButton value="3">审核不通过</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem label="发送端" labelCol={{ span: 1 }} wrapperCol={{ span: 8 }}>
            <RadioGroup>
              <RadioButton value="0">全部</RadioButton>
              <RadioButton value="1">平台用户</RadioButton>
              <RadioButton value="2">APP用户</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem label="创建时间" labelCol={{ span: 1 }} wrapperCol={{ span: 8 }}>
            <RangePicker placeholder={['开始时间', '结束时间']}></RangePicker>
          </FormItem>
        </Form>

        <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
      </div>
    )
  }
}