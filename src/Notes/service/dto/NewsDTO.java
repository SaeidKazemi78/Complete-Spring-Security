package ir.donyapardaz.niopdc.base.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import ir.donyapardaz.niopdc.base.domain.enumeration.NewsType;
import ir.donyapardaz.niopdc.base.domain.enumeration.NewsAccessType;

/**
 * A DTO for the News entity.
 */
public class NewsDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    private String summary;

    @NotNull
    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    @Lob
    private byte[] picture;
    private String pictureContentType;

    private String content;

    @NotNull
    private NewsType newsType;

    @NotNull
    private NewsAccessType newsAccessType;

    private Set<LocationDTO> locations = new HashSet<>();

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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public NewsType getNewsType() {
        return newsType;
    }

    public void setNewsType(NewsType newsType) {
        this.newsType = newsType;
    }

    public NewsAccessType getNewsAccessType() {
        return newsAccessType;
    }

    public void setNewsAccessType(NewsAccessType newsAccessType) {
        this.newsAccessType = newsAccessType;
    }

    public Set<LocationDTO> getLocations() {
        return locations;
    }

    public void setLocations(Set<LocationDTO> locations) {
        this.locations = locations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NewsDTO newsDTO = (NewsDTO) o;
        if(newsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), newsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NewsDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", summary='" + getSummary() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", picture='" + getPicture() + "'" +
            ", content='" + getContent() + "'" +
            ", newsType='" + getNewsType() + "'" +
            ", newsAccessType='" + getNewsAccessType() + "'" +
            "}";
    }
}
