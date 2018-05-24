import { Component } from 'react'
import { Divider, Form, Input, Checkbox, Radio, Row, Col } from 'antd'

const FormItem = Form.Item
const CheckBoxGroup = Checkbox.Group
const RadioGroup = Radio.Group

export default class EditUser extends Component {
  render() {
    return (
      <div id="EditUser" className="container">
        <h3>
          <b>编辑用户（tenant_001）</b>
        </h3>
        <Divider></Divider>

        <Row>
          <Col span={12} >
            <Form>
              <FormItem label="用户账号" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
                <Input></Input>
              </FormItem>

              <FormItem label="手机号" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
                <Input></Input>
              </FormItem>

              <FormItem label="邮箱" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
                <Input></Input>
              </FormItem>

              <FormItem label="密码" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
                <Input></Input>
              </FormItem>

              <FormItem label="所属角色" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
                <RadioGroup >
                  <Radio value={1}>一级管理员</Radio>
                  <Radio value={4}>二级管理员</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem label="房产权限" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
                <div>
                  <h3 className="tc">
                    <b>房源权限设置</b>
                  </h3>

                  <h3>整容中心</h3>
                  <Divider></Divider>

                  <FormItem label="第一层" >
                    <Checkbox>全选</Checkbox>
                    &nbsp;&nbsp;
                <Checkbox>反选</Checkbox>
                    <Divider></Divider>

                    <CheckBoxGroup options={['BU101', 'BU102', 'BU103']}></CheckBoxGroup>
                  </FormItem>

                  <FormItem label="第二层" >
                    <Checkbox>全选</Checkbox>
                    &nbsp;&nbsp;
                <Checkbox>反选</Checkbox>
                    <Divider></Divider>

                    <CheckBoxGroup options={['BU101', 'BU102', 'BU103']}></CheckBoxGroup>
                  </FormItem>
                </div>
              </FormItem>
            </Form>
          </Col>
        </Row>

      </div>
    )
  }
}