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
import com.project.samals.repository.NftRepository;
import com.project.samals.repository.SaleLikeRepository;
import com.project.samals.repository.SaleRepository;
import com.project.samals.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final NftRepository nftRepository;
    private final SaleLikeService saleLikeService;

    @Transactional
    public SaleDto createSale(ReqSaleDto saleDto) {
        Nft nft = nftRepository.findByTokenId(saleDto.getTokenId());
        if(userRepository.findByWalletAddress(saleDto.getSellerAddress())==null)
            return null;
        if(saleRepository.findByNftAndIsSold(nft,'N')!=null)
            return null;
        if(!saleDto.getSellerAddress().equals(nft.getNftOwner()))
            return null;

        Sale sale =saleDto.toEntity(nft);
        saleRepository.save(sale);
        nft.addNftSaleList(sale);
        nftRepository.save(nft);
        return SaleDto.convert(sale);
    }

    public List<ResSaleListDto> getSaleList(String animalSpecies,String address){
        User user = userRepository.findByWalletAddress(address);
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
        Sale sale=saleRepository.findBySaleSeq(saleSeq);
        User user = userRepository.findByWalletAddress(sale.getSellerAddress());
        return ResSaleDetailDto.convert(sale,user);
    }

    public SaleDto completeSale(ReqSaleCompleteDto reqSaleCompleteDto) {
        User user = userRepository.findByWalletAddress(reqSaleCompleteDto.getBuyerAddress());
        if(user==null)
            return null;
        Sale sale = saleRepository.findBySaleSeq(reqSaleCompleteDto.getSaleSeq());
        if(sale.getSellerAddress().equals(reqSaleCompleteDto.getBuyerAddress()))
            return null;

        Sale saved = reqSaleCompleteDto.complete(sale);
        return SaleDto.convert(saleRepository.save(saved));
    }

    public List<SaleDto> getMySaleList(String address){
        User user = userRepository.findByWalletAddress(address);
        if(user==null)
            return null;
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
        User user = userRepository.findByWalletAddress(address);
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
