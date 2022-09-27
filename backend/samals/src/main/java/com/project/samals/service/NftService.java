package com.project.samals.service;

import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import com.project.samals.domain.User;
import com.project.samals.dto.NftDto;
import com.project.samals.dto.SaleDto;
import com.project.samals.dto.request.ReqNftDto;
import com.project.samals.dto.response.ResNftDto;
import com.project.samals.repository.NftRepository;
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

    public NftDto mintNft(ReqNftDto nftDto) {
        User user = userRepository.findByWalletAddress(nftDto.getWalletAddress());

        Nft saved = nftDto.toEntity();
        saved.setCreatedTime(new Date());
        saved.setUpdatedTime(new Date());
        saved.setNftOwner(nftDto.getWalletAddress());
        saved.setNftMintNumber(0);
        nftRepository.save(saved);

        user.addMintedNft(saved);
        userRepository.save(user);

        return NftDto.convert(saved);
    }

    public NftDto getMintHistory(int tokenId) {
        Nft nftInfo = nftRepository.findByTokenId(tokenId);
        return NftDto.convert(nftInfo);
    }

    public List<SaleDto> getNftHistory(int tokenId) {
        Nft nft = nftRepository.findByTokenId(tokenId);
        List<SaleDto> nftHistory = new ArrayList<>();
        for (Sale sale : nft.getNftSaleList()) {
            nftHistory.add(SaleDto.convert(sale));
        }
        return nftHistory;
    }

    public List<NftDto> getMyMintHistory(String address) {
        User user = userRepository.findByWalletAddress(address);
        List<NftDto> mintHistory = new ArrayList<>();
        for (Nft nft : user.getMintList()) {
            mintHistory.add(NftDto.convert(nft));
        }
        return mintHistory;
    }

    public List<NftDto> getMyNftList(String address) {
        List<Nft> myNft = nftRepository.findAllByNftOwner(address);
        List<NftDto> nftList = new ArrayList<>();
        for (Nft nft : myNft) {
            nftList.add(NftDto.convert(nft));
        }
        return nftList;
    }

    public ResNftDto getNft(int tokenId) {
        Nft nft = nftRepository.findByTokenId(tokenId);
        /*
        TODO 반환할 nft 정보 추가
         */
        return ResNftDto.convert(nft);
    }

    public int getTotalDonate(){
        int price=500;
        List<Nft> donateCounts= nftRepository.findByNftType("donate");
        return donateCounts.size()*price;
    }

    public int getMyTotalDonate(String address){
        int donatePrice=500;
        User user = userRepository.findByWalletAddress(address);
        List<Nft> donateCounts= nftRepository.findByNftTypeAndUser("donate",user);
        return donateCounts.size()*donatePrice;
    }
}

