package ir.donyapardaz.niopdc.base.service.dto.custom;


import ir.donyapardaz.niopdc.base.domain.enumeration.PaymentPeriod;
import ir.donyapardaz.niopdc.base.service.dto.AbstractAuditingDTO;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the Bill entity.
 */
public class BillDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;
    @NotNull
    private Long customerId;
    @NotNull
    private Long locationId;
    private String customerTitle;
    @NotNull
    private Long sellContractId;
    private Double customerScore;
    @NotNull
    private PaymentPeriod paymentPeriod;
    @NotNull
    private Integer day;
    @NotNull
    private Integer month;
    @NotNull
    private Integer year;
    private Double totalPrice;
    private Double costPrice;


    public String getCustomerTitle() {
        return customerTitle;
    }

    public BillDTO setCustomerTitle(String customerTitle) {
        this.customerTitle = customerTitle;
        return this;
    }

    public Double getCostPrice() {
        return costPrice;
    }

    public BillDTO setCostPrice(Double costPrice) {
        this.costPrice = costPrice;
        return this;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getSellContractId() {
        return sellContractId;
    }

    public void setSellContractId(Long sellContractId) {
        this.sellContractId = sellContractId;
    }

    public Double getCustomerScore() {
        return customerScore;
    }

    public void setCustomerScore(Double customerScore) {
        this.customerScore = customerScore;
    }

    public PaymentPeriod getPaymentPeriod() {
        return paymentPeriod;
    }

    public void setPaymentPeriod(PaymentPeriod paymentPeriod) {
        this.paymentPeriod = paymentPeriod;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }


    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }


    public ZonedDateTime getFinishDate() {
        YearMonthDay finishYearMonthDay = new YearMonthDay();
        finishYearMonthDay.setYear(getYear());
        finishYearMonthDay.setMonth(getMonth());
        finishYearMonthDay.setDay(getDay());

        return DateUtil.convertToGeorgian(finishYearMonthDay);
    }

    public ZonedDateTime getStartDate() {
        YearMonthDay finishYearMonthDay = new YearMonthDay();
        finishYearMonthDay.setYear(getYear());
        finishYearMonthDay.setMonth(getMonth());
        finishYearMonthDay.setDay(getDay());
        YearMonthDay startYearMonthDay = new YearMonthDay();
        startYearMonthDay.setYear(finishYearMonthDay.getYear());
        startYearMonthDay.setMonth(finishYearMonthDay.getMonth());
        startYearMonthDay.setDay(finishYearMonthDay.getDay());
        if (getPaymentPeriod().equals(PaymentPeriod.DAY)) {
            startYearMonthDay.setDay(startYearMonthDay.getDay() - 1);
        } else if (getPaymentPeriod().equals(PaymentPeriod.MONTH)) {
            startYearMonthDay.setMonth(startYearMonthDay.getMonth() - 1);
        } else if (getPaymentPeriod().equals(PaymentPeriod.SEASON)) {
            startYearMonthDay.setMonth(startYearMonthDay.getMonth() - 2);
            startYearMonthDay.setDay(1);
        } else if (getPaymentPeriod().equals(PaymentPeriod.YEAR)) {
            startYearMonthDay.setYear(startYearMonthDay.getYear() - 1);
        }
        return DateUtil.convertToGeorgian(startYearMonthDay);
    }
   /* YearMonthDay finishYearMonthDay = new YearMonthDay();
        finishYearMonthDay.setYear(billDTO.getYear());
        finishYearMonthDay.setMonth(billDTO.getMonth());
        finishYearMonthDay.setDay(billDTO.getDay());

    //calculate date rang
    YearMonthDay startYearMonthDay = new YearMonthDay();
        startYearMonthDay.setYear(finishYearMonthDay.getYear());
        startYearMonthDay.setMonth(finishYearMonthDay.getMonth());
        startYearMonthDay.setDay(finishYearMonthDay.getDay());
        if (billDTO.getPaymentPeriod().equals(PaymentPeriod.DAY)) {
        startYearMonthDay.setDay(startYearMonthDay.getDay() - 1);
    } else if (billDTO.getPaymentPeriod().equals(PaymentPeriod.MONTH)) {
        startYearMonthDay.setMonth(startYearMonthDay.getMonth() - 1);
    } else if (billDTO.getPaymentPeriod().equals(PaymentPeriod.SEASON)) {
        startYearMonthDay.setMonth(startYearMonthDay.getMonth() - 2);
        startYearMonthDay.setDay(1);
    } else if (billDTO.getPaymentPeriod().equals(PaymentPeriod.YEAR)) {
        startYearMonthDay.setYear(startYearMonthDay.getYear() - 1);
    }
    ZonedDateTime startDate = DateUtil.convertToGeorgian(startYearMonthDay);
    ZonedDateTime finishDate = DateUtil.convertToGeorgian(finishYearMonthDay);*/

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BillDTO billDTO = (BillDTO) o;
        if (billDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), billDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BillDTO{" +
            "id=" + getId() +
            ", customerId=" + getCustomerId() +
            ", sellContractId=" + getSellContractId() +
            ", customerScore=" + getCustomerScore() +
            ", paymentPeriod='" + getPaymentPeriod() + "'" +
            ", day=" + getDay() +
            ", month=" + getMonth() +
            ", year=" + getYear() +
            ", totalPrice=" + getTotalPrice() +
            "}";
    }
}
