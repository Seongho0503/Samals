package com.project.samals.repository;

import com.project.samals.domain.Sale;
import com.project.samals.domain.SaleLike;
import com.project.samals.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleLikeRepository extends JpaRepository<SaleLike, Long> {



    SaleLike findBySaleAndUser(Sale sale, User user);

    void deleteByUserAndSale(User user, Sale sale);

    List<SaleLike> findAllBySale(Sale sale);
}
