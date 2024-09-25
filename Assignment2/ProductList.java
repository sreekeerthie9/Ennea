import java.util.*;

class product{
    String name;
    String category;
    double price;
    int stock;
    public product(String name,double price,String category,int stock){
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
}

public class ProductList{
    HashMap<Integer,product> map = new HashMap<>();
    public ProductList(){
        map.put(1,new product("Laptop", 1000.0, "Electronics", 5));
        map.put(2,new product("Headphones", 150.0, "Electronics", 10));
        map.put(3,new product("T-shirt", 25.0, "Apparel", 50));
        map.put(4,new product("Shoes", 60.0, "Footwear", 30));
    }
    public void reduce(int id,int quantity){
       if(map.containsKey(id)){
            product pr = map.get(id);
            pr.stock-=quantity;
            map.put(id,pr);
       }
       else{
        System.out.println("There is no item with the given id");
       }
    }
    public void add(int id,int quantity){
        if(map.containsKey(id)){
            product pr = map.get(id);
            pr.stock+=quantity;
            map.put(id,pr);
       }
    }
}