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
import com.project.samals.exception.*;
import com.project.samals.repository.IpfsRepository;
import com.project.samals.repository.NftRepository;
import com.project.samals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NftService {

    private final NftRepository nftRepository;
    private final UserRepository userRepository;
    private final IpfsRepository ipfsRepository;

    public NftDto mintNft(ReqNftDto nftDto) {
        User user = userRepository.findByWalletAddress(nftDto.getWalletAddress())
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));

        ipfsRepository.findByIpfsTokenId(nftDto.getTokenId()-1)
                .orElseThrow(() -> new IpfsNotFoundException(
                        String.format("%d Token의 민팅 차례가 아닙니다. Token 순서를 확인하세요.", nftDto.getTokenId())));

        Ipfs ipfs = ipfsRepository.findByIpfsSeq(nftDto.getIpfsSeq())
                .orElseThrow(() -> new IpfsNotFoundException("해당 IPFS 데이터를 찾을 수 없습니다."));

        if(ipfs.getIpfsIsUsed()=='Y')
            throw new IpfsAlreadyUseException("이미 사용중인 IPFS 데이터입니다");

        if(ipfsRepository.findByIpfsTokenId(nftDto.getTokenId())!=null)
            throw new IpfsAlreadyUseException(String.format("Token %d 은 이미 사용중입니다.", nftDto.getTokenId()));

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
        Nft mintHistory = nftRepository.findByTokenId(tokenId)
                .orElseThrow(() -> new NFTNotFoundException(String.format("토큰 %d, NFT 정보를 찾을 수 없습니다", tokenId)));
        return NftDto.convert(mintHistory);
    }

    public List<SaleDto> getNftHistory(int tokenId) {
        Nft nft = nftRepository.findByTokenId(tokenId)
                .orElseThrow(() -> new NFTNotFoundException(String.format("토큰 %d, NFT 정보를 찾을 수 없습니다", tokenId)));
        List<SaleDto> nftHistory = new ArrayList<>();
        for (Sale sale : nft.getNftSaleList()) {
            nftHistory.add(SaleDto.convert(sale));
        }
        return nftHistory;
    }

    public List<NftDto> getMyMintHistory(String address) {
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        List<NftDto> mintHistory = new ArrayList<>();
        for (Nft nft : user.getMintList()) {
            mintHistory.add(NftDto.convert(nft));
        }
        return mintHistory;
    }

    public List<NftDto> getMyDonateHistory(String address) {
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        List<Nft> donates = nftRepository.findByNftTypeAndUser("donate",user);

        if(donates.size()==0)
            throw new DonateNotFoundException("기부 기록을 찾을 수 없습니다.");

        List<NftDto> donateHistory = new ArrayList<>();
        for (Nft nft : donates) {
            donateHistory.add(NftDto.convert(nft));
        }
        return donateHistory;
    }

    public List<ResMyNftDto> getMyNftList(String address) {
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        List<Nft> myNft = nftRepository.findAllByNftOwner(address);

        if(myNft.size()==0)
            throw new NFTNotOwnException("보유한 NFT가 없습니다");

        List<ResMyNftDto> nftList = new ArrayList<>();
        for (Nft nft : myNft) {
            nftList.add(ResMyNftDto.convert(nft));
        }
        return nftList;
    }

    public ResNftDto getNft(int tokenId) {
        Nft nft = nftRepository.findByTokenId(tokenId)
                .orElseThrow(() -> new NFTNotFoundException(String.format("토큰 %d, NFT 정보를 찾을 수 없습니다", tokenId)));
        return ResNftDto.convert(nft);
    }

    public int getTotalDonate(){
        int price=500;
        List<Nft> donateCounts= nftRepository.findByNftType("donate");
        return donateCounts.size()*price;
    }

    public int getMyTotalDonate(String address){
        int donatePrice=500;
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        List<Nft> donateCounts= nftRepository.findByNftTypeAndUser("donate",user);
        return donateCounts.size()*donatePrice;
    }
}

