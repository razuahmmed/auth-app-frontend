import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import Services from './pages/Services.tsx'
import About from './pages/About.tsx'
import RootLayout from './pages/RootLayout.tsx'
import Userhome from './pages/users/Userhome.tsx'
import Userlayout from './pages/users/Userlayout.tsx'
import Userprofile from './pages/users/Userprofile.tsx'
import OAuthSuccess from './pages/OAuthSuccess.tsx'
import OAuthFailure from './pages/OAuthFailure.tsx'
import Account from './pages/settings/Account.tsx'
import Security from './pages/settings/Security.tsx'
import Appearance from './pages/settings/Appearance.tsx'
import ManageUser from './pages/admin/ManageUser.tsx'
import ManageMenu from './pages/admin/ManageMenu.tsx'
import Reports from './pages/admin/Reports.tsx'
import LdapLogin from './pages/LdapLogin.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />} >
        <Route index element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ldap/login' element={<LdapLogin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<About />} />
        <Route path="oauth/success" element={<OAuthSuccess />} />
        <Route path="oauth/failure" element={<OAuthFailure />} />
      </Route>

      <Route element={<Userlayout />}>
          <Route path="/dashboard" element={<Userhome />} />
          <Route path="/profile" element={<Userprofile />} />

          <Route path='/settings/account' element={<Account />} />
          <Route path='/settings/security' element={<Security />} />
          <Route path='/settings/theme' element={<Appearance />} />

          <Route path="/admin/users" element={<ManageUser />} />
          <Route path="/admin/menus" element={<ManageMenu />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>
    </Routes>
  </BrowserRouter>,
)
