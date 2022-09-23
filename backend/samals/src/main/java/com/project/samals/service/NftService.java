package com.project.samals.service;

import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import com.project.samals.domain.User;
import com.project.samals.dto.NftDto;
import com.project.samals.dto.request.ReqDto;
import com.project.samals.dto.request.ReqNftDto;
import com.project.samals.dto.SaleDto;
import com.project.samals.dto.response.ResNftDto;
import com.project.samals.repository.NftRepository;
import com.project.samals.repository.SaleRepository;
import com.project.samals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NftService {

    private final NftRepository nftRepository;
    private final UserRepository userRepository;

    //민팅 db 등록
    public NftDto mintNft(ReqNftDto nftDto) {
        User user = userRepository.findByWalletAddress(nftDto.getWalletAddress());

        Nft saved = nftDto.toEntity();
        saved.setCreatedTime(new Date());
        saved.setNftMintNumber(0);
        nftRepository.save(saved);

        user.addMintedNft(saved);
        userRepository.save(user);

        return NftDto.convert(saved);
    }

    public NftDto getMintHistory(int tokenId) {
        Nft nftInfo=nftRepository.findByTokenId(tokenId);
        return NftDto.convert(nftInfo);
    }

    public List<SaleDto> getNftHistory(int tokenId) {
        Nft nft=nftRepository.findByTokenId(tokenId);
        List<SaleDto> nftHistory = new ArrayList<>();
        for(Sale sale : nft.getNftSaleList()){
            nftHistory.add(SaleDto.convert(sale));
        }
        return nftHistory;
    }

    public List<NftDto> getMyMintHistory(String address) {
        User user = userRepository.findByWalletAddress(address);
        List<NftDto> mintHistory = new ArrayList<>();

        for(Nft nft : user.getMintList()){
            mintHistory.add(NftDto.convert(nft));
        }

        return mintHistory;
    }

    public List<NftDto> getNftList(String address){
        User user = userRepository.findByWalletAddress(address);
        List<NftDto> nftList = new ArrayList<>();
        for(Nft nft : user.getMintList()){
            nftList.add(NftDto.convert(nft));
        }
        return nftList;
    }


    public ResNftDto getNft(int tokenId) {
        Nft nft=nftRepository.findByTokenId(tokenId);
        /*
        TODO 반환할 nft 정보 추가
         */
        return ResNftDto.convert(nft);
    }







    //거래 등록
    public NftDto addNft(ReqNftDto nftDto) {
        User user = userRepository.findByWalletAddress(nftDto.getWalletAddress());
        Nft saved = nftDto.toEntity();
        saved.setCreatedTime(new Date());
        nftRepository.save(saved);
        user.addMintedNft(saved);
        userRepository.save(user);

        return NftDto.convert(saved);
    }



    public NftDto getNftInfo(ReqNftDto nftDto) {
        Nft nftInfo=nftRepository.findByTokenId(nftDto.getTokenId());
        return NftDto.convert(nftInfo);
    }



    public String removeNft(String address, int tokenId){
        User user = userRepository.findByWalletAddress(address);
        for(int i=0; i<user.getMintList().size();i++){
            if(user.getMintList().get(i).getTokenId()==tokenId){
                nftRepository.deleteByNftSeq(user.getMintList().get(i).getNftSeq());
            }
        }

    //    user.removeNft(tokenId);
        userRepository.save(user);

        return "Success";

    }

//    public List<SaleDto> getNftHistory(int tokenId){
//        List<SaleDto> nftHistory = new ArrayList<>();
//        for(Sale sale : saleRepository.findAllByTokenId(tokenId)){
//            nftHistory.add(SaleDto.convert(sale));
//        }
//        return nftHistory;
//    }

    //내 민팅 내역 조회
//    public List<SaleDto> getMyMintList(String address){
//        List<SaleDto> saleList = new ArrayList<>();
//
//        for(Sale sale : saleRepository.findAllBySellerAddress(address)){
//            saleList.add(SaleDto.convert(sale));
//        }
//        for(Sale sale : saleRepository.findAllByBuyerAddress(address)){
//            saleList.add(SaleDto.convert(sale));
//        }
//        /*
//        Todo
//        1. pfp 번호 추가하기
//        2. 최근 10개 목록만 불러오기
//         */
//
//        return saleList;
//    }

}
