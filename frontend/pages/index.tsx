import React, { useState } from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import api from "../services/axios";
import styles from "../styles/styles.module.css";

const Home: React.FC = () => {
    const [refreshCart, setRefreshCart] = useState(false);

    const addToCart = (id: string) => {
        api.post("/cart", { id, quantity: 1 }).then(() => {
            setRefreshCart(!refreshCart);
        });
    };

    return (
        <div className={styles.wrapper}>
            <ProductList onAddToCart={addToCart} />
            <Cart refresh={refreshCart} />
        </div>
    );
};

export default Home;
