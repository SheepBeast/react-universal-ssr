import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Select, Checkbox, Input, Form, Button } from 'antd'

import { addNewsData } from '../../actions/news'
import { fetchUserListData } from '../../actions/user';
import { fetchTenantListData } from '../../actions/tenant';

const FormItem = Form.Item
const Option = Select.Option
const CheckBoxGroup = Checkbox.Group
const TextArea = Input.TextArea

class AddNews extends React.Component {
  componentWillMount() {


    // this.props.fetchTenantList()
    this.props.fetchUserList({ state: 1 }).then(() => {
      var params = {
        newsTitle: '新闻标题',
        pushType: 1,
        userId: 'HDwF6ivba80=',
        newsAbstract: '消息摘要',
        newsContent: '正文',
        saveType: 2
      }
      this.props.addNews(params)
    })
  }

  render() {
    var options = this.props.userList.map(({ userName, userId }) => {
      return {
        label: userName,
        value: userId
      }
    })

    return (
      <div id="AddNews" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>新建消息</b>
            </h3>
          </Col>
          <Col className="tr" span={12}>
            <Button type="primary">返回</Button>
          </Col>
        </Row>

        <Form className="form-shim" style={{ width: 600 }}>
          <FormItem label="接收对象" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            <Select style={{width: 100}} defaultValue="0">
              <Option value="0">员工</Option>
              <Option value="1">租客</Option>
            </Select>
          </FormItem>

          <FormItem label={
            <span>
              <b className="danger">*</b>
              &nbsp;接收人
              </span>
          } labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            <CheckBoxGroup style={{ lineHeight: '32px' }} options={options}></CheckBoxGroup>
          </FormItem>

          <FormItem label={
            <span>
              <b className="danger">*</b>
              &nbsp;标题
              </span>
          } labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            <Input placeholder="请输入标题"></Input>
          </FormItem>

          <FormItem label={
            <span>
              <b className="danger">*</b>
              &nbsp;摘要
              </span>
          } labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            <TextArea autosize={{ minRows: 6, maxRows: 6 }} />
          </FormItem>

          <FormItem label={
            <span>
              <b className="danger">*</b>
              &nbsp;正文
              </span>
          } labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            <TextArea autosize={{ minRows: 12, maxRows: 12 }} />
          </FormItem>

          <Row>
            <Col offset={3}>
              <Button type="primary" className="mr-20">提交</Button>
              <Button className="mr-20">保存为草稿</Button>
              <Button>取消</Button>
            </Col>
          </Row>

          <br />
          <br />
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userList: state.userList || [],
  tenantList: state.tenantList || []
})
const mapDispatchToProps = dispatch => ({
  addNews: params => dispatch(addNewsData(params)),
  fetchUserList: params => dispatch(fetchUserListData(params)),
  fetchTenantList: params => dispatch(fetchTenantListData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNews)