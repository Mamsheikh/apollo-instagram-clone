import React, { useState } from 'react';
import {
  SearchIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  HeartIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import instaLogo from '../../lib/assets/insta-logo.png';
import instaLogo1 from '../../lib/assets/instagram-logo.png';
import person from '../../lib/assets/person-1.jpg';
import { Dropdown } from './components';
export const AppHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='sticky top-0 z-50 shadow-sm border-b bg-white'>
      {/* Left Nav */}
      <div className='flex justify-between   max-w-6xl mx-5 xl:mx-auto'>
        <div className='relative w-32 hidden py-3 lg:inline-grid cursor-pointer'>
          <img className='object-cover' src={instaLogo} alt='' />
        </div>
        <div className='relative py-3  w-10 lg:hidden flex-shrink-0 cursor-pointer '>
          <img className='object-cover' src={instaLogo1} alt='' />
        </div>

        {/* Middle */}
        <div className='max-w-xs hidden small:block'>
          <div className='relative mt-1 p-3 rounded-md'>
            <div className='absolute  inset-y-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-500' />
            </div>
            <input
              className='block w-full pl-10 bg-gray-50 sm:text-sm border border-gray-300 rounded-md focus:ring-black focus:outline-none focus:border-black'
              type='text'
              placeholder='Search'
            />
          </div>
        </div>

        {/* Left Nav */}
        <div className='flex items-center justify-end space-x-4'>
          <HomeIcon className='navBtn' />
          <MenuIcon
            className='w-7 h-7 md:hidden cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className='relative '>
            <PaperAirplaneIcon className='navBtn rotate-45' />
            <div className='absolute -top-2 -right-2 hidden animate-pulse bg-red-500 w-5 h-5 md:flex items-center justify-center rounded-full text-white text-xs'>
              3
            </div>
          </div>
          <PlusCircleIcon className='navBtn' />
          <UserGroupIcon className='navBtn' />
          <HeartIcon className='navBtn' />
          <Dropdown />
        </div>
      </div>
      <div className={`px-5 py-3 ${isOpen ? '' : 'hidden'}`}>
        <div className=''>
          <div className='flex '>
            {' '}
            <HomeIcon className='h-5 w-5' />{' '}
            <span className='ml-3 text-gray-800 font-semibold'>Home</span>
          </div>
          <div className='relative '>
            <div className='flex mt-2 items-center'>
              {' '}
              <PaperAirplaneIcon className='h-5 w-5' />{' '}
              <span className='ml-3 text-gray-800 font-semibold'>Messages</span>
            </div>
            <div className='absolute -top-3 animate-pulse bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-white text-xs'>
              3
            </div>
          </div>
          <div className='flex mt-2 items-center'>
            {' '}
            <PlusCircleIcon className='h-5 w-5' />{' '}
            <span className='ml-3 text-gray-800 font-semibold'>Add Post</span>
          </div>
          <div className='flex mt-2 items-center'>
            {' '}
            <UserGroupIcon className='h-5 w-5' />
            <span className='ml-3 text-gray-800 font-semibold'> Groups</span>
          </div>
          <div className='flex mt-2 items-center'>
            {' '}
            <HeartIcon className='h-5 w-5' />
            <span className='ml-3 text-gray-800 font-semibold'> Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
