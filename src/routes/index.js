import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Loadable from 'react-loadable'

// const Home = connect(state => {
//   return {
//     articles: state.articleReducer.articles,
//     articleLen: 0
//   }
// })(Home)

import {
  Statistic,
  HousingResource
} from './wrapped'

// const loading = () => <div>loading...</div>

// var LoadableStatistic = Loadable({
//   loader: () => import('../containers/Statistic/index.jsx'),
//   loading
// })

// class Statistic extends React.Component {
//   render() {
//     return <LoadableStatistic />
//   }
// }

// import {
//   HouseingResource
// } from '../containers'


// console.log('stata ->', Statistic)
// console.log('hosusing -->', HousingResource)

export default function getRoutes() {
  return (
    <div>
      <Route exact path="/" component={Statistic} />
      {/* <Route path="/LoadableDashboard" component={LoadableComponent} /> */}
      {/* <Route path="/HousingResource" component={HousingResource} /> */}
    </div>
  )
}