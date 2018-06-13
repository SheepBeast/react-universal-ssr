import React from 'react'

import {
  LoadableStatistics,
  LoadableProperty,
  LoadableRoomDetail,
  LoadableAddRenter,
  LoadableRelet,

  LoadableMyDevice,
  LoadableGateway,

  LoadableLock,
  LoadableLockDetail,

  LoadableUser,
  LoadableAddUser,
  LoadableEditUser,
  LoadableRole,
  LoadableAddRole,
  LoadableLogin,
  LoadableNews,
  LoadableAddNews,
  LoadableAuditNews,
  LoadableCheckNews,
  // LoadableTenant,
  LoadableRegister,
  LoadableForgetPassword

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

class AddRenter extends React.Component {
  render() {
    return <LoadableAddRenter />
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

class Lock extends React.Component {
  render() {
    return <LoadableLock />
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

class AddNews extends React.Component {
  render(){
    return <LoadableAddNews />
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

module.exports = {
  Statistics,
  Property,
  RoomDetail,
  AddRenter,
  Relet,
  MyDevice,
  Gateway,
  Lock,
  LockDetail,
  User,
  AddUser,
  EditUser,
  Role,
  AddRole,
  Login,
  News,
  AddNews,
  AuditNews,
  CheckNews,
  // Tenant,
  Register,
  ForgetPassword
}