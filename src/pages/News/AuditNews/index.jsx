import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
import { Form, Button, Input, Row, Col, Tag, message } from 'antd'
import { auditNews, fetchNewsDetail } from '../../../actions/news';
import parseQueryToParams from '../../../utils/parseQueryToParams'
import isRequestSuccess from '../../../utils/isRequestSuccess';

const FormItem = Form.Item
const TextArea = Input.TextArea


const auditUserTypeRefers = {
  1: '超级管理员',
  2: '慧享平台',
  3: '公寓方'
}

const newsPushTypeRefers = {
  1: '员工',
  2: '租客'
}

const newsStateRefers = {
  0: '草稿',
  1: '待审核',
  2: '待发送',
  3: '审核不通过',
  4: '已发送',
  5: '删除',
  6: '平台审核中'
}

class AuditNews extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newsDetail: {}
    }
  }

  componentWillMount() {

    var params = parseQueryToParams(this.props.location.search)

    console.log('params -->', params)

    this.props.fetchNewsDetail(params).then(ret => {
      var newsDetail = isRequestSuccess(ret) && ret.data.data || {}

      this.setState({ newsDetail })
    })
  }


  auditNews(state) {
    var auditRemark = this.props.form.getFieldValue('auditRemark')

    if (auditRemark) {
      console.log('audit remark -->', auditRemark)
      auditRemark = auditRemark.trim()
    }

    var params = {
      newsId: this.state.newsDetail.newsId,
      audit: state,
      auditRemark
    }

    console.log('params -->', params)

    this.props.auditNews(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('审核成功')
        this.goBack()
      } else {
        message.error(`审核失败，${ret.data.reason}`)
      }
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    let { auditName, auditUserType, newsAbstract, newsContent, newsTitle, pushType, state, auditRemark, newsId } = this.state.newsDetail

    const { getFieldDecorator } = this.props.form

    return (
      <div id="AuditNews">
        <div className="container">
          <Row>
            <Col span={12}>
              <h3>
                <b>审核消息</b>
              </h3>
            </Col>
            <Col className="tr" span={12}>
              <Button type="primary" onClick={this.goBack.bind(this)}>返回</Button>
            </Col>
          </Row>

          <Form className="form-shim" style={{ width: 600 }}>
            <FormItem label="审核回复" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
              {
                getFieldDecorator('auditRemark')(
                  <TextArea placeholder="请进行审核回复" autosize={{ minRows: 6, maxRows: 6 }} />
                )
              }

            </FormItem>

            <Row>
              <Col offset={4}>
                <Button type="primary" className="mr-20" onClick={this.auditNews.bind(this, 1)}>审核通过</Button>
                <Button type="danger" onClick={this.auditNews.bind(this, 2)}>审核不通过</Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="container">
          <div style={{ width: 600 }}>
            <Row className="mb-20">
              <Col span={3} className="tr">
                <b>审核状态：</b>
              </Col>
              <Col className="gray" span={21}>{newsStateRefers[state]}</Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="tr">
                <b>接收对象：</b>
              </Col>
              <Col className="gray" span={21}>{newsPushTypeRefers[pushType]}</Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="tr">
                <b>标题：</b>
              </Col>
              <Col className="gray" span={21}>{newsTitle}</Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="tr">
                <b>摘要：</b>
              </Col>
              <Col className="gray" span={21}>{newsAbstract}</Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="tr">
                <b>正文：</b>
              </Col>
              <Col className="gray" span={21} dangerouslySetInnerHTML={{ __html: newsContent }} />
            </Row>
          </div>

        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  auditNews: params => dispatch(auditNews(params)),
  fetchNewsDetail: params => dispatch(fetchNewsDetail(params))
})

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(AuditNews)))