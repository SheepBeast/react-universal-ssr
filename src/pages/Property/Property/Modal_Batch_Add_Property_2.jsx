import React from 'react'
import { connect } from 'react-redux'
import { Modal, Icon, Input, Form, Cascader, Row, Col, InputNumber, Switch, Button } from 'antd'
import { fetchDistrictList } from '../../../actions/common';
import isRequestSuccess from '../../../utils/isRequestSuccess';

const FormItem = Form.Item

class Modal_Batch_Add_Property_2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,

      visible: false,

      options: []
    }
  }

  componentWillMount() {
    this.props.fetchDistrictList().then(ret => {
      if (isRequestSuccess(ret)) {
        var provinces = ret.data.data.provinces

        for (var i = 0, pl = provinces.length; i < pl; i++) {
          var p = provinces[i]

          p.label = p.provinceName
          p.value = p.provinceId

          var cities = p.cities

          p.children = p.cities

          for (var j = 0, cl = cities.length; j < cl; j++) {

            var c = cities[j]

            c.label = c.cityName
            c.value = c.cityId

            var areas = c.areas

            c.children = c.areas

            for (var k = 0, al = areas.length; k < al; k++) {
              var a = areas[k]

              a.label = a.areaName
              a.value = a.areaId
            }

          }
        }

        this.setState({
          options: provinces
        })
      }
    })
  }

  show() {
    this.setState({
      visible: true
    })
  }

  hide() {
    this.setState({
      visible: false
    })
  }

  componentDidMount() {
    this.props.onInit(this)
  }

  onOk(e) {
    this.props.form.validateFields((err, val) => {
      console.log('on ok -->', val)
      if (!err) {
        this.props.onOk(val)
        this.hide()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Modal title={`批量添加房产2（${this.props.subTitle}）`} visible={this.state.visible} destroyOnClose={true} okText="下一步" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form className="form-shim">
          <FormItem label="楼栋名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('buildingName', {
                rules: [{
                  required: true,
                  message: '楼栋名称不能为空'
                }]
              })(
                <Input />
              )
            }
          </FormItem>

          <FormItem label="楼栋地址" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('district')(
                <Cascader className="mb-20" options={this.state.options} changeOnSelect={true} placeholder="省/市/区" />
              )
            }
          </FormItem>
          <FormItem label="详细地址" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {
              getFieldDecorator('address', {
                rules: [{
                  required: true,
                  message: '必须填写详细地址'
                }]
              })(
                <Input placeholder="请输入详细地址" />
              )
            }
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem label="楼层数量" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} >
                {
                  getFieldDecorator('floorNum')(<InputNumber />)
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="房间数量" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} >
                {
                  getFieldDecorator('roomNum')(<InputNumber />)
                }
              </FormItem>
            </Col>
          </Row>

          <FormItem label="房间前缀" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            <Row gutter={8}>
              <Col span={16}>
                {
                  getFieldDecorator('roomNamePrefix')(<Input />)
                }
              </Col>
              <Col span={8}>
                <FormItem label="批量添加" labelCol={{ span: 16 }} wrapperCol={{ span: 8 }} >
                  {
                    getFieldDecorator('batch', {
                      valuePropName: 'checked',
                      initialValue: true
                    })(
                      <Switch style={{ marginTop: 4 }} disabled />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  fetchDistrictList: params => dispatch(fetchDistrictList(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Modal_Batch_Add_Property_2))