package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.UserConfigDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserConfig and its DTO UserConfigDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, DepotMapper.class, ProductMapper.class})
public interface UserConfigMapper extends EntityMapper<UserConfigDTO, UserConfig> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "depot.id", target = "depotId")
    @Mapping(source = "depot.title", target = "depotTitle")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productTitle")
    UserConfigDTO toDto(UserConfig userConfig);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "depotId", target = "depot")
    @Mapping(source = "productId", target = "product")
    UserConfig toEntity(UserConfigDTO userConfigDTO);

    default UserConfig fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserConfig userConfig = new UserConfig();
        userConfig.setId(id);
        return userConfig;
    }
}
