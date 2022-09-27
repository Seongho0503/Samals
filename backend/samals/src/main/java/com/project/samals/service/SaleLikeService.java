package com.project.samals.service;

import com.project.samals.domain.Sale;
import com.project.samals.domain.SaleLike;
import com.project.samals.domain.User;
import com.project.samals.dto.request.ReqSaleLikeDto;
import com.project.samals.dto.response.ResSaleLikeDto;
import com.project.samals.repository.SaleLikeRepository;
import com.project.samals.repository.SaleRepository;
import com.project.samals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleLikeService {

    private final SaleRepository saleRepository;
    private final SaleLikeRepository saleLikeRepository;
    private final UserRepository userRepository;

    public int getSaleLikeCount(long saleSeq) {
        Sale sale = saleRepository.findBySaleSeq(saleSeq);
        List<SaleLike> saleLikes = saleLikeRepository.findAllBySale(sale);
        return saleLikes.size();
    }

    public String addSaleLike(ReqSaleLikeDto saleLikeDto) {
        User user = userRepository.findByWalletAddress(saleLikeDto.getWalletAddress());
        Sale sale = saleRepository.findBySaleSeq(saleLikeDto.getSaleSeq());

        SaleLike findLike = saleLikeRepository.findBySaleAndUser(sale,user);
        if(findLike!=null)
            return "fail";

        SaleLike saleLike = SaleLike.builder().sale(sale).user(user).build();
        saleLikeRepository.save(saleLike);

        sale.addSaleLike(saleLike);
        user.addSaleLike(saleLike);

        saleRepository.save(sale);
        userRepository.save(user);
        return "Success";
    }

    public String deleteSaleLike(ReqSaleLikeDto saleLikeDto) {
        User user = userRepository.findByWalletAddress(saleLikeDto.getWalletAddress());
        Sale sale = saleRepository.findBySaleSeq(saleLikeDto.getSaleSeq());

        SaleLike findLike = saleLikeRepository.findBySaleAndUser(sale,user);
        if(findLike==null)
            return "fail";

        saleLikeRepository.deleteByUserAndSale(user,sale);
        return "Success";
    }

    public List<ResSaleLikeDto> getMyLikeList(String address) {
        User user = userRepository.findByWalletAddress(address);
        List<SaleLike> findLikes = saleLikeRepository.findAllByUser(user);

        List<ResSaleLikeDto> likeList = new ArrayList<>();
        for(SaleLike saleLike : findLikes){
            likeList.add(ResSaleLikeDto.builder()
                    .saleSeq(saleLike.getSale().getSaleSeq())
                    .salePrice(saleLike.getSale().getSalePrice())
                    .likeCount(getSaleLikeCount(saleLike.getSale().getSaleSeq()))
                    .isSold(saleLike.getSale().getIsSold())
                    .imgUri(saleLike.getSale().getNft().getIpfs().getIpfsUri())
                    .animalSpecies(saleLike.getSale().getNft().getIpfs().getAnimal().getAnimalSpecies())
                    .nftMintNumber(saleLike.getSale().getNft().getNftMintNumber())
                    .build());
        }
        return likeList;
    }

}
