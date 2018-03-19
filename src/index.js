import 'babel-polyfill'
import './assets/styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import HelloWorld from './container/HelloWorld.jsx'

const render = (App) => {  
  ReactDOM.render(  
    <App/>,  
    document.getElementById('root')  
  )  
}

render(HelloWorld)

// Hot Module Replacement API   
if (module.hot) {  
  module.hot.accept('./container/HelloWorld.jsx', () => {  
    render(require('./container/HelloWorld.jsx').default)  
  })
}
