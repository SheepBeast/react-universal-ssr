import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, Row, Col, } from 'antd'
import { auditNewsData } from '../../actions/news';

const FormItem = Form.Item
const TextArea = Input.TextArea

class AuditNews extends React.Component {
  componentWillMount() {
    var params = {
      newsId: "ELtKgeFzI4w=",
      audit: 1
    }

    this.props.auditNews(params)
  }

  render() {
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
              <Button type="primary">返回</Button>
            </Col>
          </Row>

          <Form className="form-shim" style={{ width: 600 }}>
            <FormItem label="审核回复" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
              <TextArea placeholder="请进行审核回复" autosize={{ minRows: 6, maxRows: 6 }}></TextArea>
            </FormItem>

            <Row>
              <Col offset={4}>
                <Button type="primary" className="mr-20" htmlType="submit">审核通过</Button>
                <Button type="danger" htmlType="submit">审核不通过</Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="container">
          <div style={{ width: 600 }}>
            <Row className="mb-20">
              <Col span={3} className="">审核状态：</Col>
              <Col className="gray" span={21}>未审核</Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="">接收对象：</Col>
              <Col className="gray" span={21}>员工</Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="">接收人：</Col>
              <Col className="gray" span={21}>
                <Button type="primary" className="mr-20">张三</Button>
                <Button type="primary" className="mr-20">张三</Button>
                <Button type="primary" className="mr-20">张三</Button>
              </Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="">标题：</Col>
              <Col className="gray" span={21}>收租通知</Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="">摘要：</Col>
              <Col className="gray" span={21}>ddkashakhkahdsihaibvebiiiii 沉浸在看下好好看这些就会看到哈哈 hi 合适爱好很长时间啊哈夫IE有求必应 v过 顾问UI   尽最大厚度互动直播学霸妹子们Z麻醉机的护肤后回复时间会把半死的v 撒娇过程设计的好伙伴简直比速滑 湖底啊吧</Col>
            </Row>

            <Row className="mb-20">
              <Col span={3} className="">正文：</Col>
              <Col className="gray" span={21}>ddkashakhkahdsihaibvebiiiii 沉浸在看下好好看这些就会看到哈哈 hi 合适爱好很长时间啊哈夫IE有求必应 v过 顾问UI   尽最大厚度互动直播学霸妹子们Z麻醉机的护肤后回复时间会把半死的v 撒娇过程设计的好伙伴简直比速滑 湖底啊吧ddkashakhkahdsihaibvebiiiii 沉浸在看下好好看这些就会看到哈哈 hi 合适爱好很长时间啊哈夫IE有求必应 v过 顾问UI   尽最大厚度互动直播学霸妹子们Z麻醉机的护肤后回复时间会把半死的v 撒娇过程设计的好伙伴简直比速滑 湖底啊吧ddkashakhkahdsihaibvebiiiii 沉浸在看下好好看这些就会看到哈哈 hi 合适爱好很长时间啊哈夫IE有求必应 v过 顾问UI   尽最大厚度互动直播学霸妹子们Z麻醉机的护肤后回复时间会把半死的v 撒娇过程设计的好伙伴简直比速滑 湖底啊吧</Col>
            </Row>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  auditNews: params => dispatch(auditNewsData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditNews)