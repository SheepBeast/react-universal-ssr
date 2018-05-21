import { Component } from 'react'
import { Divider, Switch, Select, Input, Alert, Row, Col, Button, Form } from 'antd'
const Option = Select.Option
const FormItem = Form.Item

export default class Info extends Component {
  render() {
    return (
      <div id="RoomDetailInfo" className="container">
        <Form layout="horizontal" style={{ width: 400 }}>
          <h3>
            <b>新增租客</b>
          </h3>
          <Divider></Divider>
          <h3>
            <b>慧享公寓</b>
          </h3>
          <Divider>基本信息</Divider>

          <FormItem label="租客姓名" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            郑剑琪
          </FormItem>

          <FormItem label="联系电话" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            1320193201
          </FormItem>

          <FormItem label="身份证" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            193018490173108210
          </FormItem>

          <Divider>租期信息</Divider>

          <FormItem label="起租日期" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            2019-05-12
          </FormItem>

          <FormItem label="到租日期" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            2019-05-12
          </FormItem>

          <FormItem label="提醒收租" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Switch defaultChecked></Switch>
          </FormItem>

          <FormItem label="提醒日期" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Select defaultValue="1">
              <Option value="1">14号</Option>
            </Select>
          </FormItem>

          <Divider>授权信息</Divider>

          <FormItem label="密码设置" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Input defaultValue="31430-43189-43139" className="tc"></Input>
          </FormItem>

          <FormItem label="卡片授权" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Switch defaultChecked></Switch>
          </FormItem>

          <FormItem label="授权卡号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Row gutter={16}>
              <Col span={16}>
                <Input defaultValue="23084739174" className="tc"></Input>
              </Col>
              <Col span={8}>
                <Button type="primary">修改卡号</Button>
              </Col>
            </Row>
          </FormItem>

          <FormItem labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            <Alert type="info" message="App授权时一定有的，即租客可通过手机号码登陆慧享家获得权限，如果通过APP来管理的话，门锁密码及授权卡号时不需要"></Alert>
          </FormItem>

          <Divider>备注信息</Divider>

          <FormItem label="备注信息" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Row gutter={16}>
              <Col span={16}>
                <Input defaultValue="这个人准时交租，是个好租客！！"></Input>
              </Col>
              <Col span={8}>
                <Button type="primary">修改备注</Button>
              </Col>
            </Row>
          </FormItem>

          <FormItem className="tc">
            <Button  type="info" htmlType="submit">确认</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}