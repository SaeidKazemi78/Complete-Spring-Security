package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Validator;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import java.util.ArrayList;

/**
 * Created by abbas on 4/19/17.
 */
@Component
public class ProductValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return ProductDTO.class.isAssignableFrom(clazz) || ArrayList.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
      if(target.getClass() == ProductDTO.class){
          ProductDTO productDTO = (ProductDTO) target;
          if ((productDTO.isHasContainer()) && (productDTO.getContainerId() == null))
              errors.reject("containerId.isEmpty", "containerId");
      }

    }
}
