package com.project.samals.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResProfileCountDto {
    private String animalSpecies;
    private int selectCount;
}
