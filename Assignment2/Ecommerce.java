import java.util.*;
import java.util.Map.Entry;

class order{
    String name;
    String category;
    double product_price;
    int quantity;
    double order_price;
    public order(String name,double product_price,String category,int quantity){
        this.name = name;
        this.category = category;
        this.product_price = product_price;
        this.quantity = quantity;
    }
    public double getOrderPrice(){
        order_price = product_price*quantity;
        return order_price;
    }
}

public class Ecommerce{
    public static void main(String args[]){

        ProductList pl = new ProductList();
        System.out.println(pl.map.get(1));
        
        HashMap<Integer,Integer> cart = new HashMap<>();
        List<List<order>> placedOrders = new ArrayList<>();
        HashMap<Integer,Double> orderPrices = new HashMap<>();
        
        

        Scanner sc= new Scanner(System.in);
        int idx;
        do{
        System.out.println("--------------------------------------------------");
        System.out.println("1.View all products");
        System.out.println("2.View by category");
        System.out.println("3.Add a product to cart");
        System.out.println("4.Remove from cart");
        System.out.println("5.View cart");
        System.out.println("6.Place order");
        System.out.println("7.View orders");
        System.out.println("8.Exit");
        System.out.println("--------------------------------------------------");
        System.out.println("Enter the index you want ");
        idx = sc.nextInt();
        
        
            switch(idx){
                
                case 1:
                System.out.println("Our products are:");
                if(pl.map.isEmpty()){
                    System.out.println("Sorry! all products are sold.");
                }
                else{
                    for(Entry<Integer,product> or:pl.map.entrySet()){
                        
                        System.out.println("id:"+or.getKey()+"\tname:"+or.getValue().name+"\tprice:"+or.getValue().price+"\tstock left:"+or.getValue().stock);
                        
                    }
                }
                break;

                case 2:
                System.out.println("Products in different category:");
                List<String> categories = new ArrayList<>();
                categories.add("Electronics");
                categories.add("Apparel");
                categories.add("Footwear");
                for(String category:categories){
                    System.out.println("Category:"+category);
                    for(Entry<Integer,product> or:pl.map.entrySet()){
                        if(or.getValue().category.equals(category)){
                            
                            System.out.println("id:"+or.getKey()+"\tname:"+or.getValue().name+"\tprice:"+or.getValue().price+"\tstock left:"+or.getValue().stock);
                        }
                    }
                }
                break;

                case 3:
                int flag = 0;
                do{
                    System.out.println("Enter id from above product list:");
                    int id = sc.nextInt();
                    if(id > pl.map.size()){
                        System.out.println("Sorry! there is no product with that id.");
                        continue;
                    }
                    else{
                        System.out.println("Enter the quantity:");
                        int q = sc.nextInt();
                        if(q>pl.map.get(id).stock){
                            System.out.println("Sorry! There is not enough stock!");
                        }
                        else{
                            cart.put(id,q);
                            pl.reduce(id,q);
                        }    
                    }
                    System.out.println("do you want to add more products?(yes-1 or no-0)");
                    int add = sc.nextInt();
                    if(add==0){
                        flag = 1;
                    }
                }while(flag!=1);
                break;

                case 4:
                flag = 0;
                do{
                    System.out.println("Enter id from above product list to remove:");
                    int id = sc.nextInt();
                    
                    if(!cart.containsKey(id)){
                        System.out.println("Sorry! you did not add that product.");
                        continue;
                    }
                    else{
                        System.out.println("1.remove entire product");
                        System.out.println("2.reduce the quantity of a produvt");
                        System.out.println("Enter the option:");
                        int opt = sc.nextInt();
                        if(opt==1){
                            pl.add(id,cart.get(id));
                            cart.remove(id);
                        }
                        else if(opt==2){
                            System.out.println("Enter the quantity to remove:");
                            int q = sc.nextInt();
                            
                            int temp = cart.get(id);
                            temp-=q;
                            if(temp>0){
                                cart.put(id,temp);
                                pl.add(id,temp);
                            }
                            else{
                                pl.add(id,cart.get(id));
                                cart.remove(id);
                            }    
                        }  
                    }
                    System.out.println("do you want to remove more products?(yes-1 or no-0)");
                    int rem = sc.nextInt();
                    if(rem==0){
                        flag = 1;
                    }
                }while(flag!=1);
                break;


                case 5:
                if(cart.isEmpty()){
                    System.out.println("Your cart is empty!");
                }
                else{
                    System.out.println("Your cart:");
                    for(int orderid:cart.keySet()){
                        product pr = pl.map.get(orderid);
                        System.out.println("id:"+orderid+"\tname:"+pr.name+"\tprice:"+pr.price+"\tcategory:"+pr.category+"\tquantity:"+cart.get(orderid));
                    }
                }
                break;

                case 6:
                if(cart.isEmpty()){
                    System.out.println("Your cart is empty!");
                    System.out.println("Please add items to cart!");
                }
                else{
                    System.out.println("Your order:");
                    double total_price = 0;
                    List<order> li = new ArrayList<>();
                    for(int orderid:cart.keySet()){
                        product pr = pl.map.get(orderid);
                        li.add(new order(pr.name,pr.price,pr.category,cart.get(orderid)));
                        System.out.println("id:"+orderid+"\tname:"+pr.name+"\tprice:"+pr.price+"\tcategory:"+pr.category+"\tquantity:"+cart.get(orderid)+"\torder price:"+li.get(li.size()-1).getOrderPrice());
                        total_price+=li.get(li.size()-1).getOrderPrice();
                    }
                    System.out.println("Total price:"+total_price);
                    System.out.println("confirm order(yes-1/no-0)");
                    int conf = sc.nextInt();
                    if(conf==1){
                        cart.clear();
                        placedOrders.add(li);
                        orderPrices.put(placedOrders.size()-1,total_price);
                    }
                    else{
                        break;
                    }
                    
                }
                break;

                case 7:
                if(placedOrders.isEmpty()){
                    System.out.println("Orders are empty!");
                }
                else{
                    for(int i=0;i<placedOrders.size();i++){
                        List<order> ol = placedOrders.get(i);
                        System.out.println("sno."+(i+1));
                        for(order or : ol){
                            System.out.println("name:"+or.name+"\tproduct price:"+or.product_price+"\tcategory:"+or.category+"\tquantity:"+or.quantity+"\torder price:"+or.getOrderPrice());
                        }
                        System.out.println("Total price:"+orderPrices.get(i));
                    }
                    
                }
                
            }
        }while(idx!=8);
        
    }
    
}