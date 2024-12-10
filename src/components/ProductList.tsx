import React from "react";
import { useEffect } from "react";
import { motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";

//material ui
import CircularProgress from "@mui/material/CircularProgress";

//redux
import { useSelector } from "react-redux";
import { fetchComics } from "../redux/slice/comicsSlice.reducer";
import { RootState } from "../redux/store";
import { setId } from "../redux/slice/comicsSlice.reducer";

//hooks
import { useAppDispatch } from "../hooks/hooks";

//styles
import '../styles/ProductList.scss'

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {products, loading, error} = useSelector((state: RootState) => state.comics);

    const handleClickNavigation = (comicId: number) => {
        dispatch(setId(comicId))
        navigate(`/Product/${comicId}`);
    }

    useEffect(() => {
        dispatch(fetchComics());
    }, [dispatch])

    if (loading) return <p><CircularProgress/></p>;
    if (error) return <p>{error}</p>

    return(
        <div className="comic-list">
            {products.map((comic) => (
            <motion.div 
            whileHover={{ scale: [null, 1.1, 1.1] }}
            transition={{ duration: 0.3 }}
            key={comic.id} 
            className="comic-card">
                    <p className="comic-card_title">{comic.title}</p>
                    <img 
                    className="comic-card_thumbnail"
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                    alt={comic.title || 'Thumbnail'} />
                    <button 
                    onClick={() => handleClickNavigation(comic.id)}
                    className="comic-card_button">More Details</button>
                </motion.div>
            ))}
        </div>
    )
}

export default ProductList;