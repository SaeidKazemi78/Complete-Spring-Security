package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.service.SellContractProductService;
import ir.donyapardaz.niopdc.base.service.dto.custom.CostRateFilterDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Optional;

/**
 * REST controller for managing SellContractProduct.
 */
@RestController
@RequestMapping("/api")
public class SellContractProductCustomResource {

    private static final String ENTITY_NAME = "sellContractProduct";
    private final Logger log = LoggerFactory.getLogger(SellContractProductCustomResource.class);
    private final SellContractProductService sellContractProductService;

    public SellContractProductCustomResource(SellContractProductService sellContractProductService) {
        this.sellContractProductService = sellContractProductService;
    }


    @PostMapping("/sell-contract-products/order-product")
    @Timed
    public ResponseEntity<CostRateFilterDTO> getProductOrder(@RequestBody CostRateFilterDTO costRateFilterDTO) throws URISyntaxException {
        CostRateFilterDTO result = sellContractProductService.findOrderProductByFilter(costRateFilterDTO);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }

}
