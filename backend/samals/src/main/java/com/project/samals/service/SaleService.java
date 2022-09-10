package com.project.samals.service;

import com.project.samals.domain.Sale;
import com.project.samals.dto.SaleDto;
import com.project.samals.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    //거래 등록
    @Transactional
    public SaleDto createSale(SaleDto saleDto) {
        Sale sale =saleDto.toEntity();
        sale.setCreatedTime(new Date());
        sale.setUpdatedTime(new Date());

        Sale saved=saleRepository.save(sale);
        return SaleDto.convert(saved);
    }

}
