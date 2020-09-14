package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.Customer;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.projection.CustomerSellContract;
import ir.donyapardaz.niopdc.base.service.dto.PersonCustomerInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;


public interface CustomerRepositoryCustom {

    Page<Customer> findAll(String locationName, String query, Set<CustomerGroup> customerGroups, String selfCode, List<Long> customerTypeIds, Pageable pageable);

    Page<Customer> findAllByAccessLocation(String locationName, String query, Set<CustomerGroup> customerGroups, List<Long> customerIds, List<Long> customerTypeIds, Pageable pageable);

    List<CustomerSellContract> findAllCustomerSellContract(ZonedDateTime startDate, ZonedDateTime finishDate, String username);

    Page<Customer> findAllBoundaryCustomers(String vehicleModel,
                                            Boolean archive,
                                            String carRfId,
                                            String plaque,
                                            String plaquePart1,
                                            String plaquePart2,
                                            String plaquePart3,
                                            String type1,
                                            String typeCode,
                                            Pageable pageable);
    List<PersonCustomerInfoDTO> getPersonInfo(Long customerId);

}
