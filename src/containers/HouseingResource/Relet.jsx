import { Component } from 'react'

import { Divider, Form, Input, Select, Row, Col, Button } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

export default class Relet extends Component {
  render() {
    return (
      <div id="Relet" className="container">
        <Form>
          <h3>
            <b>当前</b>
          </h3>
          <Divider></Divider>
          <FormItem label="合约到期日" labelCol={{ span: 2 }} wrapperCol={{ span: 4 }}>
            <Input placeholder="2012-08-21" disabled={true}></Input>
          </FormItem>

          <h3>
            <b>调整</b>
          </h3>
          <Divider></Divider>
          <FormItem label="续约时长" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Select defaultValue="1">
                  <Option value="1">1</Option>
                </Select>
              </Col>
              <Col span={12}>
                <Select defaultValue="1">
                  <Option value="1">年</Option>
                  <Option value="2">月</Option>
                  <Option value="3">日</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>

          <h3>
            <b>调整后</b>
          </h3>
          <Divider></Divider>
          <FormItem label="合约到租日" labelCol={{ span: 2 }} wrapperCol={{ span: 4 }}>
            <Input placeholder="2012-08-21" disabled={true}></Input>
          </FormItem>

          <Row gutter={4}>
            <Col span={1} offset={2}>
              <Button type="primary" htmlType="submit">保存</Button>
            </Col>
            <Col span={1} offset={1}>
              <Button>取消</Button>
            </Col>
          </Row>
        </Form>

      </div>
    )
  }
}