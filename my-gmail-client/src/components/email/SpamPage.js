import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSpamList } from "../../store/actions/email";

const SpamPage = ({ getSpamList, spamList, email }) => {
  
const [updated, setUpdated] = React.useState(false);
  useEffect(() => {
    getSpamList(email);
    setUpdated(false);
  }, [email, getSpamList, updated]);

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={spamList} title="Spam" onUpdate={onUpdateTable} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  spamList: state.email.spamList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getSpamList
  })(SpamPage)
);
