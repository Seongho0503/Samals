package com.project.samals.domain;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor()
@Entity
@Getter
@Setter
@ToString
@Table(name="tb_ipfs")
//입력 값이 null일 경우 아예 입력하지 않아 DB 설정 내의 default 값을 사용 가능
@DynamicInsert
public class Ipfs {
    //기본키임을 표시
    @Id
    //자동 생성 전략
    //IDENTITY : 기본키 생성을 데이터베이스에 위임, id값이 null이면 DB가 알아서 AI 처리
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ipfsSeq;

    //외래키
    //다수 대 하나
    @ManyToOne
    //참조하는 칼럼
    @JoinColumn(name = "animal_species",nullable = false)
    private Animal animal;

    @Column(name = "ipfs_uri", nullable = false, length = 46, unique = true, columnDefinition = "char(46)")
    private String ipfsUri;

    @Column(name = "ipfs_is_used", columnDefinition = "char(1) default 'N'")
    private String ipfsIsUsed;

    @Column(name = "ipfs_token_id")
    private int ipfsTokenId;
}
