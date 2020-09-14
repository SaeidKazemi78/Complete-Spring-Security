package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.NewsAccessType;
import ir.donyapardaz.niopdc.base.domain.enumeration.NewsType;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A News.
 */
@Entity
@Table(name = "news")
@Audited
public class News extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "summary")
    private String summary;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @Column(name = "finish_date")
    private ZonedDateTime finishDate;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "picture_content_type")
    private String pictureContentType;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "news_type", nullable = false)
    private NewsType newsType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "news_access_type", nullable = false)
    private NewsAccessType newsAccessType;

    @ManyToMany
    @JoinTable(name = "news_location",
        joinColumns = @JoinColumn(name = "news_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "locations_id", referencedColumnName = "id"))
    @ShallowReference
    private Set<Location> locations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public News title(String title) {
        this.title = title;
        return this;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public News summary(String summary) {
        this.summary = summary;
        return this;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public News startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public News finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public News picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public News pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public News content(String content) {
        this.content = content;
        return this;
    }

    public NewsType getNewsType() {
        return newsType;
    }

    public void setNewsType(NewsType newsType) {
        this.newsType = newsType;
    }

    public News newsType(NewsType newsType) {
        this.newsType = newsType;
        return this;
    }

    public NewsAccessType getNewsAccessType() {
        return newsAccessType;
    }

    public void setNewsAccessType(NewsAccessType newsAccessType) {
        this.newsAccessType = newsAccessType;
    }

    public News newsAccessType(NewsAccessType newsAccessType) {
        this.newsAccessType = newsAccessType;
        return this;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public News locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public News addLocation(Location location) {
        this.locations.add(location);
        location.getNews().add(this);
        return this;
    }

    public News removeLocation(Location location) {
        this.locations.remove(location);
        location.getNews().remove(this);
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
        News news = (News) o;
        if (news.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), news.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", summary='" + getSummary() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            ", content='" + getContent() + "'" +
            ", newsType='" + getNewsType() + "'" +
            ", newsAccessType='" + getNewsAccessType() + "'" +
            "}";
    }
}
