import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Divider, Form, Input, Row, Col, Button, Radio, Tree } from 'antd'

const FormItem = Form.Item
const TextArea = Input.TextArea
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group

import './index.less'
import { addUserData } from '../../actions/user';
import { isMobile, isEmail } from '../../constants/regexp';
import { fetchRoleListData } from '../../actions/role';
import { fetchApartmentListData } from '../../actions/property';

class AddUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedKeys: [],
      showHouseAuth: false
    }
  }
  componentWillMount() {
    this.props.fetchRoleList({
      flag: 'role-add',
      state: 1
    })

    this.props.fetchApartmentList()
  }

  onCheck(selectedKeys, e) {
    console.log('keys -->', selectedKeys)
    console.log('e -->', e)

    this.setState({
      selectedKeys
    })
  }

  onHouseAuthChange(e) {
    console.log('e -->', e)

    this.setState({
      showHouseAuth: e.target.value == 2
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.form.validateFields((err, val) => {
      if (!err) {
        let { userName, phoneNo, email, userAccount, password, roleId, houseAuth } = val

        console.log('val -->', val)

        let options = {
          userAccount,
          userName,
          phoneNo,
          password

        }

        if (email) {
          options.eMail = email
        }

        if (roleId) {
          options.roleId = roleId
        }

        if (houseAuth == 2) {
          let keys = this.state.selectedKeys

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
            options.houses = houses
          }
        }

        console.log('options -->', options)

        this.props.addUser(options)

      }
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form
    const apartmentList = this.props.apartmentList

    console.log('apartment list -->', apartmentList)

    return (
      <div id="AddUser" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>增加租客</b>
            </h3>
          </Col>
          <Col className="tr" span={12}>
            <Button type="primary" onClick={this.props.history.goBack}>返回</Button>
          </Col>
        </Row>

        <br />
        <Form className="form-shim" style={{ width: 620 }} onSubmit={this.onSubmit.bind(this)}>
          <FormItem label="姓名" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            {
              getFieldDecorator('userName', {
                rules: [{
                  required: true,
                  message: '姓名不能为空'
                }],
                initialValue: '邓展华'
              })(
                <Input placeholder="请输入员工姓名" />
              )
            }
          </FormItem>

          <FormItem label="手机号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
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
                initialValue: '13802402735',
                validateFirst: true
              })(
                <Input type="number" maxLength="11" placeholder="请输入员工手机号" />
              )
            }
          </FormItem>

          <FormItem label="邮箱" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            {
              getFieldDecorator('email', {
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
                initialValue: '384925935@qq.com',
                validateFirst: true
              })(
                <Input placeholder="请输入员工邮箱" />
              )
            }
          </FormItem>

          <FormItem label="账号" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
            {
              getFieldDecorator('userAccount', {
                rules: [{
                  required: true,
                  message: '账号不能为空'
                }],
                initialValue: 'dzh384925935'
              })(
                <Input placeholder="请输入员工的账号，确认后不可修改" />
              )
            }
          </FormItem>

          <FormItem label="密码" labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} >
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
                initialValue: 'asd751011568',
                validateFirst: true
              })(
                <Input placeholder="请输入登录密码"></Input>
              )
            }
          </FormItem>

          <FormItem label="角色" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
            {
              getFieldDecorator('roleId')(
                <RadioGroup style={{ marginTop: 4 }}>
                  {
                    this.props.roleList.map(({ roleId, roleName }) =>
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
                }],
                initialValue: 1
              })(
                <RadioGroup onChange={this.onHouseAuthChange.bind(this)} style={{ marginTop: 4 }} >
                  <Radio value={1}>全部房产</Radio>
                  <Radio value={2}>部分房产</Radio>
                  <Radio value={3}>无权限</Radio>
                </RadioGroup>
              )
            }
          </FormItem>


          {
            apartmentList.length > 0 ?
              <div className="container" style={{ maxHeight: 500, overflowY: 'scroll', border: '1px solid #ddd', width: 900, display: this.state.showHouseAuth ? 'block' : 'none' }}>
                <Row>
                  <Col offset={1}>
                    <Tree checkable defaultExpandAll={true} onCheck={this.onCheck.bind(this)}>
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
              </div>

              : null
          }


          <Row>
            <Col span={10} offset={3}>
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
  usableRoleList: state.usableRoleList || [],
  apartmentList: state.apartmentList || []
})
const mapDispatchToProps = dispatch => ({
  addUser: params => dispatch(addUserData(params)),
  fetchRoleList: params => dispatch(fetchRoleListData(params)),
  fetchApartmentList: params => dispatch(fetchApartmentListData(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddUser)))