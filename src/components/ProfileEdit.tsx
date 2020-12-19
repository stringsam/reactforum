import React, { FC, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { UserDetail } from "../utils/types";
import { CardActionArea, FormControl, FormControlLabel, FormLabel, RadioGroup, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";

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

const ProfileEdit: FC<UserDetail> = ({email, photoUrl, phoneNumber, sex, signuature, nickname}) => {
  const classes = useStyles();
  useTheme();

  const [value, setValue] = useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const [phone, setPhone] = useState('');
  const [nick, setNick] = useState('');
  /*const handleSubmit = async () => {
    try {
        await usersCollection.doc(uid).update({phoneNumber:phone, nickName:nick })
        // After awaiting previous call we can redirect back to /about page
    } catch (err) {
        console.log(err.what)
    }*/
//};

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={photoUrl}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
            <TextField
                id="nicName-input"
                label="nickName"
                type="nickName"
                value={nick}
                onChange={e => setNick(e.target.value)}
                />
            <TextField
                id="phoneNumber-input"
                label="phone"
                type="phoneNumber"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                />
            <FormControl component="fieldset">
                <FormLabel component="legend">Sex</FormLabel>
                    <RadioGroup aria-label="sex" name="sex1" value={value} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
            </FormControl>
        </CardContent>
        <CardActionArea>
        {/*  <Button onClick={() =>handleSubmit}>Save</Button>*/} 
        </CardActionArea>
      </div>
    </Card>
  );
};

export default ProfileEdit
