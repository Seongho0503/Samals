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
public class ResSaleDetailDto {
    private Long saleSeq;
    private int tokenId;
    private String animalSpecies;
    private int mintNumber;
    private String saleContractAddress;
    private String sellerAddress;
    private int salePrice;
    private String saleTitle;
    private String saleDescription;
    private String tokenImgUrl;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date saleCreatedTime;

    public static ResSaleDetailDto convert(Sale sale) {
        if(sale == null) return null;

        return ResSaleDetailDto.builder()
                .saleSeq(sale.getSaleSeq())
                .tokenId(sale.getNft().getTokenId())
                .tokenImgUrl("https://ipfs.io/ipfs/"+sale.getNft().getIpfs().getIpfsUri())
                .animalSpecies(sale.getNft().getIpfs().getAnimal().getAnimalSpecies())
                .mintNumber(sale.getNft().getNftMintNumber())
                .saleContractAddress(sale.getSaleContractAddress())
                .sellerAddress(sale.getSellerAddress())
                .salePrice(sale.getSalePrice())
                .saleTitle(sale.getSaleTitle())
                .saleDescription(sale.getSaleDescription())
                .saleCreatedTime(sale.getCreatedTime())
                .build();
    }

}
