package com.project.samals.service;

import com.project.samals.domain.Ipfs;
import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import com.project.samals.domain.User;
import com.project.samals.dto.NftDto;
import com.project.samals.dto.SaleDto;
import com.project.samals.dto.request.ReqNftDto;
import com.project.samals.dto.response.ResMyNftDto;
import com.project.samals.dto.response.ResNftDto;
import com.project.samals.repository.IpfsRepository;
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
    private final IpfsRepository ipfsRepository;

    public NftDto mintNft(ReqNftDto nftDto) {
        User user = userRepository.findByWalletAddress(nftDto.getWalletAddress());
        if(user==null)
            return null;

        if(ipfsRepository.findByIpfsTokenId(nftDto.getTokenId()-1)==null)
            return null;

        Ipfs ipfs = ipfsRepository.findByIpfsSeq(nftDto.getIpfsSeq());
        if(ipfs==null||ipfs.getIpfsIsUsed()=='Y')
            return null;

        if(ipfsRepository.findByIpfsTokenId(nftDto.getTokenId())!=null)
            return null;

        ipfs.getAnimal().setAnimalCurrent(ipfs.getAnimal().getAnimalCurrent()+1);
        ipfs.setIpfsIsUsed('Y');
        ipfs.setIpfsTokenId(nftDto.getTokenId());
        Nft saved = nftDto.toEntity(ipfs);
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
        if(nft ==null)
            return null;
        List<SaleDto> nftHistory = new ArrayList<>();
        for (Sale sale : nft.getNftSaleList()) {
            nftHistory.add(SaleDto.convert(sale));
        }
        return nftHistory;
    }

    public List<NftDto> getMyMintHistory(String address) {
        User user = userRepository.findByWalletAddress(address);
        if(user == null)
            return null;
        List<NftDto> mintHistory = new ArrayList<>();
        for (Nft nft : user.getMintList()) {
            mintHistory.add(NftDto.convert(nft));
        }
        return mintHistory;
    }

    public List<NftDto> getMyDonateHistory(String address) {
        User user = userRepository.findByWalletAddress(address);
        if(user == null)
            return null;
        List<Nft> donates = nftRepository.findByNftTypeAndUser("donate",user);
        List<NftDto> donateHistory = new ArrayList<>();
        for (Nft nft : donates) {
            donateHistory.add(NftDto.convert(nft));
        }
        return donateHistory;
    }

    public List<ResMyNftDto> getMyNftList(String address) {
        if(userRepository.findByWalletAddress(address)==null)
            return null;
        List<Nft> myNft = nftRepository.findAllByNftOwner(address);
        List<ResMyNftDto> nftList = new ArrayList<>();
        for (Nft nft : myNft) {
            nftList.add(ResMyNftDto.convert(nft));
        }
        return nftList;
    }

    public ResNftDto getNft(int tokenId) {
        Nft nft = nftRepository.findByTokenId(tokenId);
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
        if(user ==null)
            return -1;
        List<Nft> donateCounts= nftRepository.findByNftTypeAndUser("donate",user);
        return donateCounts.size()*donatePrice;
    }
}

