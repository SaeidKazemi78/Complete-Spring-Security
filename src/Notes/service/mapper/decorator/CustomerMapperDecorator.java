package ir.donyapardaz.niopdc.base.service.mapper.decorator;

import ir.donyapardaz.niopdc.base.domain.CarRfId;
import ir.donyapardaz.niopdc.base.domain.CarTank;
import ir.donyapardaz.niopdc.base.domain.Customer;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.List;
import java.util.stream.Collectors;

public abstract class CustomerMapperDecorator implements CustomerMapper {

    @Autowired
    @Qualifier("delegate")
    private CustomerMapper delegate;

    @Override
    public CustomerFullDTO toDto(Customer customer) {
        return delegate.toDto(customer);
    }

    @Override
    public List<Customer> toEntity(List<CustomerFullDTO> dtoList) {
        return dtoList.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public List<CustomerFullDTO> toDto(List<Customer> entityList) {
        return entityList.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public Customer toEntity(CustomerFullDTO customerDTO) {
        Customer customer = delegate.toEntity(customerDTO);
        if (!customer.getCarRfIds().isEmpty()) {
            for (CarRfId carRfId : customer.getCarRfIds()) {
                carRfId.setCustomer(customer);
            }
        }

        if (!customer.getCarTanks().isEmpty()) {
            for (CarTank carTank : customer.getCarTanks()) {
                carTank.setCustomer(customer);
            }
        }
        return customer;
    }

    @Override
    public CustomerDTO toListDto(Customer customer) {
        return delegate.toListDto(customer);
    }

    @Override
    public CarCustomerDTO toCarDto(Customer customer) {
        return delegate.toCarDto(customer);
    }

    @Override
    public CarCustomerOfflineDTO toCarOfflineDTO(Customer customer) {
        return delegate.toCarOfflineDTO(customer);
    }

    @Override
    public Customer toCustomerFromOffline(CarCustomerOfflineDTO dto) {
        return delegate.toCustomerFromOffline(dto);
    }
}
