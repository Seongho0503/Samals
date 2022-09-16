package com.project.samals.dto;

import com.project.samals.domain.Sale;
import lombok.*;

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

    public Sale toEntity(){
        return Sale.builder()
                .tokenId(tokenId)
                .saleContractAddress(saleContractAddress)
                .sellerAddress(sellerAddress)
                .salePrice(salePrice)
                .saleDescription(saleDescription)
                .build();
    }


}
