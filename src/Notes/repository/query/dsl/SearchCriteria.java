package ir.donyapardaz.niopdc.base.repository.query.dsl;

/**
 * Created by abbas on 5/16/17.
 */
public class SearchCriteria {
    private String key;
    private String operation;
    private Object value;
    private String entityPath;

    public SearchCriteria(String key, String operation, Object value) {
        this.key = key;
        this.operation = operation;
        this.value = value;
    }

    public SearchCriteria(String key, String operation, Object value, String entityPath) {
        this.key = key;
        this.operation = operation;
        this.value = value;
        this.entityPath = entityPath;
    }

    public String getEntityPath() {
        return entityPath;
    }

    public SearchCriteria setEntityPath(String entityPath) {
        this.entityPath = entityPath;
        return this;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }
}
