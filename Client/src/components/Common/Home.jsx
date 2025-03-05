import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { UserAuthorContextObj } from "../../context/UserAuthorContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate=useNavigate()

  async function onSelectRole(e) {
    // console.log(e.target.value)
    setError('')
    const selectedRole = e.target.value;
    console.log(selectedRole)
    currentUser.role = selectedRole;
    let res = null;
    // // console.log(currentUser)
    try {


      if (selectedRole === 'author') {
        res = await axios.post('http://localhost:3000/author-api/author', currentUser)
        let { message, payload } = res.data;
        // console.log(message, payload)
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload })
          //save user to localstorage
          localStorage.setItem("currentuser",JSON.stringify(payload))
          // setError(null)
        } else {
          setError(message);
        }
      }




      if (selectedRole === 'user') {
        console.log("user selected")
        res = await axios.post('http://localhost:3000/user-api/user', currentUser)
        let { message, payload } = res.data;
        console.log(message)
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload })
           //save user to localstorage
           localStorage.setItem("currentuser",JSON.stringify(payload))
        } else {
          setError(message);
        }
      }
      

    } catch (error) {
      
    }

  }

  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded])

  useEffect(() => {

    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      console.log("first")
      navigate(`/author-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  return (
    <div>
      {isSignedIn === false && (
        <div>
          <p className="lead">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
            neque consequatur nemo, enim expedita alias nobis iste obcaecati,
            eum dolor deserunt voluptatum odio aperiam, officiis sequi
            voluptates molestias atque sint?
          </p>
          <p className="lead">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
            neque consequatur nemo, enim expedita alias nobis iste obcaecati,
            eum dolor deserunt voluptatum odio aperiam, officiis sequi
            voluptates molestias atque sint?
          </p>
          <p className="lead">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
            neque consequatur nemo, enim expedita alias nobis iste obcaecati,
            eum dolor deserunt voluptatum odio aperiam, officiis sequi
            voluptates molestias atque sint?
          </p>
        </div>
      )}


{isSignedIn === true && (
  <div className="container mt-4">
  {/* User Profile Section */}
  <div className="d-flex flex-column align-items-center bg-info p-4 rounded shadow">
    <img
      src={user.imageUrl}
      width="120px"
      className="rounded-circle border border-white shadow-sm mb-3"
      alt="User Profile"
    />
    <h2 className="mb-1 text-white">{user.firstName}</h2>
    <p className="text-light fs-5">{user.emailAddresses[0].emailAddress}</p>
  </div>

  {/* Role Selection */}
  <div className="text-center mt-4">
    <h4 className="fw-bold">Select Role</h4>
    {error.length !== 0 && (
      <p className="text-danger fs-5 fw-semibold">{error}</p>
    )}

    <div className="d-flex justify-content-center gap-4 mt-3">
      <div className="form-check">
        <input
          type="radio"
          name="role"
          id="author"
          value="author"
          className="form-check-input"
          onChange={onSelectRole}
        />
        <label htmlFor="author" className="form-check-label fs-5">
          Author
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="role"
          id="user"
          value="user"
          className="form-check-input"
          onChange={onSelectRole}
        />
        <label htmlFor="user" className="form-check-label fs-5">
          User
        </label>
      </div>
    </div>
  </div>
</div>
)}
    </div>
  );
}

export default Home;
