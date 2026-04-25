import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { LandingPage } from './pages/LandingPage'
import { BlogFeedPage } from './pages/blog/BlogFeedPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForumPage } from './pages/forum/ForumPage'
import { SupervisorDirectoryPage } from './pages/supervisor/SupervisorDirectoryPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'feed', element: <BlogFeedPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forum', element: <ForumPage /> },
      { path: 'supervisors', element: <SupervisorDirectoryPage /> },
      { path: 'profile', element: <ComingSoonPage /> },
      { path: 'about', element: <ComingSoonPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
