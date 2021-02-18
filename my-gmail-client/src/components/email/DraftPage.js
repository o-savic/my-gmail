import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDraftList } from "../../store/actions/email";

const DraftPage = ({ getDraftList, draftList, email }) => {

  const [updated, setUpdated] = React.useState(false);
  
  useEffect(() => {
    getDraftList(email);
    setUpdated(false);
  }, [email, getDraftList, updated]); 

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={draftList} title="Drafts" onUpdate={onUpdateTable} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  draftList: state.email.draftList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getDraftList
  })(DraftPage)
);
