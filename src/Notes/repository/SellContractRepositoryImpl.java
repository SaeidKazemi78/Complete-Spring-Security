package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.repository.custom.SellContractRepositoryCustom;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.NativeSellContractDTO;
import ir.donyapardaz.niopdc.base.service.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class SellContractRepositoryImpl extends JdbcDaoSupport implements SellContractRepositoryCustom {
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
    public Page<NativeSellContractDTO> findAll(Boolean addendum, Long customerId, Long personId, String personName, String customerName, String contractNo, Boolean active, Pageable pageable) {

        Map<String, String> maps = new HashMap<String, String>() {{
            put("contractNo", "contract_no");
        }};

        String sort = null;
        if (ObjectUtils.nonNull(pageable.getSort())) {
            sort = StringUtils.collectionToCommaDelimitedString(
                StreamSupport.stream(pageable.getSort().spliterator(), false)
                    .map(o -> maps.getOrDefault(o.getProperty(), o.getProperty()) + " " + o.getDirection())
                    .collect(Collectors.toList()));
        }

//        if (ObjectUtils.nonEmpty(sort))
//            sort = "sc." + sort;
//        else sort = " sc.id desc ";

        String airplaneType = SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.AIRPLANE_SELL_CONTRACT) ? " and sc.contract_type='AIRPLANE'  " : "";

        String query = "with contract_customer as (\n" +
            "  select distinct sc.id                    as id,\n" +
            "                  dbo.GROUP_CONCAT(c.name) as customers\n" +
            "  from dbo.sell_contract sc\n" +
            "         left join dbo.sell_contract_customer scc on sc.id = scc.sell_contract_id\n" +
            "         left join dbo.customer c on scc.customer_id = c.id\n" +
            "  group by sc.id\n" +
            "),\n" +
            "     contract_person as (\n" +
            "       select distinct sc.id as id,\n" +
            "                       dbo.GROUP_CONCAT(\n" +
            "                           case\n" +
            "                             when pn.name is null then pn.first_name + ' ' + pn.last_name\n" +
            "                             else pn.name\n" +
            "                             end\n" +
            "                         )   as peoples\n" +
            "       from dbo.sell_contract sc\n" +
            "              left join dbo.sell_contract_person scpn on sc.id = scpn.sell_contract_id\n" +
            "              left join dbo.person pn on scpn.person_id = pn.id\n" +
            "       group by sc.id\n" +
            "     )\n" +
            "select distinct sc.id id,\n" +
            "       sc.contract_no contract_no ,\n" +
            "       cc.customers customers,\n" +
            "       cp.peoples peoples,\n" +
            "       sc.active active,\n" +
            "       sc.addendum_number addendum_number\n" +
            "from dbo.sell_contract sc\n" +
            "       inner join dbo.sell_contract_access access on access.id = sc.id\n" +
            "       inner join contract_customer cc on sc.id = cc.id\n" +
            "       inner join contract_person cp on cp.id = sc.id\n" +
            "       left join dbo.sell_contract_customer scc on scc.sell_contract_id = sc.id\n" +
            "       inner join dbo.sell_contract_person scp on scp.sell_contract_id = sc.id\n" +
            "where access.username = :username\n" +
            " \n" +
            airplaneType +
            "  and (scc.customer_id = :customerId or :customerId is null)\n" +
            "  and (scp.person_id = :personId or :personId is null)\n" +
            "  and (:customerId is not null or (:customerName is null or cc.customers like :customerName))\n" +
            "  and (:personId is not null or (:personName is null or cp.peoples like :personName))\n" +
            "  and\n" +
            "  (\n" +
            "      :contractNo is null\n" +
            "      or sc.contract_no like :contractNo\n" +
            "    )\n" +
            "  and (\n" +
            "    :active is null\n" +
            "    or sc.active = :active\n" +
            "  )\n" +
            "  and (\n" +
            "    (:addendum = 1 and sc.archive = 1)\n" +
            "    or (\n" +
            "        (:addendum = 0 or :addendum is null) and (sc.archive is null or sc.archive = 0)\n" +
            "      )\n" +
            "  )" +
            " ORDER BY " + sort + " OFFSET :skipRows ROWS FETCH NEXT :takeRows ROWS ONLY ";


        String countQuery = "with contract_customer as (\n" +
            "  select distinct sc.id                    as id,\n" +
            "                  dbo.GROUP_CONCAT(c.name) as customers\n" +
            "  from dbo.sell_contract sc\n" +
            "         left join dbo.sell_contract_customer scc on sc.id = scc.sell_contract_id\n" +
            "         left join dbo.customer c on scc.customer_id = c.id\n" +
            "  group by sc.id\n" +
            "),\n" +
            "     contract_person as (\n" +
            "       select distinct sc.id as id,\n" +
            "                       dbo.GROUP_CONCAT(\n" +
            "                           case\n" +
            "                             when pn.name is null then pn.first_name + ' ' + pn.last_name\n" +
            "                             else pn.name\n" +
            "                             end\n" +
            "                         )   as peoples\n" +
            "       from dbo.sell_contract sc\n" +
            "              left join dbo.sell_contract_person scpn on sc.id = scpn.sell_contract_id\n" +
            "              left join dbo.person pn on scpn.person_id = pn.id\n" +
            "       group by sc.id\n" +
            "     )\n" +
            "select count(sc.id)\n" +
            "from dbo.sell_contract sc\n" +
            "       inner join dbo.sell_contract_access access on access.id = sc.id\n" +
            "       inner join contract_customer cc on sc.id = cc.id\n" +
            "       inner join contract_person cp on cp.id = sc.id\n" +
            "       left join dbo.sell_contract_customer scc on scc.sell_contract_id = sc.id\n" +
            "       inner join dbo.sell_contract_person scp on scp.sell_contract_id = sc.id\n" +
            "where access.username = :username\n" +
            airplaneType +
            " and (scc.customer_id = :customerId or :customerId is null)\n" +
            "  and (scp.person_id = :personId or :personId is null)\n" +
            "  and (:customerId is not null or (:customerName is null or cc.customers like :customerName))\n" +
            "  and (:personId is not null or (:personName is null or cp.peoples like :personName))\n" +
            "  and\n" +
            "  (\n" +
            "      :contractNo is null\n" +
            "      or sc.contract_no like :contractNo\n" +
            "    )\n" +
            "  and (\n" +
            "    :active is null\n" +
            "    or sc.active = :active\n" +
            "  )\n" +
            "  and (\n" +
            "    (:addendum = 1 and sc.archive = 1)\n" +
            "    or (\n" +
            "        (:addendum = 0 or :addendum is null) and (sc.archive is null or sc.archive = 0)\n" +
            "      )\n" +
            "  )";


        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("username", SecurityUtils.getCurrentUserLogin().get());
        parameters.addValue("customerId", customerId);
        parameters.addValue("personId", personId);
        parameters.addValue("customerName", ObjectUtils.isEmpty(customerName) ? null : "%" + customerName + "%");
        parameters.addValue("personName", ObjectUtils.isEmpty(personName) ? null : "%" + personName + "%");
        parameters.addValue("contractNo", ObjectUtils.isEmpty(contractNo) ? null : "%" + contractNo + "%");
        parameters.addValue("active", active);
        parameters.addValue("addendum", addendum);


        parameters.addValue("skipRows", pageable.getOffset());
        parameters.addValue("takeRows", pageable.getPageSize());

        List<NativeSellContractDTO> findAll = jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper<>(NativeSellContractDTO.class));

        int size = findAll.size() < pageable.getPageSize() && pageable.getOffset() == 0 ? findAll.size()
            : jdbcTemplate.queryForObject(countQuery, parameters, Integer.class);

        return new PageImpl<>(findAll, pageable, size);
    }

   /* @Override
    public Page<SellContract> findAll(String personName, String customerName, Long customerId, Long personId, String query, org.springframework.data.domain.Pageable pageable) {

        JPAQuery<SellContract> jpaQuery = new JPAQuery<>(em);
        QSellContract sellContract = QSellContract.sellContract;
        QSellContractCustomer sellContractCustomer = new QSellContractCustomer("sellContractCustomer");
        QCustomer customer = new QCustomer("customer");
        QCustomerStationInfo customerStationInfo = new QCustomerStationInfo("customerStationInfo");
        QSellContractProduct sellContractProductCustomer = new QSellContractProduct("sellContractProductCustomer");
        QSellContractProduct sellContractProduct= new QSellContractProduct("sellContractProduct");
        QCustomerDeactiveRule customerDeactiveRule = new QCustomerDeactiveRule("customerDeactiveRule");
        QSellContractPerson sellContractPerson = new QSellContractPerson("sellContractPerson");
        QPerson person = new QPerson("person");
        QSellContractAccess sellContractAccess = new QSellContractAccess("sellContractAccess");


    *//*    QCustomerDeactiveRule customerDeactiveRule = new QCustomerDeactiveRule("customerDeactiveRule");
        QSellContractCustomerDeactive sellContractCustomerDeactive =
            new QSellContractCustomerDeactive(sellContract.as("sellContract"),
                customerDeactiveRule.as("customerDeactiveRule"));*//*

        jpaQuery.from(sellContract, sellContractAccess)

            .distinct()
            .select(sellContract)
            .leftJoin(sellContract.sellContractProducts,sellContractProduct).fetchJoin()
            .leftJoin(sellContract.sellContractCustomers, sellContractCustomer).fetchJoin()
            .leftJoin(sellContractCustomer.sellContractProducts,sellContractProductCustomer).fetchJoin()
            .leftJoin(sellContractCustomer.customer, customer).fetchJoin()
            .leftJoin(customer.customerStationInfo, customerStationInfo).fetchJoin()
            .leftJoin(customer.customerDeactiveRules, customerDeactiveRule).fetchJoin()
            .leftJoin(sellContract.sellContractPeople, sellContractPerson).fetchJoin()
            .leftJoin(sellContractPerson.person, person).fetchJoin();
//            .leftJoin(QCustomerDeactiveRule.customerDeactiveRule).on(QCustomerDeactiveRule.customerDeactiveRule.customerCode.eq(QSellContractCustomer.sellContractCustomer.customer.code)).fetchJoin();

        BooleanExpression baseWhere =
            sellContractAccess.id.username.eq(SecurityContextHolder.getContext().getAuthentication().getName())
                .and(sellContractAccess.id.id.eq(sellContract.id));

        if (customerId != null) {
            baseWhere = baseWhere.and(
                customer.id.eq(customerId)
            );
        } else {
            if (customerName != null) {
                baseWhere = baseWhere.and(
                    customer.name.like("%" + customerName + "%")
                );
            }
        }

        if (personId != null) {
            baseWhere = baseWhere.and(
                person.id.eq(personId)
            );
        } else {
            if (personName != null) {
                baseWhere = baseWhere.and(
                    person.name.like("%" + personName + "%").or(
                        person.firstName.like("%" + personName + "%")
                    ).or(
                        person.lastName.like("%" + personName + "%")
                    )
                );
            }
        }

        PathBuilder<SellContract> sellContractPathBuilder = new PathBuilder<>(SellContract.class, "sellContract");
        BooleanExpression search = new PredicatesBuilder()
            .build(query, sellContractPathBuilder, null);

        if (search != null)
            baseWhere = baseWhere.and(search);

        jpaQuery.where(baseWhere);
        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());
        if (pageable.getSort() != null) {
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                    : Order.DESC, sellContractPathBuilder.get(o.getProperty())));
            }
        }

        List<SellContract> results = jpaQuery.fetch();
        long size = (results.size() < pageable.getPageSize() && pageable.getPageNumber() == 0) ? results.size() : jpaQuery.offset(0).fetchCount();
        return new PageImpl<>(results, pageable, size);

    }*/

}
