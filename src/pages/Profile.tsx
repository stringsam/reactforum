import React, { FC } from "react";
import ProfileCard from "../components/ProfileCard";
import { useDetailUser } from "../utils/firebase";

const Profile: FC = () => {
    
    const user = useDetailUser()

    return(
        user ? <ProfileCard {...user}/> : null
    )
} 

export default Profile