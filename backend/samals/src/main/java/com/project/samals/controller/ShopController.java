package com.project.samals.controller;

import com.project.samals.dto.response.ResProfileCountDto;
import com.project.samals.dto.response.ResShopDto;
import com.project.samals.service.ShopService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shop")
@Api(tags={"상점 API"})
public class ShopController {
    private final ShopService shopService;

    @ApiOperation(value = "상품 조회 (By 동물종류)")
    @GetMapping("/{animalSpecies}")
    public ResponseEntity<ResShopDto> getShopItem(@PathVariable String animalSpecies){
        return new ResponseEntity<>(shopService.getShopItem(animalSpecies),HttpStatus.OK);
    }

    @ApiOperation(value = "상점 프로필 선호도 조회")
    @GetMapping("/profile-count")
    public ResponseEntity<List<ResProfileCountDto>> getProfileCount(){
        return new ResponseEntity<>(shopService.getProfileCount(),HttpStatus.OK);
    }

}