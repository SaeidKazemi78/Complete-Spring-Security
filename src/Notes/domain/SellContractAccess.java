package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.embeddableid.AccessId;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;


/**
 * A CustomerView.
 */
@Entity
@Table(name = "sell_contract_access")
public class SellContractAccess implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private AccessId id;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public AccessId getId() {
        return id;
    }

    public void setId(AccessId id) {
        this.id = id;
    }


}
