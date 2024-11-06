import { createContext, useReducer } from "react";

export const ProductContext = createContext({
    products: [],
    addProduct: () => {},
});

function ProductReducer(state, action){
    if(action.type === 'ADD_PRODUCT'){
        const updatedProducts = [...state.products, action.payload];
        console.log(action.payload);
        return {
            products: updatedProducts,
        }
    }
    return state;
}

export default function ProductContextProvider({children}){
    const [state, dispatch] = useReducer(
        ProductReducer,
        {
            products:[],
        }
    );

    function handleAddProduct(product){
        dispatch({
        type: 'ADD_PRODUCT',
        payload: product,
    })
    }

    const value = {
        products: state.products,
        addProduct: handleAddProduct,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}