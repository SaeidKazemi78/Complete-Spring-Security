package ir.donyapardaz.niopdc.base.domain.embeddableid;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserDataAccess.
 */
@Embeddable
public class AccessStringId implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    private String id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @NotNull
    public String getId() {
        return id;
    }

    public void setId(@NotNull String id) {
        this.id = id;
    }


    public String getUsername() {
        return username;
    }

    public AccessStringId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AccessStringId that = (AccessStringId) o;
        return Objects.equals(id, that.id) &&
            Objects.equals(username, that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username);
    }
}
