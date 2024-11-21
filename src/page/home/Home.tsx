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
        </div>
    )
}

export default Home;