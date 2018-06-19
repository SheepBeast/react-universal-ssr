import React from 'react'
import Loadable from 'react-loadable'

const loading = () => <div>loading...</div>

var loadable = __TERMINAL__ === 'browser' ? {
  LoadableStatistics: Loadable({
    loader: () => import('../pages/Statistics/index'),
    loading
  }),

  LoadableProperty: Loadable({
    loader: () => import('../pages/Property/index'),
    loading
  }),
  LoadableRoomDetail: Loadable({
    loader: () => import('../pages/RoomDetail/index'),
    loading
  }),
  LoadableAddRenter: Loadable({
    loader: () => import('../pages/AddRenter/index'),
    loading
  }),
  LoadableRelet: Loadable({
    loader: () => import('../pages/Relet/index'),
    loading
  }),

  LoadableMyDevice: Loadable({
    loader: () => import('../pages/MyDevice/index'),
    loading
  }),
  LoadableGateway: Loadable({
    loader: () => import('../pages/Gateway/index'),
    loading
  }),

  LoadableLock: Loadable({
    loader: () => import('../pages/Lock/index'),
    loading
  }),
  LoadableLockDetail: Loadable({
    loader: () => import('../pages/LockDetail/index'),
    loading
  }),
  LoadableUser: Loadable({
    loader: () => import('../pages/User/index'),
    loading
  }),
  LoadableAddUser: Loadable({
    loader: () => import('../pages/AddUser/index'),
    loading
  }),
  LoadableEditUser: Loadable({
    loader: () => import('../pages/EditUser/index'),
    loading
  }),
  LoadableRole: Loadable({
    loader: () => import('../pages/Role/index'),
    loading
  }),
  LoadableAddRole: Loadable({
    loader: () => import('../pages/AddRole/index'),
    loading
  }),
  LoadableEditRole: Loadable({
    loader: () => import('../pages/EditRole/index'),
    loading
  }),
  LoadableLogin: Loadable({
    loader: () => import ('../pages/Login/index'),
    loading
  }),
  LoadableNews: Loadable({
    loader: ()=> import('../pages/News/index'),
    loading
  }),
  LoadableAudittingNews: Loadable({
    loader: ()=> import('../pages/AudittingNews/index'),
    loading
  }),
  LoadableAddNews: Loadable({
    loader: ()=> import('../pages/AddNews/index'),
    loading
  }),
  LoadableAuditNews: Loadable({
    loader:() => import('../pages/AuditNews/index'),
    loading
  }),
  LoadableCheckNews: Loadable({
    loader: ()=> import('../pages/CheckNews/index'),
    loading
  }),
  // LoadableTenant: Loadable({
  //   loader: ()=> import('../pages/Tenant/index'),
  //   loading
  // })
  LoadableRegister: Loadable({
    loader: () => import ('../pages/Register/index'),
    loading
  }),
  LoadableForgetPassword: Loadable({
    loader: ()=>import('../pages/ForgetPassword/index'),
    loading
  })
} : {
    LoadableStatistics: require('../pages/Statistics/index').default,
    LoadableProperty: require('../pages/Property/index').default,
    LoadableRoomDetail: require('../pages/RoomDetail/index').default,
    LoadableAddRenter: require('../pages/AddRenter/index').default,
    LoadableRelet: require('../pages/Relet/index').default,

    LoadableMyDevice: require('../pages/MyDevice/index').default,
    LoadableGateway: require('../pages/Gateway/index').default,

    LoadableLock: require('../pages/Lock/index').default,
    LoadableLockDetail: require('../pages/LockDetail/index').default,

    LoadableUser: require('../pages/User/index').default,
    LoadableAddUser: require('../pages/AddUser/index').default,
    LoadableEditUser: require('../pages/EditUser/index').default,
    LoadableRole: require('../pages/Role/index').default,
    LoadableAddRole: require('../pages/AddRole/index').default,
    LoadableEditRole: require('../pages/EditRole/index').default,

    LoadableLogin: require('../pages/Login/index').default,

    LoadableNews: require('../pages/News/index').default,
    LoadableAudittingNews: require('../pages/AudittingNews/index').default,
    LoadableAddNews: require('../pages/AddNews/index').default,
    LoadableAuditNews: require('../pages/AuditNews/index').default,
    LoadableCheckNews: require('../pages/CheckNews/index').default,

    // LoadableTenant: require('../pages/Tenant/index').default

    LoadableRegister: require('../pages/Register/index').default,
    LoadableForgetPassword: require('../pages/ForgetPassword/index').default
  }

module.exports = loadable