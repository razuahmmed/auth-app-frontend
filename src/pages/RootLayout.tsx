import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'

function RootLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toaster />
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout