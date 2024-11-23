package com.sree.ProductApp.service;

import com.sree.ProductApp.model.Product;

import java.util.List;

public interface ProductService {
    public List<Product> getAllProducts();
    public Product saveProduct(Product product);
    public String deleteProduct(int id);
    public Product getProduct(int id);
    public List<Product> getProductsByCategory(String category);
    public List<String> getAllCategories();
}
