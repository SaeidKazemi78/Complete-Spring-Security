package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.service.dto.uaa.UserDTO;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the UserLocationId entity.
 */
public class UserAccessDTO implements Serializable {

    private UserDTO userDTO;

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public String toString() {
        return "UserAccessDTO{" +
            "userDTO=" + userDTO +
            '}';
    }
}
