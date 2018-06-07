import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import {
    Statistics,
    Property,
    RoomDetail,
    AddRenter,
    Relet,
    Gateway,
    MyDevice,
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
    AuditNews
} from './wrapped'

export default function getRoutes() {
    return (
        <div style={{ minWidth: 1563, maxWidth: 1563 }}>
            <Route path="/" component={News} exact />

            <Route path="/statistics" component={Statistics} />

            <Route path="/property" component={Property} />
            <Route path="/property-room-detail" component={RoomDetail} />
            <Route path="/property-add-renter" component={AddRenter} />
            <Route path="/property-relet" component={Relet} />

            <Route path="/device-list" component={MyDevice} />
            <Route path="/device-gateway" component={Gateway} />
            <Route path="/device-lockList" component={Lock} />
            <Route path="/device-lockDetail" component={LockDetail} />

            <Route path="/user" component={User} />
            <Route path="/user-add" component={AddUser} />
            <Route path="/user-edit" component={EditUser} />

            <Route path="/role" component={Role} />
            <Route path="/role-add" component={AddRole} />


            <Route path="/news-list" component={News} />
            <Route path="/news-add" component={AddNews} />
            <Route path="/news-audit" component={AuditNews} />

            <Route path="/login" component={Login} />
        </div>

    )
}