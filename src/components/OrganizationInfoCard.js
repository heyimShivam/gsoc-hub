import { useNavigate } from "react-router-dom";
import "./OrganizationInfoCard.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PsychologyIcon from '@mui/icons-material/Psychology';

const OrganizationInfoCard = ({
    name,
    image_url,
    image_background_color,
    description,
    url,
    category,
    topics,
    technologies,
    year,
    githubID,
    activeOrg,
}) => {
    const navigate = useNavigate();

    const showMoreOrganizationDetails = () => {
        const url = name.toLowerCase().replace(/[ /]/g, '-');

        navigate("/organization/" + url, {
            state: {
                githubID: githubID,
                orgName: name,
            },
        });
    }

    return (<div className="organization-info-card" onClick={() => { showMoreOrganizationDetails() }}>
        <div className="org-image-div">
            <img src={image_url} style={{ backgroundColor: "#e5e4e2" }} className="organization-image" alt={name + " image"} />
            <div className="acitve-org-display">
                {/* image_background_color */}
                {activeOrg ?
                    <div><span className="circle acitve"></span> Active</div> :
                    <div><span className="circle inacitve"></span> Inactive</div>}
            </div>
        </div>
        <div className="org-deatils-mix">
            <h3 className="organization-name">{name}</h3>
            <p className="organization-description">{description}</p>
            <div className="title-info-cards">
                <span className="title-icon"><PsychologyIcon sx={{ fontSize: 21 }} /></span>Categories
            </div>
            <div className="organization-cat-year-card">
                {
                    Array.isArray(category) ?
                        category.map((val, index) => <p className="organization-categorie" key={index}>{val}</p>) :
                        <p className="organization-categorie">{category}</p>
                }
            </div>
            <div className="title-info-cards">
                <span className="title-icon"><CalendarMonthIcon sx={{ fontSize: 21 }} /></span>Years
            </div>
            <div className="organization-cat-year-card years-box">
                {year.map((val, index) => {
                    return <p className="organization-year-card" key={index}>{val}</p>
                })}
            </div>
        </div>
    </div>);
}

export default OrganizationInfoCard;
