import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import PropTypes from 'prop-types'

import { login } from '../../actions/common'
import isRequestSuccess from '../../utils/isRequestSuccess';

const FormItem = Form.Item;


class Login extends React.Component {
  componentDidMount() {
    this.onSubmit()
  }

  onSubmit(e) {
    e && e.preventDefault()

    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log('received val of form: ', val)
        this.props.login({
          accountName: val.userName,
          password: val.password
        }).then((ret) => {
          console.log('login ret -->', ret)
          if (isRequestSuccess(ret)) {
            this.props.history.push('/')
          } else {
            this.props.form.setFields({
              result: {
                value: '',
                errors: [
                  new Error('账号密码错误')
                ]
              }
            })
          }
        })
      } else {
        console.log('validate form err: ', err)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div id="Login">
        <div style={{ width: 430, backgroundColor: 'rgba(255,255,255,0.2)', padding: 30, borderRadius: 4, margin: 'auto' }}>
          <div className="tc mb-20">
            <img src="" alt="" style={{ width: 200, height: 40 }} />
          </div>
          <br />
          <Form onSubmit={this.onSubmit.bind(this)}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  rules: [{
                    required: true,
                    message: '账号不能为空'
                  }],
                  initialValue: 'bestZZY'
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账户" style={{ height: 32 }} />
                )
              }

            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '密码不能为空'
                  }, {
                    min: 6,
                    max: 16,
                    message: '密码为6-16位'
                  }],
                  initialValue: '123456'
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" style={{ height: 32 }} />
                )
              }
            </FormItem>

            <FormItem>
              <Row>
                <Col span={12}>
                  {
                    getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true
                    })(
                      <Checkbox>自动登陆</Checkbox>
                    )
                  }

                </Col>
                <Col span={12} className="tr">
                  <Link to="/register" className="mr-20">注册账户</Link>
                  <Link to="/forget-password" style={{ color: '#333' }}>忘记密码</Link>
                </Col>
              </Row>

            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} >登陆</Button>
              {
                getFieldDecorator('result')(
                  <Input type="hidden"></Input>
                )
              }
            </FormItem>


          </Form>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    login: params => dispatch(login(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)))