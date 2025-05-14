import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import BookDetail from './pages/BookDetail.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BookManagePage from './pages/BookManagePage.jsx';
import UserManagePage from './pages/UserManagePage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import './css/App.css';

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "cart",
                element: <PrivateRoute><CartPage /></PrivateRoute>
            },
            {
                path: "orders",
                element: <PrivateRoute><OrdersPage /></PrivateRoute>
            },
            {
                path: "profile",
                element: <PrivateRoute><ProfilePage /></PrivateRoute>
            },
            {
                path: "book/:id",
                element: <BookDetail />
            },
            {
                path: "book-manage",
                element: <AdminRoute><BookManagePage /></AdminRoute>
            },
            {
                path: "user-manage",
                element: <AdminRoute><UserManagePage /></AdminRoute>
            }
        ]
    }
])

function App() {
  return <RouterProvider router={Router} />;
}

export default App;

