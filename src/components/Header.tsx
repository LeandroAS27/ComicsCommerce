import { useState } from "react";

//images
import comic from '../images/comics.png'
import cartIcon from '../images/shopping-cart.png'
import close from '../images/close.png'

//styles
import '../styles/Header.scss'

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../redux/store'
import { useNavigate } from "react-router-dom";
import { setId } from "../redux/slice/comicsSlice.reducer";

const Header = () => {
    const [searchProduct, setSearchProduct] = useState<string>('');
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const {products} = useSelector((state: RootState) => state.comics)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleCartModal = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleNavigateHome = () => {
        navigate(`/`)
    }

    const handleSearch = () => { // faz a busca do produto
        if(searchProduct.trim() !==  ''){
            if(!products || products.length === 0){
                console.log('Nenhum produto encontrado')
            }

            const foundProduct = products.find(product => product.title.toLowerCase().includes(searchProduct.toLowerCase()))

            if(foundProduct){
                dispatch(setId(foundProduct.id));
                navigate(`/Products/${foundProduct.id}`, {state: {product: foundProduct}}) // ajustar o navigate, pois nao esta retornando o componente de forma correta
            }else{
                console.log('Produto nao encontrado')
            }
            setSearchProduct('')
        }else{
            console.log('Digite um termo de busca valido')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleSearch()
        }
    }

    return(
        <div className="principal-container">
            <header className="header-container">
                <img 
                src={comic} 
                alt="Logo do loja" 
                onClick={handleNavigateHome}
                className="header-logo"/>
                
                <input 
                type="text"
                placeholder="Pesquise seu produto aqui..."
                aria-label="Campo de busca"
                onKeyDown={handleKeyDown}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchProduct(e.target.value)} />

                <img 
                src={cartIcon} 
                className="header-cart-icon"
                onClick={() => toggleCartModal()}
                alt="Logo do carrinho de compra" />
            </header>

            <div className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
                <p>Seu carrinho esta vazio</p>
                <img src={close} alt="" onClick={toggleCartModal} className="close-icon"/>
            </div>
        </div>
    )
}

export default Header;