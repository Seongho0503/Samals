package com.project.samals.service;

import com.project.samals.domain.Sale;
import com.project.samals.domain.SaleLike;
import com.project.samals.domain.User;
import com.project.samals.dto.request.ReqSaleLikeDto;
import com.project.samals.dto.response.ResMySaleLikeDto;
import com.project.samals.exception.LikeAlreadyPushException;
import com.project.samals.exception.LikeNotPushException;
import com.project.samals.exception.SaleNotFoundException;
import com.project.samals.exception.UserNotFoundException;
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
        Sale sale = saleRepository.findBySaleSeq(saleSeq)
                .orElseThrow(() -> new SaleNotFoundException("거래를 찾을 수 없습니다"));
        List<SaleLike> saleLikes = saleLikeRepository.findAllBySale(sale);
        return saleLikes.size();
    }

    public String addSaleLike(ReqSaleLikeDto saleLikeDto) {
        User user = userRepository.findByWalletAddress(saleLikeDto.getWalletAddress())
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        Sale sale = saleRepository.findBySaleSeq(saleLikeDto.getSaleSeq())
                .orElseThrow(() -> new SaleNotFoundException("거래를 찾을 수 없습니다"));

        SaleLike findLike = saleLikeRepository.findBySaleAndUser(sale,user);
        if(findLike!=null)
            throw new LikeAlreadyPushException("이미 좋아요를 눌렀습니다");

        SaleLike saleLike = SaleLike.builder().sale(sale).user(user).build();
        saleLikeRepository.save(saleLike);

        sale.addSaleLike(saleLike);
        user.addSaleLike(saleLike);

        saleRepository.save(sale);
        userRepository.save(user);
        return "Success";
    }

    public String deleteSaleLike(ReqSaleLikeDto saleLikeDto) {
        User user = userRepository.findByWalletAddress(saleLikeDto.getWalletAddress())
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        Sale sale = saleRepository.findBySaleSeq(saleLikeDto.getSaleSeq())
                .orElseThrow(() -> new SaleNotFoundException("거래를 찾을 수 없습니다"));

        SaleLike findLike = saleLikeRepository.findBySaleAndUser(sale,user);
        if(findLike==null)
            throw new LikeNotPushException("좋아요를 누른 거래를 찾을 수 없습니다.");

        saleLikeRepository.deleteByUserAndSale(user,sale);
        return "Success";
    }

    public List<ResMySaleLikeDto> getMyLikeList(String address) {
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));

        List<SaleLike> findLikes = saleLikeRepository.findAllByUser(user);
        if(findLikes.size()==0){
            throw new LikeNotPushException("좋아요를 누른 거래를 찾을 수 없습니다.");
        }

        List<ResMySaleLikeDto> likeList = new ArrayList<>();
        for(SaleLike saleLike : findLikes){
             likeList.add(new ResMySaleLikeDto(saleLike,getSaleLikeCount(saleLike.getSale().getSaleSeq())));
        }
        return likeList;
    }

}
