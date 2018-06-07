import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types'

import { login } from '../../actions/login'

const FormItem = Form.Item;


class Login extends React.Component {
  componentDidMount() {
    this.props.submit().then(() => {
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <div id="Login">
        <Form onSubmit={this.props.submit.bind(this)} style={{ maxWidth: 300, marginTop: 100, marginLeft: 'auto', marginRight: 'auto' }} >
          <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="username" style={{ height: 32 }} />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" style={{ height: 32 }} name="password" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} >登陆</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    submit(e) {
      e && e.preventDefault()

      return dispatch(login({
        accountName: 'bestZZY',
        password: '123456'
      }))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)))