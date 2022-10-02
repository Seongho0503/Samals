package com.project.samals.controller;

import com.project.samals.domain.Ipfs;
import com.project.samals.dto.IpfsDto;
import com.project.samals.dto.response.ResNftDto;
import com.project.samals.repository.IpfsRepository;
import com.project.samals.service.IpfsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ipfs")
@Api(tags={"Ipfs API"})
public class IpfsController {
    private  final IpfsRepository ipfsRepository;
    private  final IpfsService ipfsService;
    private static final Logger log = LoggerFactory.getLogger(IpfsController.class);

    @ApiOperation(value = "기부 랜덤 번호 뽑기 - donate or shop")
    @GetMapping("/number/{ipfsType}")
    public ResponseEntity<Integer> getRandom(@PathVariable String ipfsType){
        return new ResponseEntity<>(ipfsService.getRandom(ipfsType),HttpStatus.OK);
    }

    @ApiOperation(value="ipfs 데이터 추가")
    @PostMapping("/add")
    public ResponseEntity<Map> addIpfs(@RequestBody Map<String, Object> request){
        return new ResponseEntity<>(ipfsService.addIpfs(request), HttpStatus.OK);
    }

    @ApiOperation(value="모든 ipfs 데이터 조회")
    @GetMapping("/list")
    public ResponseEntity<List<Ipfs>> getIpfsList(){
        List<Ipfs> ipfsList = ipfsRepository.findAllBy();
        log.info("ipfs -> {}", ipfsList.toArray().toString());

        return new ResponseEntity<>(ipfsList, HttpStatus.OK);
    }
    @ApiOperation(value="다음 ipfs 데이터 조회")
    @GetMapping("/peek")
    public ResponseEntity<IpfsDto> peekIpfs(){
        return new ResponseEntity<>(ipfsService.peekIpfs(), HttpStatus.OK);
    }

    @ApiOperation(value="다음 ipfs 데이터 사용처리 및 조회")
    @GetMapping("/poll")
    public ResponseEntity<IpfsDto> pollIpfs(){
        return new ResponseEntity<>(ipfsService.pollIpfs(), HttpStatus.OK);
    }

    @ApiOperation(value="특정 ipfs 데이터 사용처리")
    @PostMapping("/pollOne")
    public ResponseEntity<IpfsDto> pollEachIpfs(@RequestBody Map<String, Object> request){
        if((Integer)request.get("ipfsSeq") == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ipfsService.pollOneIpfs((Integer)request.get("ipfsSeq")), HttpStatus.OK);
    }

}
