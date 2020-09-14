package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.QSellContract;
import ir.donyapardaz.niopdc.base.domain.QSellContractProduct;
import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.domain.projection.QCurrencyRateGroup;
import ir.donyapardaz.niopdc.base.domain.projection.QRateGroup;
import ir.donyapardaz.niopdc.base.domain.projection.QSellContractProductCurrencyRateGroup;
import ir.donyapardaz.niopdc.base.domain.projection.SellContractProductCurrencyRateGroup;
import ir.donyapardaz.niopdc.base.repository.custom.SellContractProductRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class SellContractProductRepositoryImpl implements SellContractProductRepositoryCustom {
    @PersistenceContext
    private EntityManager em;


    @Override
    public Page<SellContractProductCurrencyRateGroup> findAll(Long sellContract, String query, Pageable pageable) {
        QSellContractProduct sellContractProduct = new QSellContractProduct("sellContractProduct");
        QCurrencyRateGroup currencyRateGroup = new QCurrencyRateGroup("currencyRateGroup");
        QRateGroup rateGroup = new QRateGroup("rateGroup");

        JPAQuery<SellContractProductCurrencyRateGroup> jpaQuery = new JPAQuery<>(em);

//        QSellContract qSellContract = sellContractProduct.sellContractCustomer.sellContract;
        QSellContract qSellContract1 = sellContractProduct.sellContract;
        jpaQuery.from(sellContractProduct)

            .innerJoin(currencyRateGroup)
            .on(currencyRateGroup.id.eq(sellContractProduct.currencyRateGroupId))

            .leftJoin(rateGroup)
            .on(rateGroup.id.eq(sellContractProduct.rateGroupId))
            .leftJoin(sellContractProduct.sellContractCustomer)
//            .leftJoin(qSellContract)
            .leftJoin(qSellContract1)
            .where(qSellContract1.id.eq(sellContract)/*.or(qSellContract.id.eq(sellContract))*/);

        QSellContractProductCurrencyRateGroup qSellContractProductCurrencyRateGroup = new QSellContractProductCurrencyRateGroup(sellContractProduct.as("sellContractProduct"),
            currencyRateGroup.as("currencyRateGroup"),
            rateGroup.as("rateGroup"));
        jpaQuery.select(qSellContractProductCurrencyRateGroup);

        PathBuilder<SellContractProduct> sellContractProductPathBuilder = new PathBuilder<>(SellContractProduct.class, "sellContractProduct");
        BooleanExpression search = new PredicatesBuilder().build(query, sellContractProductPathBuilder,null);

        if (search != null)
            jpaQuery.where(search);

        long size = jpaQuery.fetch().size();
        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());

        if (pageable.getSort() != null) {
            for (Sort.Order order : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(order.isAscending() ? Order.ASC
                    : Order.DESC, sellContractProductPathBuilder.get(order.getProperty())));
            }
        }

        return new PageImpl<>(jpaQuery.fetch(), pageable, size);
    }
}
