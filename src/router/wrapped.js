import React from 'react'

import {
  LoadableStatistics,
  // LoadableHousingResource,
  // LoadableRoomDetail,
  // LoadableAddRenter,
  // LoadableRelet,

  // LoadableMyDevice,
  // LoadableGatewayManagement,

  // LoadableLock,
  // LoadableLockDetail,

  LoadableStaff,
  // LoadableAddStaff,
  // LoadableEditStaff,
  LoadableRole,
  LoadableAddRole,
  LoadableLogin

} from './loadable'

class Statistics extends React.Component {
  render() {
    return <LoadableStatistics />
  }
}

// class HousingResource extends React.Component {
//   render() {
//     return <LoadableHousingResource />
//   }
// }

// class RoomDetail extends React.Component {
//   render() {
//     return <LoadableRoomDetail />
//   }
// }

// class AddRenter extends React.Component {
//   render() {
//     return <LoadableAddRenter />
//   }
// }

// class Relet extends React.Component {
//   render() {
//     return <LoadableRelet />
//   }
// }

// class MyDevice extends React.Component {
//   render() {
//     return <LoadableMyDevice />
//   }
// }

// class GatewayManagement extends React.Component {
//   render() {
//     return <LoadableGatewayManagement />
//   }
// }

// class Lock extends React.Component {
//   render() {
//     return <LoadableLock />
//   }
// }

// class LockDetail extends React.Component {
//   render() {
//     return <LoadableLockDetail />
//   }
// }

class Staff extends React.Component {
  render() {
    return <LoadableStaff />
  }
}

// class AddStaff extends React.Component {
//   render() {
//     return <LoadableAddStaff />
//   }
// }

// class EditStaff extends React.Component {
//   render() {
//     return <LoadableEditStaff />
//   }
// }

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

module.exports = {
  Statistics,
  // HousingResource,
  // RoomDetail,
  // AddRenter,
  // Relet,
  // MyDevice,
  // GatewayManagement,
  // Lock,
  // LockDetail,
  Staff,
  // AddStaff,
  // EditStaff,
  Role,
  AddRole,
  Login
}