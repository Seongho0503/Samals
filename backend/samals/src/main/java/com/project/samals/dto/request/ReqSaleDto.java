package com.project.samals.dto.request;

import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqSaleDto {
    private int tokenId;
    private String saleContractAddress;
    private String sellerAddress;
    private int salePrice;
    private String saleDescription;

    public Sale toEntity(Nft nft){
        return Sale.builder()
                .saleContractAddress(saleContractAddress)
                .sellerAddress(sellerAddress)
                .salePrice(salePrice)
                .saleDescription(saleDescription)
                .saleTitle(nft.getIpfs().getAnimal().getAnimalSpecies()+"#"+nft.getNftMintNumber())
                .isSold('N')
                .createdTime(new Date())
                .build();
    }


}
