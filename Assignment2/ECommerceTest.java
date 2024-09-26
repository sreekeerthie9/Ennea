import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.junit.Test;

public class ECommerceTest {
    //private ECommerce ecom;
    //private productList pl;

    @Test
    public void addProductToCartTest(){
        
        ECommerce ecom = new ECommerce();
        productList pl = new productList();
        HashMap<Integer,Integer> cart = new HashMap<>();
        ecom.addProductToCart(pl,cart,1,2);
        ecom.addProductToCart(pl,cart,2,10);

        assertEquals(2,cart.get(1));
        assertEquals(10,cart.get(2));
        assertFalse(cart.containsKey(3));
        
    }

    @Test
    public void addProductToCartTest2(){
    
        ECommerce ecom = new ECommerce();
        productList pl = new productList();
        HashMap<Integer,Integer> cart = new HashMap<>();
        ecom.addProductToCart(pl,cart,1,6);
        ecom.addProductToCart(pl,cart,2,10);

        assertFalse(cart.containsKey(1));
        assertEquals(10,cart.get(2));
        
    }

    @Test
    public void removeProductFromCartTest(){
        ECommerce ecom = new ECommerce();
        HashMap<Integer,Integer> cart1 = new HashMap<>();
        cart1.put(1,1);
        cart1.put(2,10);
        ecom.removeProductFromCart(cart1,1,1,-1);
        assertFalse(cart1.containsKey(1)); // Asserting that the product has been removed  
    }

    @Test
    public void removeProductFromCartTest2(){
        ECommerce ecom = new ECommerce();
        HashMap<Integer,Integer> cart1 = new HashMap<>();
        cart1.put(1,1);
        cart1.put(2,10);
        ecom.removeProductFromCart(cart1,2,2,5);
        assertEquals(5,cart1.get(2)); // Asserting that the product has been removed  
    }

    @Test
    public void placeOrderTest(){
        ECommerce ecom = new ECommerce();
        productList pl = new productList();
        
        HashMap<Integer,Integer> cart = new HashMap<>();
        List<List<order>> po = new ArrayList<>();
        HashMap<Integer, Double> op = new HashMap<>();
        cart.put(1,1);
        cart.put(2,10);
        ecom.placeOrder(pl,cart,po,op);

        assertTrue(cart.isEmpty());
        assertEquals(4, pl.map.get(1).stock);
        assertEquals(0, pl.map.get(2).stock);
        
        assertEquals(1000.0, po.get(0).get(0).getOrderPrice());
        assertEquals(1500.0, po.get(0).get(1).getOrderPrice());
        assertEquals(2500.0, op.get(0));

        assertEquals(150.0, po.get(0).get(1).productPrice);
    }

    @Test
    public void viewOrderTest(){
        ECommerce ecom = new ECommerce();
        productList pl = new productList();
        
        HashMap<Integer,Integer> cart = new HashMap<>();
        List<List<order>> po = new ArrayList<>();
        HashMap<Integer, Double> op = new HashMap<>();
        cart.put(1,1);
        cart.put(2,10);
        ecom.placeOrder(pl,cart,po,op);

        cart.put(3,10);
        ecom.placeOrder(pl,cart,po,op);

        assertEquals(1000.0, po.get(0).get(0).getOrderPrice());
        assertEquals(1500.0, po.get(0).get(1).getOrderPrice());
        assertEquals(2500.0, op.get(0));

        assertEquals(150.0, po.get(0).get(1).productPrice);

        assertEquals(250.0, po.get(1).get(0).getOrderPrice());
        assertEquals(250.0, op.get(1));

        assertEquals(4, pl.map.get(1).stock);
        assertEquals(0, pl.map.get(2).stock);
        assertEquals(40, pl.map.get(3).stock);

    }

}
