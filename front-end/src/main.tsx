import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.tsx'
import ErrorPage from './routes/error-page.tsx'
import Login from './routes/login.tsx'
import Register from './routes/register.tsx'
import Dashboard from './routes/dashboard.tsx'
import Course from './routes/classe.tsx'
import ProtectedRoute from './routes/protected.route.tsx'
import GuestRoute from './routes/guest.route.tsx'
import { AuthProvider } from './components/contexts/AuthContext.tsx'
import './index.css'
import PostForm from './routes/post.form.tsx'
import CourseForm from './routes/course.form.tsx'
import ClasseForm from './routes/classe.form.tsx'
import Roles from './routes/roles.tsx'
import Courses from './routes/courses.tsx'
import RoleForm from './routes/role.form.tsx'
import Classes from './routes/classes.tsx'
import Classe from './routes/classe.tsx'
import Posts from './routes/posts.tsx'
import UserForm from './routes/user.form.tsx'
import PostView from './routes/post.tsx'
import AdminRoute from './routes/admin.route.tsx'
import LeaderRoute from './routes/leader.route.tsx'
import ResetPassword from './routes/reset-password/reset.tsx'
import SolicitationPassword from './routes/reset-password/solicitation.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/classes/:id',
    element: (
      <ProtectedRoute>
        <Classe />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/posts/create',
    element: (
      <ProtectedRoute>
        <PostForm />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/courses/create',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <CourseForm />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/classes/create',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <ClasseForm />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/roles/create',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <RoleForm />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/roles',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <Roles />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  { 
    path: '/courses',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <Courses />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  { 
    path: '/classes',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <Classes />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/classes/:id/edit',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <ClasseForm />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/roles/:id/edit',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <RoleForm />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/courses/:id/edit',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <CourseForm />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/posts/:postId/edit',
    element: (
      <ProtectedRoute>
        <PostForm />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/posts',
    element: (
      <ProtectedRoute>
        <LeaderRoute>
          <Posts />
        </LeaderRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/users/edit',
    element: (
      <ProtectedRoute>
        <UserForm />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/posts/:postId',
    element: (
      <ProtectedRoute>
        <PostView />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/password/solicitation',
    element: <SolicitationPassword />,
    errorElement: <ErrorPage />
  },
  {
    path: '/password-reset/:token',
    element: <ResetPassword />,
    errorElement: <ErrorPage />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
