import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Row, Col, Select, Checkbox, Input, Form, Button } from 'antd'
import SimditorTextarea from '../../components/Simditor'


import { addNewsData, submitNews } from '../../actions/news'
import { fetchUserListData } from '../../actions/user';
// import { fetchTenantListData } from '../../actions/tenant';

const FormItem = Form.Item
const Option = Select.Option
const CheckBoxGroup = Checkbox.Group
const TextArea = Input.TextArea

class AddNews extends React.Component {

  componentWillMount() {


    // this.props.fetchTenantList()
    this.props.fetchUserList({ state: 1 })
    // .then(() => {
    //   var params = {
    //     newsTitle: '新闻标题',
    //     pushType: 1,
    //     userId: 'HDwF6ivba80=',
    //     newsAbstract: '消息摘要',
    //     newsContent: '正文',
    //     saveType: 2
    //   }
    //   this.props.addNews(params)
    // })
  }

  goBack() {
    this.props.history.goBack()
  }

  submit(saveType) {

    console.log('saveType -->', saveType)

    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log('val -->', val)
        val.saveType = saveType

        this.props.addNews(val)
      }
    })
  }

  onInit(editor) {
    this.editor = editor
  }

  onTextAreaChange(content) {
    this.props.form.setFieldsValue({
      newsContent: content
    })
  }

  render() {
    var options = this.props.userList.map(({ userName, userId }) => {
      return {
        label: userName,
        value: userId
      }
    })

    let { getFieldDecorator } = this.props.form

    return (
      <div id="AddNews" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>新建消息</b>
            </h3>
          </Col>
          <Col className="tr" span={12}>
            <Button type="primary" onClick={() => { this.goBack() }}>返回</Button>
          </Col>
        </Row>

        <Form className="form-shim" style={{ width: 600 }}>
          <FormItem label="接收对象" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            {
              getFieldDecorator('pushType')(
                <Select style={{ width: 100 }} defaultValue="1">
                  <Option value="1">员工</Option>
                  <Option value="2">租客</Option>
                </Select>
              )
            }
          </FormItem>

          {
            options.length > 0 ?
              <FormItem label="接收人" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                {
                  getFieldDecorator('userId', {
                    rules: [{
                      required: true,
                      message: '必须选择至少一个接收人'
                    }]
                  })(
                    <CheckBoxGroup style={{ lineHeight: '32px' }} options={options} />
                  )
                }
              </FormItem>
              : null
          }



          <FormItem label="标题" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            {
              getFieldDecorator('newsTitle', {
                rules: [{
                  required: true,
                  message: '标题不能为空'
                }]
              })(
                <Input placeholder="请输入标题" />
              )
            }
          </FormItem>

          <FormItem label="摘要" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            {
              getFieldDecorator('newsAbstract', {
                rules: [{
                  required: true,
                  message: '摘要不能为空'
                }]
              })(
                <TextArea autosize={{ minRows: 6, maxRows: 6 }} />
              )
            }
          </FormItem>

          <FormItem label="正文" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            {/* {
              getFieldDecorator('newsContent', {
                rules: [{
                  required: true,
                  message: '正文不能为空'
                }]
              })(
                <TextArea autosize={{ minRows: 12, maxRows: 12 }} />
              )
            } */}
            <SimditorTextarea id="newsContent" onInit={this.onInit.bind(this)} onChange={this.onTextAreaChange.bind(this)} />
            {
              getFieldDecorator('newsContent', {
                rules: [{
                  required: true,
                  message: '正文不能为空'
                }],
              })(
                <TextArea style={{display: 'none'}} />
              )
            }
          </FormItem>

          <Row>
            <Col offset={3}>
              <Button type="primary" className="mr-20" onClick={this.submit.bind(this, 2)}>提交</Button>
              <Button className="mr-20" onClick={this.submit.bind(this, 1)}>保存为草稿</Button>
              <Button onClick={() => { this.goBack() }}>取消</Button>
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
  // fetchTenantList: params => dispatch(fetchTenantListData(params)),
  submitNews: params => dispatch(submitNews(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddNews)))