package ir.donyapardaz.niopdc.base.service.remote.supplychannel;

import ir.donyapardaz.niopdc.base.domain.CustomerCapacity;
import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.domain.SellContractCustomer;
import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapMessage;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class SupplyChannelClient extends WebServiceGatewaySupport {

    @Value("${remote.supply-channel.action-url}")
    String actionNaturalUrl;

    @Value("${remote.supply-channel.username}")
    String username;

    @Value("${remote.supply-channel.password}")
    String password;
    @Value("${remote.supply-channel.url}")
    String baseUrl;

    public void sendSupplyChannel(SellContract sellContract) {

        List<NiopdcCustomerMajari> list = new ArrayList<NiopdcCustomerMajari>();

        List<Output> outputsOK = new ArrayList<Output>();
        List<Output> outputsError = new ArrayList<Output>();

        for (SellContractCustomer sellContractCustomer : sellContract.getSellContractCustomers()) {
            if (!sellContractCustomer.getSellContractProducts().isEmpty()) {
                NiopdcCustomerMajari supplyChannel = new NiopdcCustomerMajari();

                supplyChannel.setCode(sellContractCustomer.getCustomer().getIdentifyCode());
                supplyChannel.setIdOld(sellContractCustomer.getId().toString());
                supplyChannel.setCustomername(sellContractCustomer.getCustomer().getName());
                supplyChannel.setFCustomerTypeID(sellContractCustomer.getCustomer().getType().getCode());
                supplyChannel.setFCustomerStatusID("1.0000");

                if (!sellContractCustomer.getSellContractProducts().isEmpty())
                    supplyChannel.setFBuyTypeID(sellContractCustomer.getSellContractProducts().iterator().next().getBuyTypes().iterator().next().getId().toString());

                supplyChannel.setFLocationID(sellContractCustomer.getCustomer().getLocations().iterator().next().getCode());
                supplyChannel.setEtebarAccountNO(sellContractCustomer.getCreditAccount());
                supplyChannel.setPhone(sellContractCustomer.getCustomer().getTelephone());
                supplyChannel.setAddress(sellContractCustomer.getCustomer().getAddress());
                supplyChannel.setFLocationIDNahieh(sellContractCustomer.getCustomer().getLocations().iterator().next().getCode());
                supplyChannel.setHasTransport(sellContractCustomer.isHasTransport() ? "1" : "0");
                supplyChannel.setHasAggrement("1");
                supplyChannel.setOldCode(sellContractCustomer.getCustomer().getId().toString());
                supplyChannel.setPostCode(sellContractCustomer.getCustomer().getPostalCode());
                if (!sellContractCustomer.getSellContractProducts().isEmpty())
                    supplyChannel.setFCustomerMasrafTypeID(sellContractCustomer.getSellContractProducts().iterator().next().getConsumption().getCode());
                supplyChannel.setSabtDate(sellContractCustomer.getCustomer().getCreatedDate().toString());
                if (sellContractCustomer.getCustomer().getRegion() != null)
                    supplyChannel.setFCountryDivisionID(sellContractCustomer.getCustomer().getRegion().getCode());
                else
                    supplyChannel.setFCountryDivisionID("");
                supplyChannel.setCustomerTypeCaption(sellContractCustomer.getCustomer().getType().getTitle());
                supplyChannel.setActive("1.0000");
                supplyChannel.setExpireDate(DateUtil.convertToPersianByFormat(sellContract.getFinishDate(), "yyyy/MM/dd"));

                supplyChannel.setIsOutCity("");
                supplyChannel.setFPersonID("");
                supplyChannel.setHamlCode("");
                supplyChannel.setSafPassword("");
                supplyChannel.setSafOrderNo("");
                supplyChannel.setFUserID("");
                supplyChannel.setMellatPayaerID("");
                supplyChannel.setSabtno("");
                supplyChannel.setParvanehno("");
                supplyChannel.setIsChangeablitybuytype("");
                supplyChannel.setIsOutCityName("");
                supplyChannel.setIsHard("");
                supplyChannel.setLocationCaption("");
                supplyChannel.setOstan("");
                supplyChannel.setShahrestanCode("");
                supplyChannel.setOstanCode("");
                supplyChannel.setBakhshCode("");
                supplyChannel.setDehestanCode("");
                supplyChannel.setPassword("");
                supplyChannel.setUserId("");
                supplyChannel.setRetail("");


                String product = "";
                for (SellContractProduct it : sellContractCustomer.getSellContractProducts()) {
                    product += it.getProduct().getCode() + ",";
                }

                product = product.substring(0, product.length() - 1);
                supplyChannel.setProducts(product);

                Set<CustomerCapacity> customerCapacities = sellContractCustomer.getCustomer().getCustomerCapacities();

                if (customerCapacities.size() > 0) {
                    Optional<CustomerCapacity> cpBenzin = customerCapacities.stream().filter(w -> w.getProductGroup().getId().equals(1151L)).findFirst();
                    cpBenzin.ifPresent(customerCapacity -> supplyChannel.setZarfiatBenzin(customerCapacity.getCapacity().toString()));


                    Optional<CustomerCapacity> cpNaftSefid = customerCapacities.stream().filter(w -> w.getProductGroup().getId().equals(1152L)).findFirst();
                    cpNaftSefid.ifPresent(customerCapacity -> supplyChannel.setZarfiatNaftSefid(customerCapacity.getCapacity().toString()));


                    Optional<CustomerCapacity> cpNaftGaz = customerCapacities.stream().filter(w -> w.getProductGroup().getId().equals(1153L)).findFirst();
                    cpNaftGaz.ifPresent(customerCapacity -> supplyChannel.setZarfiatNaftGaz(customerCapacity.getCapacity().toString()));


                    Optional<CustomerCapacity> cpNafKure = customerCapacities.stream().filter(w -> w.getProductGroup().getId().equals(1154L)).findFirst();
                    cpNafKure.ifPresent(customerCapacity -> supplyChannel.setZarfiatNafKure(customerCapacity.getCapacity().toString()));
                }

                if (sellContractCustomer.getCustomer().getType().isHasGsId() != null && sellContractCustomer.getCustomer().getType().isHasGsId()) {

                    supplyChannel.setIsSamaneSokht("1");
                    supplyChannel.setGsID(sellContractCustomer.getCustomer().getGsId());
                } else {
                    supplyChannel.setIsSamaneSokht("0");
                    supplyChannel.setGsID("0");
                }
                //supplyChannel.setJaygah();
                supplyChannel.setNahiye(sellContractCustomer.getLocation().getCode());

                if (sellContract.getContractType().equals(ContractType.AIRPLANE)) {
                    supplyChannel.setMantaghe(sellContractCustomer.getLocation().getCode());
                } else {
                    supplyChannel.setMantaghe(sellContractCustomer.getLocation().getLocationParent().getCode());
                }
                list.add(supplyChannel);
            }
        }

        NiopdcConnectionString connectionString = new NiopdcConnectionString();

        connectionString.setUserId(username);
        connectionString.setPassword(password);

        for (NiopdcCustomerMajari item : list) {
            RegisterCustomerMajari request = new RegisterCustomerMajari();

            request.setCustomerMajari(item);
            request.setConnectionString(connectionString);


            try {

                Output offlineInquiryResult = ((RegisterCustomerMajariResponse) getWebServiceTemplate()
                    .marshalSendAndReceive(request,
                        webServiceMessage -> ((SoapMessage) webServiceMessage)
                            .setSoapAction(actionNaturalUrl))).getRegisterCustomerMajariResult();

                if (offlineInquiryResult != null && (offlineInquiryResult.getMessage().equals(201) || offlineInquiryResult.getMessage().equals(202)))
                    outputsOK.add(offlineInquiryResult);
                else
                    outputsError.add(offlineInquiryResult);

                if (outputsError.size() > 0)
                    throw new CustomParameterizedException("error.tejaratasanserver-exception");

            } catch (Exception e) {
                e.printStackTrace();

            }

        }
    }


    public HealthDTO checkHealth(){
        HealthDTO healthDTO = new HealthDTO();
        try {
            URL mUrl = new URL(baseUrl);
            healthDTO.setServiceName("NIOPDC_BASE_SERVICE");
            healthDTO.setUrl(NetUtils.getBaseUrl(baseUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setTelnet(NetUtils.sendPing(NetUtils.getBaseUrl(baseUrl)));
            healthDTO.setPing(NetUtils.telnet(mUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setClientName("specify-rate");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }

}
