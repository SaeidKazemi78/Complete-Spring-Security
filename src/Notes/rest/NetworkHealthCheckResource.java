package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.NetworkHealthCheckService;
import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api")
public class NetworkHealthCheckResource {
    private final NetworkHealthCheckService checkService;

    public NetworkHealthCheckResource(NetworkHealthCheckService checkService) {
        this.checkService = checkService;
    }


    @GetMapping("/health-check")
    @Timed
    public ResponseEntity<List<HealthDTO>> healthCheck(){
      return   ResponseEntity.ok(checkService.getHealth());
    }
}
