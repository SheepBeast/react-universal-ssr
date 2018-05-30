import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types'
const FormItem = Form.Item;

import API from '../../api'

var api = new API()

class Login extends React.Component {
  async onSubmit(e) {
    e.preventDefault()
    var ret = await api.fetch('businessWebLogin', {
      username: '慧享测试公寓',
      password: '123456'
    }, {
      url: '/local/login'
    })
    console.log('ret -->', ret)
  }

  render() {
    return (
      <div id="Login">
        <Form onSubmit={this.onSubmit.bind(this)} style={{ maxWidth: 300, marginTop: 100, marginLeft: 'auto', marginRight: 'auto' }} >
          <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="username" />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" name="password" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{width: '100%'}} >登陆</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.contextTypes = {
  store: PropTypes.object
}



export default connect()(Form.create()(Login))