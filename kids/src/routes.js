import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import Map from 'src/views/Map/Map';
import DashboardView from 'src/views/reports/DashboardView';
// import LoginView from 'src/views/auth/LoginView';
import ProductListView from 'src/views/product/ProductListView';
// import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import AboutUs from 'src/views/AboutUs/AboutusView';
import LoginRegister from 'src/views/auth/components/login/Loginregister';
import FarmerQueries from 'src/views/FarmerQueries/FarmerQueries/QuestionTable'
import NewPassword from './views/auth/components/login/NewPassword';
import ChangePassword from './views/account/AccountView/ChangePassword';
import Admin from './views/Admin/Admin/index';
import VerifyAccount from './views/auth/components/login/VerifyAccount';
import WeatherForecast from './views/WeatherForecast/WeatherView';
import Progress from './views/progress/DashboardView'
import Story from './views/StoryBook/DashboardView'
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'Map', element: <Map /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'aboutus', element: <AboutUs /> },
      { path: 'FarmerQueries', element: <FarmerQueries /> },
      { path: 'Admin', element: <Admin /> },
      { path: 'WeatherForecast', element: <WeatherForecast /> },
      { path: 'Progress', element: <Progress /> },
      { path: 'story', element: <Story /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'registerlogin', element: <LoginRegister /> },
      { path: 'NewPassword/:token', element: <NewPassword /> },
      { path: 'VerifyAccount/:token', element: <VerifyAccount /> },
      { path: 'verify/:token', element: <ChangePassword /> },
      { path: '/', element: <Navigate to="/registerlogin" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
