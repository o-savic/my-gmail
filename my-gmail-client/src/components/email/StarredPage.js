import React, { useEffect } from "react";

import Table from "../base/Table";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getStarredList } from "../../store/actions/email";

const StarredPage = ({ getStarredList, starredList, email }) => {
  
  useEffect(() => {
    getStarredList(email);
    console.log(starredList);
  }, [email, getStarredList]); 

  return (
    <div>
      <div>
        <Table data={starredList} title="Starred" />
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
