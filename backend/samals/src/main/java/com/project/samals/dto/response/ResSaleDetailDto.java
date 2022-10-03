package com.project.samals.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Sale;
import com.project.samals.domain.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResSaleDetailDto {

    // 거래 Data
    private Long saleSeq;
    private String saleContractAddress;
    private String saleTitle;
    private String saleDescription;
    private int salePrice;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date saleCreatedTime;

    // 판매자 Data
    private String sellerAddress;
    private String sellerNickName;

    // 판매 NFT Data
    private String animalSpecies;
    private int mintNumber;
    private int tokenId;
    private String tokenImgUrl;


    public static ResSaleDetailDto convert(Sale sale, User user) {
        if(sale == null) return null;

        return ResSaleDetailDto.builder()
                .saleSeq(sale.getSaleSeq())
                .saleContractAddress(sale.getSaleContractAddress())
                .saleTitle(sale.getSaleTitle())
                .saleDescription(sale.getSaleDescription())
                .salePrice(sale.getSalePrice())
                .saleCreatedTime(sale.getCreatedTime())

                .sellerAddress(sale.getSellerAddress())
                .sellerNickName(user.getUserNickname())

                .animalSpecies(sale.getNft().getIpfs().getAnimal().getAnimalSpecies())
                .mintNumber(sale.getNft().getNftMintNumber())
                .tokenId(sale.getNft().getTokenId())
                .tokenImgUrl(sale.getNft().getIpfs().getIpfsUri())
                .build();
    }
}
