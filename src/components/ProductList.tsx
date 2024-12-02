import { useEffect } from "react";
import { motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchComics } from "../redux/slice/comicsSlice.reducer";
import { RootState } from "../redux/store";
import { setId } from "../redux/slice/comicsSlice.reducer";

//styles
import styles from '../styles/ProductList.module.scss'

const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {products, loading, error} = useSelector((state: RootState) => state.comics);

    const handleClickNavigation = (comicId: number) => {
        dispatch(setId(comicId))
        navigate(`/Product/${comicId}`);
    }

    console.log(products)

    useEffect(() => {
        dispatch(fetchComics());
    }, [dispatch])

    if (loading) return <p className={styles["loader"]}></p>;
    if (error) return <p>{error}</p>

    return(
        <div className={styles["comic-list"]}>
            {products.map((comic) => (
            <motion.div 
            whileHover={{ scale: [null, 1.1, 1.1] }}
            transition={{ duration: 0.3 }}
            key={comic.id} 
            className={styles["comic-card"]}>
                    <p className={styles["comic-card_title"]}>{comic.title}</p>
                    <img 
                    className={styles["comic-card_thumbnail"]}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                    alt={comic.title || 'Thumbnail'} />
                    <button 
                    onClick={() => handleClickNavigation(comic.id)}
                    className={styles["comic-card_button"]}>More Details</button>
                </motion.div>
            ))}
        </div>
    )
}

export default ProductList;