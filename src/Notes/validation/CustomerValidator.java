package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.Customer;
import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.LocationType;
import ir.donyapardaz.niopdc.base.repository.CustomerRepository;
import ir.donyapardaz.niopdc.base.repository.CustomerTypeRepository;
import ir.donyapardaz.niopdc.base.repository.LocationRepository;
import ir.donyapardaz.niopdc.base.service.RemoteService;
import ir.donyapardaz.niopdc.base.service.dto.CustomerFullDTO;
import ir.donyapardaz.niopdc.base.service.dto.LocationDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.List;
import java.util.Objects;

/**
 * Created by abbas on 4/10/17.
 */
@Component
public class CustomerValidator implements Validator {


    private final LocationRepository locationRepository;
    private RemoteService remoteService;
    private CustomerTypeRepository customerTypeRepository;
    private CustomerRepository customerRepository;

    public CustomerValidator(RemoteService remoteService, CustomerTypeRepository customerTypeRepository, CustomerRepository customerRepository, LocationRepository locationRepository) {

        this.remoteService = remoteService;
        this.customerTypeRepository = customerTypeRepository;
        this.customerRepository = customerRepository;
        this.locationRepository = locationRepository;
    }


    @Override
    public boolean supports(Class<?> clazz) {
        return CustomerFullDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CustomerFullDTO customerDTO = (CustomerFullDTO) target;

        if (customerDTO.getTypeId() != null) {
            CustomerType c = customerTypeRepository.findOne(customerDTO.getTypeId());
            if (c.getCustomerGroup() != CustomerGroup.BOUNDARY) {
                if (c.getActive() == null || !c.getActive())
                    errors.reject("customerType.isNotActive");

                if (c.getCustomerGroup() != CustomerGroup.AIRPLANE && c.getLocationType() != LocationType.MOVABLE) {
                    List<Customer> customer = customerRepository.findOneByPostalCodeAndPostalCodeIsNotNull(customerDTO.getPostalCode(), c, customerDTO.getId());
                    if (customer != null && customer.size() > 0)
                        errors.reject("postalCode.isExist");
                }

                if (c.getCustomerGroup() == CustomerGroup.AIRPLANE && c.getLocationType() == LocationType.MOVABLE) {
                    if (customerRepository.existsByRegisterCode(customerDTO.getId(), customerDTO.getRegisterCode())) {
                        errors.reject("registerCode.isExist");
                    }
                }
            }
            if (c.getCustomerGroup().equals(CustomerGroup.BOUNDARY)) {

                /*  boolean iranian_customer_have_not_IR_plaque = false;*/

                if (customerDTO.getCustomPlaqueTwo() == null && customerDTO.getCustomPlaque() == null) {
                    errors.reject("plaque.null");
                }

                if (customerDTO.getCustomPlaque() != null) {
                    if ((c.isIranian() == null || !c.isIranian()) && (customerDTO.getCustomPlaque().getPlaqueCode().equals("IR"))) {
                        errors.reject("customer.foreign.plaque.ir");
                    }

                    if (c.isIranian() != null && c.isIranian()) {
                        if (customerDTO.getCustomPlaque().getPlaqueCode().equals("AFGH"))
                            errors.reject("customer.ir.plaque.foreign");
                    }
                }

                if (customerDTO.getCustomPlaqueTwo() != null) {
                    if ((c.isIranian() == null || !c.isIranian()) && (customerDTO.getCustomPlaqueTwo().getPlaqueCode().equals("IR"))) {
                        errors.reject("customer.foreign.plaque.ir");
                    }

                    if (c.isIranian() != null && c.isIranian()) {
                        if (customerDTO.getCustomPlaqueTwo().getPlaqueCode().equals("AFGH"))
                            errors.reject("customer.ir.plaque.foreign");
                    }

                   /* if(c.isIranian() != null && c.isIranian() && iranian_customer_have_not_IR_plaque){
                        if(!customerDTO.getCustomPlaqueTwo().getPlaqueCode().equals("IR"))
                            iranian_customer_have_not_IR_plaque = true;
                         else  iranian_customer_have_not_IR_plaque = false;

                    }*/
                }

               /* if(iranian_customer_have_not_IR_plaque)
                    errors.reject("iranian.plaque.less");*/

                if (customerDTO.getCustomPlaqueTwo() != null && customerDTO.getCustomPlaque() != null) {
                    if (customerDTO.getCustomPlaqueTwo().getPlaqueCode().equals(customerDTO.getCustomPlaque().getPlaqueCode()))
                        if (customerDTO.getCustomPlaque().getPlaqueCode().equals("TR") || customerDTO.getCustomPlaque().getPlaqueCode().equals("IR"))
                            errors.reject("duplicate.plaque.type");


                }
                if (customerRepository.isArchive(
                    Objects.nonNull(customerDTO.getCustomPlaque()) ? customerDTO.getCustomPlaque().getPlaque() : null,
                    Objects.nonNull(customerDTO.getCustomPlaqueTwo()) ? customerDTO.getCustomPlaqueTwo().getPlaque() : null,
                    customerDTO.getTypeId(),
                    customerDTO.getCountryId()) > 0) {
                    errors.reject("archive.plaque");
                }
                if (customerRepository.existPlaque(customerDTO.getId(),
                    Objects.nonNull(customerDTO.getCustomPlaque()) ? customerDTO.getCustomPlaque().getPlaque() : null,
                    Objects.nonNull(customerDTO.getCustomPlaqueTwo()) ? customerDTO.getCustomPlaqueTwo().getPlaque() : null,
                    customerDTO.getTypeId(),
                    customerDTO.getCountryId()) > 0) {
                    errors.reject("exist.plaque");
                }
            } else if (c.getLocationType() == LocationType.FIXED) {
                if (customerDTO.getIdentifyCode() != null) {
                    Long locationId = customerDTO.getLocations().stream().map(LocationDTO::getId).findFirst().get();
                    String locationCode = locationRepository.getFullLocationCode(locationId);
                    if (!customerDTO.getIdentifyCode().substring(0, 4).equals(locationCode)) {
                        errors.reject("location.code.is.not.valid");
                    }
                }
            }
        }
    }
}
