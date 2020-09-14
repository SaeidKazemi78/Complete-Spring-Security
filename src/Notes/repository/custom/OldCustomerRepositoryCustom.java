package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.service.dto.OldCustomerDTO;

import java.util.List;

public interface OldCustomerRepositoryCustom {
    List<OldCustomerDTO> findOneBySalesCodeAndNationalCode(String salesCode, String nationalCode);

    List<OldCustomerDTO> findAllBySalesCodeAndNationalCode(List<String> salesCode, String nationalCode);

}
