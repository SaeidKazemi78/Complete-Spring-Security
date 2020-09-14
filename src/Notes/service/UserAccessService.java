package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.service.dto.UserAccessDTO;
import ir.donyapardaz.niopdc.base.service.dto.uaa.UserDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.UaaServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.LocationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing UserLocationId.
 */
@Service
@Transactional
public class UserAccessService {

    private final Logger log = LoggerFactory.getLogger(UserAccessService.class);

    private final LocationMapper locationMapper;

    private final UaaServiceClient uaaServiceClient;

    public UserAccessService(LocationMapper locationMapper, UaaServiceClient uaaServiceClient) {
        this.locationMapper = locationMapper;
        this.uaaServiceClient = uaaServiceClient;
    }

    public UserAccessDTO save(UserAccessDTO userAccessDTO) {
        return null;
    }

    public UserAccessDTO update(UserAccessDTO userAccessDTO) {
        UserDTO userDTO = uaaServiceClient.updateUser(userAccessDTO.getUserDTO());

        return null;
    }
}
