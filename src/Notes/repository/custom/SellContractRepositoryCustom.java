package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.service.dto.NativeSellContractDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SellContractRepositoryCustom {


    //Page<SellContract> findAll(String personName, String customerName, Long customer, Long person, String query, Pageable pageable);
    Page<NativeSellContractDTO> findAll(Boolean addendum, Long customerId, Long personId, String personName, String customerName, String contractNo, Boolean active, Pageable pageable);



}
