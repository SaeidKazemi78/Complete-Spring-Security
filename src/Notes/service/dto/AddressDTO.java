package ir.donyapardaz.niopdc.base.service.dto;

import java.io.Serializable;

public class AddressDTO implements Serializable {

    private String address;
    private Long regionId;
    private Boolean exist;

    public AddressDTO(String address) {
        this.address = address;
    }

    public AddressDTO(String address, Long regionId) {
        this.address = address;
        this.regionId = regionId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getRegionId() {
        return regionId;
    }

    public void setRegionId(Long regionId) {
        this.regionId = regionId;
    }

    public Boolean getExist() {
        return exist;
    }

    public void setExist(Boolean exist) {
        this.exist = exist;
    }
}
