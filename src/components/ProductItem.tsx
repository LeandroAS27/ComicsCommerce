//styles
import '../styles/ProductItem.scss';
import {motion} from 'framer-motion'

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchComics } from "../redux/slice/comicsSlice.reducer";
import { AppDispatch, RootState } from "../redux/store";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//material ui
import CircularProgress from "@mui/material/CircularProgress";

const ProductItem: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading, error} = useSelector((state:RootState) => state.comics);

    //buscar detalhes do produto no carregamento do componente
    useEffect(() => {
        if(!products.length){
            dispatch(fetchComics()); //caso os produtos nao estejam carregados, faz a busca dnv
        }
    }, [products, dispatch])

    //encontrar o produto pelo id fornecido no url
    const product = products.find((item) => item.id === Number(id));    

    console.log(product)

    if (loading) return <p><CircularProgress/></p>;

    if(error) return <p>Error... {error}</p>

    if(!product) return <p>Produto nao encontrado</p>

    return(
        <>
            <div className='comic-container'>
                <motion.div 
                className="comic-card"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 } }
                whileHover={{scale: 1.1}}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.3 }}
                >
                    <img
                    className="comic-image"
                    src={`${product.thumbnail.path}.${product.thumbnail.extension}`}
                    alt={product.title || "Thumbnail"}
                    />
                </motion.div>
                    <div className="comic-info">
                        <p className="comic-title">{product.title}</p>
                        <div className='comic-price-and-button'>
                            <p className="comic-price">${product.prices[0].price}</p>
                            <button className="add-to-cart-button">Adicionar ao carrinho</button>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default ProductItem;