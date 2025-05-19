import "./HomePageAnimationBG.css";
import { useNavigate } from "react-router-dom";
const HomePageAnimationBG = () => {
    const navigate = useNavigate();
    const viewAllorganization = () => {
        navigate("/organization");
    }
    return (<>
        <div class="text-container">
            <div className="org-title">GSoC Hub</div>
            <div className="home-description">
                GSoC Hub helps you find the right Google Summer of Code organization. Browse past organizations and use smart filters to find those that match your interests, so you can confidently choose the best organizations.
            </div>
            <div className="explore-btn" onClick={viewAllorganization}>Explore</div>
        </div>
        <div class="gradient-bg">
            <svg>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"> </feColorMatrix>
                        <feBlend in="SourceGraphic" in2="goo" ></feBlend>
                    </filter>
                </defs>
            </svg>

            <div class="gradients-container">
                <div class="g1"></div>
                <div class="g2"></div>
                <div class="g3"></div>
                <div class="g4"></div>
                <div class="g5"></div>
                <div class="interactive"></div>
            </div>
        </div >
    </>)
}

export default HomePageAnimationBG;