import "./OrganizationsLinksAndStatus.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import ChatIcon from '@mui/icons-material/Chat';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailLockIcon from '@mui/icons-material/MailLock';

const OrganizationsLinksAndStatus = ({
    activeStatus,
    orgGithubID,
    orgWebLink,
    contactEmail,
    mailingList
}) => {
    return (<div className="org-links-and-status-group">
        {contactEmail ?
            <div className="btn org-links">
                <a href={contactEmail}>
                    <MailIcon sx={{ fontSize: 30 }} />
                </a>
            </div>
            : <></>}

        {orgGithubID ?
            <div className="btn org-links">
                <a href={'https://github.com/' + orgGithubID} target="_blank" rel="noreferrer">
                    <GitHubIcon sx={{ fontSize: 30 }} />
                </a>
            </div> : <></>}

        {mailingList ?
            <div className="btn org-links">
                <a href={mailingList} target="_blank" rel="noreferrer">
                    <ChatIcon sx={{ fontSize: 30 }} />
                </a>
            </div>
            : <></>}
        <div className="btn org-links">
            <TwitterIcon sx={{ fontSize: 30 }} />
        </div>
        {orgWebLink ?
            <div className="btn org-links">
                <a href={orgWebLink} target="_blank" rel="noreferrer">
                    <MailLockIcon sx={{ fontSize: 30 }} />
                </a>
            </div> : <></>
        }
    </div >);
}

export default OrganizationsLinksAndStatus;