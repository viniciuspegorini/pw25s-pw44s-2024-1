package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.model.Product;
import br.edu.utfpr.pb.pw25s.server.repository.CategoryRepository;
import br.edu.utfpr.pb.pw25s.server.repository.ProductRepository;
import br.edu.utfpr.pb.pw25s.server.service.ICategoryService;
import br.edu.utfpr.pb.pw25s.server.service.IProductService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends CrudServiceImpl<Product, Long>
                                    implements IProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    protected JpaRepository<Product, Long> getRepository() {
        return productRepository;
    }
}
