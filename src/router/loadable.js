import React from 'react'
import Loadable from 'react-loadable'

const loading = () => <div>loading...</div>

var loadable = __TERMINAL__ === 'browser' ? {
  // statistics
  LoadableStatistics: Loadable({
    loader: () => import('../pages/Statistics/index'),
    loading
  }),

  // property
  LoadableProperty: Loadable({
    loader: () => import('../pages/Property/Property/index'),
    loading
  }),
  LoadableRoomDetail: Loadable({
    loader: () => import('../pages/Property/RoomDetail/index'),
    loading
  }),
  LoadableRelet: Loadable({
    loader: () => import('../pages/Property/Relet/index'),
    loading
  }),

  // tenant
  LoadableAddTenant: Loadable({
    loader: () => import('../pages/Tenant/AddTenant/index'),
    loading
  }),


  // device
  LoadableMyDevice: Loadable({
    loader: () => import('../pages/Device/MyDevice/index'),
    loading
  }),
  LoadableGateway: Loadable({
    loader: () => import('../pages/Device/Gateway/index'),
    loading
  }),

  LoadableLockList: Loadable({
    loader: () => import('../pages/Device/LockList/index'),
    loading
  }),
  LoadableLockDetail: Loadable({
    loader: () => import('../pages/Device/LockDetail/index'),
    loading
  }),

  // user
  LoadableUser: Loadable({
    loader: () => import('../pages/User/User/index'),
    loading
  }),
  LoadableAddUser: Loadable({
    loader: () => import('../pages/User/AddUser/index'),
    loading
  }),
  LoadableEditUser: Loadable({
    loader: () => import('../pages/User/EditUser/index'),
    loading
  }),

  // role
  LoadableRole: Loadable({
    loader: () => import('../pages/Role/Role/index'),
    loading
  }),
  LoadableAddRole: Loadable({
    loader: () => import('../pages/Role/AddRole/index'),
    loading
  }),
  LoadableEditRole: Loadable({
    loader: () => import('../pages/Role/EditRole/index'),
    loading
  }),

  // common
  LoadableLogin: Loadable({
    loader: () => import('../pages/Common/Login/index'),
    loading
  }),
  LoadableRegister: Loadable({
    loader: () => import('../pages/Common/Register/index'),
    loading
  }),
  LoadableForgetPassword: Loadable({
    loader: () => import('../pages/Common/ForgetPassword/index'),
    loading
  }),

  // news
  LoadableNews: Loadable({
    loader: () => import('../pages/News/News/index'),
    loading
  }),
  LoadableAudittingNews: Loadable({
    loader: () => import('../pages/News/AudittingNews/index'),
    loading
  }),
  LoadableAddNews: Loadable({
    loader: () => import('../pages/News/AddNews/index'),
    loading
  }),
  LoadableEditNews: Loadable({
    loader: () => import('../pages/News/EditNews/index'),
    loading
  }),
  LoadableAuditNews: Loadable({
    loader: () => import('../pages/News/AuditNews/index'),
    loading
  }),
  LoadableCheckNews: Loadable({
    loader: () => import('../pages/News/CheckNews/index'),
    loading
  }),

  LoadableAccount: Loadable({
    loader: () => import('../pages/Account/Account/index'),
    loading
  }),

  LoadableModifyMobile: Loadable({
    loader: () => import('../pages/Account/ModifyMobile/index'),
    loading
  })

} : {
    // statistic
    LoadableStatistics: require('../pages/Statistics/index').default,

    // property
    LoadableProperty: require('../pages/Property/Property/index').default,
    LoadableRoomDetail: require('../pages/Property/RoomDetail/index').default,
    LoadableRelet: require('../pages/Property/Relet/index').default,


    // tenant
    LoadableAddTenant: require('../pages/Tenant/AddTenant/index').default,

    // device
    LoadableMyDevice: require('../pages/Device/MyDevice/index').default,
    LoadableGateway: require('../pages/Device/Gateway/index').default,
    LoadableLockList: require('../pages/Device/LockList/index').default,
    LoadableLockDetail: require('../pages/Device/LockDetail/index').default,

    // user
    LoadableUser: require('../pages/User/User/index').default,
    LoadableAddUser: require('../pages/User/AddUser/index').default,
    LoadableEditUser: require('../pages/User/EditUser/index').default,

    // role
    LoadableRole: require('../pages/Role/Role/index').default,
    LoadableAddRole: require('../pages/Role/AddRole/index').default,
    LoadableEditRole: require('../pages/Role/EditRole/index').default,

    // common
    LoadableLogin: require('../pages/Common/Login/index').default,
    LoadableRegister: require('../pages/Common/Register/index').default,
    LoadableForgetPassword: require('../pages/Common/ForgetPassword/index').default,

    // news
    LoadableNews: require('../pages/News/News/index').default,
    LoadableAudittingNews: require('../pages/News/AudittingNews/index').default,
    LoadableAddNews: require('../pages/News/AddNews/index').default,
    LoadableEditNews: require('../pages/News/EditNews/index').default,
    LoadableAuditNews: require('../pages/News/AuditNews/index').default,
    LoadableCheckNews: require('../pages/News/CheckNews/index').default,

    // account
    LoadableAccount: require('../pages/Account/Account/index').default,
    LoadableModifyMobile: require('../pages/Account/ModifyMobile/index').default
  }

module.exports = loadable