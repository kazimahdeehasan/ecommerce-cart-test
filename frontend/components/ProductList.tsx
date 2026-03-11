import React, { useEffect, useState } from "react";
import api from "../services/axios";
import { Product, Props } from "./types";
import styles from "../styles/styles.module.css";

const ProductList: React.FC<Props> = ({ onAddToCart }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("/products?sort=asc")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={styles["product-container"]}>
            <h2>Products</h2>

            <div className={styles["product-grid"]}>
                {products.map((p) => (
                    <div key={p.id} className={styles["product-card"]}>
                        <h3>{p.name}</h3>
                        <p>Price: ${p.price}</p>
                        <button onClick={() => onAddToCart(p.id)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
