import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Form, Input, DatePicker, Switch, Select, Row, Col, Checkbox, Alert, Button, Radio } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

class AddRenter extends Component {
  render() {
    return (
      <div id="AddRenter" className="container">
        <h3>
          <b>新增租客</b>
        </h3>
        <h4>
          <b>慧享公寓</b>
        </h4>

        <div className="container" style={{ border: '1px solid #eee' }} >
          <Form>
            <Row>
              <Col span={10}>
                <h3>
                  <b>基本信息</b>
                </h3>
                <Divider></Divider>
                <FormItem label="租客姓名" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
                  <Input></Input>
                </FormItem>

                <FormItem label="联系电话" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
                  <Input></Input>
                </FormItem>

                <FormItem label="身份证号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
                  <Input></Input>
                </FormItem>

                <FormItem label="性别" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} className="mb-0" >
                  <Radio.Group defaultChecked={1} style={{ marginTop: 4 }}>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={10} offset={1} >
                <h3>
                  <b>租期信息</b>
                </h3>
                <Divider></Divider>
                <FormItem label="起租日期" labelCol={{ span: 3 }} wrapperCol={{ span: 11 }} >
                  <DatePicker className="w-100" ></DatePicker>
                </FormItem>

                <FormItem label="到租日期" labelCol={{ span: 3 }} wrapperCol={{ span: 11 }} >
                  <DatePicker className="w-100"></DatePicker>
                </FormItem>

                <FormItem label="提醒日期" labelCol={{ span: 3 }} wrapperCol={{ span: 19 }} >
                  <Row>
                    <Col span={14} >
                      <Select defaultValue="1">
                        <Option value="1">14号</Option>
                      </Select>
                    </Col>
                    <Col span={10} className="pl-30">
                      <FormItem label="提醒收租" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                        <Switch defaultChecked style={{ marginTop: 4 }} ></Switch>
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>

        {/* <Row>
          <Col span={8} >
            <Form>





              <Divider>授权信息</Divider>









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
        </Row> */}

        <div className="container" style={{ border: '1px solid #eee' }}>
          <h3>
            <b>授权信息</b>
          </h3>
          <Divider></Divider>
          <Row>
            <Col span={16}>
              <FormItem label="密码设置" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} >
                <Row>
                  <Col span={10}>
                    <Input></Input>
                  </Col>
                  <Col span={14} className="pl-20" >
                    <Checkbox style={{
                      height: 32,
                      lineHeight: '32px'
                    }}>自定义</Checkbox>

                    <FormItem style={{ display: 'inline-block' }} label="密码授权" labelCol={{ span: 16 }} wrapperCol={{ span: 8 }} >
                      <Switch defaultChecked style={{ marginTop: 4 }} ></Switch>
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>

              <FormItem label="授权卡号" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} className="mb-0" >
                <Row >
                  <Col span={10}>
                    <Input></Input>
                  </Col>
                  <Col span={14}>
                    <FormItem label="卡片授权" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                      <Switch defaultChecked></Switch>
                    </FormItem>
                  </Col>
                </Row>


              </FormItem>
            </Col>
          </Row>

        </div>

        <div className="container" style={{ border: '1px solid #eee' }}>
          <h3>
            <b>备注信息</b>
          </h3>
          <Divider></Divider>
          <Row>
            <Col span={16}>
              <FormItem label="备注信息" labelCol={{ span: 2}} wrapperCol={{ span: 22 }} className="mb-0" >
                <TextArea autosize={{ minRows: 6, maxRows: 6 }} />
              </FormItem>
            </Col>
          </Row>


        </div>

      </div >
    )
  }
}

export default connect()(AddRenter)