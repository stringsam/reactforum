import React, { FC, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {CardActions } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ProfileCtx } from "./ProfileCtx";
import {LocalizationContext} from "../localization";

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
}), {index: 1});

const ProfileCard: FC = () => {
  const classes = useStyles();
  useTheme();
  const profileCtx = useContext(ProfileCtx);
  const { texts, language } = useContext(LocalizationContext);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={profileCtx.profile?.photoUrl}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {profileCtx.profile?.nickname}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {profileCtx.profile?.email}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {profileCtx.profile?.phoneNumber}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {profileCtx.profile?.sex ? texts[language]['profile.female'] : texts[language]['profile.male']}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to='/profileEdit'>
            {texts[language]['profile.edit']}
          </Link>
        </CardActions>
      </div>
    </Card>
  );
};

export default ProfileCard
