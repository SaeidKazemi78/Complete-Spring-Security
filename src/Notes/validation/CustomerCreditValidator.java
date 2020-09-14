package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.BuyType;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.projection.Currency;
import ir.donyapardaz.niopdc.base.repository.BuyTypeRepository;
import ir.donyapardaz.niopdc.base.repository.CustomerCreditRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditAbbasDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditTaDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.AssignCustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.CurrencyDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.RateServiceClient;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.ArrayList;


/**
 * Created by mehrabi-s on 17/04/2017.
 */
@Component
public class CustomerCreditValidator implements Validator {
    private final BuyTypeRepository buyTypeRepository;
    private final CustomerCreditRepository customerCreditRepository;
    private final RateServiceClient rateServiceClient;


    public CustomerCreditValidator(BuyTypeRepository buyTypeRepository, CustomerCreditRepository customerCreditRepository, RateServiceClient rateServiceClient) {
        this.buyTypeRepository = buyTypeRepository;
        this.customerCreditRepository = customerCreditRepository;
        this.rateServiceClient = rateServiceClient;
    }


    @Override
    public boolean supports(Class<?> clazz) {
        return CustomerCreditDTO.class.isAssignableFrom(clazz)
            || CustomerCreditAbbasDTO.class.isAssignableFrom(clazz)
            || CustomerCreditTaDTO.class.isAssignableFrom(clazz)
            || AssignCustomerCreditDTO.class.isAssignableFrom(clazz)
            || ArrayList.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        // TODO: 10/8/17  validate customer credit
        CustomerCreditDTO customerCredit = (CustomerCreditDTO) target;

        if ((customerCredit.getCustomerCreditAllowedDays() == null || customerCredit.getCustomerCreditAllowedDays().isEmpty() )&& customerCredit.getStartDate().isAfter(customerCredit.getFinishDate()))
            errors.reject("startDate.customerCredit");

        if(customerCredit.getStartDate() == null && (customerCredit.getCustomerCreditAllowedDays() == null || customerCredit.getCustomerCreditAllowedDays().isEmpty() ))
            errors.reject("creditAllowedDays.customerCredit");

        BuyType buyType = buyTypeRepository.findOne(customerCredit.getParentBuyTypeId());

        CurrencyDTO nationalCurrency = null;
        if(buyType.getBuyGroup() != BuyGroup.QUOTA)
            nationalCurrency = rateServiceClient.getNationalCurrency();

        if (customerCredit.getPersonId() != null) {
            if (customerCredit.getProductId() != null) {
                errors.reject("customerCredit.productNotNull");
            }
        }
        switch (buyType.getTypeEffect()) {
            case AMOUNT: {
                if (customerCredit.getAmount() == null) {
                    errors.reject("customerCredit.amountNull");
                }
                if (customerCredit.getCredit() != null) {
                    errors.reject("customerCredit.creditNotNull");
                }
                break;
            }
            case CREDIT: {
                if (customerCredit.getCredit() == null) {
                    errors.reject("customerCredit.creditNull");
                }
                if (customerCredit.getAmount() != null) {
                    errors.reject("customerCredit.amountNotNull");
                }
                if (customerCredit.getCurrencyId() == null) {
                    errors.reject("customerCredit.currencyNull");
                }
                break;
            }
            case BOTH: {
                if (customerCredit.getAmount() == null) {
                    errors.reject("customerCredit.amountNull");
                }
                if (customerCredit.getCredit() == null) {
                    errors.reject("customerCredit.creditNull");
                }
                if (customerCredit.getCurrencyId() == null) {
                    errors.reject("customerCredit.currencyNull");
                }
                break;
            }
        }

        switch (buyType.getBuyGroup()) {
            case QUOTA: {
                if (customerCredit.getProductId() != null) {
                    if (customerCreditRepository.conflictQuotaTypeForSellContractProduct(customerCredit.getProductId(),
                        customerCredit.getStartDate(),
                        customerCredit.getFinishDate(),
                        customerCredit.getId(),true) > 0) {
                        errors.reject("conflictDateTime");
                    }
                }
                if (customerCredit.getAmount() == null) {
                    errors.reject("customerCredit.amountNull");
                }
                if (customerCredit.getStartDate() == null || customerCredit.getFinishDate() == null) {
                    errors.reject("customerCredit.dateNull");
                }
                if (customerCredit.getProductId() == null && customerCredit.getCustomerId() != null) {
                    errors.reject("customerCredit.productNull");
                }
                break;
            }
            case CREDIT: {
                if (customerCredit.getCredit() == null) {
                    errors.reject("customerCredit.creditNull");
                }
                if ((customerCredit.getCustomerCreditAllowedDays() == null || customerCredit.getCustomerCreditAllowedDays().isEmpty() )
                    && (customerCredit.getStartDate() == null || customerCredit.getFinishDate() == null)) {
                    errors.reject("customerCredit.dateNull");
                }
                if(!nationalCurrency.getId().equals(customerCredit.getCurrencyId()) && customerCredit.getCurrencyRateGroupId() == null){
                    errors.reject("customerCredit.currencyRateGroupIdNull");
                }

                if (customerCredit.getProductId() == null && customerCredit.getCustomerId() != null) {
                    errors.reject("customerCredit.productNull");
                }
                break;
            }
            case FINANCIAL_LICENSE: {
                if (customerCredit.getStartDate() == null || customerCredit.getFinishDate() == null) {
                    errors.reject("customerCredit.dateNull");
                }
                if(!nationalCurrency.getId().equals(customerCredit.getCurrencyId()) && customerCredit.getCurrencyRateGroupId() == null){
                    errors.reject("customerCredit.currencyRateGroupIdNull");
                }
                if (customerCredit.getProductId() == null && customerCredit.getCustomerId() != null) {
                    errors.reject("customerCredit.productNull");
                }
                break;
            }
        }
    }
}



