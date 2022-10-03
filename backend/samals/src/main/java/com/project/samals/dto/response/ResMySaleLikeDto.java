package com.project.samals.dto.response;

import com.project.samals.domain.SaleLike;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResMySaleLikeDto {

    // 거래 Data
    private Long saleSeq;
    private int salePrice;

    // 거래 Status
    private int likeCount;
    private char isSold;
    
    // NFT 정보
    private String imgUri;
    private String animalSpecies;
    private int nftMintNumber;

    public ResMySaleLikeDto(SaleLike saleLike,int likeCount){
        this.saleSeq=saleLike.getSale().getSaleSeq();
        this.salePrice=saleLike.getSale().getSalePrice();
        this.likeCount=likeCount;
        this.isSold=saleLike.getSale().getIsSold();
        this.imgUri=saleLike.getSale().getNft().getIpfs().getIpfsUri();
        this.animalSpecies=saleLike.getSale().getNft().getIpfs().getAnimal().getAnimalSpecies();
        this.nftMintNumber=saleLike.getSale().getNft().getNftMintNumber();
    }

}
