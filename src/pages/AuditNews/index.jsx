import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
import { Form, Button, Input, Row, Col, Tag } from 'antd'
import { auditNewsData, fetchNewsDetailData } from '../../actions/news';

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
  1: '审核中',
  2: '待发送',
  3: '审核不通过',
  4: '已发送',
  5: '删除',
  6: '平台审核中'
}

class AuditNews extends React.Component {
  componentWillMount() {

    var params = this.parseQueryToParams()

    console.log('params -->', params)

    this.props.fetchNewsDetail(params).then(() => {
      // this.props.auditNews(params)
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

  audit(state) {
    if (!state) {
      return
    }

    var auditRemark = this.props.form.getFieldValue('auditRemark').trim()
    var params = {
      newsId: this.props.newsDetail.newsId,
      audit: state
    }

    if (auditRemark) {
      params.auditRemark = auditRemark
    }

    console.log('params -->', params)

    this.props.auditNews(params)
  }

  render() {
    let { auditName, auditUserType, newsAbstract, newsContent, newsTitle, pushType, state, auditRemark, userNames, newsId } = this.props.newsDetail

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
              <Button type="primary" onClick={() => { this.props.history.goBack() }}>返回</Button>
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
                <Button type="primary" className="mr-20" htmlType="submit" onClick={this.audit.bind(this, 1)}>审核通过</Button>
                <Button type="danger" htmlType="submit" onClick={this.audit.bind(this, 2)}>审核不通过</Button>
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
                <b>接收人：</b>
              </Col>
              <Col className="gray" span={21}>
                {
                  (userNames || []).map((name, idx) => <Tag key={idx} className="mb-10" color="#2db7f5">{name}</Tag>)
                }
              </Col>
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

const mapStateToProps = state => ({
  newsDetail: state.newsDetail || {}
})
const mapDispatchToProps = dispatch => ({
  auditNews: params => dispatch(auditNewsData(params)),
  fetchNewsDetail: params => dispatch(fetchNewsDetailData(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AuditNews)))