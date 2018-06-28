import React from 'react'
import { Modal, Upload, Row, Col, Button } from 'antd'



export default class Modal_Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
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
    this.props.onOk({
      userSex: this.state.userSex
    })
    this.hide()
  }


  render() {
    var { visible } = this.state

    const props = {
      action: 'http://localhost:8081/upload',
      onChange(files) {
        var { file } = files
        if (file.status !== 'uploading') {
          console.log('files -->', files)
          // var { file, fileList } = files
          // console.log(file, fileList);
        }
      }
    };



    return (
      <Modal title="更换头像" visible={visible} destroyOnClose={true} okText="确定" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Row gutter={20}>
          <Col span={14} style={{ border: '1px dashed #eee', height: 340 }}>
            <div>
              <Upload {...props}>
                <Button type="primary">上传图片</Button>
              </Upload>
            </div>
          </Col>
          <Col span={10} style={{ border: '1px solid #ddd', height: 340 }}>

          </Col>
        </Row>
      </Modal>
    )
  }
}