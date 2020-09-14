package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.repository.custom.PersonRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.repository.utils.PageableUtil;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.PersonCustomDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.time.ZonedDateTime;
import java.util.List;

public class PersonRepositoryImpl extends JdbcDaoSupport implements PersonRepositoryCustom {

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
    public Page<Person> findAll(String query, Pageable pageable, boolean isTranfport) {

        JPAQuery<Person> jpaQuery = new JPAQuery<>(em);
        JPAQuery<Person> join = jpaQuery.from(QPerson.person, QPersonAccess.personAccess)
            .leftJoin(QPerson.person.locations).fetchJoin();

        if (isTranfport)
            join.innerJoin(QPerson.person.personTransport).fetchJoin();
        jpaQuery.select(QPerson.person);

        BooleanExpression where = QPersonAccess.personAccess.id.username.eq(SecurityContextHolder.getContext().getAuthentication().getName())
            .and(QPerson.person.id.eq(QPersonAccess.personAccess.id.id));

        PathBuilder<Person> pathBuilder = new PathBuilder<>(Person.class, "person");
        BooleanExpression search = new PredicatesBuilder().build(query, pathBuilder, null);

        if (search != null)
            where = where.and(search);

        jpaQuery.where(where);

        return PageableUtil.fetchWithPageable(pageable, jpaQuery, pathBuilder);
    }

    @Override
    public Page<Person> findAllSelector(Boolean self, String query, Pageable pageable) {

        JPAQuery<Person> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QPerson.person);
        if (self != null && self) {
            jpaQuery.join(QPersonAccess.personAccess).on(QPersonAccess.personAccess.id.id.eq(QPerson.person.id));
        }
        jpaQuery.select(QPerson.person);

        BooleanExpression where = null;

        PathBuilder<Person> pathBuilder = new PathBuilder<>(Person.class, "person");
        BooleanExpression search = new PredicatesBuilder().build(query, pathBuilder, null);

        if (search != null)
            where = search;

        if (self != null && self) {
            BooleanExpression eq = QPersonAccess.personAccess.id.username.eq(SecurityUtils.getCurrentUserLogin().get());
            where = where == null ? eq : where.and(eq);
        }
        if (where != null)
            jpaQuery.where(where);

        return PageableUtil.fetchWithPageable(pageable, jpaQuery, pathBuilder);

    }
/*

    @Override
    public List<CustomerPerson> findPerson(String username, Long locationId, ZonedDateTime date, List<ContractType> contractTypes) {
        String query =
            "SELECT p.id personId," +
                "p.name personName," +
                "p.first_name personFirstName," +
                "p.last_name personLastName," +
                "p.personality personality," +
                "sc.id sellContractId," +
                "sc.contract_no contractNo" +
                " FROM person p" +
                " INNER JOIN sell_contract_person scp on scp.person_id=p.id " +
                " INNER JOIN sell_contract sc on sc.id=scp.sell_contract_id" +
                " INNER JOIN sell_contract_product scpr on sc.id=scpr.sell_contract_id" +
                " INNER JOIN sell_contract_location l on sc.id = l.sell_contracts_id" +
                " INNER JOIN person_access pv on p.id = pv.id " +
                " WHERE pv.username = :username " +
                "   AND l.locations_id = :locationId" +
                "   AND sc.active = 1" +
                "   AND scpr.active = 1" +
                "   AND scpr.start_date <= :datetime " +
                "   AND scpr.finish_date >= :datetime " +
                "   AND sc.contract_type in (" + contractTypes.toString().replace(",", "','").replace("]", "'").replace("[", "'") + ")";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("username", username);
        parameters.addValue("locationId", locationId);
        parameters.addValue("datetime", Date.from(date.toInstant()));


        return jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper(CustomerPerson.class));
    }

    @Override
    public List<CustomerPerson> findPersonAndCustomer(String username, Long locationId, ZonedDateTime date, List<ContractType> contractTypes) {
        String query =
            "with sellContractCustomers as (SELECT DISTINCT " +
                " p.id personId," +
                " p.name personName," +
                " p.first_name personFirstName," +
                " p.last_name personLastName," +
                " p.personality personality," +
                " c.id customerId," +
                " c.identify_code customerCode," +
                " c.name customerName," +
                " sc.id sellContractId ," +
                " sc.contract_no contractNo," +
                " ct.customer_group" +
                " FROM person p" +
                " INNER JOIN sell_contract_person scp on scp.person_id=p.id " +
                " INNER JOIN sell_contract sc on sc.id=scp.sell_contract_id" +
                " INNER JOIN sell_contract_customer scc on scc.sell_contract_id=sc.id" +
                " INNER JOIN customer c on c.id=scc.customer_id" +
                " INNER JOIN customer_type ct on ct.id = c.type_id " +
                " INNER JOIN sell_contract_product product on sc.id = product.sell_contract_id" +
                " WHERE scc.location_id = :locationId" +
                "   AND sc.active = 1" +
                "   AND scc.active = 1" +
                "   AND product.active = 1" +
                "   AND scc.start_date <= :datetime " +
                "   AND product.start_date <= :datetime " +
                "   AND product.finish_date >= :datetime " +
                "   AND sc.contract_type in (" + contractTypes.toString()
                .replace(", ", "','")
//                .replace(",","','")
                .replace("]", "'")
                .replace("[", "'") + ")" +
                ") " +
                "select scc.* from sellContractCustomers scc inner join customer_access cv on cv.id=scc.customerId and cv.username = :username";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("username", username);
        parameters.addValue("locationId", locationId);
        parameters.addValue("datetime", Date.from(date.toInstant()));
//        parameters.addValue("contractType", );


        List query1 = jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper(CustomerPerson.class));
        return query1;

    }
*/

    @Override
    public Page<Person> findAllBySellContractAirplane(String query, Pageable pageable) {

        JPAQuery<Person> jpaQuery = new JPAQuery<>(em);

        QSellContract sellContract = new QSellContract("sellContract");
        QSellContractPerson sellContractPerson = new QSellContractPerson("sellContractPerson");
        QPerson person = new QPerson("person");

        jpaQuery.select(person)
            .from(person)
            .innerJoin(sellContractPerson)
            .on(sellContractPerson.person.id.eq(person.id))
            .innerJoin(sellContract)
            .on(sellContractPerson.sellContract.id.eq(sellContract.id));


        BooleanExpression where = sellContract.startDate.before(ZonedDateTime.now()).and(
            sellContract.finishDate.after(ZonedDateTime.now()))
            .and(sellContract.contractType.eq(ContractType.AIRPLANE)).and(sellContract.active.eq(true));


        PathBuilder<Person> pathBuilder = new PathBuilder<>(Person.class, "person");
        BooleanExpression search = new PredicatesBuilder().build(query, pathBuilder, null);

        if (search != null)
            where = where.and(search);

        jpaQuery.where(where);

        return PageableUtil.fetchWithPageable(pageable, jpaQuery, pathBuilder);
    }

    @Override
    public List findPersonForFactor(Long personId) {
        String query =
            "select " +
                "person.*," +
                "case when person.personality='LEGAL' then person.name else person.first_name + ' ' + person.last_name end as name ," +
                "person.code as codeLegal," +
                "c.name as city," +
                "s.name as state," +
                "r.name as region from person " +
                "inner join region c on c.id = person.region_id " +
                "inner join region s on s.id = c.parent_id " +
                "inner join region r on r.id = s.parent_id " +
                "where person.id = :personId";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("personId", personId);
        return jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper<>(PersonCustomDTO.class));
    }

}
