import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory, withRouter } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import { connect } from "react-redux";
import clsx from "clsx";
import ReorderIcon from "@material-ui/icons/Reorder";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SendIcon from '@material-ui/icons/Send';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddIcon from '@material-ui/icons/Add';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import { LabelImportantTwoTone } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const NavigationBar = ({ logout }) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const handleProfile = (e) => {
    e.preventDefault();
    history.push("/profile");
  }
  const handleInbox = (e) => {
    e.preventDefault();
    history.push("/inbox");
  }
  const handleStarred = (e) => {
    e.preventDefault();
    history.push("/starred");
  }
  const handleCompose = (e) => {
    e.preventDefault();
    history.push("/compose");
  }
  const handleSnoozed = (e) => {
    e.preventDefault();
    history.push("/snoozed");
  }
  const handleSent = (e) => {
    e.preventDefault();
    history.push("/sent");
  }
  const handleDrafts = (e) => {
    e.preventDefault();
    history.push("/drafts");
  }
  const handleImportant = (e) => {
    e.preventDefault();
    history.push("/important");
  }
  const handleAll = (e) => {
    e.preventDefault();
    history.push("/all");
  }
  const handleSpam = (e) => {
    e.preventDefault();
    history.push("/spam");
  }
  const handleTrash = (e) => {
    e.preventDefault();
    history.push("/trash");
  }
  

  const showButtons = () => {
    if (localStorage.getItem("jwtToken") !== "") {
      return (
        <div>
          <Button color="inherit" className={classes.submit} onClick={(e) => handleProfile(e)}> Profile</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </div>
      );
    }
    else {
      return (
        <Button color="inherit" >Login</Button>
      );
    }
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="primary"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar>
          <ReorderIcon
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            color="inherit"
            onClick={handleDrawerOpen}
            aria-label="open drawer">
            <MenuIcon />
          </ReorderIcon>
          <Typography variant="h6" className={classes.title}>
            Gmail
          </Typography>
          {showButtons()}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Compose" href="/compose" type="text"  {...a11yProps(0)} icon={<AddIcon />} />
          <Tab label="Inbox" onClick={(e) => handleInbox(e)} {...a11yProps(1)} icon={<InboxIcon />} />
          <Tab label="Starred" onClick={(e) => handleStarred(e)}  {...a11yProps(2)} icon={<StarBorderIcon />} />
          <Tab label="Snoozed" onClick={(e) => handleSnoozed(e)}  {...a11yProps(3)} icon={<ScheduleIcon />} />
          <Tab label="Sent" onClick={(e) => handleSent(e)}  {...a11yProps(4)} icon={<SendIcon />} />
          <Tab label="Drafts" onClick={(e) => handleDrafts(e)}  {...a11yProps(5)} icon={<InsertDriveFileOutlinedIcon />} />
          <Tab label="Important" onClick={(e) => handleImportant(e)}  {...a11yProps(6)} icon={<LabelImportantTwoTone />} />
          <Tab label="All mail" onClick={(e) => handleAll(e)}  {...a11yProps(7)} icon={<MailOutlineIcon />} />
          <Tab label="Spam" onClick={(e) => handleSpam(e)}  {...a11yProps(8)} icon={<ReportOutlinedIcon />} />
          <Tab label="Trash" onClick={(e) => handleTrash(e)} {...a11yProps(9)} icon={<DeleteOutlineOutlinedIcon />} />
          <Tab label="Profile" style={{ position: "fixed", bottom: "0" }} onClick={(e) => handleProfile(e)}  {...a11yProps(10)} icon={<AccountCircleIcon />} />
        </Tabs>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default withRouter(connect(mapStateToProps, { logout })(NavigationBar));
