package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.embeddableid.UserLocationContractTypeCustomerTypeId;
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
@Table(name = "user_location_contract_type_customer_type")
/*@Audited(targetAuditMode = NOT_AUDITED)*/
public class UserLocationContractTypeCustomerType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private UserLocationContractTypeCustomerTypeId userLocationContractTypeCustomerTypeId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private UserDataAccess userDataAccess;

    public UserLocationContractTypeCustomerTypeId getUserLocationContractTypeCustomerTypeId() {
        return userLocationContractTypeCustomerTypeId;
    }

    public void setUserLocationContractTypeCustomerTypeId(UserLocationContractTypeCustomerTypeId userLocationContractTypeCustomerTypeId) {
        this.userLocationContractTypeCustomerTypeId = userLocationContractTypeCustomerTypeId;
    }

    public UserDataAccess getUserDataAccess() {
        return userDataAccess;
    }

    public void setUserDataAccess(UserDataAccess userDataAccess) {
        this.userDataAccess = userDataAccess;
    }
}
