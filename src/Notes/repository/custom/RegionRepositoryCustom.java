package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.Region;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface RegionRepositoryCustom {

    Page<Region> findByCountryIdAndParentIsNull(Long countryId, String query, Pageable pageable);

    Page<Region> findByParentId(Long parentId,String query, Pageable pageable);
    List<Region> findByParentId(Long parentId);

}
