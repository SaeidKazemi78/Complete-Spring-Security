package ir.donyapardaz.niopdc.base.service.job;

import ir.donyapardaz.niopdc.base.service.ShiftWorkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CloseShiftWorkJob {
    private final Logger log = LoggerFactory.getLogger(CloseShiftWorkJob.class);

    private final ShiftWorkService shiftWorkService;

    public CloseShiftWorkJob(ShiftWorkService shiftWorkService) {
        this.shiftWorkService = shiftWorkService;
    }

    @Scheduled(cron = "0 59 23 * * *",zone = "Asia/Tehran")
    public void closeAction(){
        log.info("start automatically close area shiftWork");
        shiftWorkService.automaticallyCloseAreaShiftWork();
    }

    @Scheduled(fixedRateString = "1800000")
    public void closeShiftForBoundary(){
        log.info("start automatically close shift boundary shiftWork");
        shiftWorkService.automaticallyCloseShiftForBoundary();
    }

}
