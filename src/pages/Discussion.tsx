import React, {FC, useEffect, useState} from "react"
import {Grid} from "@material-ui/core";
import {threadsCollection, timestampNow, useLoggedInUser} from "../utils/firebase";
import {Post as PostComponent} from '../components/Post';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Post} from '../utils/types';
import {useParams} from "react-router-dom";


const Discussion: FC = () => {

    const [posts, setPost] = useState<Post[] | undefined>([]);

    const { ref }: { ref: string } = useParams();


    useEffect(() => {
        // Call .onSnapshot() to listen to changes

        threadsCollection.doc(ref).get().then(doc => {
            setPost(doc.data()?.posts);
        })

        const unsubscribe = threadsCollection.doc(ref).collection('posts').orderBy('date').onSnapshot(
            snapshot => {
                // Access .docs property of snapshot
                setPost(snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        by: doc.data().by,
                        content: doc.data().content,
                        date: doc.data().date,
                    }
                }));
            },
            err => console.log(err),
        );

        // Call unsubscribe in the cleanup of the hook
        return () => unsubscribe();
    });

    const [text, setText] = useState('');

    const user = useLoggedInUser();

    const handleSubmit = async () => {
        try {
            await threadsCollection.doc(ref).collection('posts').add({
                by: {
                    uid: user?.uid ?? '',
                    email: user?.email ?? '',
                },
                content: text,
                date: timestampNow(),
            });
            // After awaiting previous call we can redirect back to /about page
        } catch (err) {
            console.log(err.what)
        }
    };

    return (
        <Grid container wrap="wrap" spacing={3}>
            {posts?.map((r, i) => (
                <Grid key={i} xs={12} item>
                    <PostComponent post={r} threadId={ref} />
                </Grid>
            ))}
            <Grid xs={12} item>
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Reply to discussion
                        </Typography>
                        <TextField
                            label='Description'
                            name="description"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="text"
                            size="large"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Discussion