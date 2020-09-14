package ir.donyapardaz.niopdc.base.service.feign.client;


import ir.donyapardaz.niopdc.base.client.AuthorizedFeignClient;
import ir.donyapardaz.niopdc.base.config.FeignErrorDecoderConfiguration;
import ir.donyapardaz.niopdc.base.domain.enumeration.CostMethod;
import ir.donyapardaz.niopdc.base.service.dto.custom.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;


/**
 * Created by abbas on 6/10/17.
 */
@AuthorizedFeignClient(name = "niopdcrate", configuration = FeignErrorDecoderConfiguration.class)
public interface RateServiceClient {
    @PostMapping(value = "/api/cost-groups/cost-rates/{costMethod}")
    RateResponseDTO getAllCostRatesByFilterByProduct(@RequestBody CostRateFilterDTO costRateFilter, @PathVariable("costMethod") CostMethod costMethod);

    @PostMapping(value = "/api/product-rates/products/false")
    List<ProductAmountResponseDTO> getAllProductRateByProductAndAmount(@RequestBody List<ProductAmountRequestDTO> productIds);

    @GetMapping(value = "/api/currency-rate-groups/ids")
    Map<Long, String> getAllCurrencyRateGroupTitles(@RequestParam("ids") Set<Long> ids);

    @GetMapping(value = "/api/rate-groups/ids")
    Map<Long, String> getAllRateGroupTitles(@RequestParam("ids") Set<Long> ids);

    @GetMapping(value = "/api/currencies/national")
    CurrencyDTO getNationalCurrency();

    @PutMapping(value = "/api/product-rates/product-by-sell-contract")
    ProductRateDTO saveProductRate(ProductRateDTO productRateDTO);

    @GetMapping(value = "/api/product-rates/{id}")
    ProductRateDTO findOneProductRate(@PathVariable("id") Long id);

    @GetMapping(value = "/api/currency-rates/{currencyId}/{currencyRateGroupId}")
    Double getCurrencyRateByCurrencyIdAndCurrencyRateGroupId(@PathVariable("currencyId") Long currencyId, @PathVariable("currencyRateGroupId") Long currencyRateGroupId);
}
