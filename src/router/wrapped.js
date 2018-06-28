import React from 'react'

import {
  LoadableStatistics,
  LoadableProperty,
  LoadableRoomDetail,
  LoadableAddTenant,
  LoadableRelet,

  LoadableMyDevice,
  LoadableGateway,

  LoadableLockList,
  LoadableLockDetail,

  LoadableUser,
  LoadableAddUser,
  LoadableEditUser,

  LoadableRole,
  LoadableAddRole,
  LoadableEditRole,

  LoadableLogin,
  LoadableNews,
  LoadableAudittingNews,
  LoadableAddNews,
  LoadableEditNews,
  LoadableAuditNews,
  LoadableCheckNews,
  // LoadableTenant,
  LoadableRegister,
  LoadableForgetPassword,
  LoadableAccount
} from './loadable'

class Statistics extends React.Component {
  render() {
    return <LoadableStatistics />
  }
}

class Property extends React.Component {
  render() {
    return <LoadableProperty />
  }
}

class RoomDetail extends React.Component {
  render() {
    return <LoadableRoomDetail />
  }
}

class AddTenant extends React.Component {
  render() {
    return <LoadableAddTenant />
  }
}

class Relet extends React.Component {
  render() {
    return <LoadableRelet />
  }
}

class MyDevice extends React.Component {
  render() {
    return <LoadableMyDevice />
  }
}

class Gateway extends React.Component {
  render() {
    return <LoadableGateway />
  }
}

class LockList extends React.Component {
  render() {
    return <LoadableLockList />
  }
}

class LockDetail extends React.Component {
  render() {
    return <LoadableLockDetail />
  }
}

class User extends React.Component {
  render() {
    return <LoadableUser />
  }
}

class AddUser extends React.Component {
  render() {
    return <LoadableAddUser />
  }
}

class EditUser extends React.Component {
  render() {
    return <LoadableEditUser />
  }
}

class Role extends React.Component {
  render() {
    return <LoadableRole />
  }
}

class AddRole extends React.Component {
  render() {
    return <LoadableAddRole />
  }
}

class EditRole extends React.Component {
  render(){
    return <LoadableEditRole />
  }
}

class Login extends React.Component {
  render(){
    return <LoadableLogin />
  }
}

class News extends React.Component {
  render(){
    return <LoadableNews />
  }
}

class AudittingNews extends React.Component {
  render(){
    return <LoadableAudittingNews />
  }
}

class AddNews extends React.Component {
  render(){
    return <LoadableAddNews />
  }
}

class EditNews extends React.Component {
  render(){
    return <LoadableEditNews />
  }
}

class AuditNews extends React.Component {
  render(){
    return <LoadableAuditNews />
  }
}

class CheckNews extends React.Component {
  render(){
    return <LoadableCheckNews />
  }
}

// class Tenant extends React.Component {
//   render(){
//     return <LoadableTenant />
//   }
// }

class Register extends React.Component {
  render(){
    return <LoadableRegister />
  }
}

class ForgetPassword extends React.Component {
  render(){
    return <LoadableForgetPassword />
  }
}

class Account extends React.Component {
  render() {
    return <LoadableAccount />
  }
}

module.exports = {
  Statistics,
  Property,
  RoomDetail,
  AddTenant,
  Relet,
  MyDevice,
  Gateway,
  LockList,
  LockDetail,
  User,
  AddUser,
  EditUser,
  Role,
  AddRole,
  EditRole,
  Login,
  News,
  AudittingNews,
  AddNews,
  EditNews,
  AuditNews,
  CheckNews,
  // Tenant,
  Register,
  ForgetPassword,

  Account
}