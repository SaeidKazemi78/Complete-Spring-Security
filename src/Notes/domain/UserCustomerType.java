package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.embeddableid.UserCustomerTypeId;
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
@Table(name = "user_customer_type")
@Audited(targetAuditMode = NOT_AUDITED)
public class UserCustomerType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private UserCustomerTypeId userCustomerTypeId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private UserDataAccess userDataAccess;

    public UserCustomerTypeId getUserCustomerTypeId() {
        return userCustomerTypeId;
    }

    public void setUserCustomerTypeId(UserCustomerTypeId userCustomerTypeId) {
        this.userCustomerTypeId = userCustomerTypeId;
    }

    public UserDataAccess getUserDataAccess() {
        return userDataAccess;
    }

    public void setUserDataAccess(UserDataAccess userDataAccess) {
        this.userDataAccess = userDataAccess;
    }
}
