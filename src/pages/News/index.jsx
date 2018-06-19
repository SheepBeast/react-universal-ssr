import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Radio, DatePicker, Button, Table, Icon, Tooltip } from 'antd'


const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

import { fetchNewsListData, deleteNews, sendNews } from '../../actions/news'

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
  componentWillMount() {
    this.props.fetchNewsList()
  }

  deleteNews(params) {
    this.props.deleteNews(params)
  }

  sendNews(params) {
    this.props.sendNews(params)
  }

  render() {

    console.log('news list -->', this.props.newsList)

    let dataSource = this.props.newsList.map(({
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
      render: state => {
        return (
          <span>{newsStateRefers[state]}</span>
        )
      }
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: ({ newsId, state }) => {
        var url = `/news-check?newsId=${encodeURIComponent(newsId)}`

        return (
          <span>
            {
              state != 0 ?
                <Link to={url}>
                  <Tooltip title="查看">
                    <Icon type="file-text" className="mr-20 fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                  </Tooltip>
                </Link>
                : null
            }
            {
              state == 0 || state == 3 ?
                <Link to={url}>
                  <Tooltip title="编辑">
                    <Icon type="file-text" className="mr-20 fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />

                  </Tooltip>
                </Link> : null
            }

            {
              state == 2 ?
                <a>
                  <Tooltip title="发送">
                    <Icon type="file-text" onClick={this.sendNews.bind(this, {newsId})} className="mr-20 fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />

                  </Tooltip>
                </a> : null
            }

            {
              state == 0 ?
                <a>
                  <Tooltip title="删除">
                    <Icon type="file-text" onClick={this.deleteNews.bind(this, { newsId })} className="mr-20 fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                  </Tooltip>
                </a>

                : null
            }
          </span>
        )
      }
    }]

    return (
      <div id="News" className="container">
        <h3>
          <b>消息列表</b>
        </h3>

        <Form className="mb-20">
          <Row>
            <Col span={8}>
              <FormItem label="房间状态" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                <RadioGroup className="custom-radio-button-group" defaultValue="0">
                  <RadioButton value="0">全部</RadioButton>
                  <RadioButton value="1">草稿</RadioButton>
                  <RadioButton value="2">审核中</RadioButton>
                  <RadioButton value="3">已发送</RadioButton>
                  <RadioButton value="4">审核不通过</RadioButton>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="接受对象" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                <RadioGroup className="custom-radio-button-group" defaultValue="0">
                  <RadioButton value="0">全部</RadioButton>
                  <RadioButton value="1">员工</RadioButton>
                  <RadioButton value="2">租客</RadioButton>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span={5} className="form-shim">
              <FormItem label="选择日期" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <DatePicker style={{ width: '100%' }} placeholder="请选择日期"></DatePicker>
              </FormItem>
            </Col>
            <Col span={6} className="tr">
              <Link to="/news-add">
                <Button type="primary" >新建</Button>
              </Link>
            </Col>
          </Row>
        </Form>

        <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newsList: state.newsList || []
})
const mapDispatchToProps = dispatch => ({
  fetchNewsList: params => dispatch(fetchNewsListData(params)),
  deleteNews: params => dispatch(deleteNews(params)),
  sendNews: params => dispatch(sendNews(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(News)