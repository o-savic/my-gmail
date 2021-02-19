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
import TablePagination from "@material-ui/core/TablePagination";

import {
  changeStarred,
  changeDeleted,
  changeArchived,
  changeSpam,
  changeRead,
  permanentlyDeleteEmail,
  getEmailData,
  changeImportant
} from "../../store/actions/email";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { ArchiveOutlined, Delete, DraftsOutlined, LabelImportant, LabelImportantOutlined, LabelImportantTwoTone, MailOutline, Report, ReportOutlined, RestoreFromTrash, ScheduleOutlined } from "@material-ui/icons";
import Archive from "@material-ui/icons/Archive";
import SnoozeEmailDialog from "../email/dialogs/SnoozeEmailDialog";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

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



const ReusableTable = ({ data, title, onUpdate, changeStarred, changeDeleted, changeArchived, changeSpam, changeRead, changeImportant, permanentlyDeleteEmail, getEmailData, emailData, history }) => {
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage) + 2;


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
  const readUnread = async (id) => {
    const res = await changeRead(id).then((response) => {
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

  const importantUnimportant = async (id) => {
    const res = await changeImportant(id).then((response) => {
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

  const permanentlyDelete = async (id) => {
    await permanentlyDeleteEmail(id).then((response) => {
      onUpdate(true);
      setError(false);
      setOpen(false);
    });
  }

  const setOpenError = (value) => {
    setOpen(value);
  }

  const showEmail = async (id) => {
    const res = await getEmailData(id).then((response) => {
      if (response && response.status === 200) {
        console.log("Data iz Table: " + emailData.text)
        history.push("/show");
      }
    })
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
              <TableBody>
                {data &&
                  data.length > 0 &&
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" key={row.id} >
                          <TableCell align="center">
                            {row.starred ? <StarIcon onClick={() => starUnstar(row.id)} /> : <StarBorderIcon onClick={() => starUnstar(row.id)} />}
                            {row.important ? <LabelImportant onClick={() => importantUnimportant(row.id)} /> : <LabelImportantTwoTone onClick={() => importantUnimportant(row.id)} />}
                          </TableCell>
                          <TableCell align="center" style={row.isRead ? { fontWeight: 'normal' } : { fontWeight: 'bold' }} onClick={() => showEmail(row.id)} >
                            {(title === "Sent" || title === "Drafts") ? <p>{row.recipientEmail} </p> : <p>{row.senderEmail} </p>}
                          </TableCell>
                          <TableCell align="center" style={row.isRead ? { fontWeight: 'normal' } : { fontWeight: 'bold' }} onClick={() => showEmail(row.id)}>
                            <p>{row.subject} </p>
                          </TableCell>
                          <TableCell align="center" onClick={() => showEmail(row.id)}>
                            <p>{row.text} </p>
                          </TableCell>
                          <TableCell align="center" style={row.isRead ? { fontWeight: 'normal' } : { fontWeight: 'bold' }} onClick={() => showEmail(row.id)}>
                            {row.snoozed ? <p style={{ color: "orange" }}> <b> {row.dateSnoozed}</b></p> : <p> {row.date} </p>}
                          </TableCell>
                          <TableCell align="center">
                            {row.archived ? <Archive onClick={() => archiveUnarchive(row.id)} /> : <ArchiveOutlined onClick={() => archiveUnarchive(row.id)} />}
                            {row.deleted ? <RestoreFromTrash onClick={() => trashUntrash(row.id)} /> : <DeleteOutlineOutlinedIcon onClick={() => trashUntrash(row.id)} />}
                            {
                              (title !== "Drafts") ?
                                (row.spam ? <Report onClick={() => spamUnspam(row.id)} /> : <ReportOutlined onClick={() => spamUnspam(row.id)} />) : ""

                            }
                            {row.isRead ? <MailOutline onClick={() => readUnread(row.id)} /> : <DraftsOutlined onClick={() => readUnread(row.id)} />}
                            {
                              (title === "Spam" || title === "Trash" || title === "Drafts") ?
                                <DeleteForeverOutlinedIcon onClick={() => permanentlyDelete(row.id)} /> : ""
                            }
                            <SnoozeEmailDialog
                              idV={row.id}
                              dateV={row.date}
                              dateSnoozedV={row.dateSnoozed}
                              onUpdate={onUpdate}
                              title={title}
                              onError={setOpenError}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 12]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
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
  emailData: state.email.emailData
});

export default withRouter(
  connect(mapStateToProps, {
    changeStarred,
    changeDeleted,
    changeArchived,
    changeSpam,
    changeRead,
    permanentlyDeleteEmail,
    getEmailData,
    changeImportant
  })(ReusableTable)
);
