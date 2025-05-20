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
                content="Google Summer of Code, GSoC, GSoC organizations, GSoC filtering tool, open source internships, technology stack, program year, open source organizations, gsoc hub, gsoc org explorer, gsoc categories, gsoc topics, gsoc 2025 org, gsoc 2026 orgs, gsoc 2027 orgs"
            />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://www.gsochub.com/" />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.gsochub.com/" />
            <meta property="og:title" content="GSoC Hub – Smartly Filter Google Summer of Code Organizations" />
            <meta
                property="og:description"
                content="Effortlessly discover and filter Google Summer of Code organizations by tech stack, program year, topics, categories, and more. GSoC Hub is the ultimate filtering tool to simplify your search for the perfect open source organization."
            />
            <meta property="og:image" content="https://www.gsochub.com/og-image.png" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content="https://www.gsochub.com/" />
            <meta name="twitter:title" content="GSoC Hub – Smartly Filter Google Summer of Code Organizations" />
            <meta
                name="twitter:description"
                content="Effortlessly discover and filter Google Summer of Code organizations by tech stack, program year, topics, categories, and more. GSoC Hub is the ultimate filtering tool to simplify your search for the perfect open source organization."
            />
            <meta name="twitter:image" content="https://www.gsochub.com/og-image.png" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />

            {/* Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Inter:ital,wght@0,400;1,400&family=Dancing+Script:wght@400;700&family=Lilita+One&display=swap"
                rel="stylesheet"
            />

            {/* Icons */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <script src="https://kit.fontawesome.com/3b161c540c.js" crossOrigin="anonymous" />

            {/* advertisment */}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8760620301329485"
                crossorigin="anonymous"></script>
            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://www.gsochub.com/",
          "name": "GSoC Hub",
          "description": "Effortlessly discover and filter Google Summer of Code organizations by tech stack, program year, topics, categories, and more. GSoC Hub is the ultimate filtering tool to simplify your search for the perfect open source organization.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.gsochub.com/organization/{search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      `}
            </script>
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