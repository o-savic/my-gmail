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
import { snoozeEmail } from "../../../store/actions/email"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const SnoozeEmailDialog = ({ idV, dateV, title, snoozeEmail, onUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [state, setState] = React.useState({
    id: (idV == null) ? "" : idV,
    date: (dateV == null) ? "" : dateV
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onUpdate(false);
  };
  const handleYES = async (e) => {
    e.preventDefault();
    const res = await snoozeEmail(state).then((response) => {
      if (response && response.status === 200) {
        onUpdate(true);
        setError(false);
        setOpen(false);
      }
    });
    {
      if (title === "Trash" || title === "Spam") {
        setError(true);
        setOpen(true);
        onUpdate(false);
      }
    }
  };

  return (
    <div>
      <ScheduleOutlined onClick={handleClickOpen} ></ScheduleOutlined>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Pick date & time"}
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleYES} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapStateToProps = state => ({});

export default withRouter(
  connect(mapStateToProps, { snoozeEmail })(SnoozeEmailDialog)
);
