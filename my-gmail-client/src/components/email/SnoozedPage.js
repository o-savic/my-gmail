import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSnoozedList } from "../../store/actions/email";

const SnoozedPage = ({ getSnoozedList, snoozedList, email }) => {

  const [updated, setUpdated] = React.useState(false);
  useEffect(() => {
    getSnoozedList(email);
    setUpdated(false);
  }, [email, getSnoozedList, updated]);

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={snoozedList} title="Snoozed" onUpdate={onUpdateTable} />
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
