import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom'
import './index.css';

//import layout
import CustomerLayout from './layout/customer/CustomerLayout';
import StaffLayout from './layout/staff/StaffLayout';
import HistoryLayout from './layout/staff/HistoryLayout';
import ManagerLayout from './layout/staff/ManagerLayout';


//import pages
import Error from './pages/Error';
import Table from './pages/staff/Table';
import Menu from './pages/staff/Menu';
import Reservation from './pages/staff/Reservation';
import OrderHistory from './pages/staff/history/OrderHistory';
import ReceiptHistory from './pages/staff/history/ReceiptHistory';
import OrderQueue from './pages/staff/OrderQueue';
import Dashboard from './pages/staff/manager/Dashboard';
import MenuManage from './pages/staff/manager/MenuManage';
import StaffManage from './pages/staff/manager/StaffManage';
import Home from './pages/customer/Home';
import CustomerMenu from './pages/customer/CustomerMenu';
import CustomerReservation from './pages/customer/CustomerReservation';
import Login from './pages/Login';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to={"./customer"} />} />
      <Route path="customer" element={<CustomerLayout />}>
        <Route index element={<Navigate to={"./home"} />} />
        <Route path="home" element={<Home />} />
        <Route path="menu" element={<CustomerMenu />} />
        <Route path="reservation" element={<CustomerReservation />} />
      </Route>

      <Route path="staff-login" element={<Login />} />

      <Route path="staff" element={<StaffLayout />}>
        <Route index element={<Navigate to={"./table"} />} />
        <Route path="table" element={<Table />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reservation" element={<Reservation />} />

        <Route path="history" element={<HistoryLayout />}>
          <Route index element={<Navigate to={"./order-history"} />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="receipt-history" element={<ReceiptHistory />} />
        </Route>

        <Route path="order-queue" element={<OrderQueue />} />

        <Route path="manager" element={<ManagerLayout />}>
          <Route index element={<Navigate to={"./dashboard"} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu-management" element={<MenuManage />} />
          <Route path="staff-management" element={<StaffManage />} />
        </Route>
      </Route>

      <Route path="*" element={<Error />}></Route>
    </Route>

  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
