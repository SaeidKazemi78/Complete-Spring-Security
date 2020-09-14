package ir.donyapardaz.niopdc.base.domain.enumeration;

import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;

import java.util.ArrayList;
import java.util.List;

import static ir.donyapardaz.niopdc.base.security.AuthoritiesConstants.ROLE_ADMIN;

/**
 * The BuyGroup enumeration.
 */
public enum BuyGroup {
    CASH, QUOTA, CREDIT, FINANCIAL_LICENSE;


    public static List<BuyGroup> getBuyGroups(boolean usage) {
        List<BuyGroup> buyGroups = new ArrayList<>();
        if (
            SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ROLE_ADMIN) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.CREATE_CUSTOMER_QUOTA) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.EDIT_CUSTOMER_QUOTA) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.DELETE_CUSTOMER_QUOTA) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.LIST_CUSTOMER_QUOTA) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.VIEW_CUSTOMER_QUOTA)
        ) {
           if(usage)
              buyGroups.add(QUOTA);
        }
        if (
            SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ROLE_ADMIN) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.CREATE_CUSTOMER_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.EDIT_CUSTOMER_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.DELETE_CUSTOMER_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.LIST_CUSTOMER_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.VIEW_CUSTOMER_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.CREATE_PERSON_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.EDIT_PERSON_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.DELETE_PERSON_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.LIST_PERSON_CREDIT) ||
                SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.VIEW_PERSON_CREDIT)
        ) {
            buyGroups.add(CREDIT);
            buyGroups.add(FINANCIAL_LICENSE);
        }

        return buyGroups;
    }


}
