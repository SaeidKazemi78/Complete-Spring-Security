package com.kazemi.liquibase.helper;

import com.google.common.collect.Sets;
import com.kazemi.liquibase.model.Permissions;
import com.kazemi.liquibase.model.RoleModel;
import com.kazemi.liquibase.model.User;
import com.kazemi.liquibase.model.enums.LifeStyle;
import com.kazemi.liquibase.model.enums.RoleLevel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Component
public class CrudUtils {

    Logger LOGGER = LoggerFactory.getLogger(CrudUtils.class);

    private static final List<Permissions> PERMISSIONS_1 = new ArrayList<>();

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void constructPermissions() {
        PERMISSIONS_1.addAll(
                Sets.newHashSet(
                        new Permissions("create_profile", ZonedDateTime.now(), "افزودن پروفایل"),
                        new Permissions("read_profile", ZonedDateTime.now(), "افزودن پروفایل"),
                        new Permissions("edit_profile", ZonedDateTime.now(), "ویرایش پروفایل"),
                        new Permissions("delete_profile", ZonedDateTime.now(), "حذف پروفایل"),
                        new Permissions("edit_users_super", ZonedDateTime.now(), "ویرایش کاربر اصلی"),
                        new Permissions("create_super_users", ZonedDateTime.now(), "ایجاد کاربران اصلی"),
                        new Permissions("read_super_users", ZonedDateTime.now(), "مشاهده کاربران اصلی "),
                        new Permissions("create_newses", ZonedDateTime.now(), ""),
                        new Permissions("create_image", ZonedDateTime.now(), ""),
                        new Permissions("read_image", ZonedDateTime.now(), "خواندن تصاویر"),
                        new Permissions("edit_image", ZonedDateTime.now(), ""),
                        new Permissions("delete_image", ZonedDateTime.now(), ""),
                        new Permissions("edit_users", ZonedDateTime.now(), "ویرایش کاربر"),
                        new Permissions("create_users", ZonedDateTime.now(), "ایجاد کاربران"),
                        new Permissions("read_users", ZonedDateTime.now(), "مشاهده کاربران"),
                        new Permissions("create_important_newses", ZonedDateTime.now(), "ایجاد اخبار مهم")
                )
        );
        LOGGER.info(" Permissions list was initialized !");
    }


    public List<Permissions> generateDummyPermission() {
        return PERMISSIONS_1;
    }


    public Set<RoleModel> generateDummyRole() {
        return Sets.newHashSet(
                new RoleModel("ADMIN", RoleLevel.LEVEL_A, "ادمین"),
                new RoleModel("User", RoleLevel.LEVEL_B, "کاربر"),
                new RoleModel("Operator", RoleLevel.LEVEL_C, "اپراتور"),
                new RoleModel("SELL", RoleLevel.LEVEL_D, "کاربر فروش"),
                new RoleModel("IT_MAN", RoleLevel.LEVEL_D, "مدیر آی تی")

        );
    }

    public Set<User> generateDummyUsers() {

        return Sets.newHashSet(
                new User("سعید",
                        "کاظمی",
                        LifeStyle.SELF_MOTIVATED,
                        "saeid20",
                        passwordEncoder.encode("password123"),
                        true,
                        ZonedDateTime.now()),
                new User("علی",
                        "رضایی",
                        LifeStyle.SELF_MOTIVATED,
                        "ali100",
                        passwordEncoder.encode("aliPass"),
                        true,
                        ZonedDateTime.now()),
                new User("حسین",
                        "بهبودی",
                        LifeStyle.HAPPY,
                        "hh_22",
                        passwordEncoder.encode("h_pass"),
                        true,
                        ZonedDateTime.now()),
                new User("مهناز",
                        "عبادتی",
                        LifeStyle.HAPPY,
                        "mahnaz_2",
                        passwordEncoder.encode("mm_hh_22"),
                        true,
                        ZonedDateTime.now()),
                new User("عیاس",
                        "خدایاری",
                        LifeStyle.SPORT,
                        "abbas",
                        passwordEncoder.encode("abb_kk"),
                        true,
                        ZonedDateTime.now())
        );

    }


}
