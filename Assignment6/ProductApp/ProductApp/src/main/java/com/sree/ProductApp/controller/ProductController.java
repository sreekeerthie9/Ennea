package com.sree.ProductApp.controller;

import com.sree.ProductApp.model.Product;
import com.sree.ProductApp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://localhost:5173")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id) {
        Product product = productService.getProduct(id);
        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return product;
    }

    @DeleteMapping("/products/{id}")
    public String deleteProductById(@PathVariable int id) {
        return productService.deleteProduct(id);
    }

    @PostMapping("/products/add")
    public Product addProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @GetMapping("/products/categories/{category}")
    public List<Product> getProductByCatgeory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    @GetMapping("/products/categories")
    public List<Map<String,String>> getAllCategories() {
        List<String> categories = productService.getAllCategories();
       return categories.stream().map(category -> Map.of("categoryName", category==null?"NA":category)).collect(Collectors.toList());
        //return categories;
    }

    @PutMapping("/products/add/{id}")
    public Product updateProduct(@PathVariable int id, @RequestBody Product productDetails) {
        Product product = productService.getProduct(id);
        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        product.setTitle(productDetails.getTitle());
        product.setCategory(productDetails.getCategory());
        product.setBrand(productDetails.getBrand());
        product.setPrice(productDetails.getPrice());
        product.setRating(productDetails.getRating());
        product.setDescription(productDetails.getDescription());
        product.setImage(productDetails.getImage());
        return productService.saveProduct(product); }
}
