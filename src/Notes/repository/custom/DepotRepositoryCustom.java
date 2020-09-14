package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.Depot;
import ir.donyapardaz.niopdc.base.domain.Region;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface DepotRepositoryCustom {

    Page<Depot> findAll(String query, Pageable pageable);

}
