package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.embeddableid.AccessId;
import ir.donyapardaz.niopdc.base.domain.embeddableid.AccessStringId;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;


/**
 * A CustomerView.
 */
@Entity
@Table(name = "contract_type_access")
public class ContractTypeAccess implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private AccessStringId id;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public AccessStringId getId() {
        return id;
    }

    public void setId(AccessStringId id) {
        this.id = id;
    }


}
