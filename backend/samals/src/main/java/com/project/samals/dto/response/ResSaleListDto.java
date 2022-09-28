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
    private Long saleSeq;
    private int salePrice;
    private String animalSpecies;
    private int mintNumber;
    private String animalClass;
    private int animalClassNo;
    private int likeCount;
    private char likePush;
    private String itemImgUrl;

    public static ResSaleListDto convert(Sale sale) {
        if(sale == null) return null;

        return ResSaleListDto.builder()
                .saleSeq(sale.getSaleSeq())
                .salePrice(sale.getSalePrice())
                .animalSpecies(sale.getNft().getIpfs().getAnimal().getAnimalSpecies())
                .mintNumber(sale.getNft().getNftMintNumber())
                .animalClass(sale.getNft().getIpfs().getAnimal().getAnimalClass())
                .animalClassNo(sale.getNft().getIpfs().getAnimal().getAnimalClassNo())
                .itemImgUrl("https://ipfs.io/ipfs/"+sale.getNft().getIpfs().getIpfsUri())
                .build();
    }

}
