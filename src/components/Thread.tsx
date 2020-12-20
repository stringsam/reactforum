import {Thread as ThreadType} from '../utils/types';
import React, {FC, useContext} from 'react';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import {threadsCollection, useLoggedInUser} from "../utils/firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import {LocalizationContext} from "../localization";


type Props = {
    thread: ThreadType
}

export const Thread: FC<Props> = ({thread}) => {
    const { texts, language } = useContext(LocalizationContext);
    const loggedUser = useLoggedInUser();
    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                    {thread.by.email}
                </Typography>

            <Link to={`/discussion/${thread.id}`} color="primary">{thread.title && <Typography variant={"h6"}>{thread.title}</Typography>}</Link>
                <Typography variant="subtitle2" color="textSecondary">
                    {thread.date.toDate().toLocaleDateString(texts[language]['format'])}
                </Typography>
            </CardContent>
            <CardActions>
                {thread.by.email === loggedUser?.email && <IconButton
                    title='delete'
                    onClick={() => threadsCollection.doc(thread.id).delete()}>
                    <DeleteIcon/>
                </IconButton>}
            </CardActions>
        </Card>
    );
}