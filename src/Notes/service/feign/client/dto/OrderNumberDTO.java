package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import java.io.Serializable;

public class OrderNumberDTO implements Serializable {
    private Long id;

    private String startOrderNumber;

    private String endOrderNumber;

    private String currentOrderNumber;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartOrderNumber() {
        return startOrderNumber;
    }

    public void setStartOrderNumber(String startOrderNumber) {
        this.startOrderNumber = startOrderNumber;
    }

    public String getEndOrderNumber() {
        return endOrderNumber;
    }

    public void setEndOrderNumber(String endOrderNumber) {
        this.endOrderNumber = endOrderNumber;
    }

    public String getCurrentOrderNumber() {
        return currentOrderNumber;
    }

    public void setCurrentOrderNumber(String currentOrderNumber) {
        this.currentOrderNumber = currentOrderNumber;
    }

}
