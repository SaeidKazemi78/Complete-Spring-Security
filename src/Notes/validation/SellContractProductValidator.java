package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.repository.SellContractProductRepository;
import ir.donyapardaz.niopdc.base.repository.SellContractRepository;
import ir.donyapardaz.niopdc.base.service.dto.SellContractProductFullDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


import static ir.donyapardaz.niopdc.base.domain.enumeration.ContractType.EXPORT;


@Component
public class SellContractProductValidator implements Validator {
    private final SellContractProductRepository sellContractProductRepository;
    private SellContractRepository sellContractRepository;

    public SellContractProductValidator(SellContractProductRepository sellContractProductRepository, SellContractRepository sellContractRepository) {
        this.sellContractProductRepository = sellContractProductRepository;
        this.sellContractRepository = sellContractRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return SellContractProductFullDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        SellContractProductFullDTO sellContractProductFullDTO = (SellContractProductFullDTO) target;
//2018-03-20T20:30:00.200Z[UTC]              -> 2019-03-20T20:29:59.200Z[UTC] :
//2018-03-21T00:00:00.200+03:30[Asia/Tehran] -> 2019-03-20T20:29:59.200+03:30[Asia/Tehran]
        SellContract sellContract = sellContractRepository.findOne(sellContractProductFullDTO.getSellContractId());
        if (sellContractProductFullDTO.getStartDate().isBefore(sellContract.getStartDate())
            || sellContractProductFullDTO.getFinishDate().isAfter(sellContract.getFinishDate()))
            errors.reject("startDate.overSellContract");

        if (sellContractProductFullDTO.getStartDate().isAfter(sellContractProductFullDTO.getFinishDate())){
            errors.reject("startDate.sellContractProductGreaterThanFinishDate");
        }
        boolean haveCustomer = sellContract.getContractType() != EXPORT ;

        if (haveCustomer) {
            if (sellContractProductFullDTO.getSellContractCustomerId() == null && sellContractProductFullDTO.getSellContractCustomerIds().isEmpty())
                errors.reject("sellContractCustomerId.isEmpty");
            else if (sellContractProductFullDTO.getId() != null && !sellContractProductFullDTO.getSellContractCustomerIds().isEmpty())
                errors.reject("sellContractCustomerId.cannotBeMultiItemInUpdate");
            else if (sellContractProductFullDTO.getSellContractCustomerId() != null && sellContractProductFullDTO.getSellContractCustomerIds().isEmpty())
                sellContractProductFullDTO.getSellContractCustomerIds().add(sellContractProductFullDTO.getSellContractCustomerId());

            for (Long sellContractCustomerId : sellContractProductFullDTO.getSellContractCustomerIds()) {
                SellContractProduct sellContractProduct = sellContractProductRepository.find(
                    sellContractProductFullDTO.getSellContractId(),
                    sellContractProductFullDTO.getId(),
                    sellContractProductFullDTO.getProductId(),
                    sellContractCustomerId,
                    sellContractProductFullDTO.getStartDate(),
                    sellContractProductFullDTO.getFinishDate()
                );
                if (sellContractProduct != null) {
                    errors.reject("startDate.sellContractProductConflict");
                }
            }
        } else {
            SellContractProduct sellContractProduct = sellContractProductRepository.find(
                sellContractProductFullDTO.getSellContractId(),
                sellContractProductFullDTO.getId(),
                sellContractProductFullDTO.getProductId(),
                null,
                sellContractProductFullDTO.getStartDate(),
                sellContractProductFullDTO.getFinishDate()
            );
            if (sellContractProduct != null) {
                errors.reject("startDate.sellContractProductConflict");
            }
        }


    }
}
