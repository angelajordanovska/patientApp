package com.example.patient.services;

import com.example.patient.PatientNotFoundException;
import com.example.patient.entities.Location;
import com.example.patient.entities.Patient;
import com.example.patient.repos.LocationRepository;
import com.example.patient.repos.PatientRepository;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private LocationRepository locationRepository;


    public List<Patient> getAllPatients() {
        List<Patient> patientList = patientRepository.findAll();
        List<Patient> newPatientList = new ArrayList<>();
        patientList.forEach(patient ->
        {
            List<Location> locations = locationRepository.findLocationByPatientId(patient.getId());
            patient.setLocations(locations);
            newPatientList.add(patient);
        });
        return newPatientList;
    }

    public Patient findPatientById(@PathVariable Long id) {
        List<Location> locations = locationRepository.findLocationByPatientId(id);
        Optional<Patient> newPatient = patientRepository.findById(id);
        if (newPatient.isEmpty()) {
            return null;
        }
        newPatient.get().setLocations(locations);
        return newPatient.get();
    }

    public boolean createPatient(@RequestBody Patient newPatient) {
        Patient tempPatient = patientRepository.save(newPatient);
        List<Location> locations = locationRepository.saveAll(newPatient.getLocations());
        locations.stream().forEach(location -> location.setPatientId(tempPatient.getId()));
        tempPatient.setLocations(locations);
        locationRepository.saveAll(locations);
        patientRepository.save(tempPatient);
        return true;
    }

    @Transactional
    public boolean updatePatient(@PathVariable Long id, @RequestBody Patient newPatient) {
        //Update the Patient info.
        Patient updatedPatient = patientRepository.findById(id).orElseThrow(() -> new PatientNotFoundException(id));
        updatedPatient.setFirstName(newPatient.getFirstName());
        updatedPatient.setLastName(newPatient.getLastName());
        updatedPatient.setGender(newPatient.getGender());
        updatedPatient.setPhoneNumber(newPatient.getPhoneNumber());
        updatedPatient.setDateOfBirth(newPatient.getDateOfBirth());

        List<Location> newLocations = newPatient.getLocations();

        Set<Long> locationIds = newLocations.stream()
                .map(Location::getId)
                .collect(Collectors.toSet());

        List<Location> existingLocations = locationRepository.findLocationByPatientId(id);

        List<Location> toBeDeleted = new ArrayList<>();
        List<Location> toBeSaved = new ArrayList<>();

        //Delete existing Locations
        for (Location exsistingLocation : existingLocations) {
            if (!locationIds.contains(exsistingLocation.getId())) {
                toBeDeleted.add(exsistingLocation);
            }
        }

        //Save new Locations
        for (Location newLocation : newLocations) {
            Long locationId = newLocation.getId();
            Location location = existingLocations.stream()
                    .filter(el -> el.getId().equals(locationId))
                    .findFirst()
                    .orElse(newLocation);

            location.setCity(newLocation.getCity());
            location.setAddress(newLocation.getAddress());
            location.setPostalCode(newLocation.getPostalCode());
            location.setPatientId(id);
            toBeSaved.add(location);
        }

        updatedPatient.setLocations(toBeSaved);

        locationRepository.saveAll(toBeSaved);
        locationRepository.deleteAll(toBeDeleted);

        return true;
    }

    @Transactional
    public void deletePatient(@PathVariable Long id) {
        locationRepository.deleteLocationsByPatientId(id);
        patientRepository.deleteById(id);
    }
}
