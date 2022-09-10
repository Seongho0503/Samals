package com.project.samals.controller;

import com.project.samals.dto.SaleDto;
import com.project.samals.service.SaleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale")
@Api(tags={"거래 API"})
public class SaleController {

    private final SaleService saleService;

    @ApiOperation(value = "거래 등록")
    @PostMapping("/create")
    public ResponseEntity<SaleDto> createSale(@RequestBody SaleDto saleDto) {
        return new ResponseEntity<>(saleService.createSale(saleDto), HttpStatus.CREATED);
    }
}