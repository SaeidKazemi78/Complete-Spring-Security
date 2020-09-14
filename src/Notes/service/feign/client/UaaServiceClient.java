package ir.donyapardaz.niopdc.base.service.feign.client;

import ir.donyapardaz.niopdc.base.client.AuthorizedFeignClient;
import ir.donyapardaz.niopdc.base.config.FeignErrorDecoderConfiguration;
import ir.donyapardaz.niopdc.base.service.dto.PersonDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.UserDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by abbas on 6/10/17.
 */
//@FeignClient(name = "uaa",url = "http://127.0.0.1:9999")
//@FeignClient(name = "uaa")
//@AuthorizedFeignClient(name = "niopdcuaa",configuration = FeignErrorDecoderConfiguration.class,url = "http://127.0.0.1:8089")
@AuthorizedFeignClient(name = "niopdcuaa", configuration = FeignErrorDecoderConfiguration.class)
public interface UaaServiceClient {
    @RequestMapping(value = "/api/users/{login}/subUser")
    List<UserDTO> getSubUserList(@PathVariable("login") String login);

    @RequestMapping(value = "/api/users/{parentUser}/{childUser}/betweenUser")
    List<UserDTO> getBetweenUserList(@PathVariable("parentUser") String parentUser, @PathVariable("childUser") String childUser);

    @RequestMapping(value = "/api/users/{login}/parentUsers")
    List<UserDTO> getParentUserList(@PathVariable("login") String login);

    @PutMapping(value = "/api/users")
    ir.donyapardaz.niopdc.base.service.dto.uaa.UserDTO updateUser(@RequestBody ir.donyapardaz.niopdc.base.service.dto.uaa.UserDTO userDTO);

    @PostMapping(value = "/pr/api/users/person")
    UserDTO createUser(@RequestBody UserDTO userDTO);

    @PutMapping(value = "/api/users/{login}/active")
    void activeUser(@PathVariable("login") String login);

    @GetMapping("/api/users/exist-login/{login}")
    Boolean existUserByLogin(@PathVariable("login") String login);

    @PutMapping(value = "/api/users/person")
    UserDTO updatePersonUser(@RequestBody UserDTO userDTO);

    @PostMapping(value = "/api/account")
    UserDTO updateUserPerson(@RequestBody UserDTO userDTO);

    @PutMapping("pr/api/users/inquiry/response")
     void inquiryResponse(@RequestBody PersonDTO personDTO);


    /* @RequestMapping(value = "/api/users/{login}/subUser")
    List<UserDTO> getSubUserList(@PathVariable("login") String login, @RequestHeader("Authorization") String authorization);

    @RequestMapping(value = "/api/users/{parentUser}/{childUser}/betweenUser")
    List<UserDTO> getBetweenUserList(@PathVariable("parentUser") String parentUser, @PathVariable("childUser") String childUser, @RequestHeader("Authorization") String authorization);

    @RequestMapping(value = "/api/users/{login}/parentUsers")
    List<UserDTO> getParentUserList(@PathVariable("login") String login, @RequestHeader("Authorization") String authorization);

    @PutMapping(value = "/api/users")
    ir.donyapardaz.niopdc.base.service.dto.uaa.UserDTO updateUser(@RequestBody ir.donyapardaz.niopdc.base.service.dto.uaa.UserDTO userDTO, @RequestHeader("Authorization") String authorization);*/
}
