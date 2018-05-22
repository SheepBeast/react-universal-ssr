import { Component } from 'react'
import { Divider, Checkbox } from 'antd'

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export default class Auth extends Component {
  constructor() {
    super()
    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false
    }
  }

  render() {
    return (
      <div id="Auth" className="container">
        <h3>
          <b>权限设置</b>
        </h3>
        <Divider></Divider>

        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onChange}
          checked={this.state.checkAll}
        >
          Check All
        </Checkbox>

        <br />

        <CheckboxGroup options={plainOptions} value={this.state.checkedList}></CheckboxGroup>
      </div>
    )
  }

  onChange(checkedList) {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  onCheckAllChange(e) {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
}