package ir.donyapardaz.niopdc.base.service.feign.client;


import ir.donyapardaz.niopdc.base.client.AuthorizedFeignClient;
import ir.donyapardaz.niopdc.base.config.FeignErrorDecoderConfiguration;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.OrderNumberDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.ZonedDateTime;


/**
 * Created by abbas on 6/10/17.
 */
@AuthorizedFeignClient(name = "niopdcorder", configuration = FeignErrorDecoderConfiguration.class)
public interface OrderServiceClient {

    @GetMapping("/api/orders/max-date/{sellContractId}/{personId}")
    ZonedDateTime getMaxDateBySellContractAndPerson(@PathVariable("sellContractId") Long sellContractId, @PathVariable("personId") Long personId);

    @GetMapping("/api/orders/exist/{locationId}/{fromDate}/{toDate}")
    boolean existOrderBetween(@PathVariable("locationId") Long locationId, @PathVariable("fromDate") Long fromDate, @PathVariable("toDate") Long toDate);

    @GetMapping("/api/order-numbers/location/{id}/active")
    OrderNumberDTO getOrderNumber(@PathVariable("id") Long id);


    @GetMapping("/api/order-credits/{creditId}/exist")
    Boolean isUseCustomerCredit(@PathVariable("creditId") Long creditId);

    @GetMapping("/api/orders/{customerId}/exist-customer")
    Boolean isUseCustomerInOrder(@PathVariable("customerId") Long customerId);

    @GetMapping("/api/orders/customer/{customerId}/date/{date}/exist-customer")
    Boolean existOrderAfterDateForCustomer(@PathVariable("date") Long date, @PathVariable("customerId") Long customerId);

    @GetMapping("/api/orders/update-sell-contract/{oldId}/{newId}")
    Boolean editSellContractId(@PathVariable("oldId") Long oldId, @PathVariable("newId") Long newId);
}
