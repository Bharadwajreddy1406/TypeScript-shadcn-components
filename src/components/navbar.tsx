import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, Outlet } from 'react-router-dom'
const navItems = [
  { name: 'Dashboard', href: '/' },
  { name: 'Completed Interviews', href: '/completed-interviews' },
  { name: 'Performance', href: '/student-performance' },
]

export function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('')
  const [isHoveringProfile, setIsHoveringProfile] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg  shadow-md bg-gradient-to-b  from-grey-900/10 to-grey-200/90">
      {/* <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gradient-to-b from-teal-100/80 to-teal-100/40"> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
              <img className="h-14 w-auto" src="/Logo.png" alt="Logo" /></Link>
            </div>
            <div className="hidden md:flex flex-grow justify-center">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      activeItem === item.name ? 'font-bold shadow-md' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveItem(item.name)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full object-contain"
                      src="OWL.png"
                      alt=""
                    />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Name: BOB</DropdownMenuItem>
                  <DropdownMenuItem>Roll Number: 22BD1A1661Z</DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/profile" 
                      className="flex items-center justify-between w-full"
                      onMouseEnter={() => setIsHoveringProfile(true)}
                      onMouseLeave={() => setIsHoveringProfile(false)}
                    >
                      View Profile
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isHoveringProfile ? 1 : 0, x: isHoveringProfile ? 0 : -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="-mr-2 flex md:hidden">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              id="mobile-menu"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`text-gray-800 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium ${
                      activeItem === item.name ? 'font-bold shadow-md' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveItem(item.name)
                      setIsOpen(false)
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-contain"
                      src="OWL.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">BOB</div>
                    <div className="text-sm font-medium text-gray-500">22BD1A1661Z</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link 
                    to="/profile" 
                    className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-900 hover:bg-gray-100"
                    onMouseEnter={() => setIsHoveringProfile(true)}
                    onMouseLeave={() => setIsHoveringProfile(false)}
                  >
                    View Profile
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: isHoveringProfile ? 1 : 0, x: isHoveringProfile ? 0 : -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <Outlet />

      {/* Sample Hero Section */}
      {/* <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-2xl">Experience the power of our innovative solutions</p>
        </div>
      </div> */}
    </>
  )
}