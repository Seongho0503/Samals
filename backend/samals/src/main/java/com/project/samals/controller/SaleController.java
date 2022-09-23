package com.project.samals.controller;

import com.project.samals.dto.*;
import com.project.samals.dto.request.ReqSaleDto;
import com.project.samals.service.SaleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale")
@Api(tags={"거래 API"})
public class SaleController {

    private final SaleService saleService;

    @ApiOperation(value = "거래 등록")
    @PostMapping("/create")
    public ResponseEntity<SaleDto> createSale(@RequestBody ReqSaleDto saleDto) {
        return new ResponseEntity<>(saleService.createSale(saleDto), HttpStatus.CREATED);
    }

    @ApiOperation(value = "전체 거래 조회")
    @GetMapping("/list")
    public ResponseEntity<List<SaleDto>> getSaleList(){
        return new ResponseEntity<>(saleService.getSaleList(),HttpStatus.OK);
    }

    @ApiOperation(value = "거래 상세 조회")
    @GetMapping("/{saleSeq}")
    public ResponseEntity<SaleDto> getSale(@PathVariable long saleSeq){
        return new ResponseEntity<>(saleService.getSale(saleSeq),HttpStatus.OK);
    }

    @ApiOperation(value = "거래 완료")
    @PutMapping("/{saleSeq}/complete/{address}")
    public ResponseEntity<SaleDto> completeSale(@PathVariable long saleSeq,@PathVariable String address) {
        return new ResponseEntity<>(saleService.completeSale(address,saleSeq), HttpStatus.OK);
    }


}