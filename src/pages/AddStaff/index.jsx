import React from 'react'
import { connect } from 'react-redux'
import { Divider, Form, Input, DatePicker, Switch, Select, Row, Col, Checkbox, Alert, Button, Radio } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const CheckboxGroup = Checkbox.Group

import './index.less'
import { addStaffData } from '../../actions/staff';

class AddStaff extends React.Component {

  onCheckBoxChange(e) {
    e.stopPropagation()

    let { checked } = e.target

    e.nativeEvent.target.parentNode.parentNode.classList[!checked ? 'add' : 'remove']('checkbox-wrapper-unchecked')
  }

  render() {
    const options = [
      { label: '全选', value: '0' },
      { label: '反选', value: '1' }
    ];

    return (
      <div id="AddStaff" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>增加租客</b>
            </h3>
          </Col>
          <Col style={{ textAlign: 'right' }} span={12}>
            <Button type="primary">返回</Button>
          </Col>
        </Row>

        <br />
        <Form className="form-shim" style={{ width: 540 }} onSubmit={this.props.submit}>
          <FormItem label="姓名" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input></Input>
          </FormItem>

          <FormItem label="手机号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input></Input>
          </FormItem>

          <FormItem label="邮箱" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input></Input>
          </FormItem>

          <FormItem label="账号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input></Input>
          </FormItem>

          <FormItem label="密码" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input></Input>
          </FormItem>

          <FormItem label="角色" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
            <Radio.Group defaultChecked={1} >
              <Radio value={1}>管理者</Radio>
              <Radio value={2}>客服</Radio>
              <Radio value={2}>客服</Radio>
            </Radio.Group>

            <Button type="primary" icon="plus" style={{ border: 'none' }} ghost>添加新角色</Button>
          </FormItem>

          <FormItem label="房产权限" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} >
            <Radio.Group defaultChecked={1} style={{ marginTop: 4 }} >
              <Radio value={1}>全部房产</Radio>
              <Radio value={2}>部分房产</Radio>
              <Radio value={2}>无权限</Radio>
            </Radio.Group>
          </FormItem>

          <div className="container " style={{ maxHeight: 500, overflowY: 'scroll', border: '1px solid #ddd', width: 800 }}>
            <Row>
              <Col span={16}>
                <Row gutter={8}>
                  <Col span={8}>
                    <Select defaultValue="0">
                      <Option value="0">全部房产</Option>
                    </Select>
                  </Col>
                  <Col span={8}>
                    <Select defaultValue="0">
                      <Option value="0">全部房产</Option>
                    </Select>
                  </Col>
                  <Col span={8}>
                    <Select defaultValue="0">
                      <Option value="0">全部房产</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <CheckboxGroup options={options} style={{ float: 'right', marginTop: 4 }} />
              </Col>
            </Row>
            <Divider></Divider>

            <div className="add-staff-room-list">
              {
                [1, 2, 3].map((num, idx) => (
                  <div className="mb-30" key={idx}>
                    <h3>
                      <b>慧享公寓 {num}栋 {num}楼</b>
                    </h3>
                    <Row className="tc">
                      {
                        Array(Math.floor(Math.random() * 24) + 1).fill(1).map((val, key) => (
                          <Col key={key} span={3}>
                            {
                              Math.random() > 0.5 ?
                                <Checkbox value="1" onChange={this.onCheckBoxChange.bind(this)} defaultChecked={true}>AVC2314</Checkbox> :
                                <Checkbox className="checkbox-wrapper-unchecked " value="1" onChange={this.onCheckBoxChange.bind(this)} defaultChecked={false}>AVC2314</Checkbox>
                            }

                          </Col>
                        ))
                      }

                    </Row>
                  </div>
                ))
              }
            </div>

          </div>

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

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    submit(e) {
      e.preventDefault()

      var params = {
        userAccount: 'dzh384925935',
        userName: '糯米玩',
        phoneNo: '13802402735',
        password: 'asd751011568'
      }

      return dispatch(addStaffData(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff)