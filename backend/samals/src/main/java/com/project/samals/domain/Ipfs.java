package com.project.samals.domain;

import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@ToString
@Table(name="tb_ipfs")
public class IPFS {
    //기본키임을 표시
    @Id
    //자동 생성 전략
    //IDENTITY : 기본키 생성을 데이터베이스에 위임, id값이 null이면 DB가 알아서 AI 처리
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ipfs_seq;

    //외래키
    private String animal_species;
    private String ipfs_uri;
    private char ipfs_is_used;
    private int ipfs_token_id;
}
