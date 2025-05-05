import HomeOrganization from "../components/HomeOrganization";
import TimeLine from "../components/TimeLine";
import Footer from "../components/Footer"

import "./home.css";

const Home = () => {
    return (<div className="home-component">
        <HomeOrganization />
        <TimeLine />
        <div className="component " style={{ marginBottom: '0px' }}>
            <Footer />
        </div>
    </div>);
}

export default Home;