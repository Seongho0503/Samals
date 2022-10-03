package com.project.samals.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Sale;
import com.project.samals.service.SaleLikeService;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResSaleListDto {
    // 거래 Data
    private Long saleSeq;
    private int salePrice;

    // NFT 동물 Data
    private String animalTitle;
    private String animalSpecies;
    private String animalClass;
    private int animalClassNo;
    private String itemImgUrl;
    private int mintNumber;

    // 사용자 좋아요 정보
    private int likeCount;
    private char likePush;


    public static ResSaleListDto convert(Sale sale) {
        if(sale == null) return null;
        return ResSaleListDto.builder()
                .saleSeq(sale.getSaleSeq())
                .salePrice(sale.getSalePrice())
                .animalSpecies(sale.getNft().getIpfs().getAnimal().getAnimalSpecies())
                .animalTitle(sale.getSaleTitle())
                .mintNumber(sale.getNft().getNftMintNumber())
                .animalClass(sale.getNft().getIpfs().getAnimal().getAnimalClass())
                .animalClassNo(sale.getNft().getIpfs().getAnimal().getAnimalClassNo())
                .itemImgUrl(sale.getNft().getIpfs().getIpfsUri())
                .build();
    }

}
