import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Profile() {

    const navigate = useNavigate();
    
    // create a profile state variables 
    const [profile, setProfile] = useState({ 
        username: "", 
        password: "", 
        firstName: "", 
        lastName: "", 
        dob: "", 
        email: "", 
        role: "" 
    });

    // get profile information 
    const fetchProfile = async () => {
        const account = await client.profile();
        console.log("Account: ", account);

        // Extract the date part from the ISO string
        const dobDateString = account.dob ? new Date(account.dob).toISOString().split('T')[0] : "";

        // Update the profile with the formatted date
        setProfile({
            ...account,
            dob: dobDateString, 
            role: account.role,
        });

        console.log("Profile: ", profile);
    };

    // save an updated user profile by sending profile data to server
    const save = async () => {
        console.log("Profile Save: ", profile);
        await client.updateUser(profile);
    };
    
    // sign out of current profile
    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };
    
    useEffect(() => {fetchProfile();}, []);

    return (
        <div className="container">
            <h1>Profile</h1>
            {profile && (
                <form>
                    <div className="form-group mb-2">
                        <input
                            id="inputUsername" 
                            className="form-control" 
                            placeholder="Username" 
                            type="text" 
                            value={profile.username} 
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            id="inputPassword" 
                            className="form-control" 
                            placeholder="Password" 
                            type="text" 
                            value={profile.password} 
                            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            id="inputFirstName"
                            className="form-control" 
                            placeholder="First Name" 
                            type="text" 
                            value={profile.firstName} 
                            onChange={(e) =>setProfile({ ...profile, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            id="inputLastName"
                            className="form-control" 
                            placeholder="Last Name" 
                            type="text" 
                            value={profile.lastName} 
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            id="inputDob"
                            className="form-control" 
                            value={profile.dob} 
                            type="date" 
                            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            id="inputEmail"
                            className="form-control" 
                            placeholder="Email Address"
                            type="email"
                            value={profile.email} 
                            onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })}/>
                    </div>
                    <div className="form-group mb-2">
                        <select 
                            id="selectRole"
                            className="form-control" 
                            value={profile.role}
                            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        >
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </div>
                </form>
            )}
                        <button onClick={save} className="wd-save-btn btn btn-warning w-100 mb-2">
   Update Profile
 </button>
            <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
   Sign out
 </button>
        </div>
    );
}