package ir.donyapardaz.niopdc.base.domain.listener;

import ir.donyapardaz.niopdc.base.domain.CustomRevisionEntity;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.utils.IpUtil;
import org.hibernate.envers.RevisionListener;



public class CustomRevisionListener implements RevisionListener {


	@Override
	public void newRevision(Object revisionEntity) {
		CustomRevisionEntity entity = (CustomRevisionEntity) revisionEntity;

        entity.setAuditor(SecurityUtils.getCurrentUserLogin().orElse(""));

        entity.setIpAddress(IpUtil.getClientIp());


	}


}
