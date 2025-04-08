import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import BookDetail from './pages/BookDetail.jsx';
import './App.css';

const Router = createBrowserRouter([
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
                element: <CartPage />
            },
            {
                path: "orders",
                element: <OrdersPage />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "book/:id",
                element: <BookDetail />
            }
        ]
    }
])

function App() {
  return <RouterProvider router={Router} />;
}

export default App;

