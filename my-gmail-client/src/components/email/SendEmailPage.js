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
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { sendEmail, saveDraft } from "../../store/actions/email"

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SendEmail = ({ sendEmail, saveDraft, email, emailData, history }) => {
  const [state, setState] = React.useState({
    subject: emailData.subject ? emailData.subject : "",
    senderEmail: email,
    recipientEmail: emailData.senderEmail ? emailData.senderEmail : "", // checking if it's a reply or first email
    text: emailData.text ? emailData.text : ""
  });

  const [error, setError] = React.useState(false);
  const classes = useStyles();

  const handleChangeTextField = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await sendEmail(state).then((response) => {
      if (response.status === 201) {
        history.push("/sent");
      }
    });
    setError(true);
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const res = await saveDraft(state).then((response) => {
      if (response.status === 200) {
        history.push("/drafts");
      }
    });
    setError(true);
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MailOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Message
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="recipientEmail"
              label="To"
              name="recipientEmail"
              autoComplete="recipientEmail"
              autoFocus
              value={state.recipientEmail}
              error={error}
              onChange={handleChangeTextField}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="subject"
              label="Subject"
              id="subject"
              value={state.subject}
              autoComplete="subject"
              error={error}
              onChange={handleChangeTextField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="text"
              label="Text"
              name="text"
              multiline
              rows={10}
              autoFocus
              autoComplete="text"
              value={state.text}
              error={error}
              onChange={handleChangeTextField}
            />
            <div align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSaveDraft}
              >
                SAVE DRAFT
              </Button>
              &nbsp;
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                SEND
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
