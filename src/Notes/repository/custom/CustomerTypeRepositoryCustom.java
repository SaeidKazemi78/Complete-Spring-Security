package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.Depot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface CustomerTypeRepositoryCustom {

    Page<CustomerType> findAll(String query, Pageable pageable);

}
