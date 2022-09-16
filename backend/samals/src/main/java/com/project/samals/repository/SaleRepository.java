package com.project.samals.repository;

import com.project.samals.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Sale[] findAllByTokenId(int tokenId);

    Sale findBySaleSeq(long saleSeq);

    void deleteBySaleSeq(long saleSeq);
}
