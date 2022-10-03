package com.project.samals.dto.request;

import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqSaleCompleteDto {
    private long saleSeq;
    private String buyerAddress;

    public Sale complete(Sale sale){
        sale.setIsSold('Y');
        sale.setCompletedTime(new Date());
        sale.setBuyerAddress(buyerAddress);
        sale.getNft().setNftOwner(buyerAddress);
        sale.getNft().setUpdatedTime(new Date());
        return sale;
    }
}
