package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.config.Profiles;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.domain.projection.QVehicleModelCapacityProduct;
import ir.donyapardaz.niopdc.base.domain.projection.VehicleModelCapacityProduct;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.VehicleModelDTO;
import ir.donyapardaz.niopdc.base.service.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

public class VehicleModelRepositoryImpl extends JdbcDaoSupport implements VehicleModelRepositoryCustom {
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
    public Page<VehicleModelCapacityProduct> findAll(String query, Pageable pageable) {

        QVehicleModel vm = new QVehicleModel("vm");
        QVehicleCapacity vc = new QVehicleCapacity("vc");
        QProduct p = new QProduct("p");

        JPAQuery<VehicleModelCapacityProduct> jpaQuery = new JPAQuery<>(em);

        jpaQuery.from(vm).distinct()
            .leftJoin(vc).on(vc.vehicleModel.id.eq(vm.id)).fetchJoin()
            .leftJoin(p).on(vc.product.id.eq(p.id)).fetchJoin();

        QVehicleModelCapacityProduct qVehicleModelCapacityProduct = new QVehicleModelCapacityProduct(vm.as("vehicleModel"), vc.as("vehicleCapacity"), p.as("product"));

        jpaQuery.select(qVehicleModelCapacityProduct);

        PathBuilder<VehicleModel> vehicleModelPathBuilder = new PathBuilder<>(VehicleModel.class, "vm");

        Map<String, PathBuilder> map = new HashMap<>();
        map.put("vehicleCapacity", new PathBuilder<>(VehicleCapacity.class, "vehicleCapacity"));
        map.put("product", new PathBuilder<>(Customer.class, "product"));

        BooleanExpression search = new PredicatesBuilder().build(query, vehicleModelPathBuilder, map);

        if (search != null)
            jpaQuery.where(search);


        long size = jpaQuery.fetch().size();

        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());
        if (pageable.getSort() != null) {
            for (Sort.Order order : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(order.isAscending() ? Order.ASC
                    : Order.DESC, vehicleModelPathBuilder.get(order.getProperty())));
            }
        }
        return new PageImpl<>(jpaQuery.fetch(), pageable, size);
    }


    @Override
    public Page<VehicleModelDTO> findAll(String title, CustomerGroup customerGroup, VehicleModelType vehicleModelType, String productTitle, Boolean confirm, Pageable pageable) {

        String sort = null;
        if (ObjectUtils.nonNull(pageable.getSort())) {
            sort = StringUtils.collectionToCommaDelimitedString(
                StreamSupport.stream(pageable.getSort().spliterator(), false)
                    .map(o -> o.getProperty() + " " + o.getDirection())
                    .collect(Collectors.toList()));
        }

        if (ObjectUtils.nonEmpty(sort))
            sort = sort.replace("id", "vehicleModel.id");
        else sort = " vehicleModel.title ASC ";

        String select = " select  " +
            " vehicleModel.id," +
            " vehicleModel.title ," +
            " vehicleModel.customer_Group, " +
            " vehicleModel.vehicle_Model_Type, " +
            " vehicleModel.confirm, " +
            " dbo.GROUP_CONCAT(CONCAT(isnull(p.title,pvc.title),isnull(vehicleModel.capacity,vc.capacity),case  when vehicleModel.capacity is  null and vc.capacity is null then '' else ' لیتر ' end)) as productTitle ",
            from = " from niopdcbase_" + Profiles.activeProfile + ".dbo.vehicle_model vehicleModel " +
                " left join niopdcbase_" + Profiles.activeProfile + ".dbo.product p on vehicleModel.product_id = p.id " +
                " left join niopdcbase_" + Profiles.activeProfile + ".dbo.vehicle_capacity vc on vehicleModel.id = vc.vehicle_model_id " +
                " left join niopdcbase_" + Profiles.activeProfile + ".dbo.product pvc on vc.product_id = pvc.id " +
                " where " +
                "  ((:customerGroup) is null or  vehicleModel.customer_Group = :customerGroup ) " +
                " and (:confirm is null or vehicleModel.confirm = :confirm) " +
                " and ((:vehicleModelType) is null or  vehicleModel.vehicle_Model_Type = :vehicleModelType) " +
                " and ( (:productTitle) is null or  p.title like  :productTitle or vehicleModel.capacity like :productTitle ) " +
                " and ((:title) is null or vehicleModel.title like :title) ",
            order = " group by  vehicleModel.title ," +
                " vehicleModel.customer_Group," +
                " vehicleModel.vehicle_Model_Type ," +
                " vehicleModel.confirm ," +
                "  vehicleModel.id " +
                " ORDER BY " + sort + " OFFSET :skipRows ROWS FETCH NEXT :takeRows ROWS ONLY; ";


        String countQuery = "select count(*) " + from;

        MapSqlParameterSource parameters = new MapSqlParameterSource();


        parameters.addValue("title", title != null ? "%" + title + "%" : null);
        parameters.addValue("productTitle", productTitle != null ? "%" + productTitle + "%" : null);
        parameters.addValue("vehicleModelType", vehicleModelType != null ? vehicleModelType.toString() : null);
        parameters.addValue("customerGroup", customerGroup != null ? customerGroup.toString() : null);
        parameters.addValue("confirm", confirm);


        parameters.addValue("skipRows", pageable.getOffset());
        parameters.addValue("takeRows", pageable.getPageSize());

        List<VehicleModelDTO> findAll = jdbcTemplate.query(select + from + order, parameters, new BeanPropertyRowMapper<>(VehicleModelDTO.class));

        int size = findAll.size() < pageable.getPageSize() && pageable.getOffset() == 0 ? findAll.size()
            : jdbcTemplate.queryForObject(countQuery, parameters, Integer.class);

        return new PageImpl<>(findAll, pageable, size);

    }


}
