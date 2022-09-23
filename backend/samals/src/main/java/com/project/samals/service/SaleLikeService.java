package com.project.samals.service;

import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import com.project.samals.domain.SaleLike;
import com.project.samals.domain.User;
import com.project.samals.dto.SaleDto;
import com.project.samals.dto.request.ReqSaleDto;
import com.project.samals.dto.request.ReqSaleLikeDto;
import com.project.samals.repository.NftRepository;
import com.project.samals.repository.SaleLikeRepository;
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
public class SaleLikeService {

    private final SaleRepository saleRepository;
    private final SaleLikeRepository saleLikeRepository;
    private final UserRepository userRepository;
    private final NftRepository nftRepository;

    // 좋아요 갯수 조회
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

}
