import "./PastProjectDetailCard.css";

const PastProjectDetailCard = ({ projectDetails, projectNumber }) => {
    const openInNewTab = () => {
        window.open(projectDetails.project_url, "_blank");
    };

    return (<div className="past-project-card" onClick={openInNewTab}>
        <div className="past-project-number">#{projectNumber}</div>
        <h3 className="past-project-title">
            {projectDetails.title}
        </h3>
        <p className="past-project-short_description">
            {projectDetails.short_description}
        </p>
        <div className="past-project-student_name">
            -{projectDetails.student_name}
        </div>
        <div className="past-project-more_details">
            <a href={projectDetails.project_url} target="_blank" rel="noreferrer">
                More Details
            </a>
        </div>
    </div>)
}
export default PastProjectDetailCard;
