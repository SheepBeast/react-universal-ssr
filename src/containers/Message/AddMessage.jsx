import { Component } from 'react'
import { Form, Select, Input, Checkbox, Upload, Button, Icon } from 'antd'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

import './AddMessage.less'

export default class AddMessage extends Component {
  constructor(){
    super()
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }
  render() {
    return (
      <div id="AddMessage" className="container">
        <Form>
          <FormItem label="发送端" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} >
            <Select>
              <Option value="1">APP用户</Option>
            </Select>
          </FormItem>

          <FormItem label="发送对象" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} >
            <Checkbox>熊文超</Checkbox>
          </FormItem>

          <FormItem label="消息LOGO" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} >
            <Upload>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          </FormItem>

          <FormItem label="标题" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} >
            <Input placeholder="请输入"></Input>
          </FormItem>

          <FormItem label="摘要" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} >
            <TextArea autosize={{ minRows: 3, maxRows: 6 }} />
          </FormItem>

          <FormItem label="正文" labelCol={{ span: 2 }} wrapperCol={{ span: 18 }} >
            <Editor editorState={this.state.editorState} wrapperClassName="wrapperClassName" editorClassName="editorClassName"></Editor>

          </FormItem>
        </Form>
      </div>
    )
  }
}