import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Root from './routes/root'
import Admin from './routes/admin/admin'
import WowDesarrollos from './routes/admin/wowdesarrollos/view.wowdesarrollos'
import EtFundacion from './routes/admin/etfundacion/view.etfundacion'
// import EtFundacion from './routes/admin/etfundacion/view.etfundacion'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        path: "wowdesarrollos",
        element: <WowDesarrollos />
      },
      {
        path: "etfundacion",
        element: <EtFundacion />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
