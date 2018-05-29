import React, { Component } from 'react'
import { Divider, Form, Input, DatePicker, Switch, Select, Row, Col, Checkbox, Alert, Button } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

export default class AddRenter extends Component {
  render() {
    return (
      <div id="AddRenter" className="container">
        <h3>
          <b>新增租客</b>
        </h3>

        <Row>
          <Col span={8} >
            <Form>

              <h3>
                <b>慧享公寓</b>
              </h3>

              <Divider>基本信息</Divider>

              <FormItem label="租客姓名" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Input></Input>
              </FormItem>

              <FormItem label="联系电话" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Input></Input>
              </FormItem>

              <FormItem label="身份证号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Input></Input>
              </FormItem>

              <Divider>租期信息</Divider>

              <FormItem label="起租日期" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <DatePicker></DatePicker>
              </FormItem>

              <FormItem label="到租日期" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <DatePicker></DatePicker>
              </FormItem>

              <FormItem label="提醒收租" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Switch defaultChecked></Switch>
              </FormItem>

              <FormItem label="提醒日期" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Select defaultValue="1">
                  <Option value="1">14号</Option>
                </Select>
              </FormItem>

              <Divider>授权信息</Divider>

              <FormItem label="密码授权" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Switch defaultChecked></Switch>
              </FormItem>

              <FormItem label="密码设置" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Row gutter={16}>
                  <Col span={14}>
                    <Input className="tc" defaultValue="82782-31892-32812"></Input>
                  </Col>
                  <Col span={10}>
                    <Checkbox>自定义</Checkbox>
                  </Col>
                </Row>
              </FormItem>

              <FormItem label="卡片授权" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Switch defaultChecked></Switch>
              </FormItem>

              <FormItem label="授权卡号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Row gutter={16}>
                  <Col span={14}>
                    <Input ></Input>
                  </Col>
                  <Col span={10}>
                    <span>请使用刷卡工具刷对应的卡</span>
                  </Col>
                </Row>
              </FormItem>

              <FormItem label="卡片授权" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Alert message="APP授权是一定有的，即租客可通过手机号码登陆慧享家获得权限，如果只通过APP来管理的话，门锁密码及授权卡号是不需要的" type="info"></Alert>
              </FormItem>

              <Divider>备注信息</Divider>
              <FormItem label="备注信息" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <TextArea autosize={{ minRows: 3, maxRows: 6 }} />
              </FormItem>

              <br />

              <div className="tc">
                <Button>确认</Button>
              </div>
            </Form>
          </Col>
        </Row>

      </div>
    )
  }
}