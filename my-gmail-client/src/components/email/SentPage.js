import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSentList } from "../../store/actions/email";

const SentPage = ({ getSentList, sentList, email }) => {
  
  useEffect(() => {
    getSentList(email);
  }, [email, getSentList]); 

  return (
    <div>
      <div>
        <Table data={sentList} title="Sent" />
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
