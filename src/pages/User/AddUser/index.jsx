import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Divider, Form, Input, Row, Col, Button, Radio, Tree, message } from 'antd'


import { addUser } from '../../../actions/user';
import { isMobile, isEmail } from '../../../constants/regexp';
import { fetchRoleList } from '../../../actions/role';
import { fetchApartmentList } from '../../../actions/property';
import './index.less'
import isRequestSuccess from '../../../utils/isRequestSuccess';


const FormItem = Form.Item
const TextArea = Input.TextArea
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group


class AddUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedKeys: [],
      showHouseAuth: false,

      roleList: [],
      apartmentList: []
    }
  }

  componentWillMount() {
    let p1 = this.props.fetchRoleList({ state: 1 }),
      p2 = this.props.fetchApartmentList()

    Promise.all([p1, p2]).then(ret => {
      let roleList = isRequestSuccess(ret[0]) && ret[0].data.data.list || [],
        apartmentList = isRequestSuccess(ret[1]) && ret[1].data.data.houses || []

      this.setState({
        roleList,
        apartmentList
      })
    })
  }

  onTreeCheck(selectedKeys, e) {
    this.setState({ selectedKeys })
  }

  onHouseAuthChange(e) {
    this.setState({
      showHouseAuth: e.target.value == 2
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.form.validateFields((err, val) => {
      if (!err) {
        let { userName, phoneNo, eMail, userAccount, password, roleId, houseAuth } = val

        console.log('val -->', val)

        let params = {
          userAccount,
          userName,
          phoneNo,
          password,
          eMail,
          roleId
        }

        if (houseAuth == 2) {
          let keys = this.state.selectedKeys

          if (keys.length == 0) {
            this.props.form.setFields({
              houseAuth: {
                value: null,
                errors: new Error('选择部分房产时，必须选择房间')
              }
            })

            return
          }

          let houses = []

          keys.forEach(key => {
            let partial = key.split('|')

            if (partial.length == 4) {
              let [houseId, buildingId, floorId, roomId] = partial

              let house = {
                houseId,
                buildings: [{
                  buildingId,
                  floors: [{
                    floorId,
                    rooms: [{
                      roomId
                    }]
                  }]
                }]
              }

              houses.push(house)
            }
          })

          if (houses.length > 0) {
            params.houses = houses
          }
        } else {
          params.houseAuth = houseAuth
        }

        console.log('params -->', params)

        this.props.addUser(params).then(ret => {
          if (isRequestSuccess(ret)) {
            message.success(`添加用户成功`)
            this.reset()
          } else {
            message.success(`添加用户失败，${ret.data.reason}`)
          }
        })

      }
    })
  }

  reset() {
    this.props.form.resetFields()
    this.setState({
      selectedKeys: []
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {

    const { getFieldDecorator } = this.props.form
    const { apartmentList, roleList } = this.state

    return (
      <div id="AddUser" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>添加用户</b>
            </h3>
          </Col>
          <Col className="tr" span={12}>
            <Button type="primary" onClick={this.goBack.bind(this)}>返回</Button>
          </Col>
        </Row>

        <br />
        <Form className="form-shim" style={{ width: 620 }} onSubmit={this.onSubmit.bind(this)}>
          <FormItem label="姓名" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input name="userName" style={{ display: 'none' }} />
            {
              getFieldDecorator('userName', {
                rules: [{
                  required: true,
                  message: '姓名不能为空'
                }]
              })(
                <Input placeholder="请输入员工姓名" autoComplete="false" />
              )
            }
          </FormItem>

          <FormItem label="手机号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input name="phoneNo" style={{ display: 'none' }} />
            {
              getFieldDecorator('phoneNo', {
                rules: [{
                  required: true,
                  message: '手机不能为空'
                }, {
                  validator: (rule, value, callback) => {
                    if (!isMobile.test(value)) {
                      callback('手机格式错误')
                    }

                    callback()
                  }
                }],
                validateFirst: true
              })(
                <Input maxLength="11" placeholder="请输入员工手机号" autoComplete="false" />
              )
            }
          </FormItem>

          <FormItem label="邮箱" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input name="eMail" style={{ display: 'none' }} />
            {
              getFieldDecorator('eMail', {
                rules: [{
                  required: true,
                  message: '邮箱不能为空'
                }, {
                  validator: (rule, value, callback) => {
                    if (!isEmail.test(value)) {
                      callback('邮箱格式错误')
                    }

                    callback()
                  }
                }],
                validateFirst: true
              })(
                <Input placeholder="请输入员工邮箱" autoComplete="false" />
              )
            }
          </FormItem>

          <FormItem label="账号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input name="userAccount" style={{ display: 'none' }} />
            {
              getFieldDecorator('userAccount', {
                rules: [{
                  required: true,
                  message: '账号不能为空'
                }],
                initialValue: null
              })(
                <Input placeholder="请输入员工的账号，确认后不可修改" autoComplete="false" />
              )
            }
          </FormItem>

          <FormItem label="密码" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            <Input name="password" type="password" style={{ display: 'none' }} />
            {
              getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '密码不能为空'
                }, {
                  min: 6,
                  max: 16,
                  message: '密码为6-16位'
                }],
                validateFirst: true
              })(
                <Input type="password" placeholder="请输入登录密码" autoComplete="false" />
              )
            }
          </FormItem>

          <FormItem label="角色" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
            {
              getFieldDecorator('roleId')(
                <RadioGroup style={{ marginTop: 4 }}>
                  {
                    roleList.map(({ roleId, roleName }) =>
                      <Radio key={roleId} value={roleId}>{roleName}</Radio>
                    )
                  }
                </RadioGroup>
              )
            }


            <Link to="role-add">
              <Button type="primary" icon="plus" style={{ border: 'none' }} ghost>添加新角色</Button>
            </Link>
          </FormItem>

          <FormItem label="房产权限" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} >

            {
              getFieldDecorator('houseAuth', {
                rules: [{
                  required: true,
                  message: '必须选择房产权限'
                }]
              })(
                <RadioGroup onChange={this.onHouseAuthChange.bind(this)} style={{ marginTop: 4 }} >
                  <Radio value={1}>全部房产</Radio>
                  <Radio value={2}>部分房产</Radio>
                  <Radio value={0}>无权限</Radio>
                </RadioGroup>
              )
            }
          </FormItem>


          {
            apartmentList.length > 0 ?
              <div className="container" style={{ maxHeight: 500, overflowY: 'scroll', border: '1px solid #ddd', width: 900, display: this.state.showHouseAuth ? 'block' : 'none' }}>
                <Row>
                  <Col offset={1}>
                    <Tree checkable defaultExpandAll={true} onCheck={this.onTreeCheck.bind(this)}>
                      {
                        apartmentList.map(({ houseId, houseName, buildings = [] }) =>
                          <TreeNode title={houseName} key={houseId}>
                            {
                              buildings.map(({ buildingId, buildingName, floors = [] }) =>
                                <TreeNode title={buildingName} key={buildingId}>
                                  {
                                    floors.map(({ floorId, floorName, rooms = [] }) =>
                                      <TreeNode className="custom-tree-parent-node" title={floorName} key={floorId}>
                                        {
                                          rooms.map(({ roomId, roomName }) =>
                                            <TreeNode className="custom-tree-child-node" key={`${houseId}|${buildingId}|${floorId}|${roomId}`} title={roomName} />
                                          )
                                        }
                                      </TreeNode>
                                    )
                                  }
                                </TreeNode>
                              )
                            }
                          </TreeNode>
                        )
                      }
                    </Tree>
                  </Col>
                </Row>
              </div> : null
          }

          <Row>
            <Col span={10} offset={3}>
              <Button type="primary" className="mr-20" htmlType="submit">保存</Button>
              <Button onClick={this.goBack.bind(this)}>取消</Button>
            </Col>
          </Row>
        </Form>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: params => dispatch(addUser(params)),
  fetchRoleList: params => dispatch(fetchRoleList(params)),
  fetchApartmentList: params => dispatch(fetchApartmentList(params))
})

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(AddUser)))