import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Form, Row, Col, Radio, DatePicker, Button, Table, Icon, Tooltip } from 'antd'


const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker

import { fetchNewsListData } from '../../actions/news'

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

class AudittingNews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: [1, 2, 3, 4],
      beginDate: null,
      endDate: null
    }
  }
  componentWillMount() {
    this.fetchNewsList()
  }

  onRadioGroupChange(e) {
    console.log('on radio group change -->', e)

    this.setState({
      state: [e.target.value]
    }, this.fetchNewsList)


  }

  onDatePickerChange(e, dataString) {
    console.log('date picker change -->', dataString)

    this.setState({
      beginDate: dataString[0],
      endDate: dataString[1]
    }, this.fetchNewsList)
  }

  fetchNewsList() {
    let { state, beginDate, endDate } = this.state

    var options = {}

    if (state != -1) {
      options.state = state
    }

    if (beginDate) {
      options.beginDate = beginDate
    }

    if (endDate) {
      options.endDate = endDate
    }

    console.log('options -->', options)

    this.props.fetchNewsList(options)
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

        let options = {
          check: {
            url: `/news-check?newsId=${encodeURIComponent(newsId)}`,
            text: '查看'
          },
          audit: {
            url: `/news-audit?newsId=${encodeURIComponent(newsId)}`,
            text: '审核'
          }
        }

        let isValidState = state >= 1 && state <= 4

        return (
          <span>
            {
              isValidState ?
                state == 1 ?
                  <Link to={options.audit.url}>
                    <Tooltip title={options.audit.text}>
                      <Icon type="file-text" className="mr-20 fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                    </Tooltip>
                  </Link>
                  :
                  <Link to={options.check.url}>
                    <Tooltip title={options.check.text}>
                      <Icon type="file-text" className="mr-20 fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
                    </Tooltip>
                  </Link>
                : null
            }

          </span>
        )
      }
    }]

    return (
      <div id="AudittingNews" className="container">
        <h3>
          <b>消息列表</b>
        </h3>

        <Form className="mb-20">
          <Row>
            <Col span={8}>
              <FormItem label="状态" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                <RadioGroup className="custom-radio-button-group" defaultValue="-1" onChange={this.onRadioGroupChange.bind(this)}>
                  <RadioButton value="-1">全部</RadioButton>
                  <RadioButton value="1">未审核</RadioButton>
                  <RadioButton value="2">审核通过</RadioButton>
                  <RadioButton value="3">审核不通过</RadioButton>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span={9} className="form-shim">
              <FormItem label="日期" labelCol={{ span: 3 }} wrapperCol={{ span: 18 }}>
                <RangePicker className="w-100" onChange={this.onDatePickerChange.bind(this)} placeholder={['开始日期', '结束日期']} />
              </FormItem>
            </Col>
            <Col offset={1} span={6} className="tr">
              <Link to="/news-add">
                <Button type="primary" >返回</Button>
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
  fetchNewsList: params => dispatch(fetchNewsListData(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AudittingNews))