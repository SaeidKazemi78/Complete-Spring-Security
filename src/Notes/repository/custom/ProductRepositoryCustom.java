package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.ProductShowStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProductRepositoryCustom {

    Page<Product> findAll(String query, Pageable pageable, CustomerGroup customerGroup);

    Page<Product> findAllByProductShowStatus(ProductShowStatus productShowStatus, String query, Pageable pageable);

}
