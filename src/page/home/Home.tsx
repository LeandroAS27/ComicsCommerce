import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

const Home = () => {
    return(
        <div>
            <header>
                <Header/>
            </header>
            
            <main>
                <ProductList/>
            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default Home;