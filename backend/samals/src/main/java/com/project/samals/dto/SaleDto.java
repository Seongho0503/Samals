package com.project.samals.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Sale;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleDto {
    private Long saleSeq;

    private int tokenId;

    private String saleContractAddress;

    private String sellerAddress;

    private String buyerAddress;

    private int salePrice;

    private String saleDescription;

    private char isSold;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date createdTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date updatedTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date completedTime;

    public Sale toEntity(){
        return Sale.builder()
                .saleSeq(saleSeq)
                .tokenId(tokenId)
                .saleContractAddress(saleContractAddress)
                .sellerAddress(sellerAddress)
                .buyerAddress(buyerAddress)
                .salePrice(salePrice)
                .saleDescription(saleDescription)
                .isSold(isSold)
                .build();
    }

    public static SaleDto convert(Sale sale) {
        if(sale == null) return null;

        return SaleDto.builder()
                .saleSeq(sale.getSaleSeq())
                .tokenId(sale.getTokenId())
                .saleContractAddress(sale.getSaleContractAddress())
                .sellerAddress(sale.getSellerAddress())
                .buyerAddress(sale.getBuyerAddress())
                .salePrice(sale.getSalePrice())
                .saleDescription(sale.getSaleDescription())
                .isSold(sale.getIsSold())
                .build();
    }

}
