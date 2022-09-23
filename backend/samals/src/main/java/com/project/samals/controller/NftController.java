package com.project.samals.controller;

import com.project.samals.dto.*;
import com.project.samals.dto.request.ReqDto;
import com.project.samals.dto.request.ReqNftDto;
import com.project.samals.dto.response.ResNftDto;
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

    @ApiOperation(value = "NFT 민팅")
    @PostMapping("/mint")
    public ResponseEntity<NftDto> mintNft(@RequestBody ReqNftDto nftDto) {
        return new ResponseEntity<>(nftService.mintNft(nftDto), HttpStatus.CREATED);
    }

    @ApiOperation(value = "NFT 거래 내역 조회")
    @GetMapping("/{tokenId}/sale")
    public ResponseEntity<List<SaleDto>> getNftHistory(@PathVariable int tokenId) {
        return new ResponseEntity<>(nftService.getNftHistory(tokenId), HttpStatus.OK);
    }

    @ApiOperation(value = "NFT 민팅 내역 조회")
    @GetMapping("/{tokenId}/mint")
    public ResponseEntity<NftDto> getMintHistory(@PathVariable int tokenId){
        return new ResponseEntity<>(nftService.getMintHistory(tokenId),HttpStatus.OK);
    }

    @ApiOperation(value = "NFT 상세 조회")
    @GetMapping("/{tokenId}")
    public ResponseEntity<ResNftDto> getNft(@PathVariable int tokenId){
        return new ResponseEntity<>(nftService.getNft(tokenId),HttpStatus.OK);
    }


//
//    @ApiOperation(value = "NFT 연동")
//    @PostMapping("/add")
//    public ResponseEntity<NftDto> addNft(@RequestBody ReqNftDto nftDto) {
//        return new ResponseEntity<>(nftService.addNft(nftDto), HttpStatus.CREATED);
//    }
//


//
//    @ApiOperation(value = "보유 NFT 연동 해제")
//    @DeleteMapping("/{address}/delete/{tokenId}")
//    public ResponseEntity<String> removeNft(@PathVariable String address,@PathVariable int tokenId) {
//        return new ResponseEntity<>(nftService.removeNft(address,tokenId), HttpStatus.OK);
//    }
//


}