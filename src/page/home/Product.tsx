import Footer from "../../components/Footer";
import Header from "../../components/Header";

import ProductItem from "../../components/ProductItem";

const Product = () => {
    return(
        <>
            <header>
                <Header/>
            </header>
            <main>
                <ProductItem/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}

export default Product;