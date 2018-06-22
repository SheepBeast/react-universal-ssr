import React from 'react'
import { Modal, Form, Divider, Row, Col, Checkbox, Button } from 'antd'

const FormItem = Form.Item

class Modal_Batch_Add_Property_3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      unChecked: {}
    }
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
    let unChecked = this.state.unChecked
    let _ = []
    let k

    for (k in unChecked) {
      if (!unChecked[k]) {
        _.push(k)
      }
    }

    this.props.onOk({
      id: _
    })
    this.hide()
  }

  onCheckBoxChange(e) {
    e.stopPropagation()

    let { checked, value } = e.target

    if (!checked) {
      e.nativeEvent.target.parentNode.parentNode.classList.add('checkbox-wrapper-unchecked')

      this.setState({
        unChecked: Object.assign({}, this.state.unChecked, { [value]: false })
      }, () => {
        console.log('unchecked -->', this.state.unChecked)
      })
    } else {
      e.nativeEvent.target.parentNode.parentNode.classList.remove('checkbox-wrapper-unchecked')
      this.setState({
        unChecked: Object.assign({}, this.state.unChecked, { [value]: true })
      }, () => {
        console.log('unchecked -->', this.state.unChecked)
      })
    }
  }

  render() {
    return (
      <Modal title={`批量添加房产3（${this.props.subTitle}）`} bodyStyle={{
        paddingLeft: 10,
        paddingRight: 10
      }}
        visible={this.state.visible} destroyOnClose={true} okText="完成" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Form className="form-shim">
          <div style={{ maxHeight: 500, overflowY: 'scroll' }}>
            {
              this.props.floorList.map(floor => {
                let { floorName, floorId, roomList = [] } = floor

                return (
                  <div key={floorId} className="mb-30">
                    <h3>
                      <b>{floorName}</b>
                    </h3>
                    <Divider />
                    <Row className="tc">
                      {
                        roomList.map(room => {
                          let { roomId, roomName } = room

                          return (
                            <Col key={roomId} span={6}>
                              <Checkbox value={roomId} defaultChecked={true} onChange={this.onCheckBoxChange.bind(this)}>{roomName}</Checkbox>
                            </Col>
                          )
                        })
                      }
                    </Row>
                  </div>
                )
              })
            }
          </div>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modal_Batch_Add_Property_3)