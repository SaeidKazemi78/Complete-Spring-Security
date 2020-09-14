package ir.donyapardaz.niopdc.base.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.StakeholderType;

/**
 * A DTO for the Stakeholder entity.
 */
public class StakeholderDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private Integer sharePercent;

    private StakeholderType stakeholderType;

    private Long companyId;

    private String companyName;

    private Long personId;

    private String personName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSharePercent() {
        return sharePercent;
    }

    public void setSharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
    }

    public StakeholderType getStakeholderType() {
        return stakeholderType;
    }

    public void setStakeholderType(StakeholderType stakeholderType) {
        this.stakeholderType = stakeholderType;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long personId) {
        this.companyId = personId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String personName) {
        this.companyName = personName;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StakeholderDTO stakeholderDTO = (StakeholderDTO) o;
        if(stakeholderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stakeholderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StakeholderDTO{" +
            "id=" + getId() +
            ", sharePercent=" + getSharePercent() +
            ", stakeholderType='" + getStakeholderType() + "'" +
            "}";
    }
}
