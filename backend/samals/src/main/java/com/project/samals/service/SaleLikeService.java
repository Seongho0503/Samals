package com.project.samals.service;

import com.project.samals.domain.Sale;
import com.project.samals.domain.SaleLike;
import com.project.samals.domain.User;
import com.project.samals.dto.request.ReqSaleLikeDto;
import com.project.samals.dto.response.ResMySaleLikeDto;
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
        if(sale==null)
            return -1;
        List<SaleLike> saleLikes = saleLikeRepository.findAllBySale(sale);
        return saleLikes.size();
    }

    public String addSaleLike(ReqSaleLikeDto saleLikeDto) {
        User user = userRepository.findByWalletAddress(saleLikeDto.getWalletAddress());
        Sale sale = saleRepository.findBySaleSeq(saleLikeDto.getSaleSeq());

        if(user==null || sale ==null)
            return "fail - No user Or No Sale";

        SaleLike findLike = saleLikeRepository.findBySaleAndUser(sale,user);
        if(findLike!=null)
            return "fail - Already Push";

        SaleLike saleLike = SaleLike.builder().sale(sale).user(user).build();
        saleLikeRepository.save(saleLike);

        sale.addSaleLike(saleLike);
        user.addSaleLike(saleLike);

        saleRepository.save(sale);
        userRepository.save(user);
        return "Success - Push";
    }

    public String deleteSaleLike(ReqSaleLikeDto saleLikeDto) {
        User user = userRepository.findByWalletAddress(saleLikeDto.getWalletAddress());
        Sale sale = saleRepository.findBySaleSeq(saleLikeDto.getSaleSeq());

        if(user==null || sale ==null)
            return "fail - No user Or No Sale";

        SaleLike findLike = saleLikeRepository.findBySaleAndUser(sale,user);
        if(findLike==null)
            return "fail";

        saleLikeRepository.deleteByUserAndSale(user,sale);
        return "Success";
    }

    public List<ResMySaleLikeDto> getMyLikeList(String address) {
        User user = userRepository.findByWalletAddress(address);
        if(user==null)
            return null;

        List<SaleLike> findLikes = saleLikeRepository.findAllByUser(user);

        List<ResMySaleLikeDto> likeList = new ArrayList<>();
        for(SaleLike saleLike : findLikes){
             likeList.add(new ResMySaleLikeDto(saleLike,getSaleLikeCount(saleLike.getSale().getSaleSeq())));
        }
        return likeList;
    }

}
