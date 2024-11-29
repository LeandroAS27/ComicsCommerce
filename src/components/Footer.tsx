import '../styles/Footer.scss';
import comic from '../images/comics.png'

const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-column logo">
                    <img src={comic} alt="logo da loja" />
                    <p>Criado por Leandro Alves &#169;</p>
            </div>
            <div className="footer-column useful-links">
                <h3>Useful Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>

            <div className='footer-column follow-us'>
                <h3>Follow Us</h3>
                <ul>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Youtube</a></li>
                    <li><a href="#">Instagram</a></li>
                </ul>
            </div>

            <div className="footer-column address">
                <h3>Address</h3>
                <p>123 street name</p>
                <p>City, country</p>
                <p>+123 456 789</p>
            </div>
        </footer>
    )
}
export default Footer;