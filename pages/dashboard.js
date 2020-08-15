import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setUser } from "../redux/actions/app";

function Dashboard(props) {
  const { setUser, user } = props;

  useEffect(() => {
    const initFunction = async () => {
      await setUser(user);
    };

    initFunction();
  }, [setUser, setUser]);

  return <div></div>;
}

Dashboard.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  return { user: { ...query.user } };
};

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch),
});

export default connect(null, mapDispatchToProps)(Dashboard);
