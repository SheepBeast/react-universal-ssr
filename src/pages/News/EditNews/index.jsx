import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Row, Col, Select, Checkbox, Input, Form, Button, message } from 'antd'

import SimditorTextArea from '../../../components/Simditor/index'
import { editNews, submitNews, fetchNewsDetail } from '../../../actions/news'
import { fetchUserList } from '../../../actions/user';
import isRequestSuccess from '../../../utils/isRequestSuccess';
import parseQueryToParams from '../../../utils/parseQueryToParams'

const FormItem = Form.Item
const Option = Select.Option
const CheckBoxGroup = Checkbox.Group
const TextArea = Input.TextArea

var currentNewsId = null

class EditNews extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // userList: [],
      newDetail: {}
    }

    this.editor = null
  }

  componentDidMount() {
    var params = parseQueryToParams(this.props.location.search)

    currentNewsId = params.newsId

    let p1 = this.props.fetchUserList({ state: 1 }),
      p2 = this.props.fetchNewsDetail(params)

    Promise.all([p1, p2]).then(ret => {
      var userList = isRequestSuccess(ret[0]) && ret[0].data.data.list || {},
        newsDetail = isRequestSuccess(ret[1]) && ret[1].data.data || {}

      // console.log('news detail -->', newsDetail)

      this.setState({ userList }, () => {
        var { pushType, newsTitle, newsAbstract, newsContent } = newsDetail

        this.props.form.setFieldsValue({
          pushType,
          newsTitle,
          newsAbstract,
          newsContent
        })

        this.editor && this.editor.setValue(newsContent)
      })
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  submit(options) {
    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log('val -->', val)
        var params = { ...val, ...options, newsId: currentNewsId }

        this.props.editNews(params).then(ret => {
          if (isRequestSuccess(ret)) {
            message.success('提交成功')
            this.goBack()
          } else {
            message.error(`提交失败，${ret.data.reason}`)
          }
        })
      }
    })
  }

  onTextAreaChange(newsContent) {
    this.props.form.setFieldsValue({ newsContent })
  }

  onSimditorTextAreaInit(editor) {
    this.editor = editor
  }

  render() {
    // var options = this.state.userList.map(({ userName, userId }) => ({ label: userName, value: userId }))

    let { getFieldDecorator } = this.props.form

    return (
      <div id="EditNews" className="container">
        <Row>
          <Col span={12}>
            <h3>
              <b>新建消息</b>
            </h3>
          </Col>
          <Col className="tr" span={12}>
            <Button type="primary" onClick={this.goBack.bind(this)}>返回</Button>
          </Col>
        </Row>

        <Form className="form-shim" style={{ width: 600 }}>
          <FormItem label="接收对象" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
            {
              getFieldDecorator('pushType')(
                <Select placeholder="接受类型" style={{ width: 100 }}>
                  <Option value="1">员工</Option>
                  <Option value="2">租客</Option>
                </Select>
              )
            }
          </FormItem>

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
            <SimditorTextArea id="newsContent" onInit={this.onSimditorTextAreaInit.bind(this)} onChange={this.onTextAreaChange.bind(this)} />
            {
              getFieldDecorator('newsContent', {
                rules: [{
                  required: true,
                  message: '正文不能为空'
                }]
              })(
                <TextArea style={{ display: 'none' }} />
              )
            }
          </FormItem>

          <Row>
            <Col offset={3}>
              <Button type="primary" className="mr-20" onClick={this.submit.bind(this, { saveType: 2 })}>提交</Button>
              <Button className="mr-20" onClick={this.submit.bind(this, { saveType: 1 })}>保存为草稿</Button>
              <Button onClick={this.goBack.bind(this)}>取消</Button>
            </Col>
          </Row>

          <br />
          <br />
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editNews: params => dispatch(editNews(params)),
  fetchUserList: params => dispatch(fetchUserList(params)),
  fetchNewsDetail: params => dispatch(fetchNewsDetail(params)),
  submitNews: params => dispatch(submitNews(params))
})

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(EditNews)))