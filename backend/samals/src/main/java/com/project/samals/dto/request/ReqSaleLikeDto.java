package com.project.samals.dto.request;

import com.project.samals.domain.Nft;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqSaleLikeDto {

    private long saleSeq;

    private String walletAddress;

}
