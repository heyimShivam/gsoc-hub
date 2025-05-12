// import HomeOrganization from "../components/HomeOrganization";
import TimeLine from "../components/TimeLine";
import Footer from "../components/Footer"

import "./home.css";
import HomePageAnimationBG from "../components/HomePageAnimationBG";

const Home = () => {
    return (<div className="home-component">
        <HomePageAnimationBG />
        {/* <HomeOrganization /> */}
        <TimeLine />
        <div style={{ marginBottom: '0px' }}>
            <Footer />
        </div>
    </div>);
}

export default Home;