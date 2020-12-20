import React, { FC, useContext,  useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useLoggedInUser, usersCollection } from "../utils/firebase";
import { CardActionArea, FormControl, FormControlLabel, FormLabel, RadioGroup, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
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

const ProfileEdit: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  useTheme();

  const profileCtx = useContext(ProfileCtx);
  const { texts, language } = useContext(LocalizationContext);

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
        await usersCollection.doc(user?.uid).update({phoneNumber: phone, nickname: nick, sex: sex === "female" ? true : false, photoUrl: imageUrl? imageUrl : "" })
        history.push('/profile')
        // After awaiting previous call we can redirect back to /about page
    } catch (err) {
        console.log(err.what)
    }
  }

  console.log(profileCtx.profile)

  return (
    <Card className={classes.root}>
      {imageUrl
        ? <CardMedia
            className={classes.cover}
            image={imageUrl}
            title="Profile image preview"
          />
        : <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
          />
      }
      <div className={classes.details}>
        <CardContent className={classes.content}>
            <TextField
              label={texts[language]['profile.nick']}
              value={nick}
              onChange={e => setNick(e.target.value)}
            />
            <TextField
                label={texts[language]['profile.phone']}
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            <FormControl component="fieldset">
                <FormLabel component="legend">{texts[language]['profile.sex']}</FormLabel>
                    <RadioGroup aria-label="sex" name="sex1" value={sex} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label={texts[language]['profile.female']} />
                        <FormControlLabel value="male" control={<Radio />} label={texts[language]['profile.male']} />
                    </RadioGroup>
            </FormControl>
        </CardContent>
        <CardActionArea onClick={() =>handleSubmit()}>
            {texts[language]['profile.save']}
        </CardActionArea>
      </div>
    </Card>
  );
};

export default ProfileEdit
