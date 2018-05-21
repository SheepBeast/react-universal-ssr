import { Component } from 'react'
import {Link} from 'react-router-dom'

import { Radio, Form, Icon, Button, Avatar, Row, Col } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

export default class HousingResource extends Component {
  render() {
    return (
      <div id="HousingResource" className="container">
        <h3><b>房源管理</b></h3>
        <Form layout="horizontal">
          <FormItem label="公寓名称" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
            <RadioGroup defaultValue="1">
              <RadioButton value="1">慧享公寓</RadioButton>
              <RadioButton value="2">无与伦比公寓</RadioButton>
              <RadioButton value="3">创越时代公寓</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem label="楼栋名称" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
            <RadioGroup defaultValue="1">
              <RadioButton value="1">东塔</RadioButton>
              <RadioButton value="2">西塔</RadioButton>
              <RadioButton value="3">南塔</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem label="楼层名称" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
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

        <h3>
          <b><Icon type="shop" /> 慧享公寓</b> <small>共168套 闲置<span style={{ color: 'red' }}>143</span>套</small>
          <div style={{ float: 'right', marginRight: 20 }}>
            <Button type="primary" icon="plus" size="small">添加用户</Button>&nbsp;&nbsp;
            <Button type="primary" icon="tool" size="small">添加用户</Button>&nbsp;&nbsp;
            <Button type="primary" icon="close" size="small">添加用户</Button>
          </div>
        </h3>

        <Row gutter={8}>
          <Col span={8} style={{padding: 8, border: '1px solid #eee'}}>
            <Link to="/RoomDetail">
            <img style={{width: '100%'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt=""/>
            </Link>
          </Col>
          <Col span={8} style={{padding: 8, border: '1px solid #eee'}}>
            <Link to="/RoomDetail">
            <img style={{width: '100%'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt=""/>
            </Link>
          </Col>
          <Col span={8} style={{padding: 8, border: '1px solid #eee'}}>
            <Link to="/RoomDetail">
            <img style={{width: '100%'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt=""/>
            </Link>
          </Col>
          <Col span={8} style={{padding: 8, border: '1px solid #eee'}}>
            <Link to="/RoomDetail">
            <img style={{width: '100%'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt=""/>
            </Link>
          </Col>
          <Col span={8} style={{padding: 8, border: '1px solid #eee'}}>
            <Link to="/RoomDetail">
            <img style={{width: '100%'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526644051240&di=792b5b537c73e257653a4a6e0c5a4257&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1751883757%2C4269759370%26fm%3D214%26gp%3D0.jpg" alt=""/>
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}