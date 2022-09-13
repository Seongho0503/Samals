package com.project.samals.controller;

import com.project.samals.dto.*;
import com.project.samals.service.NftService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/nft")
@Api(tags={"NFT API"})
public class NftController {

    private final NftService nftService;


    @ApiOperation(value = "보유 NFT 연동")
    @PostMapping("/add")
    public ResponseEntity<NftDto> addNft(@RequestBody ReqNftDto nftDto) {
        return new ResponseEntity<>(nftService.addNft(nftDto), HttpStatus.CREATED);
    }

    @ApiOperation(value = "보유 NFT 리스트 조회")
    @GetMapping("/{address}/list")
    public ResponseEntity<List<NftDto>> getNftList(@PathVariable String address){
        return new ResponseEntity<>(nftService.getNftList(address),HttpStatus.OK);
    }

    @ApiOperation(value = "보유 NFT 상세 조회")
    @GetMapping("/detail")
    public ResponseEntity<NftDto> getNftInfo(@RequestBody ReqNftDto nftDto){
        return new ResponseEntity<>(nftService.getNftInfo(nftDto),HttpStatus.OK);
    }

    @ApiOperation(value = "보유 NFT 연동 해제")
    @DeleteMapping("/{address}/delete/{tokenId}")
    public ResponseEntity<String> removeNft(@PathVariable String address,@PathVariable int tokenId) {
        return new ResponseEntity<>(nftService.removeNft(address,tokenId), HttpStatus.OK);
    }

    @ApiOperation(value = "NFT 토큰 거래 내역 조회")
    @GetMapping("/{tokenId}/history")
    public ResponseEntity<List<SaleDto>> getNftHistory(@PathVariable int tokenId) {
        return new ResponseEntity<>(nftService.getNftHistory(tokenId), HttpStatus.OK);
    }

}