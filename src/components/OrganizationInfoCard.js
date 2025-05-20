import { useNavigate, Link } from "react-router-dom";
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
    // const navigate = useNavigate();

    // const showMoreOrganizationDetails = () => {
    //     navigate(`/organization/${encodeURIComponent(name)}/${encodeURIComponent(githubID)}`, {
    //         state: {
    //             githubID: githubID,
    //             orgName: name,
    //         }
    //     });
    // }

    // onClick={() => { showMoreOrganizationDetails() }}
    return (<Link className="a-info-card" to={`/organization/${encodeURIComponent(name)}/${encodeURIComponent(githubID)}`}>
        <div className="organization-info-card back-color">
            <div className="org-image-div">
                <img src={image_url} style={{ backgroundColor: image_background_color }} className="organization-image" alt={name + " image"} />
                {activeOrg ? <span className="acitve-org-display active-colors">Active</span> :
                    <span className="acitve-org-display inactive-colors">Inactive</span>}
            </div>
            <div className="org-deatils-mix">
                <h3 className="organization-name">{name}</h3>
                <p className="organization-description">{description}</p>
                <div className="back-solid-info">
                    <div className="title-info-cards">
                        Technologies
                    </div>
                    <div className="organization-cat-year-card">
                        {
                            Array.isArray(technologies) ?
                                technologies.slice(0, 4).map((val, index) => <p className="organization-technologies" key={index}>{val}, </p>) :
                                <p className="organization-technologies">{technologies}, </p>
                        }
                        {
                            Array.isArray(technologies) && technologies.length > 4 ? <p className="organization-technologies">+ {technologies.length - 4} more.</p> : <></>
                        }
                    </div>
                </div>
                <div className="title-info-cards">
                    Years
                </div>
                <div className="organization-cat-year-card years-box">
                    {year.map((val, index) => {
                        return <p className="organization-year-card" key={index}>{val}</p>
                    })}
                </div>
            </div>
        </div></Link >);
}

export default OrganizationInfoCard;
