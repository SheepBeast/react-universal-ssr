import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import {
    Statistics,
    Property,
    RoomDetail,
    AddTenant,
    Relet,
    Gateway,
    MyDevice,
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
    ForgetPassword,
    Register,

    Account,
    ModifyMobile
} from './wrapped'

export default function getRoutes() {
    return (
        <div>
            <Route path="/" component={Property} exact />

            <Route path="/statistics" component={Statistics} />

            <Route path="/property" component={Property} />
            <Route path="/property-room-detail" component={RoomDetail} />
            <Route path="/property-add-tenant" component={AddTenant} />
            <Route path="/property-relet" component={Relet} />

            <Route path="/device-list" component={MyDevice} />
            <Route path="/device-gateway" component={Gateway} />
            <Route path="/device-lock-list" component={LockList} />
            <Route path="/device-lock-detail" component={LockDetail} />

            <Route path="/user-list" component={User} />
            <Route path="/user-add" component={AddUser} />
            <Route path="/user-edit" component={EditUser} />

            <Route path="/role-list" component={Role} />
            <Route path="/role-add" component={AddRole} />
            <Route path="/role-edit" component={EditRole} />


            <Route path="/news-list" component={News} />
            <Route path="/news-list-auditting" component={AudittingNews} />
            <Route path="/news-add" component={AddNews} />
            <Route path="/news-edit" component={EditNews} />
            <Route path="/news-audit" component={AuditNews} />
            <Route path="/news-check" component={CheckNews} />

            {/* <Route path="/tenant-list" component={Tenant} /> */}

            <Route path="/register" component={Register} />

            <Route path="/login" component={Login} />
            <Route path="/forget-password" component={ForgetPassword} />

            <Route path="/account" component={Account} />
            <Route path="/account-modify-mobile" component={ModifyMobile} />
        </div>

    )
}