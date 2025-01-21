package pl.lodz.p.it.food2food.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.food2food.dto.responses.PackageTypeDto;
import pl.lodz.p.it.food2food.mappers.PackageTypeMapper;
import pl.lodz.p.it.food2food.services.PackageTypeService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/package-types")
@Transactional(propagation = Propagation.NEVER)
@RequiredArgsConstructor
public class PackageTypeController {
    private final PackageTypeService packageTypeService;
    private final PackageTypeMapper packageTypeMapper;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<PackageTypeDto>> getAllPackageTypes() {
        return ResponseEntity.ok(packageTypeService.getAllPackageTypes().stream().map(packageTypeMapper::toPackageTypeDto).collect(Collectors.toList()));
    }
}
