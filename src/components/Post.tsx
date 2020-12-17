import React, {FC} from 'react';
import {Card, makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {Post as PostType, postsCollection, useLoggedInUser} from '../utils/firebase';

type Props = {
    post: PostType,
}

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        textAlign: 'left',
    },
    stars: { marginBottom: theme.spacing(2) },
    link: { textDecoration: 'none' },
}));

export const Post: FC<Props> = ({post}) => {
    const classes = useStyles();
    const loggedUser = useLoggedInUser();

    return (
        (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" color="textSecondary">
                        {post.by.email}
                    </Typography>
                    {post.content && <Typography>{post.content}</Typography>}
                    <Typography variant="h6" color="textSecondary">
                        {post.date.toDate().toDateString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    {post.by.email === loggedUser?.email && <IconButton
                        title='delete'
                        onClick={() => postsCollection.doc(post.id).delete()}>
                        <DeleteIcon/>
                    </IconButton>}
                </CardActions>
            </Card>
        )
    )
}
