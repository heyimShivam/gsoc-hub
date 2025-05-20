import "./RepoDetailCard.css";
import { useEffect, useState } from "react";

const RepoDetailCard = ({
    deatils,
    index,
    githubID
}) => {
    const openInNewTab = () => {
        window.open(deatils.html_url, "_blank");
    };

    useEffect(() => {
    }, []);

    return (<div className="repo-deatil-card" onClick={openInNewTab}>
        <h3 className="repo-title">
            {deatils.name}
        </h3>
        <div className="repo-desc">
            {deatils.description}
        </div>
        <div className="repo-topics">
            {deatils.topics.map((value, index) => {
                return <div key={index} className="repo-topic">{value}</div>
            })}
        </div>
        {/* <div className="repo-lan">
            {Object.keys(orgLanguages).map((lan, index) => {
                return <div className="lan" key={index}>{lan}</div>
            })}
        </div> */}
        <div className="repo-link">
            <div className="repo-link-details">
                <span className="repo-head">Total Fork: </span>{deatils.forks_count}
            </div>
            <div className="repo-link-details">
                <span className="repo-head">Open Issues:</span> {deatils.open_issues_count}
            </div>
        </div>
    </div>);
}

export default RepoDetailCard;
