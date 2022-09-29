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
public class ResMyNftDto {

    private int tokenId;

    private int nftMintNumber;

    private String nftImgUrl;

    private String animalSpecies;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date getTime;

    public static ResMyNftDto convert(Nft nft) {
        if(nft == null) return null;

        return ResMyNftDto.builder()
                .tokenId(nft.getTokenId())
                .animalSpecies(nft.getIpfs().getAnimal().getAnimalSpecies())
                .nftImgUrl("https://ipfs.io/ipfs/"+nft.getIpfs().getIpfsUri())
                .nftMintNumber(nft.getNftMintNumber())
                .getTime(nft.getUpdatedTime())
                .build();
    }
}
