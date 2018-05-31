import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Checkbox, Row, Col, Form, Button } from 'antd'

const CheckboxGroup = Checkbox.Group

const userAuth = ['用户列表', '添加用户', '编辑用户', '删除用户', '修改状态']
const roleAuth = ['角色列表', '添加角色', '修改角色', '删除角色', '查看权限', '设置权限']
const deviceAuth = ['智能门锁', '电表统计', '发送密码', '密码列表', '开门记录', '删除密码', '开关电表', '开关水表', '临时密码', '智能电表', '智能水表', '我的设备', '添加设备', '修改设备', '删除设备', '绑定设备', '水表统计', '绑定门卡', '一键开门']
const housingResourceAuth = ['添加房产', '修改房产', '删除房产', '房产列表']
const renderAuth = ['添加租客', '退租、续租、换房', '租客档案', '添加（编辑）会员', '删除会员', '租客入住']
const accessAuth = ['门禁列表', '添加门禁', '修改门禁', '门禁开门记录', '删除开门记录', '门禁授权列表', '添加门禁授权', '修改门禁授权', '启用、禁用授权', '删除门禁授权', '删除门禁']

import './Auth.less'

class Auth extends Component {
  render() {
    return (<div id="Auth" className="container">
      <h3>
        <b>权限设置</b>
      </h3>
      <Divider></Divider>

      <Form>
        <Row>
          <Col span={3}>
            <Checkbox>用户管理</Checkbox>
            <br />
            <CheckboxGroup options={userAuth}></CheckboxGroup>
          </Col>
          <Col span={3}>
            <Checkbox>角色管理</Checkbox>
            <br />
            <CheckboxGroup options={roleAuth}></CheckboxGroup>
          </Col>
          <Col span={3}>
            <Checkbox>设备管理</Checkbox>
            <br />
            <CheckboxGroup options={deviceAuth}></CheckboxGroup>
          </Col>
          <Col span={3}>
            <Checkbox>房产管理</Checkbox>
            <br />
            <CheckboxGroup options={housingResourceAuth}></CheckboxGroup>
          </Col>
          <Col span={3}>
            <Checkbox>租客管理</Checkbox>
            <br />
            <CheckboxGroup options={renderAuth}></CheckboxGroup>
          </Col>
          <Col span={3}>
            <Checkbox>智能门禁</Checkbox>
            <br />
            <CheckboxGroup options={accessAuth}></CheckboxGroup>
          </Col>
        </Row>

        <Divider></Divider>
        <Button htmlType="submit">保存设置</Button>
      </Form>
    </div>
    )
  }
}

export default connect()(Auth)