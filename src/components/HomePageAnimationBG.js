import "./HomePageAnimationBG.css";
import { useNavigate } from "react-router-dom";
const HomePageAnimationBG = () => {
    const navigate = useNavigate();
    const viewAllorganization = () => {
        navigate("/organization");
    }
    return (<>
        <div className="text-container">
            <h1 className="org-title">GSoC Hub</h1>
            <h2 className="home-description">
                GSoC Hub helps you find the right Google Summer of Code organization. Browse past organizations and use smart filters to find those that match your interests, so you can confidently choose the best organizations.
            </h2>
            <div className="explore-btn" onClick={viewAllorganization}>Explore</div>
        </div>
        <div className="gradient-bg">
            <svg>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"> </feColorMatrix>
                        <feBlend in="SourceGraphic" in2="goo" ></feBlend>
                    </filter>
                </defs>
            </svg>

            <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
                <div className="interactive"></div>
            </div>
        </div >
    </>)
}

export default HomePageAnimationBG;