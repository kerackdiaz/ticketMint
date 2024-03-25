package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.CategoryEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryEventRepository extends JpaRepository<CategoryEvent,Long> {
}
