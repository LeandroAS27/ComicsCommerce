import { useEffect, useState } from "react";

//images
import comic from '../images/comics.png'
import cartIcon from '../images/shopping-cart.png'
import close from '../images/close.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

//styles
import '../styles/Header.scss'

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../redux/store'
import { useNavigate } from "react-router-dom";
import { setId, toggleCart } from "../redux/slice/comicsSlice.reducer";

const Header = () => {
    const [searchProduct, setSearchProduct] = useState<string>('');
    const cartItems = useSelector((state:RootState) => state.comics.cartItems)
    const isCartOpen = useSelector((state: RootState) => state.comics.isCartOpen)
    const {products} = useSelector((state: RootState) => state.comics)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavigateHome = () => {
        navigate(`/`)
    }

    useEffect(() => {
        if(cartItems.length > 0){
            localStorage.setItem('CartItems', JSON.stringify(cartItems))
        }
    }, [cartItems])

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
                onClick={() => dispatch(toggleCart())}
                alt="Logo do carrinho de compra" />
            </header>

            <div className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
                <img src={close} alt="" onClick={() => dispatch(toggleCart())} className="close-icon"/>
                {cartItems.length === 0 ? (
                    <p>Seu carrinho esta vazio</p>
                ) : (
                    <div>
                        <h2>Itens do carrinho:</h2>
                        <ul className="cart-list">
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    <div className="cart-container">
                                        <div className="cart-info">
                                            <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                            alt={item.title}
                                            className="cart-image"
                                            />
                                            <div className="cart-details">
                                                <h4>{item.title}</h4>
                                                <p>Preço: ${Number(item.prices).toFixed(2)}</p>
                                                <p>Quantidade: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="cart-buttons">
                                            <button className="cart-plus">
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </button>
                                            <button className="cart-trash">
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;