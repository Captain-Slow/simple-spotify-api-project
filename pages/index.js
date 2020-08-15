import api from "../api/axiosOrders";
import LoginComponent from "../components/home/LoginComponent";

function Home(props) {
  return <LoginComponent {...props} />;
}

Home.getInitialProps = async (ctx) => {
  const { req } = ctx;

  return { cookies: req.cookies };
};

export default Home;
