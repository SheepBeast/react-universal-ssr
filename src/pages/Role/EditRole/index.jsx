import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
import { Divider, Row, Col, Form, Input, Button, Radio, Icon, Tree, message } from 'antd'



import { fetchRoleList, fetchMenuPermissionList, fetchRoleDetail, editRole } from '../../../actions/role';
import parseQueryToParams from '../../../utils/parseQueryToParams'
import isRequestSuccess from '../../../utils/isRequestSuccess'
import './index.less'

const FormItem = Form.Item
const TextArea = Input.TextArea
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

let initialKeys = {}

class EditRole extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRadioValue: null,
      checkedKeys: {
        checked: [],
        halfChecked: []
      },

      roleList: [],
      menuPermissionList: [],
      roleDetail: {}
    }
  }

  componentWillMount() {
    let params = parseQueryToParams(this.props.location.search)
    let { roleId, roleName, remark } = params

    let p1 = this.props.fetchRoleList({ state: 1 }),
      p2 = this.props.fetchMenuPermissionList(),
      p3 = this.props.fetchRoleDetail({ roleId: [roleId] })

    Promise.all([p1, p2, p3]).then(ret => {
      let roleList = isRequestSuccess(ret[0]) && ret[0].data.data.list || [],
        menuPermissionList = isRequestSuccess(ret[1]) && ret[1].data.data.actions || [],
        roleDetail = isRequestSuccess(ret[2]) && ret[2].data.data || {}

      menuPermissionList.forEach(({ actionId, lowerActions = [] }) => {
        initialKeys[actionId] = lowerActions.map(({ actionId }) => actionId)
      })

      let checkedKeys = this.parseActionsToState(roleDetail.actions || [])

      this.setState({
        roleList,
        menuPermissionList,
        roleDetail,

        selectedRadioValue: roleList[0].roleId,
        checkedKeys
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

        let { roleId, roleName, remark } = val

        let params = {
          roleId,
          roleName,
          actionId: [].concat(checked, halfChecked),
          remark
        }

        this.props.editRole(params).then(ret => {
          if (isRequestSuccess(ret)) {
            message.success('修改角色成功')
            this.goBack()
          } else {
            message.error(`修改角色失败，${ret.data.reason}`)
          }
        })
      }
    })
  }

  onRadioGroupChange(e) {
    e.stopPropagation()

    let { value } = e.target

    this.props.fetchRoleDetail({
      roleId: [value]
    }).then(ret => {
      let actions = isRequestSuccess(ret) && ret.data.data.actions || []

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

  onMenuCheck(checkedKeys, e) {
    this.setState({
      checkedKeys: {
        checked: checkedKeys,
        halfChecked: e.halfCheckedKeys
      },
      selectedRadioValue: null
    })
  }

  render() {
    var { roleList, menuPermissionList, roleDetail } = this.state

    var { roleId, roleName, remark } = roleDetail

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
              {
                getFieldDecorator('roleId', {
                  rules: [{
                    required: true
                  }],
                  initialValue: roleId
                })(
                  <Input type="hidden" />
                )
              }
              <FormItem label="角色名称" labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
                {
                  getFieldDecorator('roleName', {
                    rules: [{
                      required: true,
                      message: '角色名称不能为空'
                    }],
                    initialValue: roleName
                  })(
                    <Input placeholder="管理员" />
                  )
                }
              </FormItem>

              <FormItem label="备注" labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
                {
                  getFieldDecorator('remark', {
                    initialValue: remark
                  })(
                    <TextArea placeholder="A公寓B栋管理负责人..." autosize={{ minRows: 6, maxRows: 6 }} />
                  )
                }
              </FormItem>

              {
                roleList.length > 0 ?
                  <FormItem label="权限" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} style={{ marginBottom: 0 }}>
                    <RadioGroup defaultValue={roleId} value={this.state.selectedRadioValue} onChange={this.onRadioGroupChange.bind(this)}>
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
                    onCheck={this.onMenuCheck.bind(this)}
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

const mapDispatchToProps = dispatch => ({
  fetchRoleList: params => dispatch(fetchRoleList(params)),
  fetchMenuPermissionList: params => dispatch(fetchMenuPermissionList(params)),
  fetchRoleDetail: params => dispatch(fetchRoleDetail(params)),
  editRole: params => dispatch(editRole(params))
})

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(EditRole)))