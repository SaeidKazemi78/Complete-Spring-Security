package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.repository.CustomerRepository;
import ir.donyapardaz.niopdc.base.repository.CustomerTypeRepository;
import ir.donyapardaz.niopdc.base.repository.PersonRepository;
import ir.donyapardaz.niopdc.base.service.dto.AddressDTO;
import ir.donyapardaz.niopdc.base.service.remote.Shahkar.ShahkarClient;
import ir.donyapardaz.niopdc.base.service.remote.verify.postcode.IranStandardAddress;
import ir.donyapardaz.niopdc.base.service.remote.verify.postcode.PostCodeClient;
import ir.donyapardaz.niopdc.base.service.utils.LocalizationUtil;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

/**
 * Service Implementation for managing Remote.
 */
@Service
@Transactional
public class RemoteService {

    private final Logger log = LoggerFactory.getLogger(RemoteService.class);
    private final PostCodeClient postCodeClient;
    private CustomerRepository customerRepository;
    private PersonRepository personRepository;
    private CustomerTypeRepository customerTypeRepository;
    private final ShahkarClient shahkarClient;

    public RemoteService(PostCodeClient postCodeClient, CustomerRepository customerRepository, PersonRepository personRepository, CustomerTypeRepository customerTypeRepository, ShahkarClient shahkarClient) {
        this.postCodeClient = postCodeClient;
        this.customerRepository = customerRepository;
        this.personRepository = personRepository;
        this.customerTypeRepository = customerTypeRepository;
        this.shahkarClient = shahkarClient;
    }

    /**
     * Get all the regions.
     *
     * @param postcode
     * @return the list of entities
     */
    @Transactional(readOnly = true, noRollbackFor = {CustomParameterizedException.class,NullPointerException.class, IOException.class})
    public AddressDTO findAddressByPostcode(String postcode) throws NullPointerException {
        log.debug("Request to get all Regions");
        AddressDTO addressDTO;
        IranStandardAddress sa = postCodeClient.getAddressByPostcodeResponse(postcode);
        if (sa == null) throw new NullPointerException("Error getAddressByPostcodeResponse");
        else if (sa.getErrorCode() == 0) {
            String address = "استان " + sa.getProvince().trim() + " شهر " + sa.getTownShip().trim() +
                (sa.getZone().trim().isEmpty() ? "" : " بخش " + sa.getZone().trim()) +
                (sa.getVillage().trim().isEmpty() ? "" : " روستا " + sa.getVillage().trim()) +
                " - " + sa.getLocalityType().trim() + " " + sa.getLocalityName().trim() + " - " +
                sa.getSubLocality().trim() + " " + sa.getStreet().trim() + " " +
                sa.getStreet2().trim() + " پلاک " + sa.getHouseNumber() + " طبقه " + sa.getFloor().trim() +
                (sa.getSideFloor().trim().isEmpty() ? "" : " واحد " + sa.getSideFloor().trim());
            addressDTO = new AddressDTO(LocalizationUtil.normalizePersianCharacters(address));
        } else {
            throw new CustomParameterizedException("error.postcode.not.found");
        }

        return addressDTO;
    }


    public Boolean isOwnershipMobile(String mobile ,String nationalCode){
         return this.shahkarClient.isOwnershipMobile(mobile,nationalCode);
    }

}
