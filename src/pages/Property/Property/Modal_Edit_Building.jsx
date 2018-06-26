import React from 'react'
import { connect } from 'react-redux'
import { Modal, Icon, Input, Form, Cascader, Row, Col, InputNumber, Switch, Button } from 'antd'
import { fetchDistrictList } from '../../../actions/common';
import isRequestSuccess from '../../../utils/isRequestSuccess';
import { isMobile } from '../../../constants/regexp'

const FormItem = Form.Item

class Modal_Edit_Building extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      district: []
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
          district: provinces
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
    const { buildingName } = this.props.options

    return (
      <Modal title="编辑楼栋" visible={this.state.visible} destroyOnClose={true} okText="下一步" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form className="form-shim">
          <FormItem label="楼栋名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('buildingName', {
                rules: [{
                  required: true,
                  message: '楼栋名称不能为空'
                }],
                initialValue: buildingName
              })(
                <Input />
              )
            }
          </FormItem>

          <FormItem label="楼栋地址" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('district', {
                rules: [{
                  required: true,
                  message: '楼栋地址不能为空'
                }],
                initialValue: buildingName
              })(
                <Cascader className="mb-20" options={this.state.district} changeOnSelect={true} placeholder="省/市/区" />
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


          <FormItem label="手机号码" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
            {
              getFieldDecorator('phoneNo', {
                rules: [{
                  required: true,
                  message: '手机号码不能为空'
                }, {
                  validator: (rule, value, callback) => {
                    if (!isMobile.test(value)) {
                      callback('手机格式错误')
                    }
                    callback()
                  }
                }],
                validateFirst: true
              })(
                <Input />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDistrictList: params => dispatch(fetchDistrictList(params))
})

export default connect(null, mapDispatchToProps)(Form.create()(Modal_Edit_Building))