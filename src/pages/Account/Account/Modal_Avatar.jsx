import React from 'react'
import { Modal, Upload, Row, Col, Button, Avatar, message } from 'antd'
import isRequestSuccess from '../../../utils/isRequestSuccess';
import './Modal_Avatar.less'


export default class Modal_Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      uploading: false,
      previewUrl: null
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
    var { previewUrl } = this.state
    if (!previewUrl) {
      message.error('上传失败，请先选择一张图片')
      return
    }
    this.props.onOk({
      userPhoto: previewUrl
    })
    this.hide()
  }

  onUploadBeforeUpload(file) {
    // 文件大小限制2M
    if(file.size > 2048000) {
      message.error('上传失败，文件大小超过2M')
      return false
    }
    return true
  }

  onUploadChange(info) {
    var { file } = info
    var { response: ret, status } = file

    if (status == 'done') {
      var newState = {
        uploading: false
      }
      if (ret && isRequestSuccess(ret)) {
        newState.previewUrl = ret.data.picUrl
      }
      this.setState(newState)

    } else {
      if (this.state.uploading) {
        return
      }
      this.setState({
        uploading: true
      })
    }
  }


  render() {
    var { visible, uploading, previewUrl } = this.state


    return (
      <Modal className="modal-avatar" title="更换头像" visible={visible} destroyOnClose={true} okText="确定" cancelText="取消" onOk={this.onOk.bind(this)} onCancel={this.hide.bind(this)}>
        <Row gutter={20}>
          <Col span={13} style={{ border: '1px dashed #eee', height: 340 }}>
            <div className="pos-center">
              <div className="tc">
                <Upload action="http://localhost:8081/upload" onChange={this.onUploadChange.bind(this)} beforeUpload={this.onUploadBeforeUpload.bind(this)} showUploadList={false} multiple={false} name="avatar" accept="image/*">
                  <Button icon={uploading ? 'loading' : ''} type="primary">上传图片</Button>
                </Upload>
              </div>
              <br />
              <small className="gray">请点击按钮选择本地一张图片上传为头像，支持jpg/png/gif格式，大小不超过2M</small>
            </div>
          </Col>
          <Col offset={1} span={10} style={{ border: '1px solid #ddd', height: 340 }}>
            <h3>
              <b>头像浏览：</b>
            </h3>

            <div className="tc" style={{marginTop: 50}} >
              <Avatar size="large" src={previewUrl} />
              <br />
              <span className="fs-14 gray">小头像</span>

              <br />
              <br />
              <br />

              <Avatar className="br-50" style={{ width: 100, height: 100 }} src={previewUrl} />
              <br />
              <span className="fs-14 gray">大头像</span>
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }
}