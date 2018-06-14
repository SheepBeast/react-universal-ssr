import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
import { Divider, Checkbox, Row, Col, Form, Input, Button, Radio, Icon } from 'antd'

const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item
const TextArea = Input.TextArea

const RadioGroup = Radio.Group
const RadioButton = Radio.Button

import { addRoleData, fetchRoleListData, fetchMenuPermissionListData, fetchRoleDetailData, editRole } from '../../actions/role';
import { api } from '../../api'
import { BUSINESS_MENU_PERMISSION_LIST } from '../../constants/method-types'

import './index.less'

const checkbox = {
  indeterminate: false,
  checked: false,
  value: []
}

let initialStateActions = null
let currentRoleId = null
let currentRoleName = null
let currentRemark = null

class EditRole extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRadioValue: null
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
      this.setPermissionListToState(permission, () => {
        // 角色详情
        this.props.fetchRoleDetail({
          roleId: [roleId]
        }).then(ret => {
          console.log('ret -->', ret)
          this.resetStateActions(() => {
            this.setActionsToState(ret.actions)
          })
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
        let state = this.state
        let key
        let actionId = []

        for (key in state) {
          let _ = state[key]

          if (_.hasOwnProperty('allList')) {

            actionId = [].concat(
              actionId,
              _.checked || _.indeterminate ? [key] : [],
              _.value)
          }
        }

        let { roleName, remark } = val

        let options = {
          roleName,
          actionId,
          roleId: currentRoleId
        }

        if (remark) {
          options.remark = remark
        }

        this.props.editRole(options)
      }
    })
  }

  setPermissionListToState(permissionList = [], callback) {
    let state = this.state
    let temp = {}

    permissionList.forEach(({
      actionId,
      lowerActions = []
    }) => {
      let allList = lowerActions.map(({ actionId }) => actionId)

      temp[actionId] = {
        checked: false,
        indeterminate: false,
        value: [],
        allList
      }
    })

    let assigned = Object.assign({}, state, temp)

    this.setState(assigned, () => {
      // 将只包含actions的state另存，用于重置所有actions
      initialStateActions = Object.assign({}, this.state)

      callback && callback()
    })
  }

  setActionsToState(actions = [], callback) {
    let state = this.state
    let temp = {}

    actions.forEach(({
      actionId,
      lowerActions = []
    }) => {
      let checked = state[actionId].allList.length == 0 || state[actionId].allList.length == lowerActions.length
      let indeterminate = !checked && lowerActions.length > 0
      let value = lowerActions.map(({ actionId }) => actionId)

      temp[actionId] = {
        checked,
        indeterminate,
        value,
        allList: state[actionId].allList
      }
    })

    let assigned = Object.assign({}, state, temp)

    console.log('actions state -->', this.state)
    console.log('assinged -->', assigned)

    this.setState(assigned, callback)
  }

  resetStateActions(callback) {
    if (initialStateActions) {
      this.setState(initialStateActions, callback)
    }
  }

  onRadioGroupChange(e) {
    e.stopPropagation()

    let { checked, value } = e.target

    console.log('radio value -->', value)

    this.props.fetchRoleDetail({
      roleId: [value]
    }).then(ret => {


      console.log('this state -->', this.state)

      this.resetStateActions(() => {
        this.setActionsToState(ret.actions, () => {
          this.setState({
            selectedRadioValue: value
          })
        })
      })
    })
  }

  onCheckBoxChange(e) {
    e.stopPropagation()

    let { checked, value } = e.target

    let _ = this.state[value]

    let assigned = Object.assign({}, _, checked ? {
      checked: true,
      indeterminate: false,
      value: _.allList
    } : {
        checked: false,
        indeterminate: false,
        value: []
      })

    this.setState({
      [value]: assigned,
      selectedRadioValue: null
    })
  }

  onCheckBoxGroupChange(main, group) {
    let _ = this.state[main]

    let checked = group.length == _.allList.length

    let assigned = Object.assign({}, _, {
      checked: checked,
      indeterminate: !checked && group.length > 0,
      value: group
    })

    this.setState({
      [main]: assigned,
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
                <Col span={8} offset={1}>
                  {
                    menuPermissionList.map(permission => {
                      let lowerActions = permission.lowerActions ?
                        permission.lowerActions.map(subPermit => ({
                          label: subPermit.actionName.split('-')[1],
                          value: subPermit.actionId
                        }))
                        : []


                      let checked = (this.state[permission.actionId] || checkbox).checked
                      let indeterminate = (this.state[permission.actionId] || checkbox).indeterminate
                      let value = (this.state[permission.actionId] || checkbox).value

                      // console.log('-----------------------')
                      // console.log('action id -->', permission.actionId)
                      // console.log('this state -->', this.state[permission.actionId])
                      // console.log('checked -->', checked)
                      // console.log('indeterminate -->', indeterminate)
                      // console.log('value -->', value)

                      return (
                        <div key={permission.actionId} className="mb-20">
                          <div>
                            <Icon type="down" className="mr-10"></Icon>
                            <Checkbox
                              value={permission.actionId}
                              onChange={this.onCheckBoxChange.bind(this)}
                              checked={checked}
                              indeterminate={indeterminate}
                            >
                              {permission.actionName}
                            </Checkbox>
                          </div>

                          <div className="pl-50">
                            <CheckboxGroup options={lowerActions} value={value} onChange={(group) => {
                              this.onCheckBoxGroupChange(permission.actionId, group)
                            }} />
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
  fetchRoleDetail: params => dispatch(fetchRoleDetailData(params)),
  editRole: params => dispatch(editRole(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditRole)))