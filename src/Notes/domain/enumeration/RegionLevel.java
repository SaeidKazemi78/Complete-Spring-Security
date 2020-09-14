package ir.donyapardaz.niopdc.base.domain.enumeration;

public enum RegionLevel {
    OSTAN,
    SHAHRESTAN,
    BAKHSH,
    Dehestan,
    Abadi;


    public static RegionLevel get(int i) {
        switch (i) {
            case 2: return OSTAN;
            case 4: return SHAHRESTAN;
            case 6: return BAKHSH;
            case 10: return Dehestan;
            case 16: return Abadi;
        }
        return null;
    }
}
