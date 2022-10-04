package com.project.samals.repository;

import com.project.samals.domain.Ipfs;
import com.project.samals.domain.Nft;
import com.project.samals.domain.Sale;
import com.project.samals.dto.SaleDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {

//    Sale[] findAllByTokenId(int tokenId);

    Optional<Sale> findBySaleSeq(long saleSeq);

    void deleteBySaleSeq(long saleSeq);


    Sale[] findAllBySellerAddress(String address);

    Sale[] findAllByBuyerAddress(String address);

    Sale[] findAllByIsSold(char isSold);

    List<Sale> findAllByIsSoldAndSaleTitleContainingIgnoreCase(char n, String search);

    Sale findByNftAndIsSold(Nft nft, char n);

    Sale findByNftAndSellerAddress(Nft nft, String walletAddress);
}
