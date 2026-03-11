import React, { useEffect, useState } from "react";
import api from "../services/axios";
import { CartItem, Product } from "./types";
import styles from "../styles/styles.module.css";

interface Props {
    refresh: boolean;
}

const Cart: React.FC<Props> = ({ refresh }) => {
    const [cart, setCart] = useState<(CartItem & Product)[]>([]);

    const loadCart = () => {
        api.get("/cart").then(async (res) => {
            const cartItems = res.data;

            const products = await api.get("/products");
            const productsMap = new Map(
                products.data.map((p: Product) => [p.id, p])
            );

            const merged = cartItems.map((item: CartItem) => ({
                ...item,
                ...productsMap.get(item.id),
            }));

            setCart(merged);
        });
    };

    useEffect(() => {
        loadCart();
    }, [refresh]);

    const removeItem = (id: string) => {
        api.delete(`/cart/${id}`).then(() => loadCart());
    };

    return (
        <div className={styles["cart-container"]}>
            <h2>Shopping Cart</h2>

            {cart.length === 0 && <p>No items in cart</p>}

            {cart.map((item) => (
                <div key={item.id} className={styles["cart-item"]}>
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
