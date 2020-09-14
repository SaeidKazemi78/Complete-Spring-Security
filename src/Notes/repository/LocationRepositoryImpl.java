package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.QLocation;
import ir.donyapardaz.niopdc.base.domain.QLocationView;
import ir.donyapardaz.niopdc.base.repository.custom.LocationRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class LocationRepositoryImpl implements LocationRepositoryCustom {
    private final Logger log = LoggerFactory.getLogger(LocationRepositoryImpl.class);

    @PersistenceContext
    private EntityManager em;


    public LocationRepositoryImpl() {
    }

    public Page<Location> findAllByLocationId(Long parentId, String query, Pageable pageable) {
        PathBuilder<Location> location = new PathBuilder<>(Location.class, "location");
        BooleanExpression booleanExpression = new PredicatesBuilder().build(query, location, null);
        BooleanExpression customerExpression;

        customerExpression =
//            QLocationView.locationView.username.eq(SecurityContextHolder.getContext().getAuthentication().getName()).and(QLocationView.locationView.id.eq(QLocation.location.id
//            ));
            QLocationView.locationView.username.eq(SecurityContextHolder.getContext().getAuthentication().getName());
        if (parentId != null)
            customerExpression = customerExpression.and(QLocation.location.locationParent.id.eq(parentId));

        booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
        JPAQuery<Location> jpaQuery = new JPAQuery<>(em);
//        jpaQuery.from(QLocation.location, QLocationView.locationView).select(QLocation.location);
        jpaQuery.from(QLocation.location)
            .innerJoin(QLocationView.locationView)
            .on(QLocationView.locationView.id.eq(QLocation.location.id))
            .select(QLocation.location);

        if (parentId == null) {
            JPAQuery<Integer> jpaQuery2 = new JPAQuery<>(em);
            jpaQuery2.where(booleanExpression);
            jpaQuery2.from(QLocation.location)
                .innerJoin(QLocationView.locationView)
                .on(QLocationView.locationView.id.eq(QLocation.location.id))
                .select(QLocation.location.level.min());
//            jpaQuery2.from(QLocation.location, QLocationView.locationView).select(QLocation.location.level.min());
            Integer minLevel = jpaQuery2.fetch().get(0);
            booleanExpression = booleanExpression.and(QLocation.location.level.eq(minLevel));
        }



        jpaQuery.where(booleanExpression);
        jpaQuery.offset((pageable.getPageNumber()) * pageable.getPageSize()).limit(pageable.getPageSize());
        if (pageable.getSort() != null) {
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                    : Order.DESC, location.get(o.getProperty())));
            }
        }

        List<Location> locations = jpaQuery.fetch();

        long size = (locations.size() < pageable.getPageSize() && pageable.getPageNumber() == 0) ?
            locations.size() :
            jpaQuery.offset(0).fetchCount();

        Page<Location> page = new PageImpl<>(locations, pageable, size);
        return page;

    }

}
