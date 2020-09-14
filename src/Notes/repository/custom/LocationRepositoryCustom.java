package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;


public interface LocationRepositoryCustom {

    Page<Location> findAllByLocationId(Long parentId, String query, Pageable pageable);

}
