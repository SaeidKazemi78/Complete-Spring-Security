package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.QCountry;
import ir.donyapardaz.niopdc.base.domain.QRegion;
import ir.donyapardaz.niopdc.base.domain.QRegionView;
import ir.donyapardaz.niopdc.base.domain.Region;
import ir.donyapardaz.niopdc.base.repository.custom.RegionRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class RegionRepositoryImpl implements RegionRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Region> findByCountryIdAndParentIsNull(Long countryId, String query, Pageable pageable) {

        JPAQuery<Region> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QRegion.region).select(QRegion.region);

        BooleanExpression baseWhere = ((countryId == null)
            ? QRegion.region.country.id.isNull()
            : QRegion.region.country.id.eq(countryId))
            .and(QRegion.region.parent.id.isNull());

        PathBuilder<Region> region = new PathBuilder<>(Region.class, "region");
        BooleanExpression search = new PredicatesBuilder()
            .build(query, region, null);

        if (search != null)
            baseWhere = baseWhere.and(search);

        jpaQuery.where(baseWhere);
        if (pageable.getSort() != null) {
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                    : Order.DESC, region.get(o.getProperty())));
            }
        }
        long size = jpaQuery.fetchCount();
        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());

        return new PageImpl<>(jpaQuery.fetch(), pageable, size);
    }

    @Override
    public Page<Region> findByParentId(Long parentId, String query, Pageable pageable) {

        JPAQuery<Region> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QRegion.region/*, QRegionView.regionView*/).select(QRegion.region);
        if (parentId == null || parentId == -1) {
            jpaQuery.innerJoin(QCountry.country)
                .on(QCountry.country.id.eq(QRegion.region.country.id))
                .where(QCountry.country.checkNationalCode.eq(true));
        }

        BooleanExpression baseWhere = (parentId == null)
            ? QRegion.region.parent.isNull()
            : QRegion.region.parent.id.eq(parentId);

        PathBuilder<Region> region = new PathBuilder<>(Region.class, "region");
        BooleanExpression search = new PredicatesBuilder()
            .build(query, region, null);

        if (search != null)
            baseWhere = baseWhere.and(search);

        jpaQuery.where(baseWhere);
        if (pageable.getSort() != null) {
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                    : Order.DESC, region.get(o.getProperty())));
            }
        }
        long size = jpaQuery.fetchCount();
        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());

        return new PageImpl<>(jpaQuery.fetch(), pageable, size);
    }

    @Override
    public List<Region> findByParentId(Long parentId) {

        JPAQuery<Region> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QRegion.region, QRegionView.regionView);

        BooleanExpression baseWhere =
            QRegionView.regionView.username.eq(SecurityContextHolder.getContext().getAuthentication().getName())
                .and(QRegionView.regionView.id.eq(QRegion.region.id));

        baseWhere = baseWhere.and((parentId == null)
            ? QRegion.region.parent.isNull()
            : QRegion.region.parent.id.eq(parentId)
        );

        jpaQuery.where(baseWhere);

        return jpaQuery.fetch();
    }
}
