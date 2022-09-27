package com.project.samals.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResSaleLikeDto {

    private Long saleSeq;
    private int salePrice;
    private int likeCount;
    private char isSold;
    private String imgUri;
    private String animalSpecies;
    private int nftMintNumber;

}
