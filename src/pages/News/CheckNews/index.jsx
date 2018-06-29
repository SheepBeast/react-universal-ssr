import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
import { Form, Button, Input, Row, Col, Divider, Tag } from 'antd'
import { fetchNewsDetail } from '../../../actions/news';
import isRequestSuccess from '../../../utils/isRequestSuccess.js'
import parseQueryToParams from '../../../utils/parseQueryToParams.js'

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

class CheckNews extends React.Component {
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


  render() {
    let { auditName, auditUserType, newsAbstract, newsContent, newsTitle, pushType, state, auditRemark, userNames = [], newsId } = this.state.newsDetail

    return (
      <div id="CheckNews">

        <div className="container">
          <Row>
            <Col span={12}>
              <h3>
                <b>查看消息</b>
              </h3>
            </Col>
            <Col className="tr" span={12}>
              <Button type="primary" onClick={() => { this.props.history.goBack() }}>返回</Button>
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={18}>
              <div style={{ width: 600 }}>
                <Row className="mb-20">
                  <Col span={3} className="tr">
                    <b>审核状态：</b>
                  </Col>
                  <Col className="gray" span={21}>{newsStateRefers[state]}</Col>
                </Row>

                <Row className="mb-20">
                  <Col span={3} className="tr">
                    <b>审核单位：</b>
                  </Col>
                  <Col className="gray" span={21}>{auditUserTypeRefers[auditUserType]}</Col>
                </Row>

                <Row className="mb-20">
                  <Col span={3} className="tr">
                    <b>审核人：</b>
                  </Col>
                  <Col className="gray" span={21}>{auditName}</Col>
                </Row>

                <Row className="mb-20">
                  <Col span={3} className="tr">
                    <b>审核回复：</b>
                  </Col>
                  <Col className="gray" span={21}>{auditRemark}</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        <div className="container">
          <div style={{ width: 600 }}>
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
                  userNames.map((name, idx) => <Tag key={idx} className="mb-10" color="#2db7f5">{decodeURIComponent(name.replace('EMOJI_URLENCODE=', ''))}</Tag>)
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

const mapDispatchToProps = dispatch => ({
  fetchNewsDetail: params => dispatch(fetchNewsDetail(params))
})

export default withRouter(connect(null, mapDispatchToProps)(CheckNews))