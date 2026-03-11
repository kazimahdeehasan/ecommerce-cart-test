export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface CartItem {
    id: string;
    quantity: number;
}

export interface Props {
    onAddToCart: (id: string) => void;
}
