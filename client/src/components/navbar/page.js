import { useSelector} from 'react-redux';
import { logoutUser } from '@/redux/reducerSlices/userSlice';

const Nav = () => {
  const { userDetails} = useSelector(state => state.user);


  return (
    <div style={{ outline: 'none' }}>
      <div className="navbar ">
        <div className="flex-1 gap-4">
          <div><img src="Chautari_logo.png" width={45} height={45} className="rounded-full " /></div>
            <h2>Chautari</h2>
        </div>
        <div className="flex-0 gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-20 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="/profile.jpg"/>
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