import React, {FC, useContext, useState} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {useLoggedInUser, usersCollection} from "../utils/firebase";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, TextField} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import {useHistory} from "react-router-dom";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import {ProfileCtx} from "./ProfileCtx";
import {LocalizationContext} from "../localization";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    height: 266,
    width: 256,
    marginBottom: 10
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
  },
  actions: {
    textAlign: "center"
  },
  lastElement: {
    marginBottom: 20
  }
}), {index: 1});

const ProfileEdit: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  useTheme();

  const profileCtx = useContext(ProfileCtx);
  const {texts, language} = useContext(LocalizationContext);

  const user = useLoggedInUser()

  const [nick, setNick] = useState(profileCtx.profile?.nickname || '');
  const [phone, setPhone] = useState(profileCtx.profile?.phoneNumber || '');
  const [sex, setSex] = useState(profileCtx.profile?.sex ? 'female' : 'male');
  const [imageUrl, setImage] = useState(profileCtx.profile?.photoUrl || '');

  const handleUploadError = (error: any) => {
    console.error(error);
  };
  const handleUploadSuccess = async (promise: any) => {
    const filename = await promise
    firebase
      .storage()
      .ref(`images/${filename}`)
      .getDownloadURL()
      .then(url => {
        setImage(url)
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSex((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async () => {
    try {
      await usersCollection.doc(user?.uid).update({
        phoneNumber: phone,
        nickname: nick,
        sex: sex === "female" ? true : false,
        photoUrl: imageUrl ? imageUrl : ""
      })
      history.push('/profile')
      // After awaiting previous call we can redirect back to /about page
    } catch (err) {
      console.log(err.what)
    }
  }

  console.log(profileCtx.profile)

  return (
    <Card className={classes.root}>
      <Grid container>
        {imageUrl && <CardMedia
            className={classes.cover}
            image={imageUrl}
            title="Profile image preview"
        />}

        <FileUploader className={classes.details}
                      accept="image/*"
                      name="avatar"
                      randomizeFilename
                      storageRef={firebase.storage().ref("images")}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
        />
      </Grid>
      <Grid container>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Grid item xs={12}>
              <TextField
                label={texts[language]['profile.nick']}
                value={nick}
                onChange={e => setNick(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.lastElement}>
              <TextField
                label={texts[language]['profile.phone']}
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
            <FormControl component="fieldset" className={classes.content}>
              <FormLabel component="legend">{texts[language]['profile.sex']}</FormLabel>
              <RadioGroup aria-label={texts[language]['profile.sex']} name="sex1" value={sex} onChange={handleChange}>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </CardContent>
          <Grid item xs={12} className={classes.actions}>
            <Button color={"primary"} onClick={() => handleSubmit()}>Save</Button>
          </Grid>
        </div>
      </Grid>
    </Card>
  );
};

export default ProfileEdit
