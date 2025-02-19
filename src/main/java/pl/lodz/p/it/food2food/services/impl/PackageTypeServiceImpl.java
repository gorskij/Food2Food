package pl.lodz.p.it.food2food.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.food2food.model.PackageType;
import pl.lodz.p.it.food2food.repositories.PackageTypeRepository;
import pl.lodz.p.it.food2food.services.PackageTypeService;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class PackageTypeServiceImpl implements PackageTypeService {
    private final PackageTypeRepository packageTypeRepository;

    @Override
    @PreAuthorize("hasRole('USER')")
    public List<PackageType> getAllPackageTypes() {
        return packageTypeRepository.findAll();
    }
}
