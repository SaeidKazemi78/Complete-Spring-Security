package ir.donyapardaz.niopdc.base.service.feign.client;

import ir.donyapardaz.niopdc.base.client.AuthorizedFeignClient;
import ir.donyapardaz.niopdc.base.config.FeignErrorDecoderConfiguration;
import ir.donyapardaz.niopdc.base.service.dto.custom.BankTransactionDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.PaymentRevertDTO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@AuthorizedFeignClient(name = "niopdcpayment", configuration = FeignErrorDecoderConfiguration.class)
public interface PaymentServiceClient {
    @PostMapping(value = "/api/bank-transactions/begin")
    String createRequestIdentifier (@RequestBody BankTransactionDTO bankTransactionDTO);

    @PutMapping(value = "/api/payments/revert")
    Void paymentRevert(@RequestBody List<PaymentRevertDTO> paymentRevertDTOS);
}
