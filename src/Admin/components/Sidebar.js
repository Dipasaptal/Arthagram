import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
// import { Person } from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import RateReviewIcon from '@mui/icons-material/RateReview'; // New icon for Testimonial Master
import CategoryIcon from '@mui/icons-material/Category';
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ContactsIcon from '@mui/icons-material/Contacts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';

import AdminNavbar from './AdminNavbar';
// import ServicesMaster from './AdminServicesMaster';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const menuItems = useMemo(
    () => [
      {
        path: '/admin',
        name: 'Dashboard',
        icon: <HomeIcon className='mr-2' />,
      },
      // {
      //   path: '/admin/userMaster',
      //   name: 'User Master',
      //   icon: <AccountCircleIcon className='mr-2' />,
      // },
    //   {
    //     path: '/admin/productmasterlist',
    //     name: 'Product Master',
    //     icon: <StorefrontIcon className='mr-2' />,
    //   },
    //   {
    //     path: '/admin/servicemasterlist',
    //     name: 'Service Master',
    //     icon: <BuildIcon className='mr-2' />,
    //   },

       {
         path: '/admin/testimonialmasterlist',
         name: 'Testimonial Master',
         icon: <RateReviewIcon className='mr-2' />,
       }, 
    //   {
    //     path: '/admin/categorymasterlist',
    //     name: 'Category Master',
    //     icon: <CategoryIcon className='mr-2' />,
    //   },

    //   {
    //     path: '/admin/testimonialmasterlist',
    //     name: 'Testimonial Master',
    //     icon: <RateReviewIcon className='mr-2' />,
    //   }, 
      {
        path: '/admin/categorymaster',
        name: 'Category Master',
        icon: <CategoryIcon className='mr-2' />,
      },

      {
        path: '/admin/contactmasterlist',
        name: 'Contact Master',
        icon: <ContactsIcon className='mr-2' />,
      },
      {
        path: '/admin/addressmasterlist',
        name: 'Address Master',
        icon: <LocationOnIcon className='mr-2' />,
      },
      {
        path: '/admin/aboutusmaster',
        name: ' AboutUs Master',
        icon: <StorefrontIcon className='mr-2' />,
      },
      {
        path: '/admin/bannermaster',
        name: 'Banner Master',
        icon: <StorefrontIcon className='mr-2' />,
      },
      {
        path: '/admin/servicemaster',
        name: 'Services Master',
        icon: <MiscellaneousServicesIcon className="mr-2" />,
      },
      {
        path: '/admin/socialmedia',
        name: 'Social Media',
        icon: <ShareIcon className="mr-2" />

      },
    //   {
    //     path: '/admin/socialmediamaster',
    //     name: 'Social Media Master',
    //     icon: <StorefrontIcon className='mr-2' />,
    //   },
    //   {
    //     path: '/admin/serviceenquiry',
    //     name: 'Service Enquiry Master',
    //     icon: <StorefrontIcon className='mr-2' />,
    //   },
    ],
    []  
  );

  return (
    <div className='flex'>
      <aside
        className={`bg-white text-black shadow-lg top-0 left-0 h-screen p-4 m-5 rounded-3xl transition-all duration-300 flex flex-col ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo Section */}
        <div
          className={`flex items-center justify-between ${
            isOpen ? 'mb-8' : 'mb-0'
          } transition-all duration-300`}
        >
          <div className='flex items-center space-x-3'>
            {isOpen && (
              <>
                <img
                  src='/img/logo.jpg'
                  alt='Company Logo'
                  className='w-10 h-10'
                />
                <span className='text-2xl font-semibold pt-1'>
                  Something
                </span>
              </>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition ml-3'
            aria-label='Toggle sidebar'
          >
            <MenuIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-grow mt-4 overflow-y-auto'>
          <ul className='space-y-4'>
            {menuItems?.map(({ path, name, icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center px-3 py-3 text-base rounded-lg  ${
                    location.pathname === path
                      ? 'bg-blue-500 text-white'
                      : 'text-black hover:bg-blue-300'
                  }`}
                >
                  {icon}
                  <span
                    className={`transition-all duration-300 ${
                      !isOpen && 'hidden'
                    }`}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            ))}

            
          </ul>
        </nav>
      </aside>

<div className='flex flex-col w-[100%]'>
<AdminNavbar/>
      <Outlet />
</div>

    </div>
  );
};

export default Sidebar;
 
//abc
