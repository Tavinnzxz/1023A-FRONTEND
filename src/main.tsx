import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import './index.css'

//import Container from './Container.tsx'
import Pagina from './Pagina.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/*<Container nome='Header'/>
      <Container nome='Body'/>
      <Container nome='Footer'/>*/}
      <Pagina />
    </BrowserRouter>
  </StrictMode>,
)