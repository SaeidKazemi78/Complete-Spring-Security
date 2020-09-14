package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.Region;
import ir.donyapardaz.niopdc.base.repository.CountryRepository;
import ir.donyapardaz.niopdc.base.repository.RegionRepository;
import ir.donyapardaz.niopdc.base.service.dto.RegionDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by abbas on 4/19/17.
 */
@Component
public class RegionValidator implements Validator {

    private final CountryRepository countryRepository;
    private final RegionRepository regionRepository;

    public RegionValidator(CountryRepository countryRepository, RegionRepository regionRepository) {
        this.countryRepository = countryRepository;
        this.regionRepository = regionRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return RegionDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        RegionDTO regionDTO = (RegionDTO) target;
        Region parentRegion;
        if (regionDTO.getParentId() != null) {
            parentRegion = regionRepository.findOne(regionDTO.getParentId());
            if (!parentRegion.getCountry().isCheckNationalCode()) {
                errors.reject("region.not.national");
            }
        }


    }
}
