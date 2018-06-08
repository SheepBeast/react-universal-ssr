import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Form, Input, Button, Row, Col } from 'antd'

const FormItem = Form.Item

class Register extends React.Component {
  render() {
    return (
      <div id="Register">
        <div style={{ width: 430, backgroundColor: 'rgba(255,255,255,0.2)', padding: 30, borderRadius: 4 }}>
          <div className="tc mb-20">
            <img src="" alt="" style={{ width: 200, height: 40 }} />

          </div>
          <p>
            <b>注册</b>
          </p>
          <Form>
            <FormItem>
              <Input placeholder="账号"></Input>
            </FormItem>
            <FormItem>
              <Input placeholder="6 - 16 位密码，区分大小写"></Input>
            </FormItem>
            <FormItem>
              <Input placeholder="确认密码"></Input>
            </FormItem>
            <FormItem>
              <Input placeholder="11位手机号"></Input>
            </FormItem>
            <FormItem>
              <Row>
                <Col span={17}>
                  <Input placeholder="输入验证码"></Input>

                </Col>
                <Col span={7} className="tr">
                  <Button>获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span={12}>
                  <Button type="primary" style={{width: 176}}>注 册</Button>
                </Col>
                <Col span={12} className="tr">
                  <Link to="/login">使用已有账户登录</Link>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default Register