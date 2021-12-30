import { Menu } from '@headlessui/react';
import { LogoutIcon, UserIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import person from '../../../../lib/assets/person-1.jpg';
export const Dropdown = () => {
  return (
    <div className=' fixed top-15 right-14'>
      <Menu as='div'>
        <Menu.Button>
          <img
            className='h-10 w-10 cursor-pointer rounded-full object-cover'
            src={person}
            alt=''
          />
        </Menu.Button>
        <Menu.Items className='absolute right-0  w-40 shadow-lg mt-2 origin-top-left divide-y rounded-md bg-white'>
          <Menu.Item>
            {({ active }) => (
              <Link
                className='p-2 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-blue-500 hover:text-white'
                to='/profile'
              >
                <UserIcon className='w-5 h-5 mr-3' /> Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                className='p-2 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-blue-500 hover:text-white'
                to='/logout'
              >
                <LogoutIcon className='w-5 h-5 mr-3' /> Logout
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};
