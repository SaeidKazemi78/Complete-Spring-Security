package ir.donyapardaz.niopdc.base.domain;

import javax.persistence.*;

import ir.donyapardaz.niopdc.base.domain.listener.CustomRevisionListener;
import org.hibernate.envers.DefaultRevisionEntity;
import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;

@Entity
@RevisionEntity(CustomRevisionListener.class)
@Table(name="_revisions_info")
public class CustomRevisionEntity extends DefaultRevisionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Override
    public int getId() {
        return id;
    }

    @Override
    public void setId(int id) {
        this.id = id;
    }

    private String auditor;
    
    private String ipAddress;

	public String getAuditor() {
		return auditor;
	}

	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
}
