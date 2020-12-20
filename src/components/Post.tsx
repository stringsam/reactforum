import React, {FC, useContext} from 'react';
import {Card, makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {threadsCollection, useLoggedInUser} from '../utils/firebase';
import {Post as PostType} from '../utils/types';
import {LocalizationContext} from "../localization";

type Props = {
  post: PostType,
  threadId: string,
}

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    textAlign: 'left',
  },
  stars: {marginBottom: theme.spacing(2)},
  link: {textDecoration: 'none'},
}), {index: 1});

export const Post: FC<Props> = ({post, threadId}) => {
  const classes = useStyles();
  const loggedUser = useLoggedInUser();
  const { texts, language } = useContext(LocalizationContext);

  return (
    (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary">
            {post.by.email}
          </Typography>
          {post.content && <Typography variant={"h6"}>{post.content}</Typography>}
          <Typography variant="subtitle2" color="textSecondary">
            {`${post.date.toDate().toLocaleDateString(texts[language]['format'])} ${post.date.toDate().toLocaleTimeString(texts[language]['format'])}`}
          </Typography>
        </CardContent>
        <CardActions>
          {post.by.email === loggedUser?.email && <IconButton
              title='delete'
              onClick={() => threadsCollection.doc(threadId).collection('posts').doc(post.id).delete()}>
              <DeleteIcon/>
          </IconButton>}
        </CardActions>
      </Card>
    )
  )
}
