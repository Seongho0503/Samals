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
public class ResSaleHistoryDto {
    private Long saleSeq;
    private int tokenId;
    private String saleContractAddress;
    private String sellerAddress;
    private String buyerAddress;
    private int salePrice;
    private String saleTitle;
    private String saleDescription;
    private char isSold;
    private String sellerNickname;
    private String buyerNickname;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date saleCreatedTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date saleCompletedTime;

    public static ResSaleHistoryDto convert(Sale sale) {
        if(sale == null) return null;

        return ResSaleHistoryDto.builder()
                .saleSeq(sale.getSaleSeq())
                .tokenId(sale.getNft().getTokenId())
                .saleContractAddress(sale.getSaleContractAddress())
                .sellerAddress(sale.getSellerAddress())
                .buyerAddress(sale.getBuyerAddress())
                .salePrice(sale.getSalePrice())
                .saleTitle(sale.getSaleTitle())
                .saleDescription(sale.getSaleDescription())
                .isSold(sale.getIsSold())
                .saleCreatedTime(sale.getCreatedTime())
                .saleCompletedTime(sale.getCompletedTime())
                .build();
    }

}
