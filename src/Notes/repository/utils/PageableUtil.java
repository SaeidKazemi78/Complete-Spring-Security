package ir.donyapardaz.niopdc.base.repository.utils;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PageableUtil {

    public static void setPageable(Pageable pageable, JPAQuery<?> jpaQuery, PathBuilder<?> pathBuilder, Map<String, Expression> extraSort) {
        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());
        if (pageable.getSort() != null) {
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC : Order.DESC,
                    extraSort.containsKey(o.getProperty()) ?
                        extraSort.get(o.getProperty()) :
                        pathBuilder.get(o.getProperty())));
            }
        }
    }

    public static <T> PageImpl<T> fetchWithPageable(Pageable pageable, JPAQuery<T> jpaQuery, PathBuilder<?> pathBuilder) {
        return fetchWithPageable(pageable, jpaQuery, pathBuilder, new HashMap<>());
    }

    public static <T> PageImpl<T> fetchWithPageable(Pageable pageable, JPAQuery<T> jpaQuery, PathBuilder<?> pathBuilder, Map<String, Expression> extraSort) {
        PageableUtil.setPageable(pageable, jpaQuery, pathBuilder, extraSort);

        List<T> fetch = jpaQuery.fetch();

        long size = (fetch.size() < pageable.getPageSize() && pageable.getPageNumber() == 0) ?
            fetch.size() :
            jpaQuery.offset(0).fetchCount();
        return new PageImpl<>(fetch, pageable, size);
    }
}
