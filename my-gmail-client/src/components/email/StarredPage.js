import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getStarredList } from "../../store/actions/email";

const StarredPage = ({ getStarredList, starredList, email }) => {

  const [updated, setUpdated] = React.useState(false);
  useEffect(() => {
    getStarredList(email);
    setUpdated(false);
  }, [email, getStarredList, updated]);

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={starredList} title="Starred" onUpdate={onUpdateTable} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  starredList: state.email.starredList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getStarredList
  })(StarredPage)
);
