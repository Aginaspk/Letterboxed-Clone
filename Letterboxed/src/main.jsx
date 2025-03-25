import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import Prote from './pages/Prote.jsx'
import ResetPass from './pages/ResetPass.jsx'
import NewPass from './pages/NewPass.jsx'
import { Toaster } from 'react-hot-toast'
import Filims from './pages/Filims.jsx'
import ViewFilim from './pages/ViewFilim.jsx'
import ListPage from './pages/ListPage.jsx'
import ViewList from './pages/ViewList.jsx'
import Members from './pages/Members.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path:'/filims',
        element:<Filims/>
      },
      {
        path: '/reset-password/:token',
        element: <NewPass />
      },
      {
        path:'/filims/:filim',
        element:<ViewFilim/>
      },
      {
        path:'/lists',
        element:<ListPage/>
      },
      {
        path:'/list/:listId',
        element:<ViewList/>
      },
      {
        path:'/members',
        element:<Members/>
      }

    ]
  },
  {
    path: '/pro',
    element: <Prote />
  },
  {
    path: '/reset-password',
    element: <ResetPass />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-left"
        toastOptions={{
          className: "font-medium w-[450px]",
          duration: 5000,
          style: {
            background: '#EE7000',
            color: '#fff',
            border: '1px solid #e07b30',
            padding: '5px 30px 5px 10px',
          },
          icon: null
        }}
      />
    </Provider>
  </StrictMode>,
)
