package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.CustomerCredit;
import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.service.dto.CreditBuyTypeRemainedDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;
import java.util.List;


public interface CustomerCreditRepositoryCustom {

    Page<CustomerCredit> findAllByCustomerId(Long customerId, Boolean isCredit, Boolean archive, ZonedDateTime dateTime, String query, Pageable pageable);

    List<CreditBuyTypeRemainedDTO> getRemainedCredits(Long customerId);
    List<CreditBuyTypeRemainedDTO> getRemainedCreditsByPerson(Long personId);
}
