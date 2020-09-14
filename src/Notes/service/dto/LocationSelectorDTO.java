package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Location entity.
 */
public class LocationSelectorDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String name;

    @NotNull
    private String code;

    @Size(min = 5, max = 20)
    private String costAccount;

    private Integer level;

    private Long locationId;

    private Boolean haveBoundarySell;

    private Boolean beforeControl;

    private ZonedDateTime day;

    private Boolean canOpen;

    private Boolean canClose;

    Set<LocationDTO> subLocations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull
    public String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    @NotNull
    public String getCode() {
        return code;
    }

    public void setCode(@NotNull String code) {
        this.code = code;
    }

    public String getCostAccount() {
        return costAccount;
    }

    public void setCostAccount(String costAccount) {
        this.costAccount = costAccount;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public Boolean getHaveBoundarySell() {
        return haveBoundarySell;
    }

    public void setHaveBoundarySell(Boolean haveBoundarySell) {
        this.haveBoundarySell = haveBoundarySell;
    }

    public Boolean getBeforeControl() {
        return beforeControl;
    }

    public void setBeforeControl(Boolean beforeControl) {
        this.beforeControl = beforeControl;
    }

    public ZonedDateTime getDay() {
        return day;
    }

    public void setDay(ZonedDateTime day) {
        this.day = day;
    }

    public Boolean getCanOpen() {
        return canOpen;
    }

    public void setCanOpen(Boolean canOpen) {
        this.canOpen = canOpen;
    }

    public Boolean getCanClose() {
        return canClose;
    }

    public void setCanClose(Boolean canClose) {
        this.canClose = canClose;
    }

    public Set<LocationDTO> getSubLocations() {
        return subLocations;
    }

    public void setSubLocations(Set<LocationDTO> subLocations) {
        this.subLocations = subLocations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LocationSelectorDTO that = (LocationSelectorDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "LocationDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", code='" + code + '\'' +
            ", costAccount='" + costAccount + '\'' +
            ", level=" + level +
            ", locationId=" + locationId +
            ", haveBoundarySell=" + haveBoundarySell +
            ", beforeControl=" + beforeControl +
            ", canOpen=" + canOpen +
            ", canClose=" + canClose +
            '}';
    }
}
