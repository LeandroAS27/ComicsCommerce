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
import { incrementQuantity, removeFromCart, setId, toggleCart } from "../redux/slice/comicsSlice.reducer";
import PaymentForm from "./PaymentForm";

const Header = () => {
    const [searchProduct, setSearchProduct] = useState<string>('');
    const [isCheckoutFormOpen, setIsCheckoutFormOpen] = useState<boolean>(false);
    const cartItems = useSelector((state:RootState) => state.comics.cartItems)
    const isCartOpen = useSelector((state: RootState) => state.comics.isCartOpen)
    const {products} = useSelector((state: RootState) => state.comics)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const total = cartItems.reduce((acc, item) => {
        const price = item.prices && item.prices.length > 0 && item.prices[0].price ? Number(item.prices[0].price) : 0;
        return acc + price * item.quantity;
    }, 0);



    const handleNavigateHome = () => {
        navigate(`/`)
    }

    const handleOpenCheckoutForm = () => {
        setIsCheckoutFormOpen(true)
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
                navigate(`/Product/${foundProduct.id}`, {state: {product: foundProduct}})
            }else{
                console.log('Produto nao encontrado')
            }
            setSearchProduct('')
        }else{
            console.log('Digite um termo de busca valido')
        }
    }

    const handlePlusQuantity = (id: number) => {
        dispatch(incrementQuantity(id))
    }

    const handleRemoveCart = (id: number) => {
        dispatch(removeFromCart(id))
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
                    <p>Seu carrinho está vazio</p>
                ) : (
                    <div>
                        <h2>Itens do carrinho:</h2>
                        <ul className="cart-list">
                            {cartItems.map((item) =>{
                                return (
                                <li key={item.id}>
                                    <div className="cart-container">
                                        <div className="cart-info">
                                            <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                            alt={item.title}
                                            className="cart-image"
                                            />
                                            <div className="cart-details">
                                                <h4>{item.title}</h4>
                                                <p>Preço: ${
                                                item.prices && item.prices.length > 0 && item.prices[0].price
                                                ? Number(item.prices[0].price).toFixed(2)
                                                : 'Indisponível'
                                                }
                                                </p>
                                                <p>Quantidade: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="cart-buttons">
                                            <button className="cart-plus" onClick={() => handlePlusQuantity(item.id)}>
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </button>
                                            <button className="cart-trash" onClick={() => handleRemoveCart(item.id)}>
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
                <p className="total-price">Total: ${total.toFixed(2)}</p>
                {isCheckoutFormOpen ? (
                    <PaymentForm onSubmit={(data, discount) => {
                        const totalWithDiscount = total - (total * (discount / 100));
                        console.log("Pagamento confirmado com os dados:", data);
                        console.log(`Total com desconto aplicado: ${totalWithDiscount.toFixed(2)}`);
                        alert('Pagamento Confirmado');
                        setIsCheckoutFormOpen(false);
                    }} />
                ) : (
                    <button onClick={handleOpenCheckoutForm} className="modal-button">Finalizar Compra</button>
                )}
            </div>
        </div>
    )
}

export default Header;