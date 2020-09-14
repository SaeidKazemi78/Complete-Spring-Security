package ir.donyapardaz.niopdc.base.service.dto;

import java.time.ZonedDateTime;

public class CustomerCreditAllowedDayDTO {
    private Long id;

    private ZonedDateTime day;

    private String description;

    private Long customerCreditId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDay() {
        return day;
    }

    public void setDay(ZonedDateTime day) {
        this.day = day;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCustomerCreditId() {
        return customerCreditId;
    }

    public void setCustomerCreditId(Long customerCreditId) {
        this.customerCreditId = customerCreditId;
    }
}
