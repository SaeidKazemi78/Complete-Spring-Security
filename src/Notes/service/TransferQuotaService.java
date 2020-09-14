package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerCredit;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.repository.CustomerCreditRepository;
import ir.donyapardaz.niopdc.base.repository.SellContractProductRepository;
import ir.donyapardaz.niopdc.base.service.dto.custom.TransferQuotaDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TransferQuotaService {
    private final CustomerCreditRepository customerCreditRepository;
    private final SellContractProductRepository sellContractProductRepository;
    public TransferQuotaService(CustomerCreditRepository customerCreditRepository, SellContractProductRepository sellContractProductRepository) {
        this.customerCreditRepository = customerCreditRepository;
        this.sellContractProductRepository = sellContractProductRepository;
    }

    public Boolean save(TransferQuotaDTO transferQuotaDTO) {

        CustomerCredit fromCustomerCredit = customerCreditRepository.findOneByBuyGroupAndSellContractProduct(BuyGroup.QUOTA, transferQuotaDTO.getFromSellContractProductId(),true);
        CustomerCredit toCustomerCredit = customerCreditRepository.findOneByBuyGroupAndSellContractProduct(BuyGroup.QUOTA, transferQuotaDTO.getToSellContractProductId(),true);

        if (fromCustomerCredit == null || transferQuotaDTO.getAmount() > fromCustomerCredit.getCurrentAmount()) {
            throw new CustomParameterizedException("error.amount.quota.not.enough");
        }

        fromCustomerCredit.setCurrentAmount(fromCustomerCredit.getCurrentAmount() - transferQuotaDTO.getAmount());

        if (toCustomerCredit != null) {
            toCustomerCredit.setCurrentAmount(toCustomerCredit.getCurrentAmount() + transferQuotaDTO.getAmount());
            toCustomerCredit.setAmount(toCustomerCredit.getAmount() + transferQuotaDTO.getAmount());
        } else {
            toCustomerCredit = new CustomerCredit();
            toCustomerCredit.setAmount(transferQuotaDTO.getAmount());
            toCustomerCredit.setCurrentAmount(transferQuotaDTO.getAmount());
            toCustomerCredit.setStartDate(fromCustomerCredit.getStartDate());
            toCustomerCredit.setFinishDate(fromCustomerCredit.getFinishDate());
            toCustomerCredit.setParentBuyType(fromCustomerCredit.getParentBuyType());
            toCustomerCredit.setMinAmount(1d);
            toCustomerCredit.setProduct(sellContractProductRepository.findOne(transferQuotaDTO.getToSellContractProductId()));
            toCustomerCredit.setCreditNumber(fromCustomerCredit.getCreditNumber());
            toCustomerCredit.setCurrentCredit(fromCustomerCredit.getCurrentCredit());
            toCustomerCredit.setExportationDate(fromCustomerCredit.getExportationDate());
        }


        customerCreditRepository.save(fromCustomerCredit);
        customerCreditRepository.save(toCustomerCredit);

        return true;
    }
}
