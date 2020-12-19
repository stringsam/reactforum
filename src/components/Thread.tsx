import {Thread as ThreadType} from '../utils/types';
import React, {FC} from 'react';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";


type Props = {
    thread: ThreadType
}

export const Thread: FC<Props> = ({thread}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" color="textSecondary">
                    {thread.by.email}
                </Typography>

            <Link to={`/discussion/${thread.id}`}>{thread.title && <Typography>{thread.title}</Typography>}</Link>
                <Typography variant="h6" color="textSecondary">
                    {thread.date.toDate().toDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
}