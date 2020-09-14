package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.service.remote.supplychannel.SupplyChannelClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SupplyChannelService {
    private final Logger log = LoggerFactory.getLogger(PersonService.class);

    SupplyChannelClient supplyChannelClient;

    public SupplyChannelService(SupplyChannelClient supplyChannelClient) {
        this.supplyChannelClient = supplyChannelClient;
    }

    /**
     * Send SupplyChannel TO TejaratAsan.
     *
     * @param sellContract
     * @return the bool
     */
    @Transactional(readOnly = true)
    public void sendSupplyChannelToTejaratAsan(SellContract sellContract) {
        log.debug("Request to send Customer : {}", sellContract.getId());
        supplyChannelClient.sendSupplyChannel(sellContract);

    }
}
