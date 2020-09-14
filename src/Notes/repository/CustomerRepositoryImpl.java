package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.Customer;
import ir.donyapardaz.niopdc.base.domain.QCustomer;
import ir.donyapardaz.niopdc.base.domain.QCustomerAccess;
import ir.donyapardaz.niopdc.base.domain.Region;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.projection.CustomerSellContract;
import ir.donyapardaz.niopdc.base.repository.custom.CustomerRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.repository.utils.PageableUtil;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.PersonCustomerInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.sql.Date;
import java.time.ZonedDateTime;
import java.util.*;

public class CustomerRepositoryImpl extends JdbcDaoSupport implements CustomerRepositoryCustom {

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
    public Page<Customer> findAll(String locationName, String query, Set<CustomerGroup> customerGroups, String selfCode, List<Long> customerTypeIds, Pageable pageable) {

        JPAQuery<Customer> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QCustomer.customer, QCustomerAccess.customerAccess)
            .leftJoin(QCustomer.customer.locations).fetchJoin()
            .leftJoin(QCustomer.customer.region).fetchJoin()
            .leftJoin(QCustomer.customer.type).fetchJoin();
        jpaQuery.select(QCustomer.customer);
        BooleanExpression where = QCustomerAccess.customerAccess.id.username.eq(SecurityUtils.getCurrentUserLogin().get())
            .and(QCustomer.customer.id.eq(QCustomerAccess.customerAccess.id.id)).and(QCustomer.customer.type.customerGroup.ne(CustomerGroup.BOUNDARY));

        if (locationName != null) {
            where = where.and(QCustomer.customer.locations.any().name.like(locationName));
        }
        if (customerTypeIds != null) {
            where = where.and(QCustomer.customer.type.id.in(customerTypeIds));
        }
        PathBuilder<Customer> customer = new PathBuilder<>(Customer.class, "customer");
        Map<String, PathBuilder> map = new HashMap<>();
        map.put("region", new PathBuilder<>(Region.class, "region"));
        BooleanExpression search = new PredicatesBuilder().build(query, customer, map);

        if (search != null)
            where = where.and(search);
        if (customerGroups != null)
            where = where.and(QCustomer.customer.type.customerGroup.in(customerGroups));
        if (selfCode != null && !selfCode.isEmpty())
            where = where.and(QCustomer.customer.postalCode.like("%" + selfCode + "%")
                .or(QCustomer.customer.registerCode.like("%" + selfCode + "%")
                    .or(QCustomer.customer.movableCode.like("%" + selfCode + "%"))));

        jpaQuery.where(where);

        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());
        for (Sort.Order o : pageable.getSort()) {
            jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                : Order.DESC, customer.get(o.getProperty())));
        }

        List<Customer> customers = jpaQuery.fetch();

        long size = (customers.size() < pageable.getPageSize() && pageable.getPageNumber() == 0) ?
            customers.size() :
            jpaQuery.offset(0).fetchCount();

        return new PageImpl<>(customers, pageable, size);
    }

    @Override
    public Page<Customer> findAllByAccessLocation(String locationName, String query, Set<CustomerGroup> customerGroups, List<Long> customerIds, List<Long> customerTypeIds, Pageable pageable) {

        JPAQuery<Customer> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QCustomer.customer, QCustomerAccess.customerAccess)
            .leftJoin(QCustomer.customer.locations).fetchJoin()
            .leftJoin(QCustomer.customer.region).fetchJoin()
            .leftJoin(QCustomer.customer.customerStationInfo).fetchJoin()
            .leftJoin(QCustomer.customer.type).fetchJoin();
        jpaQuery.select(QCustomer.customer);

        BooleanExpression where = QCustomerAccess.customerAccess.id.username.eq(SecurityContextHolder.getContext().getAuthentication().getName())
            .and(QCustomer.customer.id.eq(QCustomerAccess.customerAccess.id.id)).and(QCustomer.customer.type.customerGroup.ne(CustomerGroup.BOUNDARY));


        if (locationName != null) {
            where = where.and(QCustomer.customer.locations.any().name.like("%" + locationName + "%"));
        }
        if (customerIds != null)
            where = where.and(QCustomer.customer.id.in(customerIds));

        if (customerTypeIds != null) {
            where = where.and(QCustomer.customer.type.id.in(customerTypeIds));
        }

        PathBuilder<Customer> customer = new PathBuilder<>(Customer.class, "customer");
        Map<String, PathBuilder> map = new HashMap<>();
        map.put("region", new PathBuilder<>(Region.class, "region"));
        BooleanExpression search = new PredicatesBuilder().build(query, customer, map);

        if (search != null)
            where = where.and(search);
        if (customerGroups != null)
            where = where.and(QCustomer.customer.type.customerGroup.in(customerGroups));

        jpaQuery.where(where);

        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());
        if (pageable.getSort() != null) {
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                    : Order.DESC, customer.get(o.getProperty())));
            }
        }
        List<Customer> customers = jpaQuery.fetch();

        long size = (customers.size() < pageable.getPageSize() && pageable.getPageNumber() == 0) ?
            customers.size() :
            jpaQuery.offset(0).fetchCount();
        return new PageImpl<>(customers, pageable, size);
    }

    @Override
    public List<CustomerSellContract> findAllCustomerSellContract(ZonedDateTime startDate, ZonedDateTime finishDate, String username) {

        String query =
            "SELECT " +
                " c.id customerId," +
                " c.code customerCode," +
                " c.name customerName," +
                " sc.id sellContractId," +
                " sc.contract_no contractNo," +
                " scc.location_id locationId" +
                " FROM sell_contract sc" +
                " INNER JOIN sell_contract_customer scc on scc.sell_contract_id=sc.id" +
                " INNER JOIN customer c on c.id=scc.customer_id" +
                " INNER JOIN customer_type ct on ct.id=c.type_id" +
                " INNER JOIN customer_access cv on c.id = cv.id " +
                " WHERE cv.username = :username " +
                "   AND sc.active = 1" +
                "   AND scc.active = 1" +
                "   AND scc.start_date <= :finishDate " +
                "   AND sc.start_date <= :finishDate " +
                "   AND sc.finish_date >= :startDate " +
                "   and ct.customer_group in (:customerGroup) ";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("username", username);
        parameters.addValue("startDate", Date.from(startDate.toInstant()));
        parameters.addValue("finishDate", Date.from(finishDate.toInstant()));
        List<String> strings = new ArrayList<>();
        strings.add(CustomerGroup.STATION.toString());
        strings.add(CustomerGroup.MAJOR_CONSUMER.toString());
        parameters.addValue("customerGroup", strings);

        return jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper(CustomerSellContract.class));
    }

    @Override
    public Page<Customer> findAllBoundaryCustomers(String vehicleModelTitle,
                                                   Boolean archive,
                                                   String carRfId,
                                                   String plaque,
                                                   String plaquePart1,
                                                   String plaquePart2,
                                                   String plaquePart3,
                                                   String type1,
                                                   String typeCode,
                                                   Pageable pageable) {
        QCustomer customer = new QCustomer("customer");


        JPAQuery<Customer> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(customer).leftJoin(customer.customerStationInfo).fetchJoin()
            .leftJoin(customer.type).fetchJoin()
            .leftJoin(customer.vehicleModel).fetchJoin();
        jpaQuery.select(customer);


        BooleanExpression where = customer.type.customerGroup.eq(CustomerGroup.BOUNDARY);

        if (archive != null && archive) {
            where = where.and(customer.archive.eq(true));
        } else {
            where = where.and(customer.archive.isNull().or(customer.archive.eq(false)));
        }

        if (StringUtils.hasLength(vehicleModelTitle)) {
            where = where.and(customer.vehicleModel.title.like("%" + vehicleModelTitle + "%"));
        }
        if (carRfId != null && !carRfId.isEmpty()) {
            where = where.and(customer.carRfId.like("%" + carRfId + "%"));
        }
        if (plaque != null && !plaque.isEmpty()) {
            where = where.and(customer.plaque.like("%" + plaque + "%").or(customer.plaqueTwo.like("%" + plaque + "%")));
            if (plaque.contains("_")) {
                plaque = plaque.replaceAll("_", "");
//                String newPlaque = "";
//                boolean flag = false;
//                if (String.valueOf(plaque.charAt(2)).equals("_")) {
//                    newPlaque = plaque.substring(0, 2) + plaque.substring(3);
//                    flag = true;
//                }
//                if (flag) {
//                    if (String.valueOf(newPlaque.charAt(2)).equals("_")) {
//                        newPlaque = newPlaque.substring(0, 2) + newPlaque.substring(3);
//                    }
//                } else {
//                    if (String.valueOf(plaque.charAt(3)).equals("_")) {
//                        newPlaque = newPlaque.substring(0, 3) + newPlaque.substring(4);
//
//                    }
//                }
//                if (String.valueOf(plaque.charAt(2)).equals("__")) {
//                    newPlaque = newPlaque.replaceAll("__","");
//                }
                where = where.or(customer.plaque.like("%" + plaque + "%").or(customer.plaqueTwo.like("%" + plaque + "%")));

            }
        }


        if (typeCode != null) {
            where = where.and(customer.type.code.eq(typeCode));
        }

        BooleanExpression plaquePredicate = null;

        if (plaquePart1 != null && !plaquePart1.isEmpty()) {
            plaquePredicate = customer.plaque.like(plaquePart1 + "%");
        }

        if (plaquePart2 != null && !plaquePart2.isEmpty()) {
            if (Objects.nonNull(plaquePredicate))
                plaquePredicate = plaquePredicate.and(customer.plaque.like("%" + plaquePart2 + "%"));
            else plaquePredicate = customer.plaque.like("%" + plaquePart2 + "%");
        }

        if (plaquePart3 != null && !plaquePart3.isEmpty()) {

            if (Objects.nonNull(plaquePredicate))
                plaquePredicate = plaquePredicate.and(customer.plaque.like("%" + plaquePart3));
            else plaquePredicate = customer.plaque.like("%" + plaquePart3);
        }

        BooleanExpression plaqueTwoPredicate = null;

        if (plaquePart1 != null && !plaquePart1.isEmpty()) {
            plaqueTwoPredicate = customer.plaqueTwo.like(plaquePart1 + "%");
        }

        if (plaquePart2 != null && !plaquePart2.isEmpty()) {

            if (Objects.nonNull(plaqueTwoPredicate))
                plaqueTwoPredicate = plaqueTwoPredicate.and(customer.plaqueTwo.like("%" + plaquePart2 + "%"));
            else plaqueTwoPredicate = customer.plaqueTwo.like("%" + plaquePart2 + "%");
        }

        if (plaquePart3 != null && !plaquePart3.isEmpty()) {

            if (Objects.nonNull(plaqueTwoPredicate))
                plaqueTwoPredicate = plaqueTwoPredicate.and(customer.plaqueTwo.like("%" + plaquePart3));
            else plaqueTwoPredicate = customer.plaqueTwo.like("%" + plaquePart3);
        }


        if (plaquePredicate == null)
            plaquePredicate = plaqueTwoPredicate;
        else if (plaqueTwoPredicate != null)
            plaquePredicate = plaquePredicate.or(plaqueTwoPredicate);


        if (type1 != null && !type1.isEmpty()) {
            where = where.and(customer.type.title.like("%" + type1.trim() + "%"));
        }

        if (plaquePredicate != null)
            where = where.and(plaquePredicate);


        PathBuilder<Customer> customerPathBuilder = new PathBuilder<>(Customer.class, "customer");


        jpaQuery.where(where);
        Map<String, Expression> map = new HashMap<>();
        map.put("typeTitle", customer.type.title);
        map.put("vehicleModelTitle", customer.vehicleModel.title);
        Page<Customer> customerPage = PageableUtil.fetchWithPageable(pageable, jpaQuery, customerPathBuilder, map);
        return customerPage;
    }

    @Override
    public List<PersonCustomerInfoDTO> getPersonInfo(Long customerId) {
        String query = "" +
            "select person.code as personCode,\n" +
            "       case\n" +
            "           when person.personality = 'NATURAL' then person.first_name + ' ' + person.last_name\n" +
            "           else person.name end as personName,\n" +
            "  contract.contract_no as sellContractCode \n" +
            "from person person\n" +
            "         inner join sell_contract_person on person.id = sell_contract_person.person_id\n" +
            "         inner join sell_contract contract on contract.id = sell_contract_person.sell_contract_id\n" +
            "         inner join sell_contract_customer on contract.id = sell_contract_customer.sell_contract_id\n" +
            "         inner join customer on customer.id = sell_contract_customer.customer_id\n" +
            "    where customer.id =:customerId  and (contract.active is not null and contract.active ='1')";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("customerId", customerId);
        return jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper(PersonCustomerInfoDTO.class));

    }
}
