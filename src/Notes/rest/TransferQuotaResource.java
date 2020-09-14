package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.TransferQuotaService;
import ir.donyapardaz.niopdc.base.service.dto.AirplaneModelDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.TransferQuotaDTO;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import static org.hibernate.id.IdentifierGenerator.ENTITY_NAME;

@RestController
@RequestMapping("/api")
public class TransferQuotaResource {
    private final TransferQuotaService transferQuotaService;

    public TransferQuotaResource(TransferQuotaService transferQuotaService) {
        this.transferQuotaService = transferQuotaService;
    }


    @PostMapping("/transfer-quota")
    @Timed
    public ResponseEntity<Boolean> createAirplaneModel(@Valid @RequestBody TransferQuotaDTO transferQuotaDTO) throws URISyntaxException {

        Boolean result = transferQuotaService.save(transferQuotaDTO);
        return ResponseEntity.created(new URI("/api/airplane-models/" + result))
            .body(result);
    }
}
