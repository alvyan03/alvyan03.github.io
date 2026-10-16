import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './3d-effects.ts'
import './3d-background.ts'
import './3d-ui.ts'
import './3d-ui.css'
import './3d-fx.ts'
import './3d-fx.ts'
import './3d-v4.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
