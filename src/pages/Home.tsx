import React, {FC, useContext, useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {Thread as ThreadComponent} from "../components/Thread";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {threadsCollection, timestampNow, useLoggedInUser} from "../utils/firebase";
import {Post, Thread} from "../utils/types";
import {LocalizationContext} from "../localization";

const Home: FC = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const { texts, language } = useContext(LocalizationContext);

    useEffect(() => {
        // Call .onSnapshot() to listen to changes
        const unsubscribe = threadsCollection.orderBy('date', 'desc').onSnapshot(
            snapshot => {
                // Access .docs property of snapshot
                setThreads(snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        by: doc.data().by,
                        title: doc.data().title,
                        date: doc.data().date,
                        posts: doc.data().posts
                    }
                }));
            },
            err => console.error(err),
        );

        // Call unsubscribe in the cleanup of the hook
        return () => unsubscribe();
    }, []);

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const user = useLoggedInUser();

    const handleSubmit = () => {

        if (!title.trim()){
            return;
        }

        const post: Post = {
            by: {
                uid: user?.uid ?? '',
                email: user?.email ?? '',
            },
            content: text,
            date: timestampNow(),
        }

        threadsCollection.add({
            by: {
                uid: user?.uid ?? '',
                email: user?.email ?? '',
            },
            title: title,
            date: timestampNow(),
        }).then(response => {
            threadsCollection.doc(response.id).collection('posts').add(post);
        });
    };


    return (
    <Grid container wrap="wrap" spacing={3}>
        <Grid xs={12} item>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {texts[language]['home.createThread']}
                    </Typography>
                    <TextField
                        label={texts[language]['thread.title']}
                        name="title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        label='Text'
                        name="text"
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
                        {texts[language]['discussion.submit']}
                    </Button>
                </CardActions>
            </Card>
        </Grid>

        {threads.map((r, i) => (
        <Grid key={i} xs={12} item>
            <ThreadComponent thread={r} />
        </Grid>
    ))}
</Grid>
)};

export default Home;