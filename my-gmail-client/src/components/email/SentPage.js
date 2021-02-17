import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSentList } from "../../store/actions/email";

const SentPage = ({ getSentList, sentList, email }) => {

  const [updated, setUpdated] = React.useState(false);

  useEffect(() => {
    getSentList(email);
    setUpdated(false);
  }, [email, getSentList, updated]);

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={sentList} title="Sent" onUpdate={onUpdateTable} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sentList: state.email.sentList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getSentList
  })(SentPage)
);
