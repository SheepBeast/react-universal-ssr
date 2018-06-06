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
import { addRoleData, fetchRoleListData, fetchMenuPermissionListData } from '../../actions/role';

import { api } from '../../api'
import { BUSINESS_MENU_PERMISSION_LIST } from '../../constants/method-types'

class AddRole extends React.Component {


  componentWillMount() {
    console.log('role list -->', this.props)

    if (!this.props.roleList) {
      this.props.fetchRoleList({ state: 1 })
    }

    this.props.fetchMenuPermissionList()
  }

  render() {
    var roleList = this.props.roleList

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

        <Form className="form-shim" onSubmit={this.props.submit.bind(this)}>
          <Row>
            <Col span={14}>
              <FormItem label="角色名称" labelCol={{ span: 2 }} wrapperCol={{ span: 16 }}>
                <Input></Input>
              </FormItem>

              <FormItem label="备注" labelCol={{ span: 2 }} wrapperCol={{ span: 16 }}>
                <TextArea autosize={{ minRows: 6, maxRows: 6 }} />
              </FormItem>

              {
                roleList.length > 0 ?
                  <FormItem label="权限" labelCol={{ span: 2 }} wrapperCol={{ span: 21 }}>
                    <RadioGroup defaultValue="0">
                      {
                        roleList.map(role => <RadioButton value={role.roleId} style={{ width: 100 }}>{role.roleName}</RadioButton>)
                      }
                    </RadioGroup>
                  </FormItem> : null
              }

            </Col>
          </Row>

          {
            roleList.length > 0 ?
              <Row>
                <Col span={8} offset={1}>
                  {
                    actions.map(({ actionName, actionStr, lowerActions }) => {
                      let _lowerActions = lowerActions ? lowerActions.map((action) => {
                        return action.actionName
                      }) : []

                      return (
                        <div className="mb-20">
                          <div>
                            <Icon type="down" className="mr-10"></Icon>
                            <Checkbox>
                              <span>{actionName}</span>
                            </Checkbox>
                          </div>

                          <div className="pl-50">
                            <CheckboxGroup options={_lowerActions} />
                          </div>
                        </div>
                      )
                    })
                  }
                </Col>
              </Row> : null
          }
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

const mapStateToProps = state => ({
  roleList: state.roleList
})
const mapDispatchToProps = dispatch => {
  return {
    submit(e) {
      e.preventDefault()
      var params = {
        roleName: 'a',
        remark: '我时备住',
        actionId: '1'
      }
      return dispatch(addRoleData(params))
    },
    fetchRoleList(params) {
      return dispatch(fetchRoleListData(params))
    },
    fetchMenuPermissionList(params) {
      return dispatch(fetchMenuPermissionListData(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRole)