package pl.lodz.p.it.food2food.mappers;

import org.mapstruct.Mapper;
import pl.lodz.p.it.food2food.dto.PackageTypeDto;
import pl.lodz.p.it.food2food.model.PackageType;

@Mapper(componentModel = "spring")
public interface PackageTypeMapper {

     PackageTypeDto toPackageTypeDto(PackageType packageType);
}
