import FavoriteIcon from '@mui/icons-material/Favorite';
import "./Footer.css";

const Footer = () => {
    return (<div className="footer-component">
        <footer className="footer">
            <div className="footer__about">
                <h1>GSoC Hub</h1>
                <p>If you find an issue on the site, you can report it <a href="https://github.com/heyimshivam/" target="__blank">here</a>.</p>
                <p>Click on “<span className='new-issue'>New issue</span>”, then provide a clear description along with relevant screenshots.</p>
                <p>Visit the official Google Summer of Code website by clicking <a href="https://summerofcode.withgoogle.com/" target="__blank">here</a>.</p>
            </div>
            <div className="footer__network">
                <a href="https://linkedin.com/in/heyimshivam" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/hey.imshivam/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-instagram"></i>
                </a>
                <a href="https://github.com/heyimshivam" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-github"></i>
                </a>
            </div>
            <hr></hr>
            <span className="footer__copyright">
                Made with <span className="love-emoji">
                    <FavoriteIcon sx={{ fontSize: 12 }} /> </span>
                by
                <a className="heyimshivam" href="https://github.com/heyimshivam/" target="__blank">
                    heyimshivam
                </a>
            </span>
        </footer>
    </div>)
}

export default Footer;
