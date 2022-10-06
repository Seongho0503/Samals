package com.project.samals.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Nft;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResNftDto {

    // NFT 민팅 정보
    private Long nftSeq;
    private int nftPrice;
    private String nftMintType;
    private int nftMintNumber;
    private String minter;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date createdTime;

    // NFT PFP 동물 정보
    private String animalSpecies;
    private String animalClass;
    private int animalClassNo;
    private String animalNameKr;
    private String animalNameEn;

    // NFT 토큰 정보
    private int nftTokenId;
    private String nftImgUrl;
    private String owner;

    public static ResNftDto convert(Nft nft) {
        if(nft == null) return null;
        return ResNftDto.builder()
                .nftSeq(nft.getNftSeq())
                .nftPrice(nft.getNftPrice())
                .nftMintType(nft.getNftType())
                .nftMintNumber(nft.getNftMintNumber())
                .minter(nft.getUser().getWalletAddress())
                .createdTime(nft.getCreatedTime())

                .animalSpecies(nft.getIpfs().getAnimal().getAnimalSpecies())
                .animalClass(nft.getIpfs().getAnimal().getAnimalClass())
                .animalClassNo(nft.getIpfs().getAnimal().getAnimalClassNo())
                .animalNameKr(nft.getIpfs().getAnimal().getAnimalNameKr())
                .animalNameEn(nft.getIpfs().getAnimal().getAnimalNameEn())

                .nftTokenId(nft.getTokenId())
                .nftImgUrl(nft.getIpfs().getIpfsUri())
                .owner(nft.getNftOwner())
                .build();
    }

}
