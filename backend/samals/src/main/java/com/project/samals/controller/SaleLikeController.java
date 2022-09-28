package com.project.samals.controller;

import com.project.samals.dto.request.ReqSaleLikeDto;
import com.project.samals.service.SaleLikeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale/like")
@Api(tags={"거래 좋아요 API"})
public class SaleLikeController {

    private final SaleLikeService saleLikeService;

    @ApiOperation(value = "거래 좋아요 갯수 조회")
    @GetMapping("/count/{saleSeq}")
    public ResponseEntity<Integer> getSaleLikeCount(@PathVariable("saleSeq") int saleSeq){
        return new ResponseEntity<>(saleLikeService.getSaleLikeCount(saleSeq),HttpStatus.OK);
    }

    @ApiOperation(value = "거래 좋아요 등록")
    @PostMapping("/add")
    public ResponseEntity<String> SaleLike(@RequestBody ReqSaleLikeDto saleLikeDto){
        return new ResponseEntity<>(saleLikeService.addSaleLike(saleLikeDto),HttpStatus.CREATED);
    }

    @ApiOperation(value = "거래 좋아요 삭제")
    @PostMapping("/delete")
    public ResponseEntity<String> SaleNotLike(@RequestBody ReqSaleLikeDto saleLikeDto){
        return new ResponseEntity<>(saleLikeService.deleteSaleLike(saleLikeDto),HttpStatus.OK);
    }


}