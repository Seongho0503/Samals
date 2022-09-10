package com.project.samals.domain;

import javax.persistence.*;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder @AllArgsConstructor @NoArgsConstructor
@Entity
@Getter @Setter
@ToString
@Table(name="tb_sale")
public class Sale {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_seq")
    private Long saleSeq;

    @Column(name = "sale_token_id")
    private int tokenId;

    @Column(name = "sale_contract_address")
    private String saleContractAddress;

    @Column(name = "seller_address")
    private String sellerAddress;

    @Column(name = "buyer_address")
    private String buyerAddress;

    @Column(name = "sale_price")
    private int salePrice;

    @Column(name = "sale_description")
    private String saleDescription;

    @Column(name = "is_sold")
    private char isSold;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="sale_created_at")
    private Date createdTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="sale_updated_at")
    private Date updatedTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="sale_completed_at")
    private Date completedTime;
}