package com.project.samals.service;

import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import com.project.samals.domain.SaleLike;
import com.project.samals.domain.User;
import com.project.samals.dto.SaleDto;
import com.project.samals.dto.request.ReqSaleCompleteDto;
import com.project.samals.dto.request.ReqSaleDto;
import com.project.samals.dto.response.ResSaleDetailDto;
import com.project.samals.dto.response.ResSaleListDto;
import com.project.samals.exception.*;
import com.project.samals.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {
    private final SaleRepository saleRepository;
    private final SaleLikeRepository saleLikeRepository;
    private final ProfileImgRepository profileImgRepository;
    private final UserRepository userRepository;
    private final NftRepository nftRepository;
    private final SaleLikeService saleLikeService;

    @Transactional
    public SaleDto createSale(ReqSaleDto saleDto) {
        Nft nft = nftRepository.findByTokenId(saleDto.getTokenId())
                .orElseThrow(() -> new NFTNotFoundException(String.format("토큰 %d, NFT 정보를 찾을 수 없습니다", saleDto.getTokenId())));

        userRepository.findByWalletAddress(saleDto.getSellerAddress())
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));

        if(profileImgRepository.findByIpfs(nft.getIpfs())!=null)
            throw new ProfileImgAlreadyUseException("프로필 이미지로 사용중입니다.");

        if(saleRepository.findByNftAndIsSold(nft,'N')!=null)
            throw new SaleDuplicateException("이미 거래 중인 NFT 입니다");

        System.out.println(saleDto.getSellerAddress()+"..."+nft.getNftOwner());
//        if(!saleDto.getSellerAddress().equals(nft.getNftOwner()))
//            throw new SellerValidException("판매 주소와 NFT 소유 주소가 일치하지 않습니다");

        Sale sale =saleDto.toEntity(nft);
        saleRepository.save(sale);
        nft.addNftSaleList(sale);
        nftRepository.save(nft);
        return SaleDto.convert(sale);
    }

    public List<ResSaleListDto> getSaleList(String animalSpecies,String address){
        User user;
        if(address!=null) {
            user = userRepository.findByWalletAddress(address)
                    .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        }else{
            user=null;
        }
        List<ResSaleListDto> saleList = new ArrayList<>();

        for(Sale sale : saleRepository.findAllByIsSold('N')){
            ResSaleListDto saleDto = ResSaleListDto.convert(sale);
            SaleLike saleLike = saleLikeRepository.findBySaleAndUser(sale,user);
            if(saleLike!= null)
                saleDto.setLikePush('Y');
            else
                saleDto.setLikePush('N');
            saleDto.setLikeCount(saleLikeService.getSaleLikeCount(sale.getSaleSeq()));
            if(animalSpecies!=null&&saleDto.getAnimalSpecies().equals(animalSpecies))
                saleList.add(saleDto);
            else if(animalSpecies==null)
                saleList.add(saleDto);
        }
        return saleList;
    }

    public List<ResSaleListDto> getSaleListByOrder(String address,String order) {
        List<ResSaleListDto> lists = getSaleList(null, address);
        Comparator<ResSaleListDto> compare=Comparator.comparing(ResSaleListDto::getSalePrice, Comparator.naturalOrder());
        if (order.equals("desc")){
            compare = Comparator.comparing(ResSaleListDto::getSalePrice, Comparator.reverseOrder());
        }
        List<ResSaleListDto> resList = lists.stream()
                .sorted(compare)
                .collect(Collectors.toList());
        return resList;
    }


    public ResSaleDetailDto getSale(long saleSeq) {
        Sale sale=saleRepository.findBySaleSeq(saleSeq)
                .orElseThrow(() -> new SaleNotFoundException("거래를 찾을 수 없습니다"));
        User user = userRepository.findByWalletAddress(sale.getSellerAddress())
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        return ResSaleDetailDto.convert(sale,user);
    }

    public SaleDto completeSale(ReqSaleCompleteDto reqSaleCompleteDto) {
        User user = userRepository.findByWalletAddress(reqSaleCompleteDto.getBuyerAddress())
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));

        Sale sale = saleRepository.findBySaleSeq(reqSaleCompleteDto.getSaleSeq())
                .orElseThrow(() -> new SaleNotFoundException("거래를 찾을 수 없습니다"));

        if(sale.getSellerAddress().equals(reqSaleCompleteDto.getBuyerAddress()))
            throw new BuyerValidException("판매자는 본인 NFT를 구매할 수 없습니다.");

        Sale saved = reqSaleCompleteDto.complete(sale);
        return SaleDto.convert(saleRepository.save(saved));
    }

    public List<SaleDto> getMySaleList(String address){
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));

        List<SaleDto> saleList = new ArrayList<>();
        for(Sale sale : saleRepository.findAllBySellerAddress(address)){
            saleList.add(SaleDto.convert(sale));
        }
        for(Sale sale : saleRepository.findAllByBuyerAddress(address)){
            saleList.add(SaleDto.convert(sale));
        }
        Comparator<SaleDto> compare=Comparator.comparing(SaleDto::getSaleCreatedTime, Comparator.reverseOrder());
        List<SaleDto> resList = saleList.stream()
                .sorted(compare)
                .collect(Collectors.toList());
        return resList;
    }

    public List<ResSaleListDto> search(String search, String address){
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        List<ResSaleListDto> saleList = new ArrayList<>();
        for(Sale sale : saleRepository.findAllByIsSoldAndSaleTitleContainingIgnoreCase('N',search)){
            ResSaleListDto saleListDto = ResSaleListDto.convert(sale);
            SaleLike saleLike = saleLikeRepository.findBySaleAndUser(sale,user);
            if(saleLike!= null)
                saleListDto.setLikePush('Y');
            else
                saleListDto.setLikePush('N');
            saleListDto.setLikeCount(saleLikeService.getSaleLikeCount(sale.getSaleSeq()));
            saleList.add(saleListDto);
        }
        return saleList;
    }

}
