import React from 'react';
import Simditor from "simditor";
import $ from "jquery";

import "simditor/styles/simditor.css"
import './index.less'

class SimditorTextArea extends React.Component {

  componentDidMount() {
    this.initEditor();
  }

  initEditor() {
    let config = {
      id: this.props.id,
      placeholder: '',
      defaultImage: 'images/image.png',
      params: {},
      tabIndent: true,
      toolbar: true,
      // toolbar: [
      //   'title',
      //   'bold',
      //   'italic',
      //   'underline',
      //   'strikethrough',
      //   'fontScale',
      //   'color',
      //   'link',
      //   'hr',
      //   'image',
      //   'indent',
      //   'outdent',
      //   'alignment',
      // ],
      // upload: {
      //     url: ENV.IMAGE_ACTION, //文件上传的接口地址
      //     params: {
      //         appid: ENV.APP_ID,
      //         secret: ENV.SECRET,
      //     }, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
      //     fileKey: 'file', //服务器端获取文件数据的参数名
      //     connectionCount: 3,
      //     leaveConfirm: '正在上传文件',
      // },

      toolbarFloat: true,
      toolbarFloatOffset: 0,
      toolbarHidden: false,
      upload: true,
      pasteImage: false,
      cleanPaste: false,
      textarea: `#${this.props.id}`
    };

    console.log('config -->', config)

    this.editor = new Simditor(config);// 初始化编辑器
    // this.editor.setValue(this.props.value);

    //监听改变
    this.editor.on("valuechanged", (e, src) => {
      this.props.onChange(this.editor.getValue().trim());
    });

    // //更改图片上传类型
    // $(".simditor input[type='file']").attr('accept', 'image/jpg,image/jpeg,image/png,image/bmp');

    if(this.props.onInit){
      this.props.onInit(this.editor)
    }
  };

  // componentWillReceiveProps(nextProps){
  //     this.editor.setValue(nextProps.value);
  // };

  render() {
    return (
      <textarea id={this.props.id} placeholder="请输入内容" />
    );
  }
}

export default SimditorTextArea;