package ir.donyapardaz.niopdc.base.domain.enumeration;

import java.util.HashSet;
import java.util.Set;

/**
 * The ContractType enumeration.
 */
public enum ContractType {
    SUPPLY_CHANNEL, EXPORT, CONSUMER, AIRPLANE, LIQUID_GAS, BRAND, MILITARY;

    public static Set<ContractType> getContractTypes(OrderType orderType) {
        Set<ContractType> contractTypes = new HashSet<>();
        switch (orderType) {
            case ORDER: {
                contractTypes.add(ContractType.SUPPLY_CHANNEL);
                contractTypes.add(ContractType.LIQUID_GAS);
                contractTypes.add(ContractType.BRAND);
                contractTypes.add(ContractType.CONSUMER);
                contractTypes.add(ContractType.EXPORT);
            }
            break;

            case AIRPLANE:
            case REFUEL_CENTER:
                contractTypes.add(ContractType.AIRPLANE);
                contractTypes.add(ContractType.MILITARY);
                break;
//            case "export":
//                contractTypes.add(ContractType.EXPORT);
//                break;
            case BOUNDARY_TRANSIT:
                break;
            case BOUNDARY_TRANSHIP:
                break;
        }
        return contractTypes;
    }

    public Set<CustomerGroup> getCustomerGroups() {
        Set<CustomerGroup> customerGroups = new HashSet<>();
        switch (this) {
            case SUPPLY_CHANNEL:
                customerGroups.add(CustomerGroup.SELLER);
                customerGroups.add(CustomerGroup.STATION);
                break;
            case CONSUMER:
                customerGroups.add(CustomerGroup.MAJOR_CONSUMER);
                break;
            case AIRPLANE:
                customerGroups.add(CustomerGroup.AIRPLANE);
                break;
            case LIQUID_GAS:
                customerGroups.add(CustomerGroup.LIQUID_GAS);
                break;
            case BRAND:
                customerGroups.add(CustomerGroup.STATION);
                break;
            case MILITARY:
                customerGroups.add(CustomerGroup.MAJOR_CONSUMER);
                break;
            default:
                customerGroups = null;
        }
        return customerGroups;
    }


    public static Set<ContractType> getContractTypeByCustomerGroups(CustomerGroup customerGroup) {
        Set<ContractType> contractTypes = new HashSet<>();
        switch (customerGroup){
            case SELLER:
            case STATION:
                contractTypes.add(ContractType.SUPPLY_CHANNEL);
                contractTypes.add(ContractType.BRAND);
                break;
            case MAJOR_CONSUMER:
                contractTypes.add(ContractType.CONSUMER);
                contractTypes.add(ContractType.MILITARY);
                break;
            case AIRPLANE:
                contractTypes.add(ContractType.AIRPLANE);
                break;
            case LIQUID_GAS:
                contractTypes.add(ContractType.LIQUID_GAS);
                break;
        }
        return contractTypes;
    }

}
