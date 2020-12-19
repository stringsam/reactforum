import Grid from "@material-ui/core/Grid";
import React, { FC, useContext, useEffect, useState } from "react";
import { Post as PostComponent } from "../components/Post";
import ProfileCard from "../components/ProfileCard";
import { ProfileCtx } from "../components/ProfileCtx";
import { Post, postsCollection} from "../utils/firebase";

const Profile: FC = () => {
    
    const [posts, setPost] = useState<Post[]>([]);
    
    const profileCtx = useContext(ProfileCtx)

    useEffect(() => {
        // Call .onSnapshot() to listen to changes
        const unsubscribe = postsCollection.where("by.uid", "==", profileCtx.profile?.uid || '').orderBy('date', 'desc').onSnapshot(
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
    }, [profileCtx])

    return(
        <Grid container wrap="wrap" spacing={3}>
            <Grid xs={12} item>
                <ProfileCard/>
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