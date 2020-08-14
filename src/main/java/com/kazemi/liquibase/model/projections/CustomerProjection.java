package com.kazemi.liquibase.model.projections;

import com.kazemi.liquibase.model.CompanyModel;
import com.kazemi.liquibase.model.enums.LifeStyle;

public interface CustomerProjection {

    LifeStyle getLifeStyle();
     CompanyModel getCompanyId();
     String getName();

}
