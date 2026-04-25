import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { LandingPage } from './pages/LandingPage'
import { BlogFeedPage } from './pages/blog/BlogFeedPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'feed', element: <BlogFeedPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
])
