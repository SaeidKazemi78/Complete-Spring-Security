package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SellContractPerson.
 */
@Entity
@Table(name = "sell_contract_person",
    uniqueConstraints =
    @UniqueConstraint(columnNames = {"sell_contract_id", "person_id"}))
@Audited
public class SellContractPerson extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "share_percent")
    private Integer sharePercent;

    @Size(min = 1, max = 20)
    @Column(name = "credit_account", length = 20)
    private String creditAccount;

    @Column(name = "bank_account_id")
    private Long bankAccountId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    @JoinColumn(name = "sell_contract_id", referencedColumnName = "id")
    private SellContract sellContract;

    @Column(name = "main")
    private Boolean main;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public SellContractPerson sharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
        return this;
    }

    public String getCreditAccount() {
        return creditAccount;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }

    public SellContractPerson creditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
        return this;
    }

    public Long getBankAccountId() {
        return bankAccountId;
    }

    public void setBankAccountId(Long bankAccountId) {
        this.bankAccountId = bankAccountId;
    }

    public SellContract getSellContract() {
        return sellContract;
    }

    public void setSellContract(SellContract sellContract) {
        this.sellContract = sellContract;
    }

    public SellContractPerson sellContract(SellContract sellContract) {
        this.sellContract = sellContract;
        return this;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public SellContractPerson person(Person person) {
        this.person = person;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SellContractPerson sellContractPerson = (SellContractPerson) o;
        if (sellContractPerson.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContractPerson.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellContractPerson{" +
            "id=" + getId() +
            ", sharePercent=" + getSharePercent() +
            ", creditAccount='" + getCreditAccount() + "'" +
            ", bankAccountId='" + getBankAccountId() + "'" +
            "}";
    }

    public Boolean getMain() {
        return main;
    }

    public SellContractPerson setMain(Boolean main) {
        this.main = main;
        return this;
    }
}
