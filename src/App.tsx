import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Viewer3DModelViewer from './Model3D/Viewer3D/Viewer3DModelViewer'
import Viewer3DThree from './Model3D/Viewer3D/Viewer3DThree'
import UrlProvider from './Model3D/UrlProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <div className="card">
        <Viewer3DThree filePath={'/chair_swan.usdz'} />
      </div>
      <div className="card">
      <Viewer3DModelViewer url="/2CylinderEngine.glb" />

      </div> */}
   {/* <UrlProvider url="/2CylinderEngine2.glb"/> */}
   <UrlProvider url="/chair_swan77.usdz"/>
   <Viewer3DThree filePath='/chair_swan77.usdz'/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
