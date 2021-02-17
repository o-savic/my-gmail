import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavigationBar from "./NavigationBar";
import dense from "@material-ui/core/List/ListContext";
import Paper from "@material-ui/core/Paper";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { changeStarred, changeDeleted, changeArchived, changeSpam } from "../../store/actions/email";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { ArchiveOutlined, Delete, Report, ReportOutlined, ScheduleOutlined } from "@material-ui/icons";
import Archive from "@material-ui/icons/Archive";
import SnoozeEmailDialog from "../email/dialogs/SnoozeEmailDialog";


const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 180,
    marginRight: 20,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  content: {
    marginLeft: 180,
    marginRight: 20,
    marginTop: 20,
  },
  container: {
    align: "center",
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 500,
    align: "center",
    background: "#F0F8FF",
  },
  container2: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



const ReusableTable = ({ data, title, onUpdate, changeStarred, changeDeleted, changeArchived, changeSpam }) => {
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  var checkType = (title === "Sent") ? "Recipient" : "Sender";

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
      return;
    }
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const starUnstar = async (id) => {
    const res = await changeStarred(id).then((response) => {
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
  }

  const trashUntrash = async (id) => {
    const res = await changeDeleted(id).then((response) => {
      if (response && response.status === 200) {
        onUpdate(true);
        setError(false);
        setOpen(false);
      }
      else {
        setError(true);
        setOpen(true);
        onUpdate(false);
      }
    });

  }
  const spamUnspam = async (id) => {
    const res = await changeSpam(id).then((response) => {
      if (response && response.status === 200) {
        onUpdate(true);
        setError(false);
        setOpen(false);
      }
    });
    {
      if (title === "Trash") {
        setError(true);
        setOpen(true);
        onUpdate(false);
      }
    }
  }
  const archiveUnarchive = async (id) => {
    const res = await changeArchived(id).then((response) => {
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
  }

  const consoleLog = async (id) => {
    console.log("snooze clicked " + id);
    setOpenDialog(true);
  }

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className={classes.content}>
        <Paper className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                  </TableCell>
                  <TableCell align="center">
                    <b>
                      <i>{checkType}</i>
                    </b>
                  </TableCell>
                  <TableCell align="center">
                    <b>
                      <i>Subject</i>
                    </b>
                  </TableCell>
                  <TableCell align="center">
                    <b>
                      <i>Text</i>
                    </b>
                  </TableCell>
                  <TableCell align="center">
                    <b>
                      <i>Date</i>
                    </b>
                  </TableCell>
                  <TableCell align="center">
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data &&
                  data.length > 0 &&
                  data.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" key={row.id}>
                        <TableCell align="center">
                          {row.starred === true ? <StarIcon onClick={() => starUnstar(row.id)} /> : <StarBorderIcon onClick={() => starUnstar(row.id)} />}
                        </TableCell>
                        <TableCell align="center">
                          {title === "Sent" ? <p>{row.recipientEmail} </p> : <p>{row.senderEmail} </p>}
                        </TableCell>
                        <TableCell align="center">
                          <p>{row.subject} </p>
                        </TableCell>
                        <TableCell align="center">
                          <p>{row.text} </p>
                        </TableCell>
                        <TableCell align="center">
                          <p> {row.date} </p>
                        </TableCell>
                        <TableCell align="center">
                          {row.archived === true ? <Archive onClick={() => archiveUnarchive(row.id)} /> : <ArchiveOutlined onClick={() => archiveUnarchive(row.id)} />}
                          {row.deleted === true ? <Delete onClick={() => trashUntrash(row.id)} /> : <DeleteOutlineOutlinedIcon onClick={() => trashUntrash(row.id)} />}
                          {row.spam === true ? <Report onClick={() => spamUnspam(row.id)} /> : <ReportOutlined onClick={() => spamUnspam(row.id)} />}
                          <SnoozeEmailDialog
                            idV={row.id}
                            dateV={row.date}
                            onUpdate={onUpdate}
                            title={title}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Error!
        </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({

});

export default withRouter(
  connect(mapStateToProps, {
    changeStarred,
    changeDeleted,
    changeArchived,
    changeSpam
  })(ReusableTable)
);
