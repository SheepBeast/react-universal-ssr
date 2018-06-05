import React from 'react'
import Loadable from 'react-loadable'

const loading = () => <div>loading...</div>

var loadable = __TERMINAL__ === 'browser' ? {
  LoadableStatistic: Loadable({
    loader: () => import('../pages/Statistic/index'),
    loading
  }),

  // LoadableHousingResource: Loadable({
  //   loader: () => import('../pages/HouseingResource/index'),
  //   loading
  // }),
  // LoadableRoomDetail: Loadable({
  //   loader: () => import('../pages/RoomDetail/index'),
  //   loading
  // }),
  // LoadableAddRenter: Loadable({
  //   loader: () => import('../pages/AddRenter/index'),
  //   loading
  // }),
  // LoadableRelet: Loadable({
  //   loader: () => import('../pages/Relet/index'),
  //   loading
  // }),

  // LoadableMyDevice: Loadable({
  //   loader: () => import('../pages/MyDevice/index'),
  //   loading
  // }),
  // LoadableGatewayManagement: Loadable({
  //   loader: () => import('../pages/GatewayManagement/index'),
  //   loading
  // }),

  // LoadableLock: Loadable({
  //   loader: () => import('../pages/Lock/index'),
  //   loading
  // }),
  // LoadableLockDetail: Loadable({
  //   loader: () => import('../pages/LockDetail/index'),
  //   loading
  // }),
  LoadableStaff: Loadable({
    loader: () => import('../pages/Staff/index'),
    loading
  }),
  // LoadableAddStaff: Loadable({
  //   loader: () => import('../pages/AddStaff/index'),
  //   loading
  // }),
  // LoadableEditStaff: Loadable({
  //   loader: () => import('../pages/EditStaff/index'),
  //   loading
  // }),
  // LoadableRole: Loadable({
  //   loader: () => import('../pages/Role/index'),
  //   loading
  // }),
  // LoadableAddRole: Loadable({
  //   loader: () => import('../pages/AddRole/index'),
  //   loading
  // })
} : {
    LoadableStatistic: require('../pages/Statistic/index').default,
    // LoadableHousingResource: require('../pages/HouseingResource/index').default,
    // LoadableRoomDetail: require('../pages/RoomDetail/index').default,
    // LoadableAddRenter: require('../pages/AddRenter/index').default,
    // LoadableRelet: require('../pages/Relet/index').default,

    // LoadableMyDevice: require('../pages/MyDevice/index').default,
    // LoadableGatewayManagement: require('../pages/GatewayManagement/index').default,

    // LoadableLock: require('../pages/Lock/index').default,
    // LoadableLockDetail: require('../pages/LockDetail/index').default,

    LoadableStaff: require('../pages/Staff/index').default,
    // LoadableAddStaff: require('../pages/AddStaff/index').default,
    // LoadableEditStaff: require('../pages/EditStaff/index').default,
    // LoadableRole: require('../pages/Role/index').default,
    // LoadableAddRole: require('../pages/AddRole/index').default
  }

module.exports = loadable