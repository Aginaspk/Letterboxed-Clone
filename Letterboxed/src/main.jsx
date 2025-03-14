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
        path:'/reset-password/:token',
        element:<NewPass/>
      }
      
    ]
  },
  {
    path:'/pro',
    element:<Prote/>
  },
  {
    path:'/reset-password',
    element:<ResetPass/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
