package com.project.samals.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqSaleCompleteDto {
    private long saleSeq;
    private String buyerAddress;
}
