package com.project.samals.service;

import com.project.samals.domain.Sale;
import com.project.samals.domain.User;
import com.project.samals.dto.*;
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
public class SaleService {

    private final SaleRepository saleRepository;
    private final UserRepository userRepository;
    //거래 등록
    @Transactional
    public SaleDto createSale(ReqSaleDto saleDto) {
        User user = userRepository.findByWalletAddress(saleDto.getSellerAddress());

        Sale sale =saleDto.toEntity();
        sale.setIsSold('N');
        sale.setCreatedTime(new Date());
        sale.setUpdatedTime(new Date());
        Sale saved=saleRepository.save(sale);

        user.addSaleHistory(saved);
        userRepository.save(user);
        return SaleDto.convert(saved);
    }

    public List<SaleDto> getSaleList(){
        List<SaleDto> saleList = new ArrayList<>();
        for(Sale sale : saleRepository.findAll()){
            saleList.add(SaleDto.convert(sale));
        }
        return saleList;
    }

    public SaleDto getSaleInfo(long saleSeq) {
        Sale saleInfo=saleRepository.findBySaleSeq(saleSeq);
        return SaleDto.convert(saleInfo);
    }

    public String deleteSale(String address, long saleSeq){
        User user = userRepository.findByWalletAddress(address);

        for(int i=0; i<user.getSaleHistory().size();i++){
            if(user.getSaleHistory().get(i).getSaleSeq()==saleSeq){
                saleRepository.deleteBySaleSeq(saleSeq);
            }
        }

        user.deleteSaleHistory(saleSeq);
        userRepository.save(user);

        return "Success";

    }

    public SaleDto completeSale(String buyerAddress,long saleSeq) {
        Sale sale = saleRepository.findBySaleSeq(saleSeq);
        sale.setIsSold('Y');
        sale.setCompletedTime(new Date());
        sale.setUpdatedTime(new Date());
        sale.setBuyerAddress(buyerAddress);
        Sale saved = saleRepository.save(sale);
        return SaleDto.convert(saved);
    }






}
