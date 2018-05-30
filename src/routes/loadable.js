import Loadable from 'react-loadable'

const loading = (
  <div>loading...</div>
)

var loadable = __TERMINAL__ === 'browser' ? {
  LoadableStatistic: Loadable({loader: import('../containers/Statistic/index.jsx'), loading}),
  LoadableHousingResource: Loadable({loader:import('../containers/HouseingResource/index.jsx'),loading})
} : {
  LoadableStatistic: require('../containers/Statistic/index.jsx').default,
  LoadableHousingResource: require('../containers/HouseingResource/index.jsx').default
}

module.exports = loadable