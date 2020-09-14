package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.domain.projection.SellContractProductCurrencyRateGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SellContractProductRepositoryCustom {


    Page<SellContractProductCurrencyRateGroup> findAll(Long sellContract, String query, Pageable pageable);


}
