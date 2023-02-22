package com.example.patient.repos;

import com.example.patient.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findLocationByPatientId(Long patientId);

    List<Location> deleteLocationsByPatientId(Long patientId);

}
