import "./OrgContributors.css";

function OrgContributors({ contributorsDeatils, githubID }) {
    function goToUserAccount(addr) {
        window.open(addr, "_blank");
    }
    return (<div className="contibutors-component">
        <p className="sub-component-heading">
            Organization Contributors
        </p>
        {
            contributorsDeatils.slice(0, 30).map((value, index) => {
                return (
                    <div className="contributor-info" onClick={() => goToUserAccount(value.html_url)} key={index}>
                        <img className="contributor-image" src={value.avatar_url} alt={value.avatar_url} />
                        <div className="contributor-github">{value.login}</div>
                    </div>
                )
            })
        }
        <div className="contributor-info" onClick={() => goToUserAccount(`https://github.com/${githubID}`)}>
            <img className="contributor-image" src="https://github.githubassets.com/favicons/favicon-dark.png" alt="github-logo" />
            <div className="contributor-github">+ View more</div>
        </div>
    </div>)
}

export default OrgContributors;
