import Grid from "@material-ui/core/Grid";
import React, { FC, useEffect, useState } from "react";
import { Post as PostComponent } from "../components/Post";
import ProfileCard from "../components/ProfileCard";
import { Post, postsCollection, useDetailUser, useLoggedInUser } from "../utils/firebase";

const Profile: FC = () => {
    
    const [posts, setPost] = useState<Post[]>([]);
    
    const user = useLoggedInUser()

    useEffect(() => {
        // Call .onSnapshot() to listen to changes
        const unsubscribe = postsCollection.where("by.uid", "==", user?.uid || '').orderBy('date', 'desc').onSnapshot(
            snapshot => {
                // Access .docs property of snapshot
                setPost(snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        by: doc.data().by,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                }));
            },
            err => console.log(err),
        );

        // Call unsubscribe in the cleanup of the hook
        return () => unsubscribe?.();
    }, [user]);
    
    const userDetail = useDetailUser()

    return(
        <Grid container wrap="wrap" spacing={3}>
            <Grid xs={12} item>
            {userDetail ? <ProfileCard {...userDetail}/> : null}
            </Grid>
            {posts.map((r, i) => (
                <Grid key={i} xs={12} item>
                    <PostComponent post={r} />
                </Grid>
            ))}
        </Grid>
    )
} 

export default Profile