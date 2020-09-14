package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.Depot;
import ir.donyapardaz.niopdc.base.domain.QDepot;
import ir.donyapardaz.niopdc.base.domain.QLocation;
import ir.donyapardaz.niopdc.base.domain.QLocationAccess;
import ir.donyapardaz.niopdc.base.repository.custom.DepotRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.repository.utils.PageableUtil;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static ir.donyapardaz.niopdc.base.security.AuthoritiesConstants.ROLE_ADMIN;

/**
 * Spring Data JPA repository for the Depot entity.
 */
public class DepotRepositoryImpl implements DepotRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Depot> findAll(String query, Pageable pageable) {

        JPAQuery<Depot> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QDepot.depot).distinct()
            .join(QDepot.depot.location).fetchJoin()
            .join(QLocationAccess.locationAccess).on(
                SecurityUtils.isCurrentUserInRole(ROLE_ADMIN)?
                    QLocationAccess.locationAccess.id.id.eq(QDepot.depot.location.id).or(QDepot.depot.location.id.isNull()):
                    QLocationAccess.locationAccess.id.id.eq(QDepot.depot.location.id)

        )
            .select(QDepot.depot);

        BooleanExpression where = QLocationAccess.locationAccess.id.username
            .eq(SecurityContextHolder.getContext().getAuthentication().getName());

        PathBuilder<Depot> depot = new PathBuilder<>(Depot.class, "depot");
        BooleanExpression search = new PredicatesBuilder()
            .build(query, depot,null);

        if (search != null)
            where = where.and(search);


        jpaQuery.where(where);
        return PageableUtil.fetchWithPageable(pageable, jpaQuery, depot);
    }


}
