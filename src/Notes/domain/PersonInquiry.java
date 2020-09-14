package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.PersonInquiryStatus;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity
@Table(name = "person_inquiry")
@Audited
public class PersonInquiry extends AbstractAuditingEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name",length = 100)
    private String firstName;

    @Column(name = "last_name",length = 100)
    private String lastName;

    @Column(name = "national_code",length = 10)
    private String nationalCode;

    @Column(name = "id_code" ,length = 6)
    private String idCode;

    @Column(name = "father_name",length = 100)
    private String fatherName;

    @Column(name = "is_alive")
    private Boolean isAlive;

    @Column(name = "birthday")
    private ZonedDateTime birthday;

    @Column(name = "description")
    private String description;

    @Column(name = "alphabet_classified",length = 20)
    private String alphabetClassified;

    @Column(name = "classified",length = 4)
    private String classified;

    @Column(name = "consecutive",length = 6)
    private String consecutive;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PersonInquiryStatus status;

    @Column(name = "inauiry_time")
    private ZonedDateTime  inquiryTime;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getIdCode() {
        return idCode;
    }

    public void setIdCode(String idCode) {
        this.idCode = idCode;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public Boolean getAlive() {
        return isAlive;
    }

    public void setAlive(Boolean alive) {
        isAlive = alive;
    }

    public ZonedDateTime getBirthday() {
        return birthday;
    }

    public void setBirthday(ZonedDateTime birthday) {
        this.birthday = birthday;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAlphabetClassified() {
        return alphabetClassified;
    }

    public void setAlphabetClassified(String alphabetClassified) {
        this.alphabetClassified = alphabetClassified;
    }

    public String getClassified() {
        return classified;
    }

    public void setClassified(String classified) {
        this.classified = classified;
    }

    public String getConsecutive() {
        return consecutive;
    }

    public void setConsecutive(String consecutive) {
        this.consecutive = consecutive;
    }

    public PersonInquiryStatus getStatus() {
        return status;
    }

    public void setStatus(PersonInquiryStatus status) {
        this.status = status;
    }

    public ZonedDateTime getInquiryTime() {
        return inquiryTime;
    }

    public void setInquiryTime(ZonedDateTime inquiryTime) {
        this.inquiryTime = inquiryTime;
    }
}
