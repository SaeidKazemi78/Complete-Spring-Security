package ir.donyapardaz.niopdc.base.service.dto.uaa;



import java.util.Set;

public class GroupDTO {

    private Long id;
    private String name;
    private boolean activated;
    private Set<AuthorityDTO> authorities;
    private Set<RoleDTO> roles;
    private Set<AuthorityDTO> denyAuthorities;
    private String createUsername;

    public GroupDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public Set<AuthorityDTO> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<AuthorityDTO> authorities) {
        this.authorities = authorities;
    }

    public Set<RoleDTO> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDTO> roles) {
        this.roles = roles;
    }

    public Set<AuthorityDTO> getDenyAuthorities() {
        return denyAuthorities;
    }

    public void setDenyAuthorities(Set<AuthorityDTO> denyAuthorities) {
        this.denyAuthorities = denyAuthorities;
    }

    public String getCreateUsername() {
        return createUsername;
    }

    public void setCreateUsername(String createUsername) {
        this.createUsername = createUsername;
    }
}
