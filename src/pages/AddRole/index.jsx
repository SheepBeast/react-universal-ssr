import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Divider, Row, Col, Form, Input, Button, Radio, Icon, Tree } from 'antd'

const FormItem = Form.Item
const TextArea = Input.TextArea
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

import { addRoleData, fetchRoleListData, fetchMenuPermissionListData, fetchRoleDetailData } from '../../actions/role';
import { api } from '../../api'
import { BUSINESS_MENU_PERMISSION_LIST } from '../../constants/method-types'

import './index.less'

const initialKeys = {}

class AddRole extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRadioValue: null,
      checkedKeys: {
        checked: [],
        halfChecked: []
      }
    }
  }

  componentWillMount() {

    this.props.fetchRoleList({ state: 1, flag: 'role-add' })

    // 重要：页面加载前执行，时机必须是componentWillMount
    this.props.fetchMenuPermissionList().then(permission => {
      permission.forEach(({ actionId, lowerActions = [] }) => {
        initialKeys[actionId] = lowerActions.map(({ actionId }) => actionId)
      })
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  onSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.form.validateFields((err, val) => {
      if (!err) {
        let { checked, halfChecked } = this.state.checkedKeys

        if (checked.length == 0 && halfChecked.length == 0) {
          message.error('未选择权限')
          return
        }

        let { roleName, remark } = val

        let options = {
          roleName,
          actionId: [].concat(checked, halfChecked)
        }

        if (remark) {
          options.remark = remark
        }

        this.props.addRole(options)
      }
    })
  }

  onRadioGroupChange(e) {
    e.stopPropagation()

    let { value } = e.target

    this.props.fetchRoleDetail({
      roleId: [value]
    }).then(({ actions }) => {

      let checkedKeys = this.parseActionsToState(actions)

      this.setState({
        checkedKeys,
        selectedRadioValue: value
      })
    })
  }

  parseActionsToState(actions = []) {
    let checked = [], halfChecked = []

    actions.forEach(({
      actionId,
      lowerActions = []
    }) => {
      checked = checked.concat(lowerActions.map(({ actionId }) => actionId))

      if (lowerActions.length == initialKeys[actionId].length) {
        checked.push(actionId)
      } else {
        halfChecked.push(actionId)
      }
    })

    return {
      checked,
      halfChecked
    }
  }

  onCheck(checkedKeys, e) {
    this.setState({
      checkedKeys: {
        checked: checkedKeys,
        halfChecked: e.halfCheckedKeys
      },
      selectedRadioValue: null
    })
  }

  render() {
    var { roleList, menuPermissionList } = this.props

    const { getFieldDecorator } = this.props.form

    return (
      <div id="AddRole" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>权限设置</b>
            </h3>
          </Col>
          <Col span={12} className="tr">
            <Button type="primary" onClick={this.goBack.bind(this)}>返回</Button>
          </Col>
        </Row>

        <Divider></Divider>

        <Form className="form-shim" onSubmit={this.onSubmit.bind(this)}>
          <Row>
            <Col span={16}>
              <FormItem label="角色名称" labelCol={{ span: 2 }} wrapperCol={{ span: 11 }}>
                {
                  getFieldDecorator('roleName', {
                    rules: [{
                      required: true,
                      message: '角色名称不能为空'
                    }]

                  })(
                    <Input placeholder="管理员" />
                  )
                }
              </FormItem>

              <FormItem label="备注" labelCol={{ span: 2 }} wrapperCol={{ span: 11 }}>
                {
                  getFieldDecorator('remark')(
                    <TextArea placeholder="A公寓B栋管理负责人..." autosize={{ minRows: 6, maxRows: 6 }} />
                  )
                }
              </FormItem>

              {
                roleList.length > 0 ?
                  <FormItem label="权限" labelCol={{ span: 2 }} wrapperCol={{ span: 11 }} style={{ marginBottom: 0 }}>
                    <RadioGroup value={this.state.selectedRadioValue} onChange={this.onRadioGroupChange.bind(this)}>
                      {
                        roleList.map(role =>
                          <RadioButton key={role.roleId} value={role.roleId} className="mb-20" style={{ width: 'auto' }}>{role.roleName}</RadioButton>
                        )
                      }
                    </RadioGroup>
                  </FormItem> : null
              }

            </Col>
          </Row>


          {
            menuPermissionList.length > 0 ?
              <Row>
                <Col offset={1}>
                  <Tree
                    checkable
                    defaultExpandAll={true}
                    onCheck={this.onCheck.bind(this)}
                    checkedKeys={this.state.checkedKeys}
                  >
                    {
                      menuPermissionList.map(({ actionId, actionName, lowerActions }) => (
                        <TreeNode title={actionName} key={actionId} className="custom-tree-parent-node">
                          {
                            lowerActions ?
                              lowerActions.map(({ actionId, actionName }) => (
                                <TreeNode title={actionName.split('-')[1].substring(0, 4)} key={actionId} className="custom-tree-child-node" />
                              ))
                              : null
                          }
                        </TreeNode>
                      ))
                    }
                  </Tree>
                </Col>
              </Row>
              : null

          }
          <br />
          <Row>
            <Col span={8} offset={2}>
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
  roleList: state.usableRoleList || [],
  menuPermissionList: state.menuPermissionList || [],
  // roleDetail: state.roleDetail || {}
})
const mapDispatchToProps = dispatch => ({
  addRole: params => dispatch(addRoleData(params)),
  fetchRoleList: params => dispatch(fetchRoleListData(params)),
  fetchMenuPermissionList: params => dispatch(fetchMenuPermissionListData(params)),
  fetchRoleDetail: params => dispatch(fetchRoleDetailData(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddRole)))