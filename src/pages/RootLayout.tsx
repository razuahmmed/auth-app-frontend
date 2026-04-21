import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'

function RootLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toaster />
      <div className="flex-shrink-0 sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout
