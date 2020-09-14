package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.Container;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ContainerRepositoryCustom {

    Page<Container> findAll(String query, Pageable pageable);

}
