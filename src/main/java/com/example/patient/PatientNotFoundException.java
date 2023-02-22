package com.example.patient;

import org.springframework.data.crossstore.ChangeSetPersister;

public class PatientNotFoundException extends RuntimeException {
    public PatientNotFoundException(Long id){
        super("Could not find patient " +id);
    }
}
