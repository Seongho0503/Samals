package com.project.samals.service;

import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import com.project.samals.domain.User;
import com.project.samals.dto.NftDto;
import com.project.samals.dto.ReqNftDto;
import com.project.samals.dto.SaleDto;
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
    private final SaleRepository saleRepository;
    //거래 등록
    public NftDto addNft(ReqNftDto nftDto) {
        User user = userRepository.findByWalletAddress(nftDto.getWalletAddress());
        Nft saved = nftDto.toEntity();
        saved.setCreatedTime(new Date());
        nftRepository.save(saved);
        user.addNft(saved);
        userRepository.save(user);

        return NftDto.convert(saved);
    }

    public NftDto getNftInfo(ReqNftDto nftDto) {
        Nft nftInfo=nftRepository.findByTokenId(nftDto.getTokenId());
        return NftDto.convert(nftInfo);
    }


    public List<NftDto> getNftList(String address){
        User user = userRepository.findByWalletAddress(address);
        List<NftDto> nftList = new ArrayList<>();
        for(Nft nft : user.getNftList()){
            nftList.add(NftDto.convert(nft));
        }
        return nftList;
    }
    public String removeNft(String address, int tokenId){
        User user = userRepository.findByWalletAddress(address);
        for(int i=0; i<user.getNftList().size();i++){
            if(user.getNftList().get(i).getTokenId()==tokenId){
                nftRepository.deleteByNftSeq(user.getNftList().get(i).getNftSeq());
            }
        }

        user.removeNft(tokenId);
        userRepository.save(user);

        return "Success";

    }

    public List<SaleDto> getNftHistory(int tokenId){
        List<SaleDto> nftHistory = new ArrayList<>();
        for(Sale sale : saleRepository.findAllByTokenId(tokenId)){
            nftHistory.add(SaleDto.convert(sale));
        }
        return nftHistory;
    }

}
