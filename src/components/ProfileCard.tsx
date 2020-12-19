import React, { FC } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { UserDetail } from "../utils/types";
import { Button, CardActions, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

const ProfileCard: FC<UserDetail> = ({ email, photoUrl, phoneNumber, sex, signuature, nickname}) => {
  const classes = useStyles();
  useTheme();


  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={photoUrl}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {nickname}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {email}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {phoneNumber}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {sex? "Female" : "Man"}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href='/profileEdit' component={Button}>
              Edit profile
          </Link>
        </CardActions>
      </div>
    </Card>
  );
};

export default ProfileCard
