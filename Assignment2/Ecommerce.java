
import java.util.*;

class product{
    String name;
    String category;
    double price;
    int stock;
    public product(String name,double price,String category,int stock){
        this.name = name;
        this.price = price;
        this.category = category;
        this.stock = stock;
    }
}

class order{
    String name;
    String category;
    double productPrice;
    int quantity;
    public order(String name,double productPrice,String category, int quantity){
        this.name = name;
        this.category = category;
        this.productPrice = productPrice;
        this.quantity = quantity;
    }
    public double getOrderPrice(){
        return productPrice*quantity;
    }
}

class productList{
    HashMap<Integer,product> map = new HashMap<>();

    public productList(){
        map.put(1, new product("Laptop", 1000.0, "Electronics", 5));
        map.put(2, new product("Headphones", 150.0, "Electronics", 10));
        map.put(3, new product("T-shirt", 25.0, "Apparel", 50));
        map.put(4, new product("Shoes", 60.0, "Footwear", 30));
    }
    public void reduce(int id, int quantity) {
        if (map.containsKey(id)) {
            product product = map.get(id);
            product.stock -= quantity;
        } else {
            System.out.println("There is no item with the given id.");
        }
    }

    public void add(int id, int quantity) {
        if (map.containsKey(id)) {
            product product = map.get(id);
            product.stock += quantity;
        }
    }
}

public class ECommerce{
    static Scanner scanner = new Scanner(System.in);
    public static void main(String[] args) {
        productList pl = new productList();
        HashMap<Integer, Integer> cart = new HashMap<>();
        List<List<order>> placedOrders = new ArrayList<>();
        HashMap<Integer, Double> orderPrices = new HashMap<>();
        
        int choice;
        do {
            System.out.println("--------------------------------------------------");
            System.out.println("1. View all products");
            System.out.println("2. View by category");
            System.out.println("3. Add a product to cart");
            System.out.println("4. Remove from cart");
            System.out.println("5. View cart");
            System.out.println("6. Place order");
            System.out.println("7. View orders");
            System.out.println("8. Exit");
            System.out.println("--------------------------------------------------");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            
            switch (choice) {
                case 1:
                    viewAllProducts(pl);
                    break;

                case 2:
                    viewProductsByCategory(pl);
                    break;

                case 3:
                int id;
                do {
                    System.out.print("Enter ID of the product to add to cart: ");
                    id = scanner.nextInt();
        
                    if (!pl.map.containsKey(id)) {
                        System.out.println("Sorry! There is no product with that ID.");
                        
                    }
                    else{
                        System.out.print("Enter the quantity: ");
                        int quantity = scanner.nextInt();
                        addProductToCart(pl, cart, id, quantity);
                    }
        
                    System.out.print("Do you want to add more products? (yes-1/no-0): ");
                } while (scanner.nextInt() == 1);
                    break;

                case 4:
                
                do {
                    System.out.print("Enter ID of the product to remove from cart: ");
                    id = scanner.nextInt();
        
                    if (!cart.containsKey(id)) {
                        System.out.println("Sorry! You did not add that product.");
                    }
                    else{
                        System.out.println("1. Remove entire product");
                        System.out.println("2. Reduce the quantity of a product");
                        System.out.print("Enter the option: ");
                        int option = scanner.nextInt();
                        int quantity = -1;
                        if(option==2){
                            System.out.println("Enter the quantity to remove:");
                            quantity = scanner.nextInt();
                        }
                        removeProductFromCart(cart,id,option,quantity);
                    }
        
                    System.out.print("Do you want to remove more products? (yes-1/no-0): ");
                    
                } while (scanner.nextInt() == 1);
                    //removeProductFromCart(cart);
                    break;

                case 5:
                    viewCart(cart, pl);
                    break;

                case 6:
                    placeOrder(pl, cart, placedOrders, orderPrices);
                    break;

                case 7:
                    viewOrders(placedOrders, orderPrices);
                    break;

                case 8:
                    System.out.println("Exiting...");
                    break;

                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 8);
    }
    //for viewing all products
    public static void viewAllProducts(productList pl) {
        System.out.println("Our products are:");
        if (pl.map.isEmpty()) {
            System.out.println("Sorry! All products are sold.");
        } else {
            for (Map.Entry<Integer, product> entry : pl.map.entrySet()) {
                product pr = entry.getValue();
                System.out.printf("ID: %d\tName: %s\tPrice: %.2f\tStock left: %d%n",
                                  entry.getKey(), pr.name, pr.price, pr.stock);
            }
        }
    }
    //viewing products category by category
    public static void viewProductsByCategory(productList pl) {
        List<String> categories = Arrays.asList("Electronics", "Apparel", "Footwear");
        for (String category : categories) {
            System.out.println("Category: " + category);
            for (Map.Entry<Integer, product> entry : pl.map.entrySet()) {
                if (entry.getValue().category.equals(category)) {
                    product pr = entry.getValue();
                    System.out.printf("ID: %d\tName: %s\tPrice: %.2f\tStock left: %d%n",
                                      entry.getKey(), pr.name, pr.price, pr.stock);
                }
            }
        }
    }

    public static void addProductToCart(productList pl, HashMap<Integer, Integer> cart, int id,int quantity) {
        
        product pr = pl.map.get(id);
        if (quantity > pr.stock) {
            System.out.println("Sorry! There is not enough stock!");
        } else {
            cart.put(id, cart.getOrDefault(id, 0) + quantity);    
        }

    }

    public static void removeProductFromCart(HashMap<Integer, Integer> cart,int id,int option,int quantity) {
       
        if (option == 1) {
            cart.remove(id);
        } else if (option == 2) {
            int currentQuantity = cart.get(id);
            if (quantity >= currentQuantity) {
                cart.remove(id);
            } else {
                cart.put(id, currentQuantity - quantity);
            }
        }

    }

    public static void viewCart(HashMap<Integer, Integer> cart, productList pl) {
        if (cart.isEmpty()) {
            System.out.println("Your cart is empty!");
        } else {
            System.out.println("Your cart:");
            for (int orderId : cart.keySet()) {
                product pr = pl.map.get(orderId);
                System.out.printf("ID: %d\tName: %s\tPrice: %.2f\tCategory: %s\tQuantity: %d%n",
                                  orderId, pr.name, pr.price, pr.category, cart.get(orderId));
            }
        }
    }

    public static void placeOrder(productList pl, HashMap<Integer, Integer> cart,List<List<order>> placedOrders, HashMap<Integer, Double> orderPrices) {
        if (cart.isEmpty()) {
            System.out.println("Your cart is empty! Please add items to cart!");
            return;
        }

        System.out.println("Your order:");
        double totalPrice = 0;
        List<order> orderList = new ArrayList<>();
        for (int orderId : cart.keySet()) {
            product pr = pl.map.get(orderId);
            int quantity = cart.get(orderId);
            order or = new order(pr.name, pr.price, pr.category, quantity);
            orderList.add(or);
            pl.reduce(orderId, quantity);
            totalPrice += or.getOrderPrice();
            System.out.printf("ID: %d\tName: %s\tPrice: %.2f\tCategory: %s\tQuantity: %d\tOrder Price: %.2f%n",
                              orderId, pr.name, pr.price, pr.category, quantity, or.getOrderPrice());
        }
        
        System.out.printf("Total Price: %.2f%n", totalPrice);
        
        cart.clear();
        placedOrders.add(orderList);
        orderPrices.put(placedOrders.size() - 1, totalPrice);
        
    }

    public static void viewOrders(List<List<order>> placedOrders, HashMap<Integer, Double> orderPrices) {
        if (placedOrders.isEmpty()) {
            System.out.println("Orders are empty!");
        } else {
            for (int i = 0; i < placedOrders.size(); i++) {
                List<order> orders = placedOrders.get(i);
                System.out.println("Order No: " + (i + 1));
                for (order or : orders) {
                    System.out.printf("Name: %s\tProduct Price: %.2f\tCategory: %s\tQuantity: %d\tOrder Price: %.2f%n",
                                      or.name, or.productPrice, or.category, or.quantity, or.getOrderPrice());
                }
                System.out.printf("Total Price: %.2f%n", orderPrices.get(i));
            }
        }
    }


}