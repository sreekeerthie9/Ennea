package com.sree.ProductApp.repository;

import com.sree.ProductApp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(String category);

    @Query("select distinct category from Product")
    List<String> findAllCategories();
}
