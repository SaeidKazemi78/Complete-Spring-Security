package ir.donyapardaz.niopdc.base.service.feign.client;


import ir.donyapardaz.niopdc.base.client.AuthorizedFeignClient;
import ir.donyapardaz.niopdc.base.config.FeignErrorDecoderConfiguration;
import ir.donyapardaz.niopdc.base.service.dto.custom.BankAccountDTO;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Instant;
import java.util.Set;


/**
 * Created by abbas on 6/10/17.
 */
@AuthorizedFeignClient(name = "niopdcaccounting", configuration = FeignErrorDecoderConfiguration.class)
public interface AccountingServiceClient {
    @GetMapping("/api/voucher-masters/confirm")
    Boolean existsConfirm(@RequestParam("locationId") Long locationId, @RequestParam("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant day);

    @PostMapping("/api/bank-accounts/save-list")
    Set<BankAccountDTO> createListBankAccount(@RequestBody Set<BankAccountDTO> bankAccounts);

}
