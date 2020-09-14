package ir.donyapardaz.niopdc.base.service.mapper.decorator;

import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.service.dto.SellContractDTO;
import ir.donyapardaz.niopdc.base.service.mapper.SellContractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class SellContractMapperDecorator implements SellContractMapper {

    @Autowired
    @Qualifier("delegate")
    private SellContractMapper delegate;

    @Override
    public SellContract toEntity(SellContractDTO sellContractDTO) {
        SellContract sellContract = delegate.toEntity(sellContractDTO);

        sellContract.getSellContractPeople().forEach(sellContractPerson -> sellContractPerson.setSellContract(sellContract)
        );

        sellContract.getSellContractCustomers().forEach(sellContractCustomer -> sellContractCustomer.setSellContract(sellContract)
        );

        return sellContract;
    }

}
