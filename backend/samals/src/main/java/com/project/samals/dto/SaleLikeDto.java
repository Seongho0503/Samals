package com.project.samals.dto;

import com.project.samals.domain.SaleLike;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleLikeDto {
    private Long saleLikeSeq;


    public SaleLike toEntity(){
        return SaleLike.builder()
                .saleLikeSeq(saleLikeSeq)
                .build();
    }

    public static SaleLikeDto convert(SaleLike saleLike) {
        if(saleLike == null) return null;

        return SaleLikeDto.builder()
                .saleLikeSeq(saleLike.getSaleLikeSeq())
                .build();
    }

}
