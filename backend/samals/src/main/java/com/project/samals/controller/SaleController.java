package com.project.samals.controller;

import com.project.samals.dto.*;
import com.project.samals.dto.request.ReqSaleCompleteDto;
import com.project.samals.dto.request.ReqSaleDto;
import com.project.samals.dto.response.ResSaleDetailDto;
import com.project.samals.dto.response.ResSaleListDto;
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
    public ResponseEntity<List<ResSaleListDto>> getSaleList(String address){
        return new ResponseEntity<>(saleService.getSaleList(null,address),HttpStatus.OK);
    }

    @ApiOperation(value = "오름차순 거래 조회")
    @GetMapping("/list/asc")
    public ResponseEntity<List<ResSaleListDto>> getSaleListByAsc(String address){
        return new ResponseEntity<>(saleService.getSaleListByOrder(address,"asc"),HttpStatus.OK);
    }

    @ApiOperation(value = "내림차순 거래 조회")
    @GetMapping("/list/desc")
    public ResponseEntity<List<ResSaleListDto>> getSaleListByDesc(String address){
        return new ResponseEntity<>(saleService.getSaleListByOrder(address,"desc"),HttpStatus.OK);
    }

    @ApiOperation(value = "동물 카테고리 거래 조회")
    @GetMapping("/list/{animalSpecies}")
    public ResponseEntity<List<ResSaleListDto>> getSaleListByAnimalSpecies(@PathVariable String animalSpecies,String address){
        return new ResponseEntity<>(saleService.getSaleList(animalSpecies,address),HttpStatus.OK);
    }

    @ApiOperation(value = "거래 상세 조회")
    @GetMapping("/{saleSeq}")
    public ResponseEntity<ResSaleDetailDto> getSale(@PathVariable long saleSeq){
        return new ResponseEntity<>(saleService.getSale(saleSeq),HttpStatus.OK);
    }

    @ApiOperation(value = "거래 완료")
    @PutMapping("/complete")
    public ResponseEntity<SaleDto> completeSale(@RequestBody ReqSaleCompleteDto reqSaleCompleteDto) {
        return new ResponseEntity<>(saleService.completeSale(reqSaleCompleteDto), HttpStatus.OK);
    }

    @ApiOperation(value = "거래 검색")
    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<ResSaleListDto>> search(@PathVariable String keyword,String address) {
        return new ResponseEntity<>(saleService.search(keyword,address),HttpStatus.OK);
    }


}