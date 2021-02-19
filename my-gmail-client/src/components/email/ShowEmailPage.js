import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NavigationBar from "../../components/base/NavigationBar"
import { sendEmail, saveDraft } from "../../store/actions/email"
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { Forward, Reply } from '@material-ui/icons';
import { compose } from 'redux';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

const SendEmail = ({ emailData, history }) => {

  const classes = useStyles();

  const handleReplyForward = (e) => {
    e.preventDefault();
    history.push('/compose');
  }

  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EmojiPeopleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {emailData.subject}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="From"
              value={emailData.senderEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="recipientEmail"
              label="To"
              value={emailData.recipientEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Text"
              multiline
              rows={10}
              value={emailData.text}
            />
            <div align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleReplyForward}
              >
                <Reply />
                REPLY
              </Button>
              &nbsp;
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleReplyForward}
              >
                <Forward />
                FORWARD
              </Button>
            </div>
          </form>
        </div>

      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.user.sub,
  emailData: state.email.emailData
});

export default withRouter(connect(mapStateToProps, { sendEmail, saveDraft })(SendEmail));
