import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Form, Row, Col, Radio, DatePicker, Button, Table, Icon, Tooltip } from 'antd'
import { fetchNewsList } from '../../../actions/news'
import isRequestSuccess from '../../../utils/isRequestSuccess.js'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker


const newsStateRefers = {
  0: '草稿',
  1: '待审核',
  2: '待发送',
  3: '审核不通过',
  4: '已发送',
  5: '删除',
  6: '平台审核中'
}

const newsPushTypeRefers = {
  1: '员工',
  2: '租客'
}

let columns = [{
  title: '创建时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '标题',
  key: 'newsTitle',
  dataIndex: 'newsTitle'
}, {
  title: '接受对象',
  key: 'pushType',
  dataIndex: 'pushType'
}, {
  title: '接收人',
  key: 'userNames',
  dataIndex: 'userNames'
}, {
  title: '创建人',
  key: 'userName',
  dataIndex: 'userName'
}, {
  title: '审核单位',
  key: 'auditName',
  dataIndex: 'auditName'
},
{
  title: '状态',
  key: 'state',
  dataIndex: 'state',
  render: state => <span>{newsStateRefers[state]}</span>
}, {
  title: '操作',
  key: 'actions',
  dataIndex: 'actions',
  render: ({ newsId, state }) =>
    <span>
      {
        state != 5 ?
          state == 1 ?
            <Link to={`/news-audit?newsId=${encodeURIComponent(newsId)}`}>审核</Link> :
            <Link to={`/news-check?newsId=${encodeURIComponent(newsId)}`}>查看</Link>
          : null
      }
    </span>
}]

class AudittingNews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: -1,

      beginDate: null,
      endDate: null,

      newsList: []
    }
  }

  componentWillMount() {
    this.filterdFetchNewsList()
  }

  onStateChange(e) {
    this.setState({
      state: e.target.value
    }, this.filterdFetchNewsList)
  }

  onDateChange(e, dataString) {
    this.setState({
      beginDate: dataString[0],
      endDate: dataString[1]
    }, this.filterdFetchNewsList)
  }

  filterdFetchNewsList() {
    let { state, beginDate, endDate } = this.state

    var params = {}

    params.state = state != -1 ? [state] : [1, 2, 3, 6]

    if (beginDate) {
      params.beginDate = beginDate
    }

    if (endDate) {
      params.endDate = endDate
    }

    console.log('params -->', params)

    this.props.fetchNewsList(params).then(ret => {
      let newsList = isRequestSuccess(ret) && ret.data.data.list || []

      this.setState({ newsList })
    })
  }

  render() {
    let dataSource = this.state.newsList.map(({
      newsTitle,
      pushType,
      userNames,
      state,
      createTime,
      userName,
      auditName,
      newsId
    }) => ({
      newsTitle,
      pushType: newsPushTypeRefers[pushType],
      userNames,
      userName,
      state,
      auditName,
      createTime,
      actions: {
        newsId,
        state
      }
    }))



    return (
      <div id="AudittingNews" className="container">
        <h3>
          <b>消息列表</b>
        </h3>

        <Form className="mb-20">
          <Row>
            <Col span={8}>
              <FormItem label="状态" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                <RadioGroup className="custom-radio-button-group" defaultValue="-1" onChange={this.onStateChange.bind(this)}>
                  <RadioButton value="-1">全部</RadioButton>
                  <RadioButton value="1">未审核</RadioButton>
                  <RadioButton value="2">审核通过</RadioButton>
                  <RadioButton value="3">审核不通过</RadioButton>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span={9} className="form-shim">
              <FormItem label="日期" labelCol={{ span: 3 }} wrapperCol={{ span: 18 }}>
                <RangePicker onChange={this.onDateChange.bind(this)} placeholder={['开始日期', '结束日期']} />
              </FormItem>
            </Col>
            <Col offset={1} span={6} className="tr">
              <Link to="/news-add">
                <Button type="primary" onClick={() => { this.props.history.goBack() }}>返回</Button>
              </Link>
            </Col>
          </Row>
        </Form>

        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchNewsList: params => dispatch(fetchNewsList(params))
})

export default withRouter(connect(null, mapDispatchToProps)(AudittingNews))