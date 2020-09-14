package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.embeddableid.UserLocationRegionContractTypeCustomerTypeId;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

import static org.hibernate.envers.RelationTargetAuditMode.NOT_AUDITED;

/**
 * A UserDataAccess.
 */
@Entity
@Table(name = "user_location_region_contract_type_customer_type")
/*@Audited(targetAuditMode = NOT_AUDITED)*/
public class UserLocationRegionContractTypeCustomerType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private UserLocationRegionContractTypeCustomerTypeId userLocationRegionContractTypeCustomerTypeId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private UserDataAccess userDataAccess;

    public UserLocationRegionContractTypeCustomerTypeId getUserLocationRegionContractTypeCustomerTypeId() {
        return userLocationRegionContractTypeCustomerTypeId;
    }

    public void setUserLocationRegionContractTypeCustomerTypeId(UserLocationRegionContractTypeCustomerTypeId userLocationRegionContractTypeCustomerTypeId) {
        this.userLocationRegionContractTypeCustomerTypeId = userLocationRegionContractTypeCustomerTypeId;
    }

    public UserDataAccess getUserDataAccess() {
        return userDataAccess;
    }

    public void setUserDataAccess(UserDataAccess userDataAccess) {
        this.userDataAccess = userDataAccess;
    }
}
