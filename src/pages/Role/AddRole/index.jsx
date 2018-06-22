import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Divider, Row, Col, Form, Input, Button, Radio, Icon, Tree, message } from 'antd'


import { addRole, fetchRoleList, fetchMenuPermissionList, fetchRoleDetail } from '../../../actions/role';
import isRequestSuccess from '../../../utils/isRequestSuccess';
import './index.less'


const FormItem = Form.Item
const TextArea = Input.TextArea
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const initialKeys = {}

class AddRole extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRadioValue: null,
      checkedKeys: {
        checked: [],
        halfChecked: []
      },
      roleList: [],
      menuPermissionList: []
    }
  }

  componentWillMount() {

    let p1 = this.props.fetchRoleList({ state: 1 }),
      p2 = this.props.fetchMenuPermissionList()

    Promise.all([p1, p2]).then(ret => {
      if (isRequestSuccess(ret[0]) && isRequestSuccess(ret[1])) {
        let roleList = ret[0].data.data.list || [],
          menuPermissionList = ret[1].data.data.actions || []

        menuPermissionList.forEach(({ actionId, lowerActions = [] }) => {
          initialKeys[actionId] = lowerActions.map(({ actionId }) => actionId)
        })

        this.setState({
          roleList,
          menuPermissionList
        })
      }
    })
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

        let params = {
          roleName,
          actionId: [].concat(checked, halfChecked),
          remark
        }

        this.props.addRole(params).then(ret => {
          if (isRequestSuccess(ret)) {
            message.success('添加角色成功')
            this.reset()
          } else {
            message.error(`添加角色失败，${ret.data.reason}`)
          }
        })
      }
    })
  }

  reset() {
    this.props.fetchRoleList({ state: 1 }).then(ret => {
      if (isRequestSuccess(ret)) {
        this.setState({
          roleList: ret.data.data.list,
          checkedKeys: {
            checked: [],
            halfChecked: []
          }
        }, () => {
          this.props.form.setFieldsValue({
            roleName: '',
            remark: ''
          })
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
      let actions = ret.data.data.actions

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

  goBack() {
    this.props.history.goBack()
  }

  render() {
    var { roleList, menuPermissionList } = this.state

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
              <Button onClick={this.goBack.bind(this)}>取消</Button>
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
  addRole: params => dispatch(addRole(params)),
  fetchRoleList: params => dispatch(fetchRoleList(params)),
  fetchMenuPermissionList: params => dispatch(fetchMenuPermissionList(params)),
  fetchRoleDetail: params => dispatch(fetchRoleDetail(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddRole)))