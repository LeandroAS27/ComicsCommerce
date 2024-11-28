import { useEffect, useRef, useState } from "react";
import comic from '../images/comics.png'
import cartIcon from '../images/shopping-cart.png'
import close from '../images/close.png'
import '../styles/Header.scss'

const Header = () => {
    const [searchProduct, setSearchProduct] = useState<string>('');
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);


    const toggleCartModal = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleSearch = () => {
        if(searchProduct.trim() !==  ''){
            console.log("Buscando por", searchProduct);
        }else{
            console.log("Produto nao encontrado")
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