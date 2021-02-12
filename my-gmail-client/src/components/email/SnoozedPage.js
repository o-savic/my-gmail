import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSnoozedList } from "../../store/actions/email";

const SnoozedPage = ({ getSnoozedList, snoozedList, email }) => {
  
  useEffect(() => {
    getSnoozedList(email);
  }, [email, getSnoozedList]); 

  return (
    <div>
      <div>
        <Table data={snoozedList} title="Snoozed" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  snoozedList: state.email.snoozedList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getSnoozedList
  })(SnoozedPage)
);
