import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ScheduleOutlined } from "@material-ui/icons";
import { snoozeEmail, unSnoozeEmail } from "../../../store/actions/email"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DialogContent } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    height: '50vh',
    width: '50vh',
  },
  textField: {
    width: 200,
  },
}));

const SnoozeEmailDialog = ({ idV, dateSnoozedV, onError, title, snoozeEmail, unSnoozeEmail, onUpdate }) => {
  const classes = useStyles();
  // Today's date (it should be in format 2021-02-17 / 2021-12-17)
  var date = new Date();
  var formatedDate = (date.getMonth() < 9) ? `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}` : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [state, setState] = React.useState({
    id: (idV == null) ? "" : idV,
    dateSnoozed: (dateSnoozedV == null) ? formatedDate : dateSnoozedV // today or snoozed date (if exists)
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    onUpdate(false);
  };
  const handleYES = async (e) => {
    e.preventDefault();
    const res = await snoozeEmail(state).then((response) => {
      if (response && response.status === 200) {
        onUpdate(true);
        setError(false);
        setOpenDialog(false);
      }
    });
    {
      if (title === "Trash" || title === "Spam") {
        setError(true);
        setOpenDialog(false);
        onUpdate(false);
        onError(true);
      }
    }
  };

  const handleUnsnooze = async (e) => {
    e.preventDefault();
    const res = await unSnoozeEmail(idV).then((response) => {
      if (response && response.status === 200) {
        onUpdate(true);
        setError(false);
        setOpenDialog(false);
      }
    });
    {
      if (title === "Trash" || title === "Spam") {
        setError(true);
        setOpenDialog(false);
        onUpdate(false);
        onError(true);
      }
    }
  }

  const handleChangeTextField = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });

  };

  return (
    <div>
      <ScheduleOutlined onClick={handleClickOpen} ></ScheduleOutlined>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center" }}>
          {"Pick date & time"}
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <form noValidate>
            <TextField
              id="date"
              name="dateSnoozed"
              type="date"
              className={classes.textField}
              defaultValue={state.dateSnoozed}
              selected={state.dateSnoozed}
              onSelect={handleChangeTextField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleUnsnooze} color="primary" >
            <HighlightOffIcon></HighlightOffIcon>
            UNSNOOZE
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleYES} color="primary" autoFocus>
            SNOOZE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapStateToProps = state => ({});

export default withRouter(
  connect(mapStateToProps, { snoozeEmail, unSnoozeEmail })(SnoozeEmailDialog)
);
