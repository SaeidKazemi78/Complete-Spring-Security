package ir.donyapardaz.niopdc.base.service.feign.client;


import ir.donyapardaz.niopdc.base.client.AuthorizedFeignClient;
import ir.donyapardaz.niopdc.base.config.FeignErrorDecoderConfiguration;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.RefuelCenterDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;


/**
 * Created by abbas on 6/10/17.
 */
@AuthorizedFeignClient(name = "niopdcao", configuration = FeignErrorDecoderConfiguration.class)
public interface AoServiceClient {

    @PostMapping("/api/refuel-centers/refuel-centers-by-ids")
    Set<RefuelCenterDTO> getRefuelCenters(@RequestParam("ids") List<Long> ids);

}
