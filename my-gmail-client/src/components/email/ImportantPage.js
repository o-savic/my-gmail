import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getImportantList } from "../../store/actions/email";

const ImportantPage = ({ getImportantList, importantList, email }) => {

  const [updated, setUpdated] = React.useState(false);
  useEffect(() => {
    getImportantList(email);
    setUpdated(false);
  }, [email, getImportantList, updated]);

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={importantList} title="Important" onUpdate={onUpdateTable} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  importantList: state.email.importantList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getImportantList
  })(ImportantPage)
);
