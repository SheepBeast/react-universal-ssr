import React from 'react'
import { connect } from 'react-redux'
import { Divider, Checkbox, Row, Col, Form, Input, Button, Radio, Icon } from 'antd'

const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item
const TextArea = Input.TextArea

const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const houseAuth = ['房源列表', '添加房源', '编辑房源', '删除房源']
const deviceAuth = [
  '设备列表', '添加设备', '修改设备', '删除设备',
  '智能门锁', '发送密码', '密码列表', '删除密码',
  '临时密码', '开门记录', '我的设备', '绑定门卡',
  '一键开门', '智能电表', '智能水表', '开关电表',
  '开关水表', '电表统计', '水表统计'
]
const roleAuth = ['角色列表', '添加角色', '修改角色', '删除角色']
const staffAuth = ['员工列表', '添加员工', '修改员工', '删除员工', '启用/禁用']

import './index.less'

class AddRole extends React.Component {
  render() {
    return (
      <div id="AddRole" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>权限设置</b>
            </h3>
          </Col>
          <Col span={12} className="tr">
            <Button type="primary">返回</Button>
          </Col>
        </Row>

        <Divider></Divider>

        <Form className="form-shim">
          <Row>
            <Col span={14}>
              <FormItem label="角色名称" labelCol={{ span: 2 }} wrapperCol={{ span: 16 }}>
                <Input></Input>
              </FormItem>

              <FormItem label="备注" labelCol={{ span: 2 }} wrapperCol={{ span: 16 }}>
                <TextArea autosize={{ minRows: 6, maxRows: 6 }} />
              </FormItem>

              <FormItem label="权限" labelCol={{ span: 2 }} wrapperCol={{ span: 21 }}>
                <RadioGroup defaultValue="0">
                  <RadioButton value="0">管理员</RadioButton>
                  <RadioButton value="1">客服</RadioButton>
                  <RadioButton value="2" style={{ width: 100 }}>施工人员</RadioButton>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8} offset={1}>
              <div className="mb-20">
                <div>
                  <Icon type="down" className="mr-10"></Icon>
                  <Checkbox>
                    <span>房源管理</span>
                  </Checkbox>
                </div>

                <div className="pl-50">
                  <CheckboxGroup options={houseAuth} />
                </div>
              </div>

              <div className="mb-20">
                <div>
                  <Icon type="down" className="mr-10"></Icon>
                  <Checkbox>
                    <span>设备管理</span>
                  </Checkbox>
                </div>

                <div className="pl-50">
                  <CheckboxGroup options={deviceAuth} />
                </div>
              </div>

              <div className="mb-20">
                <div>
                  <Icon type="down" className="mr-10"></Icon>
                  <Checkbox>
                    <span>角色管理</span>
                  </Checkbox>
                </div>

                <div className="pl-50">
                  <CheckboxGroup options={roleAuth} />
                </div>
              </div>

              <div className="mb-20">
                <div>
                  <Icon type="down" className="mr-10"></Icon>
                  <Checkbox>
                    <span>员工管理</span>
                  </Checkbox>
                </div>

                <div className="pl-50">
                  <CheckboxGroup options={staffAuth} />
                </div>
              </div>
            </Col>
          </Row>

          <br />
          <Row>
            <Col span={8} offset={1}>
              <Button type="primary" className="mr-20" htmlType="submit">保存</Button>
              <Button>取消</Button>
            </Col>
          </Row>
        </Form>
      </div >
    )
  }
}

export default connect()(AddRole)