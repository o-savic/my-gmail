import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllList } from "../../store/actions/email";

const AllPage = ({ getAllList, allList, email }) => {

  const [updated, setUpdated] = React.useState(false);
  useEffect(() => {
    getAllList(email);
    setUpdated(false);
  }, [email, getAllList, updated]);

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={allList} title="All mail" onUpdate={onUpdateTable} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allList: state.email.allList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getAllList
  })(AllPage)
);
