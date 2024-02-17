import React, { useState, useEffect } from 'react'
import Page from'../../app/userList/page'
import { useSelector , useDispatch} from 'react-redux';
import { logoutUser } from '@/redux/reducerSlices/userSlice';

const Nav = () => {
  const { userDetails} = useSelector(state => state.user);
  const [showSearch, setShowSearch] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id !== 'search') {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <div style={{ outline: 'none' }}>
      <div className="navbar ">
        <div className="flex-1 gap-4">
          <div><img src="Chautari_logo.png" width={45} height={45} className="rounded-full " /></div>
          <div className="form-control">
            <input id="search" type="text" placeholder="Search" className="input input-bordered w-24  md:w-auto hidden lg:block" onClick={() => setShowSearch(true)} />
            {showSearch && <div className="absolute top-[7.5vh] left-0 z-10 bg-white w-[355px] h-[93vh] hidden lg:block "><Page /></div>}
          </div>
        </div>
        <div className="flex-0 gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-20 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between"> <b>logged in as {userDetails.email}</b>
                </a>
              </li>
              <li><a href ="/" onClick={async () => { await dispatch(logoutUser())}}>Logout</a></li>
              <li><a href = '/settings'>Settings</a></li>
            </ul>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Nav;