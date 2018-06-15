import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
import { Divider, Row, Col, Form, Input, Button, Radio, Icon, Tree } from 'antd'

const FormItem = Form.Item
const TextArea = Input.TextArea
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

import { fetchRoleListData, fetchMenuPermissionListData, fetchRoleDetailData, editRole } from '../../actions/role';
import { api } from '../../api'
import { BUSINESS_MENU_PERMISSION_LIST } from '../../constants/method-types'

import './index.less'

let initialKeys = {}
let currentRoleId = null
let currentRoleName = null
let currentRemark = null

class EditRole extends React.Component {
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
    // 先解析roleId并赋值currentRoleId，用于下文RadioGroup设置defaultValue
    let params = this.parseQueryToParams()
    let { roleId, roleName, remark } = params

    currentRoleId = roleId
    currentRoleName = roleName
    currentRemark = remark

    // 角色列表
    let p1 = this.props.fetchRoleList({ state: 1, flag: 'role-add' })

    // 重要：页面加载前执行，时机必须是componentWillMount
    let p2 = this.props.fetchMenuPermissionList()

    Promise.all([p1, p2]).then(ret => {
      console.log('all -->', ret)

      // 将permissionList设置到state
      let permission = ret[1]

      permission.forEach(({ actionId, lowerActions = [] }) => {
        initialKeys[actionId] = lowerActions.map(({ actionId }) => actionId)
      })

      this.props.fetchRoleDetail({
        roleId: [roleId]
      }).then(ret => {
        let checkedKeys = this.parseActionsToState(ret.actions)

        this.setState({
          checkedKeys
        })
      })
    })
  }

  parseQueryToParams() {
    let search = this.props.location.search.replace('?', ''), k, params = {}
    search = qs.parse(search)

    for (k in search) {
      params[k] = decodeURIComponent(search[k])
    }

    return params
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
          roleId: currentRoleId,
          roleName,
          actionId: [].concat(checked, halfChecked)
        }

        if (remark) {
          options.remark = remark
        }

        this.props.editRole(options)
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

  componentDidMount() {
    this.setState({
      selectedRadioValue: currentRoleId
    })
  }

  render() {
    var { roleList, menuPermissionList } = this.props

    const { getFieldDecorator } = this.props.form

    return (
      <div id="EditRole" className="container">
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
            <Col span={13}>
              <FormItem label="角色名称" labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
                {
                  getFieldDecorator('roleName', {
                    rules: [{
                      required: true,
                      message: '角色名称不能为空'
                    }],
                    initialValue: currentRoleName
                  })(
                    <Input placeholder="管理员" />
                  )
                }
              </FormItem>

              <FormItem label="备注" labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
                {
                  getFieldDecorator('remark', {
                    initialValue: currentRemark
                  })(
                    <TextArea placeholder="A公寓B栋管理负责人..." autosize={{ minRows: 6, maxRows: 6 }} />
                  )
                }
              </FormItem>

              {
                roleList.length > 0 ?
                  <FormItem label="权限" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} style={{ marginBottom: 0 }}>
                    <RadioGroup defaultValue={currentRoleId} value={this.state.selectedRadioValue} onChange={this.onRadioGroupChange.bind(this)}>
                      {
                        roleList.map(role => {
                          let { roleId, roleName } = role

                          return (
                            <RadioButton
                              key={roleId}
                              value={roleId}
                              className="mb-20"
                              style={{ width: 'auto' }}
                            >
                              {roleName}
                            </RadioButton>
                          )
                        }

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
  fetchRoleList: params => dispatch(fetchRoleListData(params)),
  fetchMenuPermissionList: params => dispatch(fetchMenuPermissionListData(params)),
  fetchRoleDetail: params => dispatch(fetchRoleDetailData(params)),
  editRole: params => dispatch(editRole(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditRole)))