import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  createRoot(document.getElementById('root')).render(
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: 'red' }}>
      <h2>Missing Clerk Publishable Key</h2>
      <p>Please add your <strong>VITE_CLERK_PUBLISHABLE_KEY</strong> to the <code>client/.env.local</code> file and restart the development server.</p>
    </div>
  );
} else {
  createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>,
  )
}
