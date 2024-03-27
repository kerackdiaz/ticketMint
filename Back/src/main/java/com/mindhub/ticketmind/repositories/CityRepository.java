package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City,Long> {
    City findByName(String upperCase);
}
