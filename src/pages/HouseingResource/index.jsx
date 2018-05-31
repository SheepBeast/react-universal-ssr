import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Radio, Form, Icon, Button, Avatar, Row, Col, Input, Select, Switch, Upload, Modal, Checkbox, Card, Divider } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const CheckBoxGroup = Checkbox.Group
const Option = Select.Option

import './index.less'

class HousingResource extends Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  toggleModal() {
    this.setState({
      visible: !this.state.visible
    })
  }
  render() {
    const plainOptions = [
      'Apple', 'Pear', 'Orange',
      'Apple', 'Pear', 'Orange',
      'Apple', 'Pear', 'Orange',
      'Apple', 'Pear', 'Orange',
      'Apple', 'Pear', 'Orange',
      'Apple', 'Pear', 'Orange',
      'Apple', 'Pear', 'Orange',
      'Apple', 'Pear', 'Orange'
    ]
    return (
      <div id="HousingResource">
        <Form id="filter-form" className="mb-20">
          <FormItem label="公寓名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            <RadioGroup defaultValue="0">
              <RadioButton value="0">慧享公寓</RadioButton>
              <RadioButton value="1">无与伦比公寓</RadioButton>
              <RadioButton value="2">创越时代公寓</RadioButton>
              <RadioButton value="3">慧享公寓</RadioButton>
              <RadioButton value="4">无与伦比公寓</RadioButton>
              <RadioButton value="5">创越时代公寓</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem label="楼栋名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            <RadioGroup defaultValue="0">
              <RadioButton value="0">东塔</RadioButton>
              <RadioButton value="1">东塔</RadioButton>
              <RadioButton value="2">西塔</RadioButton>
              <RadioButton value="3">南塔</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem label="楼层名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            <div className="radio-group-pagination">
              <span className="prev-button">
                <Icon type="left" />
              </span>
              <div className="radio-group-container">
                <RadioGroup defaultValue="0">
                  <RadioButton value="0">全部</RadioButton>
                  <RadioButton value="1">1楼</RadioButton>
                  <RadioButton value="2">2楼</RadioButton>
                  <RadioButton value="3">3楼</RadioButton>
                  <RadioButton value="4">4楼</RadioButton>
                  <RadioButton value="5">5楼</RadioButton>
                  <RadioButton value="6">6楼</RadioButton>
                  <RadioButton value="7">7楼</RadioButton>
                  <RadioButton value="8">8楼</RadioButton>
                  <RadioButton value="9">9楼</RadioButton>
                  <RadioButton value="10">10楼</RadioButton>
                </RadioGroup>
              </div>
              <span className="next-button">
                <Icon type="right" />
              </span>
            </div>

          </FormItem>

          <FormItem label="房间状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            <RadioGroup defaultValue="0">
              <RadioButton value="0">全部</RadioButton>
              <RadioButton value="1">入住</RadioButton>
              <RadioButton value="2">闲置</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem label="楼栋名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            <RadioGroup defaultValue="0">
              <RadioButton value="0">全部</RadioButton>
              <RadioButton value="1">正常</RadioButton>
              <RadioButton value="2">异常</RadioButton>
            </RadioGroup>
          </FormItem>
        </Form>

        <div style={{ padding: 30, backgroundColor: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 100, height: 100 }} className="mr-30">
              <Avatar style={{ width: 100, height: 100, borderRadius: '50%' }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" />
            </div>
            <div style={{ flexGrow: 1 }}>
              <h3>
                <b>慧享公寓</b>
              </h3>
              <span style={{ color: 'gray' }}>已租200套&nbsp;&nbsp;闲置40套</span>
            </div>
            <div style={{ width: 210 }} >
              <Button type="primary" className="mr-30">添加账号</Button>
              <Button type="primary">删除房产</Button>
            </div>
          </div>
          <Divider></Divider>
          <Row gutter={8}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
              <Col span={4} className="mb-20" >
                <Card actions={['file-text', 'form', 'select', 'tag-o'].map((type) => <Icon type={type} />)}>
                  <div className="tc">
                    <Avatar style={{ width: 100, height: 100, borderRadius: '50%' }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" className="mb-20"></Avatar>
                    <h3 className="mb-20">AVC1908房</h3>
                    <h3>闲置</h3>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* <Modal title="添加房产" visible={false}>
          <Form>
            <FormItem label="房产" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input placeholder="请输入房产名称"></Input>
            </FormItem>

            <FormItem label="房产类型" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Select defaultValue="1">
                <Option value="1">请选择房产类型</Option>
              </Select>
            </FormItem>

            <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Upload>
                <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#eee', border: '1px dashed #ddd' }} >
                  <Icon type={this.state.loading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </FormItem>

            <FormItem label="房号" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              批量添加：<Switch defaultChecked></Switch>
            </FormItem>
          </Form>
        </Modal>

        <Modal title="批量添加房产" visible={false}>
          <Form>
            <FormItem label="公寓名称" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input></Input>
            </FormItem>

            <FormItem label="楼栋数量" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input></Input>
            </FormItem>

            <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Upload>
                <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#eee', border: '1px dashed #ddd' }} >
                  <Icon type={this.state.loading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </FormItem>

            <FormItem label="房号" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              批量添加：<Switch></Switch>
            </FormItem>
          </Form>
        </Modal>

        <Modal title="批量添加房产" visible={false}>
          <Form>
            <FormItem label="楼栋名称" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input defaultValue="A1"></Input>
            </FormItem>

            <FormItem label="楼栋地址" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Row gutter={16}>
                <Col span={8}>
                  <Input></Input> 省
                </Col>
                <Col span={8}>
                  <Input></Input> 市
                </Col>
                <Col span={8}>
                  <Input></Input> 区
                </Col>
              </Row>
              <Input></Input>
            </FormItem>

            <FormItem label="楼层数量" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input></Input>
            </FormItem>

            <FormItem label="房间数量" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input></Input>
            </FormItem>

            <FormItem label="房号" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              批量添加：<Switch></Switch>
            </FormItem>

            <FormItem label="房间前缀" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input></Input>
            </FormItem>
          </Form>
        </Modal> */}

        {/* <Modal title="添加房产" visible={false}>
          <Form>
            <FormItem label="房产" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input placeholder="请输入房产名称"></Input>
            </FormItem>

            <FormItem label="房产类型" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Select defaultValue="1">
                <Option value="1">请选择房产类型</Option>
              </Select>
            </FormItem>

            <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Upload>
                <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#eee', border: '1px dashed #ddd' }} >
                  <Icon type={this.state.loading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </FormItem>

            <FormItem label="房号" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              批量添加：<Switch defaultChecked></Switch>
            </FormItem>

            <FormItem label="总楼层" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Select>
                <Option value="1">6</Option>
              </Select>
            </FormItem>

            <FormItem label="房间数" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Select>
                <Option value="1">6</Option>
              </Select>
            </FormItem>

            <FormItem label="房间前缀" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} >
              <Input></Input>
            </FormItem>
          </Form>
        </Modal>

        <Modal title="添加房产" visible={false}>
          <Form>
            <h3>
              <b>1楼</b>
            </h3>
            <div>
              <CheckBoxGroup options={plainOptions}></CheckBoxGroup>
            </div>
            <br/>
            <h3>
              <b>2楼</b>
            </h3>
            <div>
              <CheckBoxGroup options={plainOptions}></CheckBoxGroup>
            </div>
          </Form>
        </Modal> */}
      </div>
    )
  }
}

export default connect()(HousingResource)