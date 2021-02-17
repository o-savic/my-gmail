import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTrashList } from "../../store/actions/email";

const TrashPage = ({ getTrashList, trashList, email }) => {

  const [updated, setUpdated] = React.useState(false);
  useEffect(() => {
    getTrashList(email);
    setUpdated(false);
  }, [email, getTrashList, updated]);

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <div>
        <Table data={trashList} title="Trash" onUpdate={onUpdateTable} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  trashList: state.email.trashList,
  email: state.user.user.sub,
});

export default withRouter(
  connect(mapStateToProps, {
    getTrashList
  })(TrashPage)
);
