package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.Container;
import ir.donyapardaz.niopdc.base.domain.QContainer;
import ir.donyapardaz.niopdc.base.repository.custom.ContainerRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.util.List;

public class ContainerRepositoryImpl extends JdbcDaoSupport implements ContainerRepositoryCustom {

    @PersistenceContext
    private EntityManager em;
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDs(DataSource dataSource) {
        setDataSource(dataSource);
    }

    @PostConstruct
    private void postConstruct() {
        jdbcTemplate = new NamedParameterJdbcTemplate(getDataSource());
    }


    @Override
    public Page<Container> findAll(String query, Pageable pageable) {

        JPAQuery<Container> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QContainer.container);
        jpaQuery.select(QContainer.container);
        jpaQuery.leftJoin(QContainer.container.productUnit).fetchJoin();

        PathBuilder<Container> container = new PathBuilder<>(Container.class, "container");
        BooleanExpression search = new PredicatesBuilder().build(query, container, null);

        if (search != null)
            jpaQuery.where(search);

        if (pageable.getSort() != null) {
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                    : Order.DESC, container.get(o.getProperty())));
            }
        }
        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());
        List<Container> containers = jpaQuery.fetch();

        long size = (containers.size() < pageable.getPageSize() && pageable.getPageNumber() == 0) ?
            containers.size() :
            jpaQuery.offset(0).fetchCount();


        return new PageImpl<>(containers, pageable, size);
    }

}
