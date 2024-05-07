import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Datagrid from './Datagrid'

function App() {
 return (
 <div className="App">
 { Datagrid() }
 </div>
 );
}
export default App
