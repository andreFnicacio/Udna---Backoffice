/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
//import { } from "react-router-dom";
//import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';


import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Wallet from "views/Wallet/Wallet.js";
import Transactions from "views/Transactions/Wallet.js";
import Journey from "components/Submenu/Submenu";
import Coupon from "views/ Coupon/ Coupon";





const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "PAINEL DE CONTROLE",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "USUARIO",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/logistica",
    name: "LOGISTICA",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Wallet,
    layout: "/admin"
  },
  {
    path: "/transacoes",
    name: "TRANSAÇŌES",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Transactions,
    layout: "/admin"
  },
  {
    path: "/jorney",
    name: "JORNEY",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Journey,
    layout: "/admin"
  },
  {
    path: "/coupon",
    name: "COUPON",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Coupon,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;
