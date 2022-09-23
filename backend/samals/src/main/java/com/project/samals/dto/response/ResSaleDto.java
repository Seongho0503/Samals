package com.project.samals.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Sale;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResSaleDto {
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
                .saleContractAddress(saleContractAddress)
                .sellerAddress(sellerAddress)
                .buyerAddress(buyerAddress)
                .salePrice(salePrice)
                .saleDescription(saleDescription)
                .isSold(isSold)
                .build();
    }

    public static ResSaleDto convert(Sale sale) {
        if(sale == null) return null;

        return ResSaleDto.builder()
                .saleSeq(sale.getSaleSeq())
                .tokenId(sale.getNft().getTokenId())
                .saleContractAddress(sale.getSaleContractAddress())
                .sellerAddress(sale.getSellerAddress())
                .buyerAddress(sale.getBuyerAddress())
                .salePrice(sale.getSalePrice())
                .saleDescription(sale.getSaleDescription())
                .isSold(sale.getIsSold())
                .createdTime(sale.getCreatedTime())
                .updatedTime(sale.getUpdatedTime())
                .completedTime(sale.getCompletedTime())
                .build();
    }

}
