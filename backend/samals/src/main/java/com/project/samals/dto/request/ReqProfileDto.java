package com.project.samals.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ReqProfileDto {
    private String address;
    private int ipfsSeq;
}
