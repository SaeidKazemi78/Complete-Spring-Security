package ir.donyapardaz.niopdc.base.service.mapper;

import java.util.List;

/**
 * Contract for a generic dto to entity mapper.
 *
 * @param <D> - DTO type parameter.
 * @param <DF> - DTO type parameter.
 * @param <E> - Entity type parameter.
 */

public interface FullEntityMapper<D, DF, E> {

    E toEntity(D dto);

    D toDto(E entity);

    List <E> toEntity(List<D> dtoList);

    List <D> toDto(List<E> entityList);

    E toFullEntity(DF dto);

    DF toFullDto(E entity);

    List <E> toFullEntity(List<DF> dtoList);

    List <DF> toFullDto(List<E> entityList);
}
