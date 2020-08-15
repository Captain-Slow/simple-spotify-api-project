function Dashboard(props) {
  // console.log(props);
  return <div></div>;
}

Dashboard.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  const { access_token } = req.cookies;

  return { user: query, access_token: access_token };
};

export default Dashboard;
