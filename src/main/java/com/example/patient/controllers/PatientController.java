package com.example.patient.controllers;

import com.example.patient.entities.Location;
import com.example.patient.entities.Patient;
import com.example.patient.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
public class PatientController {
    @Autowired
    PatientService patientService;


    @RequestMapping(value = "/patient/", method = RequestMethod.GET)
    public List<Patient> findAll() {
        return patientService.getAllPatients();
    }

    @RequestMapping(value = "/patient/{id}", method = RequestMethod.GET)
    public Patient findPatientById(@PathVariable Long id) {
        return patientService.findPatientById(id);
    }

    @RequestMapping(value = "/patient/", method = RequestMethod.POST)
    public boolean createPatient(@RequestBody Patient newPatient) {
        patientService.createPatient(newPatient);
        return true;
    }

    @RequestMapping(value = "/patient/{id}", method = RequestMethod.PUT)
    public boolean updatePatient(@PathVariable Long id, @RequestBody Patient newPatient) {
        patientService.updatePatient(id, newPatient);
        return true;
    }

    @RequestMapping(value = "/patient/{id}", method = RequestMethod.DELETE)
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }


}
