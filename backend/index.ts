import express, { Request, Response } from "express";
import cors from "cors";

import { Product, CartItem } from "./types";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const products: Product[] = [
    { id: "1", name: "T-Shirt", price: 20 },
    { id: "2", name: "Shoes", price: 50 },
    { id: "3", name: "Cap", price: 10 },
];

// In-memory cart
let cart: CartItem[] = [];

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

/*
GET /products
Query params:
   sort = "asc" | "desc"
   minPrice = 10
   maxPrice = 30
   search = "Shoes"
*/

app.get("/products", (req: Request, res: Response) => {
    let result = [...products];

    const { sort, minPrice, maxPrice, search } = req.query;

    // Filter by minPrice
    if (minPrice) {
        result = result.filter((p) => p.price >= Number(minPrice));
    }

    // Filter by maxPrice
    if (maxPrice) {
        result = result.filter((p) => p.price <= Number(maxPrice));
    }

    // Name search
    if (search) {
        const s = String(search).toLowerCase();
        result = result.filter((p) => p.name.toLowerCase().includes(s));
    }

    // Sorting
    if (sort === "asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
        result.sort((a, b) => b.price - a.price);
    }

    res.json(result);
});

// GET /cart
app.get("/cart", (req: Request, res: Response) => {
    res.json(cart);
});

/*
   Post Cart
   Body example:
   { "id": "1", "quantity": 2 }
*/
app.post("/cart", (req: Request, res: Response) => {
    const newItem: CartItem = req.body;
    const existingItem = cart.find((item) => item.id === newItem.id);

    if (existingItem) {
        existingItem.quantity += newItem.quantity;
    } else {
        cart.push(newItem);
    }

    res.json({ message: "Cart updated", cart });
});

// DELETE /cart/:id
app.delete("/cart/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    cart = cart.filter((item) => item.id !== id);
    res.json({ message: "Item removed", cart });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
