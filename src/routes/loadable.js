import React from 'react'
import Loadable from 'react-loadable'

const loading = () => <div>loading...</div>

var loadable = __TERMINAL__ === 'browser' ? {
  LoadableStatistic: Loadable({
    loader: () => import('../pages/Statistic/index'),
    loading
  }),

  LoadableHousingResource: Loadable({
    loader: ()=>import('../pages/HouseingResource/index'),
    loading
  }),
  LoadableRoomDetail: Loadable({
    loader: ()=>import('../pages/RoomDetail/index'),
    loading
  }),
  LoadableAddRenter: Loadable({
    loader: ()=>import('../pages/AddRenter/index'),
    loading
  }),
  LoadableRelet : Loadable({
    loader: ()=>import('../pages/Relet/index'),
    loading
  }),

  LoadableMyDevice: Loadable({
    loader: ()=>import('../pages/MyDevice/index'),
    loading
  }),
  LoadableGatewayManagement: Loadable({
    loader: ()=>import('../pages/GatewayManagement/index'),
    loading
  }),

  LoadableLock: Loadable({
    loader: ()=>import('../pages/Lock/index'),
    loading
  })
} : {
    LoadableStatistic: require('../pages/Statistic/index').default,
    LoadableHousingResource: require('../pages/HouseingResource/index').default,
    LoadableRoomDetail: require('../pages/RoomDetail/index').default,
    LoadableAddRenter: require('../pages/AddRenter/index').default,
    LoadableRelet: require('../pages/Relet/index').default,

    LoadableMyDevice: require('../pages/MyDevice/index').default,
    LoadableGatewayManagement: require('../pages/GatewayManagement/index').default,

    LoadableLock: require('../pages/Lock/index').default
  }

module.exports = loadable