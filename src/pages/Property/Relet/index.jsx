import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import qs from 'querystring'
import { Divider, Form, Input, Select, Row, Col, Button } from 'antd'

import { fetchTenantDetail, updateTenancy } from '../../../actions/tenant';

const FormItem = Form.Item
const Option = Select.Option

class Relet extends React.Component {
  parseQueryToParams() {
    let search = this.props.location.search.replace('?', ''), k, params = {}
    search = qs.parse(search)

    for (k in search) {
      params[k] = decodeURIComponent(search[k])
    }

    return params
  }

  onSubmit(){

  }


  render() {
    return (
      <div id="Relet" className="container">
        <Form style={{ width: '50%' }}>
          <h3>
            <b>当前</b>
          </h3>
          <FormItem label="合约到期日" labelCol={{ span: 3 }} wrapperCol={{ span: 8 }}>
            <span style={{lineHeight: '31px'}}>
              <b>2019-06-23</b>
            </span>
          </FormItem>

          <h3>
            <b>调整</b>
          </h3>
          <FormItem label="续约时长" labelCol={{ span: 3 }} wrapperCol={{ span: 8 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Select defaultValue="1">
                  <Option value="1">1</Option>
                </Select>
              </Col>
              <Col span={12}>
                <Select defaultValue="1">
                  <Option value="1">年</Option>
                  <Option value="2">月</Option>
                  <Option value="3">日</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>

          <h3>
            <b>调整后</b>
          </h3>
          <FormItem label="合约到租日" labelCol={{ span: 3 }} wrapperCol={{ span: 8 }}>
            <Input placeholder="2012-08-21" disabled={true} />
          </FormItem>

          <div>
            <Button type="primary" htmlType="submit" className="mr-30" style={{ width: 84 }} >保存</Button>
            <Button style={{ width: 84 }}>取消</Button>
          </div>
        </Form>

      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  fetchTenantDetail: params => dispatch(fetchTenantDetail(params)),
  updateTenancy: params => dispatch(updateTenancy(params))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Form.create()(Relet)))