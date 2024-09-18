import java.util.*;
import java.util.Map.Entry;

public class Ecommerce{
    public static void main(String args[]){

        ProductList pl = new ProductList();
        System.out.println(pl.map.get(1));
        
        HashMap<Integer,Integer> cart = new HashMap<>();
        List<product> li = new ArrayList<>();
        int total_price = 0;

        Scanner sc= new Scanner(System.in);
        int idx;
        do{
        System.out.println("--------------------------------------------------");
        System.out.println("1.View all products");
        System.out.println("2.Search by category");
        System.out.println("3.Add a product to cart");
        System.out.println("4.View cart");
        System.out.println("5.Make order");
        System.out.println("6.View order");
        System.out.println("7.Exit");
        System.out.println("--------------------------------------------------");
        System.out.println("Enter the index you want ");
        idx = sc.nextInt();
        
        
            switch(idx){
                case 1:System.out.println("Our products are:");
                if(pl.map.isEmpty()){
                    System.out.println("Sorry! all products are sold.");
                }
                else{
                    for(Entry<Integer,product> or:pl.map.entrySet()){
                        
                        System.out.println("id:"+or.getKey()+"\nname:"+or.getValue().name+"\nprice:"+or.getValue().price+"\nstock left:"+or.getValue().stock);
                        
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
                            
                            System.out.println("id:"+or.getKey()+"\nname:"+or.getValue().name+"\nprice:"+or.getValue().price+"\nstock left:"+or.getValue().stock);
                        }
                    }
                }
                break;

                case 3:
                int flag = 0;
                do{
                    System.out.println("Enter id from above product list:");
                    int orderno = sc.nextInt();
                    if(orderno > pl.map.size()){
                        System.out.println("Sorry! there is no product with that id.");
                        continue;
                    }
                    else{
                        System.out.println("Enter the quantity:");
                        int q = sc.nextInt();
                        if(q>pl.map.get(orderno).stock){
                            System.out.println("Sorry! There is not enough stock!");
                        }
                        cart.put(orderno,q);
                        pl.reduce(orderno,q);
                        
                    }
                    System.out.println("do you want to add more products?(yes-1 or no-0)");
                    int add = sc.nextInt();
                    if(add==0){
                        flag = 1;
                    }
                }while(flag!=1);
                break;

                case 4:System.out.println("Your cart:");
                for(int orderid:cart.keySet()){
                    product pr = pl.map.get(orderid);
                    System.out.println("id:"+orderid+"\nname:"+pr.name+"\nprice:"+pr.price+"\ncategory:"+pr.category+"\nquantity:"+cart.get(orderid));
                }
                break;

                case 5:System.out.println("Your order:");
            
                for(int orderid:cart.keySet()){
                    product pr = pl.map.get(orderid);
                    System.out.println("id:"+orderid+"\nname:"+pr.name+"\nprice:"+pr.price+"\ncategory:"+pr.category+"\nquantity:"+cart.get(orderid));
                    li.add(new product(pr.name,pr.price,pr.category,cart.get(orderid)));
                    total_price+=pr.price*cart.get(orderid);
                }
                System.out.println("Total price:"+total_price);
                System.out.println("Please pay money!");
                System.out.println("Have you paid money(yes-1/no-1):");
                int paid = sc.nextInt();
                if(paid==1){
                    System.out.println("Your Order is placed!!");
                }
                else{
                    System.out.println("Please pay the money.");
                }

                case 6:
                if(li.isEmpty()){
                    System.out.println("Orders are empty!");
                }
                else{
                    for(product pr : li){
                        System.out.println("\nname:"+pr.name+"\nprice:"+pr.price+"\ncategory:"+pr.category+"\nquantity:"+pr.stock);
                    }
                    System.out.println("Total price:"+total_price);
                }
                
            }
        }while(idx!=7);
  
        
    }
    
}