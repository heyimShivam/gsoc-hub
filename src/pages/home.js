// import HomeOrganization from "../components/HomeOrganization";
import TimeLine from "../components/TimeLine";
import Footer from "../components/Footer"
import { Helmet } from "react-helmet";
import "./home.css";
import HomePageAnimationBG from "../components/HomePageAnimationBG";

const Home = () => {
    return (<>
        <Helmet>
            {/* Primary Meta Tags */}
            <title>GSoC Hub – Smartly Filter Google Summer of Code Organizations</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="title" content="GSoC Hub – Smartly Filter Google Summer of Code Organizations" />
            <meta
                name="description"
                content="Effortlessly discover and filter Google Summer of Code organizations by tech stack, program year, topics, categories, and more. GSoC Hub is the ultimate filtering tool to simplify your search for the perfect open source organization."
            />
            <meta
                name="keywords"
                content="gsoc organizations, Google Summer of Code, gsoc, gsoc filtering tool, gsoc hub, filter gsoc orgs, gsoc org explorer, gsoc categories, gsoc topics, gsoc 2025 org, gsoc 2026 orgs, gsoc 2027 orgs"
            />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://www.gsochub.com/" />
        </Helmet>
        <div className="home-component">
            <HomePageAnimationBG />
            {/* <HomeOrganization /> */}
            <TimeLine />
            <div style={{ marginBottom: '0px' }}>
                <Footer />
            </div>
        </div>
    </>);
}

export default Home;