import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ContextProvider } from './context/Context'

import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"

ReactDOM.render(
  <ContextProvider>
    <App></App>
  </ContextProvider>,
  document.getElementById('root')
)
