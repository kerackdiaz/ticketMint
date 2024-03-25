package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City,Long> {
}
