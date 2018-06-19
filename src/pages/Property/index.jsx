import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Radio, Form, Icon, Button, Avatar, Row, Col, Input, InputNumber, Select, Switch, Upload, Modal, Checkbox, Card, Divider, Cascader, Tooltip } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const CheckBoxGroup = Checkbox.Group
const Option = Select.Option

import './index.less'
import { fetchHouseListData, fetchBuildingListData, fetchFloorListData, fetchRoomListData } from '../../actions/property';

const roomStateRefers = {
  0: '失效',
  1: '空净',
  2: '入住',
  3: '空脏',
  4: '故障、无入住',
  5: '故障、有人入住',
  6: '未启用'
}

class Property extends Component {
  constructor() {
    super()
    this.state = {
      roomId: null,
      buildingId: null,
      floorId: null,
      roomId: null
    }
  }

  componentWillMount() {
    var params = {
      state: 1
    }
    this.props.fetchHouseList(params)
    this.props.fetchBuildingList(params)
    this.props.fetchFloorList(params)
    this.props.fetchRoomList(params)
  }


  onCheckBoxChange(e) {
    e.stopPropagation()

    let { checked } = e.target

    e.nativeEvent.target.parentNode.parentNode.classList[!checked ? 'add' : 'remove']('checkbox-wrapper-unchecked')
  }

  linkedFetchBuildingList(params) {
    this.props.fetchBuildingList(params).then(ret => {
      console.log('building list -->', ret)

      var buildingList = ret.data.data && ret.data.data.list

      if (!buildingList || buildingList.length == 0) {
        return
      }

      var params = {
        buildingId: buildingList[0].buildingId,
        state: 1
      }

      this.linkedFetchFloorList(params)
    })
  }

  linkedFetchFloorList(params) {
    this.props.fetchFloorList(params).then(ret => {
      console.log('floor list -->', ret)

      var floorList = ret.data.data && ret.data.data.list

      if (!floorList || floorList.length) {
        return
      }

      var params = {
        floorId: floorList[0].floorId,
        state: 1
      }

      this.setState({
        floorId: params.floorId
      })

      this.linkedFetchRoomList(params)
    })
  }

  linkedFetchRoomList(params) {
    this.setState({
      roomId: params.roomId
    })
    this.props.fetchRoomList(params).then(ret => {
      console.log('room list -->', ret)
    })
  }
  /*********************************/
  onHouseListChange(e) {
    e.stopPropagation()

    var params = {
      houseId: e.target.value,
      state: 1
    }

    this.setState({
      houseId: params.houseId
    })

    this.linkedFetchBuildingList(params)
  }


  onBuildingListChange(e) {
    e.stopPropagation()

    var params = {
      buildingId: e.target.value,
      state: 1
    }

    this.setState({
      buildingId: params.buildingId
    })

    this.linkedFetchFloorList(params)
  }

  onFloorListChange(e) {
    e.stopPropagation()

    var params = {
      floorId: e.target.value,
      state: 1
    }

    this.setState({
      floorId: params.floorId
    })

    this.linkedFetchRoomList(params)
  }

  render() {
    const { houseList, buildingList, floorList, roomList } = this.props
    const options = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];

    let { houseId, buildingId, floorId, roomId } = this.state


    return (
      <div id="Property">
        <div className="mb-20 container">
          <Form>
            {
              houseList.length > 0 ?
                <FormItem label="公寓名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                  <RadioGroup className="custom-radio-button-group" defaultValue={houseList[0].houseId} value={houseId || houseList[0].houseId} onChange={this.onHouseListChange.bind(this)}>
                    {
                      houseList.map(({ houseId, houseName }) =>
                        <RadioButton key={houseId} value={houseId}>{houseName}</RadioButton>
                      )
                    }
                  </RadioGroup>
                </FormItem> : null
            }
            {
              buildingList.length > 0 ?
                <FormItem label="楼栋名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                  <RadioGroup className="custom-radio-button-group" defaultValue={buildingList[0].buildingId} value={buildingId || buildingList[0].buildingId} onChange={this.onBuildingListChange.bind(this)}>
                    {
                      buildingList.map(({ buildingId, buildingName }) =>
                        <RadioButton value={buildingId} key={buildingId}>{buildingName}</RadioButton>
                      )
                    }
                  </RadioGroup>
                </FormItem> : null
            }

            {
              floorList.length > 0 ?
                <FormItem label="楼层名称" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                  <RadioGroup className="custom-radio-button-group" defaultValue={floorList[0].floorId} value={floorId || floorList[0].floorId} onChange={this.onFloorListChange.bind(this)}>
                    {
                      floorList.map(({ floorId, floorName }) =>
                        <RadioButton value={floorId} key={floorId}>{floorName}</RadioButton>
                      )
                    }
                  </RadioGroup>
                </FormItem> : null
            }
          </Form>
        </div>


        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 100, height: 100 }} className="mr-30">
              <Avatar style={{ width: 100, height: 100, borderRadius: '50%' }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" />
            </div>
            <div style={{ flexGrow: 1 }}>
              <h3>
                <b>慧享公寓</b>
              </h3>
              <span className="gray">已租--套&nbsp;&nbsp;闲置--套</span>
            </div>
            <div style={{ width: 210 }} >
              <Button type="primary" className="mr-30">添加房产</Button>
              <Button type="primary">删除房产</Button>
            </div>
          </div>
          <Divider></Divider>
          <Row gutter={8}>
            {
              roomList.map(({ roomId, roomName, state }) => {
                var url = `/property-room-detail?roomId=${encodeURIComponent(roomId)}`
                return (
                  <Col key={roomId} span={4} className="mb-20" >
                    <Card actions={
                      // [
                      //   { iconType: 'file-text', tooltip: '房间详情' },
                      //   { iconType: 'form', tooltip: '编辑' },
                      //   { iconType: 'select', tooltip: '关联设备' },
                      //   { iconType: 'tag-o', tooltip: '标记' }
                      // ].map((item) => (
                      //   <Tooltip key={item.iconType} title={item.tooltip}>
                      //     <Icon type={item.iconType} />
                      //   </Tooltip>
                      // ))

                      [
                        <Link to={url}>
                          <Tooltip title="房间详情">
                            <Icon type="file-text" />
                          </Tooltip>
                        </Link>,

                        <Link to={url}>
                          <Tooltip title="编辑">
                            <Icon type="form" />
                          </Tooltip>
                        </Link>,

                        <Link to={url}>
                          <Tooltip title="关联设备">
                            <Icon type="select" />
                          </Tooltip>
                        </Link>,

                        <Link to={url}>
                          <Tooltip title="标记">
                            <Icon type="tag-o" />
                          </Tooltip>
                        </Link>
                      ]
                    }>
                      <div className="tc">
                        <Avatar style={{ width: 100, height: 100, borderRadius: '50%' }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" className="mb-20"></Avatar>
                        <h3 className="mb-20">{roomName}</h3>
                        <h3 className={state === 1 ? 'health' : 'danger'}>{roomStateRefers[state]}</h3>
                      </div>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </div>

        {/* <Modal
          title={
            <h3 className="tc modal-batch-title" >
              <span>添加房产</span>
              <div className="modal-batch-close-wrapper">
                <Icon type="close-circle-o" className="modal-batch-close" />
              </div>
            </h3>
          }
          visible={true}
          destroyOnClose={true}
          closable={false}
          footer={null}
        >
          <Form className="form-shim">
            <FormItem label="房产" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Input placeholder="请输入房产名称" className="w-100"></Input>
            </FormItem>

            <FormItem label="房产类型" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Select defaultValue="1" className="w-100">
                <Option value="1">请选择房产类型</Option>
              </Select>
            </FormItem>

            <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Upload>
                <div style={{ padding: 19, textAlign: 'center', backgroundColor: '#fff', border: '1px dashed #ddd', borderRadius: 4 }} >
                  <Icon type={this.state.loading ? 'loading' : 'plus'} style={{
                    fontSize: 30,
                    color: '#ddd',
                    fontWeight: 100
                  }} />
                </div>
              </Upload>
            </FormItem>

            <FormItem label="房号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Row gutter={8}>
                <Col span={16} >
                  <Input></Input>
                </Col>
                <Col span={8}  >
                  <FormItem label="批量添加" labelCol={{ span: 16 }} wrapperCol={{ span: 8 }} >
                    <Switch defaultChecked style={{ marginTop: 4 }}></Switch>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <br/>
            <div className="tc">
              <Button type="primary" style={{ width: 84 }} >下一步</Button>
            </div>
          </Form>
        </Modal> */}

        {/* <Modal
          title={
            <h3 className="tc modal-batch-title" >
              <span>批量添加房产</span>
              <div className="modal-batch-close-wrapper">
                <Icon type="close-circle-o" className="modal-batch-close" />
              </div>
            </h3>
          }
          visible={true}
          destroyOnClose={true}
          closable={false}
          footer={null}>
          <Form className="form-shim">
            <FormItem label="公寓名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Input className="w-100"></Input>
            </FormItem>

            <FormItem label="楼栋数量" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <InputNumber className="w-100"></InputNumber>
            </FormItem>

            <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Upload>
                <div style={{ padding: 19, textAlign: 'center', backgroundColor: '#fff', border: '1px dashed #ddd', borderRadius: 4 }} >
                  <Icon type={this.state.loading ? 'loading' : 'plus'} style={{
                    fontSize: 30,
                    color: '#ddd',
                    fontWeight: 100
                  }} />
                </div>
              </Upload>
            </FormItem>

            <FormItem label="批量添加" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Switch defaultChecked style={{ marginTop: 4 }}></Switch>
            </FormItem>

            <br/>
            <div className="tc">
              <Button type="primary" style={{ width: 84 }} >下一步</Button>
            </div>
          </Form>
        </Modal> */}

        {/* <Modal
          title={
            <div>
              <h3 className="tc modal-batch-title" >
                <span>批量添加房产</span>
                <div className="modal-batch-close-wrapper">
                  <Icon type="close-circle-o" className="modal-batch-close" />
                </div>
              </h3>
              <h4 className="tc" style={{ color: '#ddd' }} >楼栋1添加</h4>
            </div>
          }
          visible={false}
          destroyOnClose={true}
          closable={false}
          footer={null}
        >
          <Form className="form-shim">
            <FormItem label="楼栋名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Input defaultValue="A1"></Input>
            </FormItem>

            <FormItem label="楼栋地址" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Cascader className="mb-20" options={options} changeOnSelect></Cascader>
              <Input defaultValue="请输入详细地址"></Input>
            </FormItem>
            <Row>
              <Col span={12}>
                <FormItem label="楼层数量" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} >
                  <InputNumber></InputNumber>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="房间数量" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} >
                  <InputNumber></InputNumber>
                </FormItem>
              </Col>
            </Row>

            <FormItem label="房间前缀" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Row gutter={8}>
                <Col span={16} >
                  <Input></Input>
                </Col>
                <Col span={8}  >
                  <FormItem label="批量添加" labelCol={{ span: 16 }} wrapperCol={{ span: 8 }} >
                    <Switch defaultChecked style={{ marginTop: 4 }}></Switch>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <br/>
            <div className="tc">
              <Button type="primary" style={{ width: 84 }} >下一步</Button>
            </div>
          </Form>
        </Modal> */}

        {/* <Modal
          className="modal-primary modal-room-list"
          title={
            <h3 className="tc modal-batch-title" style={{ color: '#fff' }} >
              <span>批量添加</span>
              <div className="modal-batch-close-wrapper">
                <Icon type="close-circle-o" className="modal-batch-close" />
              </div>
            </h3>
          }
          bodyStyle={{
            paddingLeft: 10,
            paddingRight: 10
          }}
          visible={true}
          destroyOnClose={true}
          closable={false}
          footer={null}>
          <Form className="form-shim">
            <div style={{ maxHeight: 500, overflowY: 'scroll' }}>
              {
                [1, 2, 3].map((num) => (
                  <div className="mb-30">
                    <h3>
                      <b>{num}楼</b>
                    </h3>
                    <Divider></Divider>
                    <Row className="tc">
                      {
                        Array(Math.floor(Math.random() * 24) + 1).fill(1).map(() => (
                          <Col span={4}>
                            <Checkbox value="1" defaultChecked={true} onChange={this.onCheckBoxChange.bind(this)}>AVC2314</Checkbox>
                          </Col>
                        ))
                      }

                    </Row>
                  </div>
                ))
              }
            </div>
            <br/>
            <div className="tc">
              <Button type="primary" style={{ width: 84 }} >下一步</Button>
            </div>
          </Form>
        </Modal> */}

        {/* <Modal
          title={
            <h3 className="tc modal-batch-title">
              <span>添加房产</span>
              <div className="modal-batch-close-wrapper">
                <Icon type="close-circle-o" className="modal-batch-close" />
              </div>
            </h3>
          }
          visible={true}
          destroyOnClose={true}
          closable={false}
          footer={null}
        >
          <Form className="form-shim">
            <FormItem label="房产" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Input placeholder="请输入房产名称"></Input>
            </FormItem>

            <FormItem label="房产类型" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Select defaultValue="1">
                <Option value="1">请选择房产类型</Option>
              </Select>
            </FormItem>

            <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Upload>
                <div style={{ padding: 19, textAlign: 'center', backgroundColor: '#fff', border: '1px dashed #ddd', borderRadius: 4 }} >
                  <Icon type={this.state.loading ? 'loading' : 'plus'} style={{
                    fontSize: 30,
                    color: '#ddd',
                    fontWeight: 100
                  }} />
                </div>
              </Upload>
            </FormItem>

            <FormItem label="房号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Row gutter={8}>
                <Col span={16} >
                  <Input></Input>
                </Col>
                <Col span={8}  >
                  <FormItem label="批量添加" labelCol={{ span: 16 }} wrapperCol={{ span: 8 }} >
                    <Switch defaultChecked style={{ marginTop: 4 }}></Switch>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>


            <FormItem label="总楼层" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
              <Row gutter={8}>
                <Col span={5}>
                  <InputNumber></InputNumber>
                </Col>
                <Col span={8}>
                  <FormItem label="房间数" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                    <InputNumber></InputNumber>
                  </FormItem>
                </Col>
                <Col span={11}>
                  <FormItem label="房间前缀" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                    <Input></Input>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            <br/>
            <div className="tc">
              <Button type="primary" style={{ width: 84 }} >下一步</Button>
            </div>
          </Form>
        </Modal> */}

        {/* <Modal
          title={
            <h3 className="tc modal-batch-title">
              <span>绑定设备</span>
              <div className="modal-batch-close-wrapper">
                <Icon type="close-circle-o" className="modal-batch-close" />
              </div>
            </h3>
          }
          visible={true}
          destroyOnClose={true}
          closable={false}
          footer={null}
        >
          <Form className="form-shim">

            <FormItem label="门锁" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
              <Input.Search style={{ height: 31 }} enterButton="请选择门锁" placeholder="请选择门锁MAC"></Input.Search>
            </FormItem>

            <FormItem label="电表" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
              <Input.Search style={{ height: 31 }} enterButton="请选择电表" placeholder="请选择电表MAC"></Input.Search>
            </FormItem>

            <FormItem label="水表" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
              <Input.Search style={{ height: 31 }} enterButton="请选择水表" placeholder="请选择水表MAC"></Input.Search>
            </FormItem>

            <br />
            <div className="tc">
              <Button type="primary" style={{ width: 84 }} >保存</Button>
            </div>
          </Form>
        </Modal> */}

        {/* <Modal
          title={
            <h3 className="tc modal-batch-title">
              <span>房间</span>
              <div className="modal-batch-close-wrapper">
                <Icon type="close-circle-o" className="modal-batch-close" />
              </div>
            </h3>
          }
          visible={true}
          destroyOnClose={true}
          closable={false}
          footer={null}
        >
          <Form className="form-shim">
            <FormItem label="房间名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Input />
            </FormItem>

            <FormItem label="所在楼层" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <InputNumber className="w-100" />
            </FormItem>

            <FormItem label="房产照片" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Upload>
                <div style={{ padding: 19, textAlign: 'center', backgroundColor: '#fff', border: '1px dashed #ddd', borderRadius: 4 }} >
                  <Icon type={this.state.loading ? 'loading' : 'plus'} style={{
                    fontSize: 30,
                    color: '#ddd',
                    fontWeight: 100
                  }} />
                </div>
              </Upload>
            </FormItem>

            <br />
            <div className="tc">
              <Button type="primary" style={{ width: 84 }} >保存</Button>
            </div>
          </Form>
        </Modal> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  houseList: state.houseList || [],
  buildingList: state.buildingList || [],
  floorList: state.floorList || [],
  roomList: state.roomList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchHouseList: params => dispatch(fetchHouseListData(params)),
    fetchBuildingList: params => dispatch(fetchBuildingListData(params)),
    fetchFloorList: params => dispatch(fetchFloorListData(params)),
    fetchRoomList: params => dispatch(fetchRoomListData(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Property)