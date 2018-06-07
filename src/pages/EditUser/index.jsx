import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Form, Input, DatePicker, Switch, Select, Row, Col, Checkbox, Alert, Button, Radio } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const Search = Input.Search

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInput: false
    }
  }


  toggleInput() {
    this.setState({
      showInput: !this.state.showInput,
      isFocusing: false
    })
  }

  render() {
    return (
      <div id="EditUser" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>编辑员工</b>
            </h3>
          </Col>
          <Col style={{ textAlign: 'right' }} span={12}>
            <Button type="primary">返回</Button>
          </Col>
        </Row>

        <br />
        <Form className="form-shim" style={{ width: 540 }} >
          <FormItem label="姓名" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input defaultValue="叶良辰"></Input>
          </FormItem>

          <FormItem label="手机号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input defaultValue="13930203028"></Input>
          </FormItem>

          <FormItem label="邮箱" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input defaultValue="327fa012@qd.com"></Input>
          </FormItem>

          <FormItem label="账号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input defaultValue="tangsanzang.xt0ds" disabled></Input>
          </FormItem>

          <FormItem label="密码" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            {
              !this.state.showInput ?
                <Button type="primary" onClick={this.toggleInput.bind(this)} ghost>更改密码</Button> :
                <Search
                  enterButton="取消更改"
                  onSearch={this.toggleInput.bind(this)}
                  onPressEnter={() => undefined}
                  style={{
                    height: 32
                  }}
                />
            }
          </FormItem>
          <FormItem label="角色" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
            <Radio.Group defaultChecked={1} >
              <Radio value={1}>管理者</Radio>
              <Radio value={2}>客服</Radio>
              <Radio value={3}>施工人员</Radio>
            </Radio.Group>

            <Button type="primary" icon="plus" style={{ border: 'none' }} ghost>添加新角色</Button>
          </FormItem>

          <FormItem wrapperCol={{ span: 24 }} >
            <Row>
              <Col span={10} offset={3}>
                <Button type="primary" className="mr-20" htmlType="submit">保存</Button>
                <Button>取消</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div >
    )
  }
}

export default connect()(EditUser)