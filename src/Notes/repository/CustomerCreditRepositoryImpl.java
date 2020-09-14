package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.repository.custom.CustomerCreditRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.repository.utils.PageableUtil;
import ir.donyapardaz.niopdc.base.service.dto.CreditBuyTypeRemainedDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;

/**
 * Spring Data JPA repository for the Depot entity.
 */
public class CustomerCreditRepositoryImpl extends JdbcDaoSupport implements CustomerCreditRepositoryCustom {

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
    public Page<CustomerCredit> findAllByCustomerId(Long customerId, Boolean isCredit, Boolean archive, ZonedDateTime dateTime, String query, Pageable pageable) {
        QCustomerCredit qCustomerCredit = new QCustomerCredit("customerCredit");
        QBuyType qBuyType = new QBuyType("bt");
        QSellContractProduct qSellContractProduct = new QSellContractProduct("scp");
        QSellContract qSellContract = new QSellContract("sc");
        JPAQuery<CustomerCredit> jpaQuery = new JPAQuery<>(em);

        jpaQuery.from(qCustomerCredit)
            .leftJoin(qBuyType).on(qBuyType.id.eq(qCustomerCredit.parentBuyType.id)).fetchJoin()
            .innerJoin(qSellContractProduct).on(qSellContractProduct.id.eq(qCustomerCredit.product.id))
            .innerJoin(qSellContract).on(qSellContract.id.eq(qSellContractProduct.sellContract.id))
            .select(qCustomerCredit);

        BooleanExpression where = qCustomerCredit.customer.id.eq(customerId)
            .and(isCredit != null && isCredit ?
                qBuyType.buyGroup.in(BuyGroup.CREDIT, BuyGroup.FINANCIAL_LICENSE) :
                qBuyType.buyGroup.in(BuyGroup.QUOTA));

        if (archive == null || !archive ){
            where = where.and(qSellContract.active.eq(true))
                .and(qSellContract.startDate.before(dateTime))
                .and(qSellContract.finishDate.after(dateTime));
        }

        PathBuilder<CustomerCredit> customerCredit = new PathBuilder<>(CustomerCredit.class, "customerCredit");
        BooleanExpression search = new PredicatesBuilder()
            .build(query, customerCredit, null);

        if (search != null)
            where = where.and(search);


        jpaQuery.where(where);

        HashMap<String, Expression> extraSort = new HashMap<>();
        extraSort.put("parentBuyTypeTitle", qBuyType.title);
        extraSort.put("sellContractNo", qSellContract.contractNo);
        return PageableUtil.fetchWithPageable(pageable, jpaQuery, customerCredit, extraSort);
    }

    @Override
    public List<CreditBuyTypeRemainedDTO> getRemainedCredits(Long customerId) {

        String query = "select " +
            "sum(cast(credit.current_amount as numeric(20,0))) as remainedAmount," +
            "sum( cast(credit.current_credit as numeric(20,0))) as remainedCredit, " +
            "bt.buy_group, " +
            "p.code as productCode," +
            "p.title as productTitle \n" +
            "from customer_credit credit\n" +
            "         inner join buy_type bt on credit.parent_buy_type_id = bt.id\n" +
            "         left join customer_credit_allowed_day ccad on credit.id = ccad.customer_credit_id\n" +
            "         inner join sell_contract_product scp on credit.product_id = scp.id\n" +
            "         inner join sell_contract sc on sc.id = scp.sell_contract_id\n" +
            "         inner join  product p on scp.product_id = p.id "+
            "where credit.active = '1'  and sc.active = '1' " +
            "and credit.customer_id=:customerId \n" +
            "and ((credit.has_Allowed_Days is null or credit.has_Allowed_Days = '0') and\n" +
            "       (credit.start_date < getdate() and (credit.finish_date is null or credit.finish_date > getdate()))\n" +
            "    or ((credit.has_Allowed_Days = '1' and\n" +
            "         (year(ccad.day) = year(getdate()) and month(ccad.day) = month(getdate()) and day(ccad.day) = day(getdate())))))\n" +
            "group by bt.buy_group,p.code,p.title";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("customerId", customerId);
        return jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper<>(CreditBuyTypeRemainedDTO.class));
    }

    @Override
    public List<CreditBuyTypeRemainedDTO> getRemainedCreditsByPerson(Long personId) {

        String query = "select sum(cast(credit.current_amount as numeric(20, 0))) as remainedAmount,\n" +
            "       sum(cast(credit.current_credit as numeric(20, 0))) as remainedCredit,\n" +
            "       bt.buy_group\n" +
            "from customer_credit credit\n" +
            "         inner join person p on credit.person_id = p.id\n" +
            "         inner join buy_type bt on credit.parent_buy_type_id = bt.id\n" +
            "         inner join sell_contract_person p2 on p.id = p2.person_id\n" +
            "         inner join sell_contract sc on p2.sell_contract_id = sc.id\n" +
            "where credit.active = '1'\n" +
            "  and sc.active = '1'\n" +
            "  and credit.person_id = :personId\n" +
            "  and (\n" +
            "    (\n" +
            "            credit.start_date <= getdate()\n" +
            "            and (\n" +
            "                    credit.finish_date is null\n" +
            "                    or credit.finish_date >= getdate()\n" +
            "                )\n" +
            "        )\n" +
            "    )\n" +
            "group by bt.buy_group";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("personId", personId);
        return jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper<>(CreditBuyTypeRemainedDTO.class));
    }
}
