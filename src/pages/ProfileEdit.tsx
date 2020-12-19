import React, { FC } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileEdit from "../components/ProfileEdit";
import { useDetailUser, useLoggedInUser } from "../utils/firebase";

const Profile: FC = () => {
    
    const user = useDetailUser()

    return(
        user ? <ProfileEdit {...user}/> : null
    )
} 

export default Profile