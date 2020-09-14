package ir.donyapardaz.niopdc.base.domain;


import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "person_inquiry_request")
@Audited
public class PersonInquiryRequest extends AbstractAuditingEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( name="file_name",unique = true,length = 100)
    private String filename;
    @Column(name = "result")
    private String result;
    @Column(name="request_time")
    private ZonedDateTime requestTime;
    @Column(name="response_time")
    private ZonedDateTime responseTime;
    @Column(name="failed")
    private boolean failed = false;
    @Column(name="failed_count")
    private int failedCount = 0;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<PersonInquiry> personInquiries = new HashSet<PersonInquiry>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Set<PersonInquiry> getPersonInquiries() {
        return personInquiries;
    }

    public void setPersonInquiries(Set<PersonInquiry> personInquiries) {
        this.personInquiries = personInquiries;
    }

    public ZonedDateTime getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(ZonedDateTime requestTime) {
        this.requestTime = requestTime;
    }

    public ZonedDateTime getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(ZonedDateTime responseTime) {
        this.responseTime = responseTime;
    }

    public boolean isFailed() {
        return failed;
    }

    public void setFailed(boolean failed) {
        this.failed = failed;
    }

    public int getFailedCount() {
        return failedCount;
    }

    public void setFailedCount(int failedCount) {
        this.failedCount = failedCount;
    }
}
