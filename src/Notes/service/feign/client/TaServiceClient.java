package ir.donyapardaz.niopdc.base.service.feign.client;

import ir.donyapardaz.niopdc.base.client.AuthorizedFeignClient;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.UserDTO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@FeignClient(name = "ta", url = "http://172.17.75.2:9090")
public interface TaServiceClient {

    @PostMapping(value = "TA_WS/CustomerWS",  consumes = "text/xml")
    String updateCustomer(@RequestBody String userDTO);

}
