import { useClerk, useUser } from '@clerk/clerk-react';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthorContextObj } from '../../context/UserAuthorContext';

function Header() {
  const { signOut } = useClerk();
  const { currentUser,setCurrentUser } = useContext(UserAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  // console.log(user)
  const navigate=useNavigate()


  async function handleSignOut() {
    await signOut(); 
    setCurrentUser(null);
    localStorage.clear();
    navigate('/'); 
  }


  return (
    <div className="bg-secondary py-3">
      <nav className="d-flex justify-content-between align-items-center px-4">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img 
              src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png" 
              alt="Logo" 
              width="100px"
            />
          </Link>
        </div>
        <ul className="d-flex align-items-center list-unstyled mb-0">
          {!isSignedIn?<>
          <li>
            <Link to="signin" className="text-white text-decoration-none me-4">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="signup" className="text-white text-decoration-none">
              Sign Up
            </Link>
          </li>
          </>:(
            <div className="d-flex align-items-center">
              {/* User Profile Picture */}
              <img
                src={user.imageUrl}
                alt="User Profile"
                className="rounded-circle me-3"
                width="40px"
                height="40px"
              />

              {/* Sign Out Button */}
              <div>
                <button className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
              </div>
            </div>
          )}
          
        </ul>
      </nav>
    </div>
  );
}

export default Header;
