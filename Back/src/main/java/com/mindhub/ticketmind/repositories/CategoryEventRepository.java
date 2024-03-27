package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.CategoryEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryEventRepository extends JpaRepository<CategoryEvent,Long> {
    CategoryEvent findByName(String categoryNameUpper);
}
