  import React from "react";
  import Table from "@material-ui/core/Table";
  import TableBody from "@material-ui/core/TableBody";
  import TableCell from "@material-ui/core/TableCell";
  import TableHead from "@material-ui/core/TableHead";
  import TableRow from "@material-ui/core/TableRow";
  import makeStyles from "@material-ui/core/styles/makeStyles";
  import NavigationBar from "./NavigationBar";
  import Button from '@material-ui/core/Button';
  import dense from "@material-ui/core/List/ListContext";
  import Paper from "@material-ui/core/Paper";
  const useStyles = makeStyles((theme) => ({
    content: {
      marginLeft: 50,
      marginRight: 50,
      marginTop: 20,
    },
    container: {
      align: "center",
    },
    paper: {
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      height: 400,
      align: "center",
      background: "#F0F8FF",
    },
  }));

  const ReusableTable = ({ data }) => {
    const classes = useStyles();
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div className={classes.content}>
          <br />
          <div align="center">
            <h1>
              <b>
                <i>Inbox</i>
              </b>
            </h1>
          </div>
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
                      <b>
                        <i>Sender</i>
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
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data &&
                    data.length > 0 &&
                    data.map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" key={row.id}>
                          <TableCell align="center">
                            <p>{row.senderEmail} </p>
                          </TableCell>
                          <TableCell align="center">
                            <p>{row.subject} </p>
                          </TableCell>
                          <TableCell align="center">
                            <p>{row.text} </p>
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </Paper>
          <br></br>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Compose
          </Button>
        </div>
      </div>
    );
  };

  export default ReusableTable;
