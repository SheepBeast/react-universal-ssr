import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Radio, DatePicker, Button, Table, message } from 'antd'


const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker

import { fetchNewsList, deleteNews, sendNews } from '../../../actions/news'
import isRequestSuccess from '../../../utils/isRequestSuccess';

// 0 修改、删除、提交
// 1 不可修改 不可删除
// 2 不可修改 可删除 可发送
// 3 可修改 可提审 可删除
// 4 不可发送 不可修改 可删除 不可审核
// 5 不可显示

const newsStateRefers = {
  0: '草稿',
  1: '审核中',
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

class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newsList: [],

      state: -1,
      pushType: -1,
      beginDate: null,
      endDate: null
    }
  }

  componentWillMount() {
    this.filteredFetchNewsList()
  }

  deleteNews(params) {
    this.props.deleteNews(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('消息删除成功')
        this.filteredFetchNewsList()
      } else {
        message.error(`消息删除失败，${ret.data.reason}`)
      }
    })
  }

  sendNews(params) {
    this.props.sendNews(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('消息发送成功')
        this.filteredFetchNewsList()
      } else {
        message.error(`消息发送失败，${ret.data.reason}`)
      }
    })
  }

  filteredFetchNewsList() {
    let { state, pushType, beginDate, endDate } = this.state

    var params = {}

    params.state = state == -1 ? [0, 1, 2, 3, 4, 6] : [state]

    if (pushType != -1) {
      params.pushType = pushType
    }

    if (beginDate) {
      params.beginDate = beginDate
    }

    if (endDate) {
      params.endDate = endDate
    }

    this.props.fetchNewsList(params).then(ret => {
      let newsList = isRequestSuccess(ret) && ret.data.data.list || []

      this.setState({ newsList })
    })
  }

  onStateChange(e) {
    this.setState({
      state: e.target.value
    }, () => {
      this.filteredFetchNewsList()
    })
  }

  onPushTypeChange(e) {
    this.setState({
      pushType: e.target.value
    }, () => {
      this.filteredFetchNewsList()
    })
  }

  onPeriodChange(e, selectedDate) {
    var [beginDate, endDate] = selectedDate

    var date = {}

    if (beginDate) {
      date.beginDate = beginDate
    }

    if (endDate) {
      date.endDate = endDate
    }

    this.setState(date, () => {
      this.filteredFetchNewsList()
    })
  }

  render() {
    var pageRolesRefer = this.props.pageRolesRefer

    let dataSource = this.state.newsList.map(({
      newsTitle,
      pushType,
      state,
      createTime,
      userName,
      auditName,
      newsId
    }) => ({
      newsTitle,
      pushType: newsPushTypeRefers[pushType],
      userName,
      state,
      auditName,
      createTime,
      actions: {
        newsId,
        state
      }
    }))

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
      render: state => {
        return (
          <span>{newsStateRefers[state]}</span>
        )
      }
    },
    {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: ({ newsId, state }) => {
        if (state == 5) {
          return null
        }

        var checkBtn = <Link className="mr-20" to={`/news-check?newsId=${encodeURIComponent(newsId)}`}>查看</Link>

        var editBtn = null
        if (pageRolesRefer['msgManage-modify'] && (state == 0 || state == 3)) {
          var editBtn = <Link className="mr-20" to={`/news-edit?newsId=${encodeURIComponent(newsId)}`}>编辑</Link>
        }

        var sendBtn = null
        if (pageRolesRefer['msgManage-send'] && state == 2) {
          sendBtn = <a className="mr-20" onClick={this.sendNews.bind(this, { newsId })}>发送</a>
        }

        var delBtn = null
        if (pageRolesRefer['msgManage-delete'] && (state == 0 || state == 2 || state == 3)) {
          delBtn = <a onClick={this.deleteNews.bind(this, { newsId: [newsId] })}>删除</a>
        }

        return <span>
          {checkBtn}
          {editBtn}
          {sendBtn}
          {delBtn}
        </span>
      }
    }]

    return (
      <div id="News" className="container">
        <h3>
          <b>消息列表</b>
        </h3>

        <Form className="mb-20">
          <Row>
            <Col span={9}>
              <FormItem label="状态" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                <RadioGroup className="custom-radio-button-group" defaultValue="-1" onChange={this.onStateChange.bind(this)}>
                  <RadioButton value="-1">全部</RadioButton>
                  <RadioButton value="0">草稿</RadioButton>
                  <RadioButton value="1">审核中</RadioButton>
                  <RadioButton value="2">待发送</RadioButton>
                  <RadioButton value="3">审核不通过</RadioButton>
                  <RadioButton value="4">已发送</RadioButton>
                  {/* <RadioButton value="5">删除</RadioButton> */}
                </RadioGroup>
              </FormItem>
            </Col>
            <Col offset={1} span={5}>
              <FormItem label="接受对象" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                <RadioGroup className="custom-radio-button-group" defaultValue="-1" onChange={this.onPushTypeChange.bind(this)}>
                  <RadioButton value="-1">全部</RadioButton>
                  <RadioButton value="1">员工</RadioButton>
                  <RadioButton value="2">租客</RadioButton>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span={5} className="form-shim">
              <FormItem label="选择日期" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <RangePicker placeholder={['起始日期', '结束日期']} onChange={this.onPeriodChange.bind(this)} />
              </FormItem>
            </Col>
            <Col span={4} className="tr">
              {
                pageRolesRefer['msgManage-add'] ?
                  <Link to="/news-add">
                    <Button type="primary">添加消息</Button>
                  </Link> : null
              }
            </Col>
          </Row>
        </Form>

        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pageRolesRefer: state.pageRolesRefer || {}
})

const mapDispatchToProps = dispatch => ({
  fetchNewsList: params => dispatch(fetchNewsList(params)),
  deleteNews: params => dispatch(deleteNews(params)),
  sendNews: params => dispatch(sendNews(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(News)