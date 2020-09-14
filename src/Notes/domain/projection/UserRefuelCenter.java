package ir.donyapardaz.niopdc.base.domain.projection;

import ir.donyapardaz.niopdc.base.config.Profiles;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A RefuelCenter.
 */
@Entity
@Table(catalog = "niopdcao_" + Profiles.activeProfile, schema = "dbo", name = "user_refuel_center")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class UserRefuelCenter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "persian_title", length = 42, nullable = false)
    private String persianTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPersianTitle() {
        return persianTitle;
    }

    public void setPersianTitle(String persianTitle) {
        this.persianTitle = persianTitle;
    }
}
