import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getInboxList } from "../../store/actions/email";

const InboxPage = ({ getInboxList, inboxList, email }) => {

  const [updated, setUpdated] = React.useState(false);
  
  useEffect(() => {
    getInboxList(email);
    setUpdated(false);
  }, [email, getInboxList, updated]); 

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={inboxList} title="Inbox" onUpdate={onUpdateTable} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  inboxList: state.email.inboxList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getInboxList
  })(InboxPage)
);
