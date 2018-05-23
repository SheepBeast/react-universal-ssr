import { Component } from 'react'
import { Link } from 'react-router-dom'

import { Radio, Form, Icon, Button, Avatar, Row, Col, Input, Select, Switch, Upload, Modal, Checkbox } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const CheckBoxGroup = Checkbox.Group
const Option = Select.Option

export default class HousingResource extends Component {
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
      <div id="HousingResource" className="container">
        <h3>
          <b>房源管理</b>
          <Button onClick={this.toggleModal} style={{ float: 'right' }} >添加房产</Button>
        </h3>
        <Row>
          <Col span={12} >
            <Form layout="horizontal">
              <FormItem label="公寓名称" labelCol={{ span: 2 }} wrapperCol={{ span: 16 }}>
                <RadioGroup defaultValue="1">
                  <RadioButton value="1">慧享公寓</RadioButton>
                  <RadioButton value="2">无与伦比公寓</RadioButton>
                  <RadioButton value="3">创越时代公寓</RadioButton>
                </RadioGroup>
              </FormItem>

              <FormItem label="楼栋名称" labelCol={{ span: 2 }} wrapperCol={{ span: 16 }}>
                <RadioGroup defaultValue="1">
                  <RadioButton value="1">东塔</RadioButton>
                  <RadioButton value="2">西塔</RadioButton>
                  <RadioButton value="3">南塔</RadioButton>
                </RadioGroup>
              </FormItem>

              <FormItem label="楼层名称" labelCol={{ span: 2 }} wrapperCol={{ span: 16 }}>
                <RadioGroup defaultValue="0">
                  <RadioButton value="0">全部楼层</RadioButton>
                  <RadioButton value="1">1楼</RadioButton>
                  <RadioButton value="2">2楼</RadioButton>
                  <RadioButton value="3">3楼</RadioButton>
                  <RadioButton value="4">4楼</RadioButton>
                  <RadioButton value="5">5楼</RadioButton>
                  <RadioButton value="6">6楼</RadioButton>
                  <RadioButton value="7">7楼</RadioButton>
                </RadioGroup>
              </FormItem>
            </Form>
          </Col>
        </Row>

        <h3>
          <b><Icon type="shop" /> 慧享公寓</b> <small>共168套 闲置<span style={{ color: 'red' }}>143</span>套</small>
          <span style={{ marginLeft: 20 }} >
            <Button type="primary" icon="plus" size="small">添加用户</Button>&nbsp;&nbsp;
            <Button type="primary" icon="tool" size="small">添加用户</Button>&nbsp;&nbsp;
            <Button type="primary" icon="close" size="small">添加用户</Button>
          </span>
        </h3>

        <Row gutter={8}>
          <Col span={8} style={{ padding: 8, border: '1px solid #eee' }}>
            <Link to="/RoomDetail">
              <img style={{ width: '100%' }} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt="" />
            </Link>
          </Col>
          <Col span={8} style={{ padding: 8, border: '1px solid #eee' }}>
            <Link to="/RoomDetail">
              <img style={{ width: '100%' }} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt="" />
            </Link>
          </Col>
          <Col span={8} style={{ padding: 8, border: '1px solid #eee' }}>
            <Link to="/RoomDetail">
              <img style={{ width: '100%' }} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt="" />
            </Link>
          </Col>
          <Col span={8} style={{ padding: 8, border: '1px solid #eee' }}>
            <Link to="/RoomDetail">
              <img style={{ width: '100%' }} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt="" />
            </Link>
          </Col>
          <Col span={8} style={{ padding: 8, border: '1px solid #eee' }}>
            <Link to="/RoomDetail">
              <img style={{ width: '100%' }} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt="" />
            </Link>
          </Col>
        </Row>

        <Modal title="添加房产" visible={false}>
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
        </Modal>

        <Modal title="添加房产" visible={false}>
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
        </Modal>
      </div>
    )
  }
}