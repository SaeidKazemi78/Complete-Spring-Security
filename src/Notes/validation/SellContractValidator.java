package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.repository.CustomerRepository;
import ir.donyapardaz.niopdc.base.repository.SellContractRepository;
import ir.donyapardaz.niopdc.base.service.dto.SellContractCustomerDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractPersonDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.OrderServiceClient;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import static ir.donyapardaz.niopdc.base.domain.enumeration.ContractType.EXPORT;


/**
 * Created by abbas on 4/19/17.
 */
@Component
public class SellContractValidator implements Validator {
    private final SellContractRepository SellContractRepository;
    private CustomerRepository customerRepository;
    private OrderServiceClient orderServiceClient;

    public SellContractValidator(SellContractRepository SellContractRepository, CustomerRepository customerRepository, OrderServiceClient orderServiceClient) {
        this.SellContractRepository = SellContractRepository;
        this.customerRepository = customerRepository;
        this.orderServiceClient = orderServiceClient;
    }

    @Override
    public boolean supports(Class<?> clazz) {

        return true;//SellContractDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        if (!(target instanceof SellContractDTO)) return;

        SellContractDTO sellContractDTO = (SellContractDTO) target;


        if (sellContractDTO.getStartDate().isAfter(sellContractDTO.getFinishDate()))
            errors.reject("finishDate.conflictDateTime");

        if (sellContractDTO.getId() != null) {
            if (!sellContractDTO.getContractType().equals(ContractType.AIRPLANE)) {
                ZonedDateTime maxDate = orderServiceClient.getMaxDateBySellContractAndPerson(sellContractDTO.getId(), -1L);
                if (maxDate != null && maxDate.isAfter(sellContractDTO.getFinishDate())) {
                    errors.reject("finishDate.isBeforeOrderDate");
                }
            }
        }


        // اگر  صادراتی باشد نیازی اعتبار سنجی مشتریان وجود ندارد
        boolean haveCustomer = sellContractDTO.getContractType() != EXPORT ;
        if (haveCustomer) {
            List<Long> ids = sellContractDTO.getSellContractCustomers()
                .stream().map(SellContractCustomerDTO::getCustomerId).collect(Collectors.toList());
            if (customerRepository.checkActiveCustomer(ids, ZonedDateTime.now()) > 0) {
                errors.reject("customer.not.active");
            }
        }

        List<Long> customerIds = sellContractDTO.getSellContractCustomers().stream()
            .map(SellContractCustomerDTO::getCustomerId).collect(Collectors.toList());
        List<Long> personIds = sellContractDTO.getSellContractPeople().stream()
            .map(SellContractPersonDTO::getPersonId).collect(Collectors.toList());
        if (sellContractDTO.getSellContractPeople().size() < 1)
            errors.reject("sellContractPeople.is_zero", "");
        if (sellContractDTO.getSellContractPeople().stream().mapToInt(SellContractPersonDTO::getSharePercent).sum() != 100)
            errors.reject("sellContractPeople.is_not_100", "");
        if (haveCustomer &&
            sellContractDTO.getSellContractCustomers().size() < 1)
            errors.reject("sellContractCustomers.is_zero", "");

        if (sellContractDTO.getContractType() != EXPORT  && customerIds.size() <= 0)
            errors.reject("sellContractCustomers.is_zero", "");

        if (haveCustomer) {
            Set<CustomerGroup> customerGroups = sellContractDTO.getContractType().getCustomerGroups();
            boolean noneMatch = customerRepository.findAllByIdInAndFetchType(customerIds)
                .stream().noneMatch(customer -> customerGroups.contains(customer.getType().getCustomerGroup()));
            if (noneMatch)
                errors.reject("sellContractCustomers.includesInvalidCustomer", "");
        }

        if (sellContractDTO.getId() != null &&
            SellContractRepository.findOneByIdAndContractType(sellContractDTO.getId(),
                sellContractDTO.getContractType()) == null)
            throw new CustomParameterizedException("not.found.sellContract");

        if (customerIds.size() <= 0) customerIds.add(-1L);

        // todo شرایطی که حواله تکراری نمی تواند ثبت شود بررسی شود و ویرایش شود
     /*   if (SellContractRepository.find(
                sellContractDTO.getId(),
                ContractType.EXPORT,
                customerIds,
                personIds,
                sellContractDTO.getStartDate(),
                sellContractDTO.getFinishDate()
            ).size() > 0) {
            errors.reject("startDate.sellContractConflict", "");
        }*/
    }
}
