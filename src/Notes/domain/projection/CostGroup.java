package ir.donyapardaz.niopdc.base.domain.projection;

import ir.donyapardaz.niopdc.base.config.Profiles;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A CostGroup.
 */
@Entity
@Table(catalog = "niopdcrate_" + Profiles.activeProfile, schema = "dbo", name = "cost_group")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class CostGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "title", length = 42, nullable = false)
    private String title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
