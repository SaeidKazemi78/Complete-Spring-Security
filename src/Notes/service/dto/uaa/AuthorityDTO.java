package ir.donyapardaz.niopdc.base.service.dto.uaa;


/**
 * An authority (a security role) used by Spring Security.
 */

public class AuthorityDTO {

    private String name;
    private String persianName;
    private Long parentAuthorityId;

    public String getPersianName() {
        return persianName;
    }

    public void setPersianName(String persianName) {
        this.persianName = persianName;
    }

    public Long getParentAuthorityId() {
        return parentAuthorityId;
    }

    public void setParentAuthorityId(Long parentAuthorityId) {
        this.parentAuthorityId = parentAuthorityId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
