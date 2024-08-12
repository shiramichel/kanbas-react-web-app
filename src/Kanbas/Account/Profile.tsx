import * as client from "./client";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  
  /*
  const fetchProfile = async () => {
    try {
    const account = await client.profile();
    setProfile(account);
} catch (err: any) {
    navigate("/Kanbas/Account/Signin");
  }
  };
  useEffect(() => { fetchProfile(); }, []);
  */
 
  const fetchProfile = useCallback(async () => {
    try {
      const account = await client.profile();
      //console.log(account);
      setProfile(account);
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  }, [navigate]);
  
  useEffect(() => { fetchProfile(); }, [fetchProfile]);
  
  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
     {profile && (
                <form>
                    <div className="form-group">
                       
                        <input
                            id="inputUsername" 
                            className="form-control" 
                            placeholder="Username" 
                            type="text" 
                            value={profile.username} 
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        
                        <input 
                            id="inputPassword" 
                            className="form-control" 
                            placeholder="Password" 
                            type="text" 
                            value={profile.password} 
                            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        
                        <input 
                            id="inputFirstName"
                            className="form-control" 
                            placeholder="First Name" 
                            type="text" 
                            value={profile.firstName} 
                            onChange={(e) =>setProfile({ ...profile, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                       
                        <input 
                            id="inputLastName"
                            className="form-control" 
                            placeholder="Last Name" 
                            type="text" 
                            value={profile.lastName} 
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        
                        <input 
                            id="inputDob"
                            className="form-control" 
                            value={profile.dob} 
                            type="date" 
                            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        
                        <input 
                            id="inputEmail"
                            className="form-control" 
                            placeholder="Email Address"
                            type="email"
                            value={profile.email} 
                            onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })}/>
                    </div>
                    <div className="form-group">
                        
                        <select 
                            id="selectRole"
                            className="form-control" 
                            value={profile.role}
                            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </div>
                </form>
            )}
      <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
    Sign out
  </button>

    </div>
  );
}

